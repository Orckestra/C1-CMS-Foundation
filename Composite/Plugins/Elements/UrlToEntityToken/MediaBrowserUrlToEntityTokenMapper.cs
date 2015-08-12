using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.Core.WebClient;
using Composite.Data;
using Composite.Data.Types;
using Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider;

namespace Composite.Plugins.Elements.UrlToEntityToken
{
    internal class MediaBrowserUrlToEntityTokenMapper : IUrlToEntityTokenMapper
    {
        private readonly string _mediaBrowserUrl = UrlUtils.Combine(UrlUtils.AdminRootPath, "/content/views/mediabrowser/mediabrowser.aspx");

        public string TryGetUrl(EntityToken entityToken)
        {
            var rootEntityToken = entityToken as MediaRootFolderProviderEntityToken;
            if (rootEntityToken != null)
            {
                return _mediaBrowserUrl + "?store=" + rootEntityToken.Id;
            }

            var dataEntityToken = entityToken as DataEntityToken;
            if (dataEntityToken == null)
            {
                return null;
            }

            if (dataEntityToken.InterfaceType == typeof (IMediaFileFolder))
            {
                var folder = (IMediaFileFolder) dataEntityToken.Data;
                return _mediaBrowserUrl + "?folder=" + folder.KeyPath;
            }

            if (dataEntityToken.InterfaceType == typeof (IMediaFile))
            {
                var file = (IMediaFile)dataEntityToken.Data;
                return _mediaBrowserUrl + "?file=" + file.KeyPath;
            }

            return null;
        }

        public EntityToken TryGetEntityToken(string url)
        {
            return null;
        }
    }
}
