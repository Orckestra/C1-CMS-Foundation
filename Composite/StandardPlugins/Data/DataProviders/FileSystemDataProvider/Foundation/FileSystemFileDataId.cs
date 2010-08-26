using System;
using Composite.Data;


namespace Composite.Plugins.Data.DataProviders.FileSystemDataProvider.Foundation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class FileSystemFileDataId : IDataId
    {
        private string _fullPath = null;


        public FileSystemFileDataId() {}


        internal FileSystemFileDataId(string fullPath)
        {
            _fullPath = fullPath;
        }


        public string FullPath
        {
            get 
            {
                if (string.IsNullOrEmpty(_fullPath) == true) throw new InvalidOperationException("RelativePath has not been initialized or has an invalid value");
                return _fullPath; 
            }
            set { _fullPath = value; }
        }
    }
}