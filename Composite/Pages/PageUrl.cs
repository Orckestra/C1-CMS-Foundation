using System;
using System.Globalization;
using Composite.Data.Types;
using Composite.Renderings.Page;
using Composite.WebClient;

namespace Composite.Pages
{
    public enum PageUrlType
    {
        Undefined = 0,
        Public = 1,
        Internal = 2,
        Friendly = 3
    }

    public sealed class PageUrl
    {
        public PageUrl(PublicationScope publicationScope, CultureInfo locale, Guid pageId) :
            this(publicationScope, locale, pageId, PageUrlType.Undefined)
        {
        }

        public PageUrl(PublicationScope publicationScope, CultureInfo locale, Guid pageId, PageUrlType urlType)
        {
            Verify.ArgumentNotNull(locale, "locale");
            Verify.ArgumentCondition(pageId != Guid.Empty, "pageId", "PageId should not be an empty guid.");

            this.PublicationScope = publicationScope;
            Locale = locale;
            PageId = pageId;
            UrlType = urlType;
        }

        public PageUrlType UrlType { get; private set; }
        public PublicationScope PublicationScope { get; private set; }
        public CultureInfo Locale { get; private set; }
        public Guid PageId { get; private set; }

        public IPage GetPage()
        {
            using(Storage.Open(PublicationScope, Locale))
            {
                return Data.Types.PageManager.GetPageById(PageId);
            }
        }

    //                         public PageUrlOptions Parse(string url) { ... }
    //                         public PageUrlOptions Parse(string url, out string pathInfo, out NameValueCollection queryParameters) { ... }

        public UrlBuilder Build()
        {
            Verify.That(UrlType != PageUrlType.Undefined, "Url type is undefined");

            return Build(UrlType);
        }

        public UrlBuilder Build(PageUrlType urlType)
        {
            Verify.ArgumentCondition(urlType != PageUrlType.Undefined, "urlType", "Url type is undefined");

            string legasyScopeName = GetLegasyPublicationScopeIdentifier(PublicationScope);

            if (urlType == PageUrlType.Public)
            {
                var lookupTable = PageStructureInfo.GetIdToUrlLookup(legasyScopeName, Locale);

                if (!lookupTable.ContainsKey(PageId))
                {
                    return null;
                }

                var publicUrl = new UrlBuilder(lookupTable[PageId]);
                if (PublicationScope != PublicationScope.Public)
                {
                    publicUrl["dataScope"] = GetLegasyPublicationScopeIdentifier(PublicationScope);
                }

                return publicUrl;
            }

            if (urlType == PageUrlType.Internal)
            {
                string basePath = UrlUtils.ResolvePublicUrl("Renderers/Page.aspx");
                UrlBuilder result = new UrlBuilder(basePath);

                result["pageId"] = PageId.ToString();
                result["cultureInfo"] = Locale.ToString();
                result["dataScope"] = GetLegasyPublicationScopeIdentifier(PublicationScope);

                return result;
            }

            throw new NotImplementedException("Only 'Public' and 'Internal' url types are supported.");
        }

        private static string GetLegasyPublicationScopeIdentifier(PublicationScope publicationScope)
        {
            return publicationScope == PublicationScope.Public ? "public" : "administrated";
        }
    }
}
