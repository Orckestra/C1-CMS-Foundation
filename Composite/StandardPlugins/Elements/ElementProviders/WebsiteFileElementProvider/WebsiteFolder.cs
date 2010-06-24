using System.IO;


namespace Composite.StandardPlugins.Elements.ElementProviders.WebsiteFileElementProvider
{
	public sealed class WebsiteFolder : WebsiteEntity
	{
        private string _folderName = null;


        public WebsiteFolder(string fullPath)
            : base(fullPath, true)
        {
        }


        public string FolderName
        {
            get
            {
                if (_folderName == null)
                {
                    _folderName = Path.GetFileName(this.FullPath);
                }

                return _folderName;
            }
        }
	}
}
