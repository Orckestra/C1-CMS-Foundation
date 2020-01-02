using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.C1Console.Security;
using Composite.Search.Crawling;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using Composite.Core.Routing;
using Composite.Core.Types;
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
        private readonly Lazy<IReadOnlyCollection<DocumentField>> _customFields;

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

            _customFields = new Lazy<IReadOnlyCollection<DocumentField>>(GetDocumentFields);

            _changesIndexNotifier = new DataChangesIndexNotifier(
                _listeners, _interfaceType, FromData, GetDocumentId);

            _changesIndexNotifier.Start();
        }

        public string Name => _interfaceType.FullName;

        public void Subscribe(IDocumentSourceListener sourceListener)
        {
            _listeners.Add(sourceListener);
        }

        public IEnumerable<DocumentWithContinuationToken> GetSearchDocuments(CultureInfo culture, string continuationToken = null)
        {
            var (continueFromScope, continueFromKey) = ParseCToken(continuationToken);

            if (continueFromScope == PublicationScope.Published)
            {
                var documents = GetDocumentsFromScope(PublicationScope.Published, culture, continueFromKey);
                foreach (var doc in documents)
                {
                    yield return doc;
                }
            }


            if (typeof (IPublishControlled).IsAssignableFrom(_interfaceType))
            {
                var documents = GetDocumentsFromScope(PublicationScope.Unpublished, culture,
                    continueFromScope == PublicationScope.Unpublished ? continueFromKey : null);

                foreach (var doc in documents)
                {
                    yield return doc;
                }
            }
        }

        private IEnumerable<DocumentWithContinuationToken> GetDocumentsFromScope(
            PublicationScope publicationScope,
            CultureInfo culture,
            object continueFromKey)
        {
            using (new DataConnection(publicationScope, culture))
            {
                var query = DataFacade.GetData(_interfaceType);

                query = FilterAndOrderByKey(query, continueFromKey);

                if (publicationScope == PublicationScope.Unpublished)
                {
                    query = query
                        .Cast<IPublishControlled>()
                        .Where(data => data.PublicationStatus != GenericPublishProcessController.Published);
                }
                var dataSet = query.Cast<IData>().Evaluate();

                foreach (var data in dataSet)
                {
                    var document = FromData(data, culture);
                    if (document == null) continue;

                    yield return new DocumentWithContinuationToken
                    {
                        Document = document,
                        ContinuationToken = GetContinuationToken(data, publicationScope)
                    };
                }
            }
        }

        private IQueryable FilterAndOrderByKey(IQueryable dataset, object continueFromKey)
        {
            var keyProperties = _interfaceType.GetKeyProperties();
            if (keyProperties.Count > 1
                || !keyProperties.All(property => typeof(IComparable).IsAssignableFrom(property.PropertyType)))
            {
                return dataset.Cast<IData>(); // Not supported
            }
        
            var keyProperty = keyProperties.Single();

            dataset = dataset.OrderBy(_interfaceType, keyProperty.Name);

            if (continueFromKey != null)
            {
                dataset = dataset.Cast<IData>()
                    .ToList()
                    .Where(data => (keyProperty.GetValue(data) as IComparable).CompareTo(continueFromKey) > 0)
                    .AsQueryable();
            }

            return dataset;
        }

        private (PublicationScope continueFromScope, object continueFromKey) ParseCToken(string continuationToken)
        {
            if (continuationToken == null)
            {
                return (PublicationScope.Published, null);
            }
 
            int separator = continuationToken.IndexOf(':');
            string keyStr = continuationToken.Substring(separator + 1);
            var keyPropertyType = _interfaceType.GetKeyProperties().Single().PropertyType;

            object key = ValueTypeConverter.Convert(keyStr, keyPropertyType);
            var scope = (PublicationScope) Enum.Parse(typeof(PublicationScope), continuationToken.Substring(0, separator));

            return (scope, key);
        }

        private string GetContinuationToken(IData data, PublicationScope publicationScope)
        {
            if (_interfaceType.GetKeyProperties().Count > 1) return null; // Not supported

            var key = data.GetUniqueKey();
            string keyStr = ValueTypeConverter.Convert<string>(key);
            return $"{publicationScope}:{keyStr}";
        }


        public IReadOnlyCollection<DocumentField> CustomFields => _customFields.Value;

        private SearchDocument FromData(IData data, CultureInfo culture)
        {
            using (new DataScope(culture))
            {
                string label = data.GetLabel();
                if (string.IsNullOrEmpty(label))
                {
                    // Having a label is a requirement for a data item to be searchable
                    return null;
                }

                var docBuilder = new SearchDocumentBuilder();
                docBuilder.SetDataType(_interfaceType);

                string documentId = GetDocumentId(data);
                if (InternalUrls.DataTypeSupported(_interfaceType)
                    && (!_isPublishable || data.DataSourceId.PublicationScope == PublicationScope.Published))
                {
                    docBuilder.Url = InternalUrls.TryBuildInternalUrl(data.ToDataReference());
                }

                docBuilder.CrawlData(data);

                var entityToken = GetConsoleEntityToken(data);
                if (entityToken == null)
                {
                    return null;
                }

                return docBuilder.BuildDocument(Name, documentId, label, null, entityToken);
            }
        }

        private EntityToken GetConsoleEntityToken(IData data)
        {
            if (!(data is IPublishControlled)
                || data.DataSourceId.DataScopeIdentifier == DataScopeIdentifier.Administrated)
            {
                return data.GetDataEntityToken();
            }

            var administratedData = DataFacade.GetDataFromOtherScope(data, DataScopeIdentifier.Administrated).FirstOrDefault();
            if (administratedData == null)
            {
                Log.LogWarning(LogTitle, $"The following data item exists in published scope, but doesn't exist in unpublished scope '{data.DataSourceId.Serialize()}'.");
                return null;
            }

            return administratedData.GetDataEntityToken();
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

        List<DocumentField> GetDocumentFields()
        {
            return DataTypeSearchReflectionHelper.GetDocumentFields(_interfaceType).ToList();
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
