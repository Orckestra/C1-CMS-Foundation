using Composite.C1Console.Elements;

namespace Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public class MediaFileSearchToken : SearchToken
	{
        /// <exclude />
        public string[] MimeTypes { get; set; }

        /// <exclude />
        public string[] Extensions { get; set; }

        /// <exclude />
        public string Folder { get; set; }

        /// <exclude />
        public bool HideSubfolders { get; set; }
	}
}
