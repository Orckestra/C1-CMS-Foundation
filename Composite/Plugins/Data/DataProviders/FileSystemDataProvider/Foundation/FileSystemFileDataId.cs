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
        private string _fullPath;


        /// <exclude />
        public FileSystemFileDataId() {}


        internal FileSystemFileDataId(string fullPath)
        {
            _fullPath = fullPath;
        }


        /// <exclude />
        public string FullPath
        {
            get 
            {
                if (string.IsNullOrEmpty(_fullPath)) throw new InvalidOperationException("RelativePath has not been initialized or has an invalid value");
                return _fullPath; 
            }
            set { _fullPath = value; }
        }


        /// <exclude />
        public override int GetHashCode() => _fullPath.GetHashCode();


        /// <exclude />
        public override bool Equals(object obj) => obj is FileSystemFileDataId dataId && dataId.FullPath == _fullPath;
    }
}