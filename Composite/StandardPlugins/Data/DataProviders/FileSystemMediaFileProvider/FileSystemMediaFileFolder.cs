using System;
using Composite.Data.Types;
using Composite.Data;

namespace Composite.Plugins.Data.DataProviders.FileSystemMediaFileProvider
{
	internal sealed class FileSystemMediaFileFolder : IMediaFileFolder
	{
        private string _path;
        private string _storeId;
        private readonly DataSourceId _dataSourceId;

        public FileSystemMediaFileFolder(string path, string storeId, DataSourceId dataSourceId)
        {
            Id = Guid.NewGuid();
            _path = path;
            _storeId = storeId;
            _dataSourceId = dataSourceId;
            IsReadOnly = false;
        }

	    public Guid Id
	    {
	        get; private set;
        }

        public string KeyPath
        {
            get { return this.GetKeyPath(); }
        }


        public string CompositePath
        {
            get { return this.GetCompositePath(); }
            set { throw new NotImplementedException(); }
        }


        public string StoreId
        {
            get
            {
                return _storeId;
            }
            set
            {
                _storeId = value; ;
            }
        }

        public string Path
        {
            get
            {
                return _path;
            }
            set
            {
                _path = value;
            }
        }

        public string Title
        {
            get
            {
                return "";
            }
            set
            {
                ;
            }
        }

        public string Description
        {
            get
            {
                return "";
            }
            set
            {
                ;
            }
        }

        public bool IsReadOnly
        {
            get;
            set;
        }


        public DataSourceId DataSourceId
        {
            get { return _dataSourceId; }
        }
    }
}
