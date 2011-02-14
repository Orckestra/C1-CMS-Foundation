namespace Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public abstract class WebsiteEntity
	{
        /// <exclude />
        public WebsiteEntity(string fullPath, bool isFolder)
        {
            this.FullPath = fullPath;
            this.IsFile = isFolder == false;
            this.IsFolder = isFolder;
        }

        /// <exclude />
        public bool IsFile
        {
            get;
            private set;
        }

        /// <exclude />
        public bool IsFolder
        {
            get;
            private set;
        }

        /// <exclude />
        public string FullPath
        {
            get;
            private set;
        }
	}
}
