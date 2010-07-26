using Composite.Elements;

namespace Composite.StandardPlugins.Elements.ElementProviders.MediaFileProviderElementProvider
{
	public class MediaFileSearchToken : SearchToken
	{
        public string[] MimeTypes { get; set; }
        public string[] Extensions { get; set; }
        public string Folder { get; set; }
        public bool HideSubfolders { get; set; }
	}
}
