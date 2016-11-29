using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.C1Console.Search.Crawling;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.C1Console.Search.DocumentSources
{
    internal class CmsPageDocumentSource : ISearchDocumentSource
    {
        const string LogTitle = nameof(CmsPageDocumentSource);

        private readonly List<IDocumentSourceListener> _listeners = new List<IDocumentSourceListener>();
        private readonly DataChangesIndexNotifier _changesIndexNotifier;
        private readonly Lazy<ICollection<DocumentField>> _customFields;

        public CmsPageDocumentSource(string name)
        {
            Name = name;

            _customFields = new Lazy<ICollection<DocumentField>>(() =>
            {
                var pageDocFields = DataTypeSearchReflectionHelper.GetDocumentFields(typeof (IPage));
                var metaDataFields = PageMetaDataFacade.GetAllMetaDataTypes()
                    .SelectMany(dataType => DataTypeSearchReflectionHelper.GetDocumentFields(dataType, false));

                return pageDocFields
                       .Concat(metaDataFields)
                       .ExcludeDuplicateKeys(f => f.Name)
                       .Evaluate();
            });

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

        public ICollection<DocumentField> CustomFields => _customFields.Value;

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

                try
                {
                    page.GetMetaData()
                        .ForEach(pageMetaData => documentBuilder.CrawlData(pageMetaData));
                }
                catch (Exception ex)
                {
                    Log.LogWarning(LogTitle, ex);
                }
            }

            string documentId = GetDocumentId(page);

            return documentBuilder.BuildDocument(Name, documentId, label, null, page.GetDataEntityToken());
        }

        private string GetDocumentId(IPage page)
        {
            return $"{page.Id}{page.VersionId}";
        }
    }
}
