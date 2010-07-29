using System;
using System.Globalization;
using Composite.Collections.Generic;
using Composite.Data;
using Composite.Data.Types;
using Composite.WebClient;

namespace Composite.Renderings.Page
{
    internal class PageUrlBuilder
    {
        public Hashtable<Guid, string> FolderPaths = new Hashtable<Guid, string>();

        /// <summary>
        /// To be used for recursive building of page url-s.
        /// </summary>
        /// <param name="page"></param>
        /// <param name="dataScopeIdentifier"></param>
        /// <param name="cultureInfo"></param>
        /// <param name="parentPageId"></param>
        /// <param name="lookupUrl"></param>
        /// <param name="url"></param>
        /// <returns></returns>
        public void BuildUrlInternal(IPage page, DataScopeIdentifier dataScopeIdentifier, CultureInfo cultureInfo, Guid parentPageId, out string url, out string lookupUrl)
        {
            Verify.ArgumentNotNull(page, "page");
            Verify.ArgumentNotNull(dataScopeIdentifier, "dataScopeIdentifier");
            Verify.ArgumentNotNull(cultureInfo, "cultureInfo");

            string argsAppend = string.Empty;

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
            string urlMappingName = DataLocalizationFacade.GetUrlMappingName(LocalizationScopeManager.CurrentLocalizationScope);
            if (urlMappingName != "")
            {
                baseUrl = string.Format("{0}/{1}{2}", UrlUtils.PublicRootPath, urlMappingName, folderPath);
            }
            else
            {
                baseUrl = UrlUtils.PublicRootPath + folderPath;
            }

            lookupUrl = string.Format("{0}.aspx{1}", baseUrl, argsAppend);


            url = lookupUrl;
            if (dataScopeIdentifier.Name != DataScopeIdentifier.GetDefault().Name)
            {
                url += "?dataScope=" + dataScopeIdentifier.Name;
            }
        }
    }
}
