using Composite.Data;
using Composite.Data.Types;
using Composite.Data.Streams;
using Composite.Data.Plugins.DataProvider.Streams;


namespace Composite.Plugins.Data.DataProviders.FileSystemDataProvider.Foundation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [FileStreamManager(typeof(FileSystemFileStreamManager))]
    public abstract class FileSystemFile : FileSystemFileBase, IFile
    {
        private DataSourceId _dataSourceId;

        public FileSystemFile()
        {
        }


        public DataSourceId DataSourceId
        {
            get { return _dataSourceId; }
            set { _dataSourceId = value; }
        }

        internal void SetDataSourceId(DataSourceId dataSourceId)
        {
            _dataSourceId = dataSourceId;
        }


        internal string Path 
        {
            get
            {
                return System.IO.Path.Combine(this.FolderPath, this.FileName);
            }
        }


        public string FolderPath { get; set; }


        public string FileName { get; set; }
    }
}