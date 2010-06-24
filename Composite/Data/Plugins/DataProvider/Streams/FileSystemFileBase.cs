using System.IO;

using Composite.Data.Streams;


namespace Composite.Data.Plugins.DataProvider.Streams
{
    public class FileSystemFileBase
    {
        private CachedMemoryStream _currentWriteStream;
        private string _systemPath;

        public CachedMemoryStream CurrentWriteStream
        {
            get { return _currentWriteStream; }
            set { _currentWriteStream = value; }
        }


        public virtual string SystemPath
        {
            get { return _systemPath; }
            set { _systemPath = value; }
        }
    }
}
