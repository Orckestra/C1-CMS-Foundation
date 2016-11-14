using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.C1Console.Search.Crawling;
using Composite.Core.Linq;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.C1Console.Search.DocumentSources
{
    internal class CmsPageDocumentSource : ISearchDocumentSource
    {
        private readonly List<IDocumentSourceListener> _listeners = new List<IDocumentSourceListener>();

        public CmsPageDocumentSource(string name)
        {
            Name = name;
        }

        public string Name { get; }

        public void Subscribe(IDocumentSourceListener sourceListener)
        {
            _listeners.Add(sourceListener);
        }

        public IEnumerable<SearchDocument> GetAllSearchDocuments(CultureInfo culture)
        {
            ICollection<IPage> pages;

            using (var conn = new DataConnection(PublicationScope.Unpublished, culture))
            {
                pages = conn.Get<IPage>().Evaluate();
            }

            return pages.Select(FromPage);
        }

        public IEnumerable<DocumentField> CustomFields 
            => DataTypeSearchReflectionHelper.GetDocumentFields(typeof (IPage));

        private SearchDocument FromPage(IPage page)
        {
            string label = page.MenuTitle;
            if (string.IsNullOrWhiteSpace(label))
            {
                label = page.Title;
            }

            var dataCrawler = new DataCrawlingHelper();

            dataCrawler.CrawlData(page);

            using (new DataConnection(page.DataSourceId.PublicationScope, page.DataSourceId.LocaleScope))
            {
                var placeholders = PageManager.GetPlaceholderContent(page.Id, page.VersionId);
                foreach (var placeholder in placeholders)
                {
                    dataCrawler.CrawlXhtml(placeholder.Content);
                }
            }

            // TODO: crawl page meta data as well

            string documentId = $"{page.Id}{page.VersionId}";
            return new SearchDocument(Name, documentId, label, page.GetDataEntityToken())
            {
                ElementBundleName = null, // TODO: implement
                FullText = dataCrawler.TextParts,
                FieldValues = dataCrawler.FieldPreviewValues.ToDictionary(pair => pair.Key, pair => pair.Value),
                FacetFieldValues = dataCrawler.FacetFieldValues.ToDictionary(pair => pair.Key, pair => pair.Value)
            };
        }
    }
}
