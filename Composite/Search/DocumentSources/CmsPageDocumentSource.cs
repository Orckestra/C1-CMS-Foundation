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
using Composite.Core.Routing.Foundation.PluginFacades;
using Composite.Core.WebClient;
using Composite.Data;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Types;

namespace Composite.Search.DocumentSources
{
    internal class CmsPageDocumentSource : ISearchDocumentSource
    {
        const string LogTitle = nameof(CmsPageDocumentSource);

        private readonly List<IDocumentSourceListener> _listeners = new List<IDocumentSourceListener>();
        private readonly DataChangesIndexNotifier _changesIndexNotifier;
        private readonly Lazy<IReadOnlyCollection<DocumentField>> _customFields;
        private readonly IEnumerable<ISearchDocumentBuilderExtension> _docBuilderExtensions;

        public CmsPageDocumentSource(IEnumerable<ISearchDocumentBuilderExtension> extensions)
        {
            _customFields = new Lazy<IReadOnlyCollection<DocumentField>>(() =>
            {
                var pageDocFields = DataTypeSearchReflectionHelper.GetDocumentFields(typeof (IPage));
                var metaDataFields = PageMetaDataFacade.GetAllMetaDataTypes()
                    .SelectMany(dataType => DataTypeSearchReflectionHelper.GetDocumentFields(dataType, false));

                return pageDocFields
                       .Concat(metaDataFields)
                       .ExcludeDuplicateKeys(f => f.Name)
                       .ToList();
            });

            _docBuilderExtensions = extensions;

            _changesIndexNotifier = new DataChangesIndexNotifier(
                _listeners, typeof(IPage),
                (data, culture) =>
                {
                    var page = (IPage) data;
                    var entityToken = GetAdministratedEntityToken(page);
                    return entityToken != null ? FromPage(page, entityToken, null) : null;
                },
                data => GetDocumentId((IPage) data),
                PageShouldBeIndexed);

            _changesIndexNotifier.Start();
        }

        public string Name => typeof (IPage).FullName;

        public void Subscribe(IDocumentSourceListener sourceListener)
        {
            _listeners.Add(sourceListener);
        }

        public IEnumerable<DocumentWithContinuationToken> GetSearchDocuments(CultureInfo culture, string continuationToken = null)
        {
            ICollection<IPage> unpublishedPages;
            IDictionary<Guid, Guid> parentPageIDs;

            var (lastPageId, lastPagesPublicationScope) = ParseContinuationToken(continuationToken);

            using (var conn = new DataConnection(PublicationScope.Unpublished, culture))
            {
                unpublishedPages = conn.Get<IPage>().Evaluate();
                parentPageIDs = conn.Get<IPageStructure>().ToDictionary(ps => ps.Id, ps => ps.ParentId);
            }

            unpublishedPages = unpublishedPages
                .Where(p => p.Id.CompareTo(lastPageId) >= 0)
                .OrderBy(p => p.Id)
                .ToList();

            var publishedPages = new Dictionary<Tuple<Guid, Guid>, IPage>();
            HashSet<Guid> publishedPageIds;

            using (var conn = new DataConnection(PublicationScope.Published, culture))
            {
                publishedPages = conn.Get<IPage>().ToDictionary(page => new Tuple<Guid, Guid>(page.Id, page.VersionId));
                publishedPageIds = new HashSet<Guid>(publishedPages.Select(p => p.Key.Item1));
            }

            var unpublishedMetaData = GetAllMetaData(PublicationScope.Unpublished, culture);
            var publishedMetaData = GetAllMetaData(PublicationScope.Published, culture);


            foreach (var unpublishedPage in unpublishedPages)
            {
                Guid pageId = unpublishedPage.Id;
                var entityToken = unpublishedPage.GetDataEntityToken();

                if (pageId.CompareTo(lastPageId) > 0
                    && publishedPages.TryGetValue(new Tuple<Guid, Guid>(pageId, unpublishedPage.VersionId),
                        out IPage publishedPage)
                    && AllAncestorPagesArePublished(pageId, publishedPageIds, parentPageIDs))
                {
                    yield return new DocumentWithContinuationToken
                    {
                        Document = FromPage(publishedPage, entityToken, publishedMetaData),
                        ContinuationToken = GetContinuationToken(publishedPage)
                    };

                    if (unpublishedPage.PublicationStatus == GenericPublishProcessController.Published)
                    {
                        // If page is in "published" state, indexing only one version of it
                        continue;
                    }
                }

                if (pageId.CompareTo(lastPageId) > 0
                    || lastPagesPublicationScope == PublicationScope.Published)
                {
                    yield return new DocumentWithContinuationToken
                    {
                        Document = FromPage(unpublishedPage, entityToken, unpublishedMetaData),
                        ContinuationToken = GetContinuationToken(unpublishedPage)
                    };
                }
            }
        }

