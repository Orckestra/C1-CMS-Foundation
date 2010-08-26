using System;
using Composite.Data.Types;
using Composite.Data;


namespace Composite.Plugins.Data.DataProviders.MediaFileProvider
{
    internal sealed class MediaFileFolder : IMediaFileFolder
    {
        private readonly DataSourceId _dataSourceId;

        public MediaFileFolder(IMediaFolderData folder, string storeId, DataSourceId dataSourceId)
        {
            _dataSourceId = dataSourceId;

            Id = folder.Id;
            Description = folder.Description;
            Title = folder.Title;
            StoreId = storeId;
            Path = folder.Path;
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
            get;
            set;
        }

        public string Path
        {
            get;
            set;
        }

        public string Title
        {
            get;
            set;
        }

        public string Description
        {
            get;
            set;
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
