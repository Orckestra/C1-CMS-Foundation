using Composite.Core.NewIO;
using System.Text;
using Composite.Core.IO;


namespace Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class WebsiteFile : WebsiteEntity
	{
        private string _filename = null;
        private string _mimeTypeInfo = null;
        private bool? isReadOnly = null;

        public WebsiteFile(string fullPath)
            : base(fullPath, false)
        {
        }


        public string FileName
        {
            get
            {
                if (_filename == null)
                {
                    _filename = System.IO.Path.GetFileName(this.FullPath);
                }

                return _filename;
            }
        }


        public string MimeType
        {
            get 
            {
                if (_mimeTypeInfo == null)
                {
                    _mimeTypeInfo = MimeTypeInfo.GetCanonicalFromExtension(System.IO.Path.GetExtension(this.FullPath));
                }

                return _mimeTypeInfo;
            }
        }



        public string ReadAllText()
        {
            return File.ReadAllText(this.FullPath);
        }



        public bool IsReadOnly
        {
            get 
            {
                if (isReadOnly.HasValue == false)
                {
                    isReadOnly = (File.GetAttributes(this.FullPath) & System.IO.FileAttributes.ReadOnly) == System.IO.FileAttributes.ReadOnly;
                }

                return isReadOnly.Value; 
            }
        }



        public void WriteAllText(string content)
        {
            // Default encode is Composite.Core.NewIO.StreamWriter.UTF8NoBOM, which is UTF8 without encoding signature
            File.WriteAllText(this.FullPath, content, Encoding.UTF8);
        }
    }
}
