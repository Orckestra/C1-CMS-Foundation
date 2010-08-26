namespace Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public abstract class WebsiteEntity
	{
        public WebsiteEntity(string fullPath, bool isFolder)
        {
            this.FullPath = fullPath;
            this.IsFile = isFolder == false;
            this.IsFolder = isFolder;
        }

        public bool IsFile
        {
            get;
            private set;
        }

        public bool IsFolder
        {
            get;
            private set;
        }

        public string FullPath
        {
            get;
            private set;
        }
	}
}