        private (Guid lastPage, PublicationScope publicationScope) ParseContinuationToken(string continuationToken)
        {
            if (continuationToken == null)
            {
                return (Guid.Empty, PublicationScope.Unpublished);
            }

            var values = continuationToken.Split(':');
            return (Guid.Parse(values[0]), (PublicationScope) Enum.Parse(typeof(PublicationScope), values[1]));
        }

        private string GetContinuationToken(IPage page) => $"{page.Id}:{page.DataSourceId.PublicationScope}";


        public IReadOnlyCollection<DocumentField> CustomFields => _customFields.Value;


        private SearchDocument FromPage(IPage page, EntityToken entityToken, Dictionary<Tuple<Guid, Guid>, List<IData>> allMetaData)
        {
            string label = page.MenuTitle;
            if (string.IsNullOrWhiteSpace(label))
            {
                label = page.Title;
            }

            bool isPublished = page.DataSourceId.PublicationScope == PublicationScope.Published;
            string documentId = GetDocumentId(page);

            var docBuilder = new SearchDocumentBuilder(_docBuilderExtensions);
            docBuilder.SetDataType(typeof(IPage));

            docBuilder.CrawlData(page);

            using (new DataConnection(page.DataSourceId.PublicationScope, page.DataSourceId.LocaleScope))
            {
                if (isPublished)
                {
                    docBuilder.Url = PageUrls.BuildUrl(page, UrlKind.Internal);
                }

                var placeholders = PageManager.GetPlaceholderContent(page.Id, page.VersionId);
                placeholders.ForEach(pl => docBuilder.CrawlData(pl, true));

                List<IData> metaData;

                if (allMetaData != null)
                {
                    allMetaData.TryGetValue(new Tuple<Guid, Guid>(page.Id, page.VersionId), out metaData);
                }
                else
                {
                    metaData = GetMetaData(page.Id, page.VersionId, page.DataSourceId.PublicationScope, page.DataSourceId.LocaleScope);
                }

                try
                {
                    metaData?.ForEach(pageMetaData => docBuilder.CrawlData(pageMetaData));
                }
                catch (Exception ex)
                {
                    Log.LogWarning(LogTitle, ex);
                }
            }

            if (!string.IsNullOrEmpty(page.UrlTitle) 
                && !UrlFormattersPluginFacade.FormatUrl(page.Title, true).Equals(page.UrlTitle, StringComparison.OrdinalIgnoreCase)
                && !UrlFormattersPluginFacade.FormatUrl(page.Title, false).Equals(page.UrlTitle, StringComparison.OrdinalIgnoreCase))
            {
                docBuilder.TextParts.Add(page.UrlTitle);
            }

            return docBuilder.BuildDocument(Name, documentId, label, null, entityToken);
        }

        private EntityToken GetAdministratedEntityToken(IPage page)
        {
            if (page.DataSourceId.PublicationScope == PublicationScope.Published)
            {
                return page.GetDataEntityToken();
            }

            using (new DataScope(PublicationScope.Unpublished, page.DataSourceId.LocaleScope))
            {
                var unpublishedPage = PageManager.GetPageById(page.Id, page.VersionId, true);
                return unpublishedPage?.GetDataEntityToken();
            }
        }

