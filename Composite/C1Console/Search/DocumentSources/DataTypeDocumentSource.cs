using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.C1Console.Search.Crawling;
using Composite.Core;
using Composite.Core.Linq;
using Composite.Data;
using Composite.Data.DynamicTypes;

namespace Composite.C1Console.Search.DocumentSources
{
    internal class DataTypeDocumentSource : ISearchDocumentSource
    {
        private readonly List<IDocumentSourceListener> _listeners = new List<IDocumentSourceListener>();
        private readonly Type _interfaceType;
        private readonly DataChangesIndexNotifier _changesIndexNotifier;
        private readonly Lazy<ICollection<DocumentField>> _customFields;

        static DataTypeDocumentSource()
        {
            DynamicTypeManager.OnStoreCreated += OnStoreCreated;
            DynamicTypeManager.OnStoreDropped += OnStoreDropped;
            DynamicTypeManager.OnStoreUpdated += OnStoreUpdated;
        }


        public DataTypeDocumentSource(Type interfaceType)
        {
            _interfaceType = interfaceType;

            _customFields = new Lazy<ICollection<DocumentField>>(() =>
                DataTypeSearchReflectionHelper.GetDocumentFields(_interfaceType).Evaluate());

            _changesIndexNotifier = new DataChangesIndexNotifier(
                _listeners, _interfaceType, FromData, GetDocumentId);

            _changesIndexNotifier.Start();
        }

        public string Name => _interfaceType.FullName;

        public void Subscribe(IDocumentSourceListener sourceListener)
        {
            _listeners.Add(sourceListener);
        }

        public IEnumerable<SearchDocument> GetAllSearchDocuments(CultureInfo culture)
        {
            ICollection<IData> data;

            using (new DataConnection(PublicationScope.Unpublished, culture))
            {
                data = DataFacade.GetData(_interfaceType).Cast<IData>().Evaluate();
            }

            return data.Select(FromData).Where(doc => doc != null);
        }

        public ICollection<DocumentField> CustomFields => _customFields.Value;

        private SearchDocument FromData(IData data)
        {
            string label = data.GetLabel();
            if (string.IsNullOrEmpty(label))
            {
                // Having a label is a requirement for a data item to be searchable
                return null;
            }

            var documentBuilder = new SearchDocumentBuilder();
            documentBuilder.CrawlData(data);
            documentBuilder.SetDataType(_interfaceType);

            string documentId = GetDocumentId(data);
            return documentBuilder.BuildDocument(Name, documentId, label, null, data.GetDataEntityToken());
        }

        private string GetDocumentId(IData data)
        {
            return data.GetUniqueKey().ToString();
        }

        private static void OnStoreCreated(DataTypeDescriptor dataTypeDescriptor)
        {
            if (!dataTypeDescriptor.Searchable) return;

            var indexUpdater = ServiceLocator.GetService<ISearchIndexUpdater>();

            indexUpdater?.Populate(GetStoreName(dataTypeDescriptor));
        }

        private static void OnStoreDropped(DataTypeDescriptor dataTypeDescriptor)
        {
            if (!dataTypeDescriptor.Searchable) return;

            var indexUpdater = ServiceLocator.GetService<ISearchIndexUpdater>();

            indexUpdater?.Remove(GetStoreName(dataTypeDescriptor));
        }

        private static void OnStoreUpdated(UpdateDataTypeDescriptor updateDataTypeDescriptor)
        {
            OnStoreDropped(updateDataTypeDescriptor.OldDataTypeDescriptor);
            OnStoreCreated(updateDataTypeDescriptor.NewDataTypeDescriptor);
        }

        private static string GetStoreName(DataTypeDescriptor dtd) => dtd.GetFullInterfaceName();
    }
}
