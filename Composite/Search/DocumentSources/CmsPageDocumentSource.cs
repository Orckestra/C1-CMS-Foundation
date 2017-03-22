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
        private readonly Lazy<ICollection<DocumentField>> _customFields;
        private readonly IEnumerable<ISearchDocumentBuilderExtension> _docBuilderExtensions;

        public CmsPageDocumentSource(IEnumerable<ISearchDocumentBuilderExtension> extensions)
        {
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

            _docBuilderExtensions = extensions;

            _changesIndexNotifier = new DataChangesIndexNotifier(
                _listeners, typeof(IPage),
                data =>
                {
                    var page = (IPage) data;
                    var entityToken = GetAdministratedEntityToken(page);
                    return entityToken != null ? FromPage(page, entityToken, null) : null;
                },
                data => GetDocumentId((IPage) data));

            _changesIndexNotifier.Start();
        }

        public string Name => typeof (IPage).FullName;

        public void Subscribe(IDocumentSourceListener sourceListener)
        {
            _listeners.Add(sourceListener);
        }

        public IEnumerable<SearchDocument> GetAllSearchDocuments(CultureInfo culture)
        {
            ICollection<IPage> unpublishedPages;

            using (var conn = new DataConnection(PublicationScope.Unpublished, culture))
            {
                unpublishedPages = conn.Get<IPage>().Evaluate();
            }

            var publishedPages = new Dictionary<Tuple<Guid, Guid>, IPage>();
            using (var conn = new DataConnection(PublicationScope.Published, culture))
            {
                publishedPages = conn.Get<IPage>().ToDictionary(page => new Tuple<Guid, Guid>(page.Id, page.VersionId));
            }

            var unpublishedMetaData = GetAllMetaData(PublicationScope.Unpublished, culture);
            var publishedMetaData = GetAllMetaData(PublicationScope.Published, culture);


            foreach (var unpublishedPage in unpublishedPages)
            {
                var entityToken = unpublishedPage.GetDataEntityToken();

                IPage publishedPage;
                if (publishedPages.TryGetValue(new Tuple<Guid, Guid>(unpublishedPage.Id, unpublishedPage.VersionId), 
                        out publishedPage))
                {
                    yield return FromPage(publishedPage, entityToken, publishedMetaData);

                    if (unpublishedPage.PublicationStatus == GenericPublishProcessController.Published)
                    {
                        // If page is in "published" state, indexing only one version of it
                        continue;
                    }
                }

                yield return FromPage(unpublishedPage, entityToken, unpublishedMetaData);
            }
        }

        public ICollection<DocumentField> CustomFields => _customFields.Value;

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

            docBuilder.CrawlData(page);

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
    }
}
