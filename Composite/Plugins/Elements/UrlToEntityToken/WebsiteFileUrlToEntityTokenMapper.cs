using System.IO;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.Core;
using Composite.Core.IO;
using Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider;

namespace Composite.Plugins.Elements.UrlToEntityToken
{
    internal class WebsiteFileUrlToEntityTokenMapper : IUrlToEntityTokenMapper
    {
        public string TryGetUrl(EntityToken entityToken) => null;

        public BrowserViewSettings TryGetBrowserViewSettings(EntityToken entityToken, bool showPublishedView)
        {
            if (!(entityToken is WebsiteFileElementProviderEntityToken fileEntityToken))
            {
                return null;
            }

            var filePath = fileEntityToken.RootPath +  fileEntityToken.Id;
            if (!File.Exists(filePath) || !UserHasRightToDownload(entityToken)) return null;

            var fileInfo = new FileInfo(filePath);

            if(!FilePreviewable(fileInfo)) 
            {
                return null;
            }

            var downloadLink = DownloadFileActionExecutor.GetDownloadLink(fileEntityToken);
            var urlBuilder = new UrlBuilder(downloadLink)
            {
                ["preview"] = "true"
            };

            return new BrowserViewSettings { Url = urlBuilder, ToolingOn = false };
        }

        private bool UserHasRightToDownload(EntityToken file)
        {
            var userToken = UserValidationFacade.GetUserToken();
            var userPermissionDefinitions = PermissionTypeFacade.GetUserPermissionDefinitions(userToken.Username);
            var userGroupPermissionDefinitions = PermissionTypeFacade.GetUserGroupPermissionDefinitions(userToken.Username);

            var requiredPermissions = DownloadFileActionToken.RequiredPermissionTypes;
            return SecurityResolver.Resolve(userToken, requiredPermissions, file, userPermissionDefinitions, userGroupPermissionDefinitions)
                   == SecurityResult.Allowed;
        }

        private bool FilePreviewable(FileInfo fileInfo)
        {
            if (string.IsNullOrEmpty(fileInfo.Extension)) return false;

            string mimeType = MimeTypeInfo.GetCanonicalFromExtension(fileInfo.Extension);
            if (string.IsNullOrEmpty(mimeType)) return false;

            return MimeTypeInfo.IsBrowserPreviewableFile(mimeType)
                   || (MimeTypeInfo.IsTextFile(mimeType) && fileInfo.Length < 1 << 20 /* 1 MB */);
        }

        public EntityToken TryGetEntityToken(string url) => null;
    }
}