        private string GetDocumentId(IPage page)
        {
            bool isUnpublished = page.DataSourceId.PublicationScope == PublicationScope.Unpublished;

            string versionId = "";
            if (page.VersionId != Guid.Empty)
            {
                versionId = UrlUtils.CompressGuid(page.VersionId);
            }
            return $"{UrlUtils.CompressGuid(page.Id)}{versionId}" + (isUnpublished ? "u" : "");
        }

        private Dictionary<Tuple<Guid, Guid>, List<IData>> GetAllMetaData(PublicationScope publicationScope, CultureInfo culture)
        {
            var result = new Dictionary<Tuple<Guid, Guid>, List<IData>>();

            using (var conn = new DataConnection(publicationScope, culture))
            {
                conn.DisableServices();

                foreach (var metaDataType in PageMetaDataFacade.GetAllMetaDataTypes()
                    .Where(type => typeof(IPageMetaData).IsAssignableFrom(type)))
                {
                    foreach (var dataItem in DataFacade.GetData(metaDataType).OfType<IPageMetaData>())
                    {
                        var key = new Tuple<Guid, Guid>(dataItem.PageId, dataItem.VersionId);
                        var list = result.GetOrAdd(key, () => new List<IData>());
                        list.Add(dataItem);
                    }
                }
            }

            return result;
        }

        private List<IData> GetMetaData(Guid pageId, Guid versionId, PublicationScope publicationScope, CultureInfo culture)
        {
            var result = new List<IData>();

            using (var conn = new DataConnection(publicationScope, culture))
            {
                conn.DisableServices();

                foreach (var metaDataType in PageMetaDataFacade.GetAllMetaDataTypes()
                    .Where(type => typeof(IPageMetaData).IsAssignableFrom(type)))
                {
                    result.AddRange(DataFacade.GetData(metaDataType).OfType<IPageMetaData>()
                        .Where(md => md.PageId == pageId && md.VersionId == versionId));
                }
            }

            return result;
        }

        private bool AllAncestorPagesArePublished(Guid pageId, HashSet<Guid> publishedPageIds,
            IDictionary<Guid, Guid> parentPageIDs)
        {
            int depth = 100;

            while (depth > 0)
            {
                if (!parentPageIDs.TryGetValue(pageId, out Guid parentPageID))
                {
                    // The the page is unreachable from the tree, no need to index it
                    return false;
                }

                if (parentPageID == Guid.Empty)
                {
                    return true;
                }

                if (!publishedPageIds.Contains(parentPageID))
                {
                    return false;
                }

                pageId = parentPageID;
                depth--;
            }

            Log.LogError(nameof(CmsPageDocumentSource), $"There's a loop in page hierarchy. Page ID: '{pageId}'");
            return false;
        }

        private bool AllAncestorPagesArePublished(Guid pageId, CultureInfo locale)
        {
            using (var dc = new DataConnection(PublicationScope.Published, locale))
            {
                dc.DisableServices();

                int depth = 100;

                while (depth > 0)
                {
                    var parentPageId = PageManager.GetParentId(pageId);
                    if (parentPageId == Guid.Empty) return true;

                    var parentPage = PageManager.GetPageById(parentPageId, true);
                    if (parentPage == null)
                    {
                        return false;
                    }

                    pageId = parentPageId;
                    depth--;
                }
            }

            Log.LogError(nameof(CmsPageDocumentSource), $"There's a loop in page hierarchy. Page ID: '{pageId}'");
            return false;
        }

        private bool PageShouldBeIndexed(IData data)
        {
            if (!(data is IPage page))
            {
                return true;
            }

            if (data.DataSourceId.PublicationScope == PublicationScope.Published)
            {
                return AllAncestorPagesArePublished(page.Id, page.DataSourceId.LocaleScope);
            }

            // Indexing the unpublished version fo the page only if the page is not in the "published" state,
            // or the published version isn't indexed
            return page.PublicationStatus != GenericPublishProcessController.Published
                   || !AllAncestorPagesArePublished(page.Id, page.DataSourceId.LocaleScope);
        }
    }
}
