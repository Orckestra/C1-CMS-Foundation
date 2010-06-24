using System.IO;
using System.Text;
using Composite.IO;


namespace Composite.StandardPlugins.Elements.ElementProviders.WebsiteFileElementProvider
{
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
            return File.ReadAllText(this.FullPath);
        }



        public bool IsReadOnly
        {
            get 
            {
                if (isReadOnly.HasValue == false)
                {
                    isReadOnly = (File.GetAttributes(this.FullPath) & FileAttributes.ReadOnly) == FileAttributes.ReadOnly;
                }

                return isReadOnly.Value; 
            }
        }



        public void WriteAllText(string content)
        {
            // Default encode is System.IO.StreamWriter.UTF8NoBOM, which is UTF8 without encoding signature
            File.WriteAllText(this.FullPath, content, Encoding.UTF8);
        }
    }
}
