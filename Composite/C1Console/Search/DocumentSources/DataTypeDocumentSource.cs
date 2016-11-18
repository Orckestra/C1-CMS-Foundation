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

            var documentBuilder = new SearchDocumentBuilder();
            documentBuilder.CrawlData(data);
            documentBuilder.SetDataType(_interfaceType);

            string documentId = data.GetUniqueKey().ToString();
            return documentBuilder.BuildDocument(Name, documentId, label, null, data.GetDataEntityToken());
        }
    }
}
