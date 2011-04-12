using System;
using System.Globalization;
using Composite.Core.Collections.Generic;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Core.WebClient.Renderings.Page
{
    internal class PageUrlBuilder
    {
        public Hashtable<Guid, string> FolderPaths = new Hashtable<Guid, string>();

        /// <summary>
        /// To be used for recursive building of page url-s.
        /// </summary>
        /// <param name="page"></param>
        /// <param name="parentPageId"></param>
        /// <param name="lookupUrl"></param>
        /// <param name="url"></param>
        /// <returns></returns>
        public void BuildUrlInternal(IPage page, Guid parentPageId, out string url, out string lookupUrl)
        {
            Verify.ArgumentNotNull(page, "page");

            DataScopeIdentifier dataScopeIdentifier = page.DataSourceId.DataScopeIdentifier;
            CultureInfo cultureInfo = page.DataSourceId.LocaleScope;

            string parentPath;
            if (parentPageId == Guid.Empty)
            {
                parentPath = string.Empty;
            }
            else
            {
                Verify.That(FolderPaths.ContainsKey(parentPageId), "Method BuildUrlInternal() should be called for parent page before running for childildren, so 'urlBuildingCache' parameter will contains parent pages data.");
                parentPath = FolderPaths[parentPageId];
            }


            string folderPath = string.Format("{0}/{1}", parentPath, page.UrlTitle);

            FolderPaths.Add(page.Id, folderPath);

            string baseUrl;
            string urlMappingName = DataLocalizationFacade.GetUrlMappingName(cultureInfo);
            if (urlMappingName != "")
            {
                baseUrl = string.Format("{0}/{1}{2}", UrlUtils.PublicRootPath, urlMappingName, folderPath);
            }
            else
            {
                baseUrl = UrlUtils.PublicRootPath + folderPath;
            }

            lookupUrl = baseUrl + ".aspx"; 


            url = lookupUrl;
            if (dataScopeIdentifier.Name != DataScopeIdentifier.GetDefault().Name)
            {
                url += "?dataScope=" + dataScopeIdentifier.Name;
            }
        }
    }
}
