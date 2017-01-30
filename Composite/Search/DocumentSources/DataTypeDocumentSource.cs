using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.C1Console.Security;
using Composite.Search.Crawling;
using Composite.Core;
using Composite.Core.Linq;
using Composite.Core.Routing;
using Composite.Core.WebClient;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;

namespace Composite.Search.DocumentSources
{
    internal class DataTypeDocumentSource : ISearchDocumentSource
    {
        const string LogTitle = nameof(DataTypeDocumentSource);

        private readonly List<IDocumentSourceListener> _listeners = new List<IDocumentSourceListener>();
        private readonly Type _interfaceType;
        private readonly DataChangesIndexNotifier _changesIndexNotifier;
        private readonly Lazy<ICollection<DocumentField>> _customFields;

        private readonly bool _isPublishable;

        static DataTypeDocumentSource()
        {
            DynamicTypeManager.OnStoreCreated += OnStoreCreated;
            DynamicTypeManager.OnStoreDropped += OnStoreDropped;
            DynamicTypeManager.OnStoreUpdated += OnStoreUpdated;
        }


        public DataTypeDocumentSource(Type interfaceType)
        {
            _interfaceType = interfaceType;

            _isPublishable = typeof (IPublishControlled).IsAssignableFrom(_interfaceType);

            _customFields = new Lazy<ICollection<DocumentField>>(GetDocumentFields);

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
            using (new DataConnection(PublicationScope.Published, culture))
            {
                var dataSet = DataFacade.GetData(_interfaceType).Cast<IData>().Evaluate();
                foreach (var document in dataSet.Select(FromData).Where(doc => doc != null))
                {
                    yield return document;
                }
            }

            if (typeof (IPublishControlled).IsAssignableFrom(_interfaceType))
            {
                using (new DataConnection(PublicationScope.Unpublished, culture))
                {
                    var dataSet = DataFacade.GetData(_interfaceType)
                        .Cast<IPublishControlled>()
                        .Where(data => data.PublicationStatus != GenericPublishProcessController.Published)
                        .Evaluate();

                    foreach (var document in dataSet.Select(FromData).Where(doc => doc != null))
                    {
                        yield return document;
                    }
                }
            }
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

            var docBuilder = new SearchDocumentBuilder();
            docBuilder.CrawlData(data);
            docBuilder.SetDataType(_interfaceType);

            string documentId = GetDocumentId(data);
            string url = null;
            if (InternalUrls.DataTypeSupported(data.DataSourceId.InterfaceType)
                && (!_isPublishable || (data.DataSourceId.PublicationScope == PublicationScope.Published)))
            {
                url = InternalUrls.TryBuildInternalUrl(data.ToDataReference());
            }

            var entityToken = GetConsoleEntityToken(data);
            if (entityToken == null)
            {
                Log.LogWarning(LogTitle, $"Failed to obtain an entity token for a data item of type '{data.DataSourceId.InterfaceType}'");
                return null;
            }

            return docBuilder.BuildDocument(Name, documentId, label, null, entityToken, url);
        }

        private EntityToken GetConsoleEntityToken(IData data)
        {
            if (!(data is IPublishControlled)
                || data.DataSourceId.DataScopeIdentifier == DataScopeIdentifier.Administrated)
            {
                return data.GetDataEntityToken();
            }

            var administratedData = DataFacade.GetDataFromOtherScope(data, DataScopeIdentifier.Administrated).FirstOrDefault();
            return administratedData?.GetDataEntityToken();
        }

        private string GetDocumentId(IData data)
        {
            var uniqueKey = data.GetUniqueKey();
            if (uniqueKey is Guid)
            {
                uniqueKey = UrlUtils.CompressGuid((Guid)uniqueKey);
            }

            string scopeSuffix = _isPublishable && data.DataSourceId.PublicationScope == PublicationScope.Unpublished
                ? "u" : string.Empty;

            return uniqueKey + scopeSuffix;
        }

        ICollection<DocumentField> GetDocumentFields()
        {
            return DataTypeSearchReflectionHelper.GetDocumentFields(_interfaceType).Evaluate();
        }

        private static void OnStoreCreated(DataTypeDescriptor dataTypeDescriptor)
        {
            if (!dataTypeDescriptor.Searchable) return;

            var indexUpdater = ServiceLocator.GetService<ISearchIndexUpdater>();

            if (dataTypeDescriptor.IsCodeGenerated)
            {
                indexUpdater?.StopProcessingUpdates();
            }

            indexUpdater?.Populate(GetStoreName(dataTypeDescriptor));
        }

        private static void OnStoreDropped(DataTypeDescriptor dataTypeDescriptor)
        {
            if (!dataTypeDescriptor.Searchable) return;

            var indexUpdater = ServiceLocator.GetService<ISearchIndexUpdater>();

            if (dataTypeDescriptor.IsCodeGenerated)
            {
                indexUpdater?.StopProcessingUpdates();
            }

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
