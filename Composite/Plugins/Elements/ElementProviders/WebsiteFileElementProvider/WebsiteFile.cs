using System.IO;
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
                    _filename = Path.GetFileName(this.FullPath);
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
                    _mimeTypeInfo = MimeTypeInfo.GetCanonicalFromExtension(Path.GetExtension(this.FullPath));
                }

                return _mimeTypeInfo;
            }
        }



        public string ReadAllText()
        {
            return C1File.ReadAllText(this.FullPath);
        }



        public bool IsReadOnly
        {
            get 
            {
                if (isReadOnly.HasValue == false)
                {
                    isReadOnly = (C1File.GetAttributes(this.FullPath) & FileAttributes.ReadOnly) == FileAttributes.ReadOnly;
                }

                return isReadOnly.Value; 
            }
        }



        public void WriteAllText(string content)
        {
            // Default encode is Composite.Core.IO.StreamWriter.UTF8NoBOM, which is UTF8 without encoding signature
            C1File.WriteAllText(this.FullPath, content, Encoding.UTF8);
        }
    }
}
