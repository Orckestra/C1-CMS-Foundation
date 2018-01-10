using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.Core;
using Composite.Core.IO;
using Composite.Core.Routing;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Plugins.Elements.UrlToEntityToken
{
    internal class MediaUrlToEntityTokenMapper : IUrlToEntityTokenMapper
    {
        public string TryGetUrl(EntityToken entityToken) => null;

        public BrowserViewSettings TryGetBrowserViewSettings(EntityToken entityToken, bool showPublishedView)
        {
            if (!(entityToken is DataEntityToken dataEntityToken) || dataEntityToken.InterfaceType != typeof(IMediaFile))
            {
                return null;
            }

            var file = (IMediaFile) dataEntityToken.Data;

            if(file == null || !MimeTypeInfo.IsBrowserPreviewableFile(file.MimeType)) {
                return null;
            }

            string url = MediaUrls.BuildUrl(file);
            var urlBuilder = new UrlBuilder(url)
            {
                ["download"] = "false"
            };

            return new BrowserViewSettings { Url = urlBuilder.ToString(), ToolingOn = false };
        }

        public EntityToken TryGetEntityToken(string url) => null;
    }
}
