

namespace Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider
{
	internal sealed class WebsiteFolder : WebsiteEntity
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
                    _folderName = System.IO.Path.GetFileName(this.FullPath);
                }

                return _folderName;
            }
        }
	}
}
