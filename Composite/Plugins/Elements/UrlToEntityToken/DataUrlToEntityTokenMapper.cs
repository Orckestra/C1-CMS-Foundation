using System.Linq;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.Core.Extensions;
using Composite.Core.Routing;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Plugins.Elements.UrlToEntityToken
{
    internal class DataUrlToEntityTokenMapper : IUrlToEntityTokenMapper
    {
        public string TryGetUrl(EntityToken entityToken)
        {
            var dataEntityToken = entityToken as DataEntityToken;

            var data = dataEntityToken?.Data;
            if (data == null) 
            {
                return null;
            }


            PageUrlData pageUrlData;

            var page = data as IPage;
            if (page != null)
            {
                pageUrlData = new PageUrlData(page);
            }
            else
            {
                pageUrlData = DataUrls.TryGetPageUrlData(data.ToDataReference());
            }

            return pageUrlData != null ? GetPagePreviewUrl(pageUrlData) : null;
        }


        public BrowserViewSettings TryGetBrowserViewSettings(EntityToken entityToken, bool showPublishedView)
        {
            var dataEntityToken = entityToken as DataEntityToken;
            if (dataEntityToken == null)
            {
                return null;
            }

            if (showPublishedView)
            {
                using (new DataScope(PublicationScope.Published))
                {
                    if (dataEntityToken.DataSourceId.PublicationScope == PublicationScope.Unpublished
                    && DataFacade.GetSupportedDataScopes(dataEntityToken.InterfaceType)
                        .Contains(DataScopeIdentifier.Public))
                    {
                        var data = dataEntityToken.Data;
                        if (data != null)
                        {
                            var key = data.GetUniqueKey();
                            var publicData = DataFacade.TryGetDataByUniqueKey(dataEntityToken.InterfaceType, key);
                            if (publicData != null)
                            {
                                entityToken = publicData.GetDataEntityToken();
                            }
                            else
                            {
                                return null;
                            }
                        }
                    }
                }

            }

            string url = TryGetUrl(entityToken);
            return url == null ? null : new BrowserViewSettings { Url = url, ToolingOn = true };
        }

        private static string GetPagePreviewUrl(PageUrlData pageUrlData)
        {
            var urlSpace = new UrlSpace {ForceRelativeUrls = true};

            return PageUrls.BuildUrl(pageUrlData, UrlKind.Public, urlSpace)
                      ?? PageUrls.BuildUrl(pageUrlData, UrlKind.Renderer, urlSpace);
        }

        public EntityToken TryGetEntityToken(string url)
        {
            UrlKind urlKind;

            PageUrlData pageUrlData = PageUrls.ParseUrl(url, out urlKind);
            if (pageUrlData == null) return null;

            if (pageUrlData.PublicationScope == PublicationScope.Published)
            {
                pageUrlData.PublicationScope = PublicationScope.Unpublished;
            }

            if (!string.IsNullOrEmpty(pageUrlData.PathInfo) || pageUrlData.HasQueryParameters)
            {
                IData data;
                var dataReference = DataUrls.TryGetData(pageUrlData);
                if (dataReference != null && (data = dataReference.Data) != null)
                {
                    return data.GetDataEntityToken();
                }
            }

            IPage page = pageUrlData.GetPage();

            return page?.GetDataEntityToken();
        }
    }
}
