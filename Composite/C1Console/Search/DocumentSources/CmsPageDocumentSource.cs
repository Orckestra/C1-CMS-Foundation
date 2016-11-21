using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.C1Console.Search.Crawling;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.C1Console.Search.DocumentSources
{
    internal class CmsPageDocumentSource : ISearchDocumentSource
    {
        private readonly List<IDocumentSourceListener> _listeners = new List<IDocumentSourceListener>();
        private readonly DataChangesIndexNotifier _changesIndexNotifier;

        public CmsPageDocumentSource(string name)
        {
            Name = name;

            _changesIndexNotifier = new DataChangesIndexNotifier(
                _listeners, typeof(IPage), 
                data => FromPage((IPage)data),
                data => GetDocumentId((IPage) data));

            _changesIndexNotifier.Start();
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

        public ICollection<DocumentField> CustomFields { get; } 
            = DataTypeSearchReflectionHelper.GetDocumentFields(typeof (IPage)).Evaluate();

        private SearchDocument FromPage(IPage page)
        {
            string label = page.MenuTitle;
            if (string.IsNullOrWhiteSpace(label))
            {
                label = page.Title;
            }

            var documentBuilder = new SearchDocumentBuilder();

            documentBuilder.SetDataType(typeof(IPage));
            documentBuilder.CrawlData(page);

            using (new DataConnection(page.DataSourceId.PublicationScope, page.DataSourceId.LocaleScope))
            {
                var placeholders = PageManager.GetPlaceholderContent(page.Id, page.VersionId);
                placeholders.ForEach(pl => documentBuilder.CrawlData(pl, true));
            }

            // TODO: crawl page meta data as well

            string documentId = GetDocumentId(page);

            return documentBuilder.BuildDocument(Name, documentId, label, null, page.GetDataEntityToken());
        }

        private string GetDocumentId(IPage page)
        {
            return $"{page.Id}{page.VersionId}";
        }
    }
}
