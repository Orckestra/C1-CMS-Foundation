using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.C1Console.Search.Crawling;
using Composite.Core.Linq;
using Composite.Data;

namespace Composite.C1Console.Search.DocumentSources
{
    internal class DataTypeDocumentSource : ISearchDocumentSource
    {
        private readonly List<IDocumentSourceListener> _listeners = new List<IDocumentSourceListener>();
        private readonly Type _interfaceType;

        public DataTypeDocumentSource(Type interfaceType)
        {
            _interfaceType = interfaceType;
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

        public IEnumerable<DocumentField> CustomFields 
            => DataTypeSearchReflectionHelper.GetDocumentFields(_interfaceType);

        private SearchDocument FromData(IData data)
        {
            string label = data.GetLabel();
            if (string.IsNullOrEmpty(label))
            {
                // Having a label is a requirement for a data item to be searchable
                return null;
            }

            var dataCrawler = new DataCrawlingHelper();
            dataCrawler.CrawlData(data);

            string documentId = data.GetUniqueKey().ToString();
            return new SearchDocument(Name, documentId, label, data.GetDataEntityToken())
            {
                ElementBundleName = null,
                FullText = dataCrawler.TextParts,
                FieldValues = dataCrawler.FieldPreviewValues.ToDictionary(pair => pair.Key, pair => pair.Value),
                FacetFieldValues = dataCrawler.FacetFieldValues.ToDictionary(pair => pair.Key, pair => pair.Value)
            };
        }
    }
}
