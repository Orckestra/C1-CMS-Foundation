using Composite.C1Console.Elements;

namespace Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public class MediaFileSearchToken : SearchToken
	{
        public string[] MimeTypes { get; set; }
        public string[] Extensions { get; set; }
        public string Folder { get; set; }
        public bool HideSubfolders { get; set; }
	}
}
