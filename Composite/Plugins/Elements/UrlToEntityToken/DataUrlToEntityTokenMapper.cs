using System;
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

            if (dataEntityToken == null)
            {
                return null;
            }

            var data = dataEntityToken.Data;
            if (data == null) 
            {
                return null;
            }

            if (data is IPage)
            {
                // TODO: remove page url handling logic here
                return null;
            }

            var urlData = DataUrls.TryGetPageUrlData(data.ToDataReference());
            if (urlData != null)
            {
                var url = PageUrls.BuildUrl(urlData);
                if (url != null)
                {
                    return url;
                }
            }
            return null;
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

            if (!string.IsNullOrEmpty(pageUrlData.PathInfo) || pageUrlData.QueryParameters.AllKeys.Any())
            {
                IData data;
                var dataReference = DataUrls.TryGetData(pageUrlData);
                if (dataReference != null && (data = dataReference.Data) != null)
                {
                    return data.GetDataEntityToken();
                }
            }

            IPage page = pageUrlData.GetPage();
            if (page == null) return null;

            return page.GetDataEntityToken();
        }
    }
}
