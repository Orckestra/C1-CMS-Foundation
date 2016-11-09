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

            foreach (var page in pages)
            {
                yield return FromPage(page);
            }
        }

        private SearchDocument FromPage(IPage page)
        {
            IEnumerable<string> fullText = new[] { page.Title, page.UrlTitle, page.Description };

            string label = page.MenuTitle;
            if (string.IsNullOrWhiteSpace(label))
            {
                label = page.Title;
            }

            var dataCrawler = new DataCrawlingHelper();

            using (new DataConnection(page.DataSourceId.PublicationScope, page.DataSourceId.LocaleScope))
            {
                var placeholders = PageManager.GetPlaceholderContent(page.Id, page.VersionId);
                foreach (var placeholder in placeholders)
                {
                    dataCrawler.CrawlXhtml(placeholder.Content);
                }
            }

            fullText = fullText.Concat(dataCrawler.TextParts);

            string documentId = $"{page.Id}{page.VersionId}";
            return new SearchDocument(Name, documentId, label, page.GetDataEntityToken())
            {
                ElementBundleName = null, // TODO: implement
                FullText = fullText
            };
        }
    }
}
