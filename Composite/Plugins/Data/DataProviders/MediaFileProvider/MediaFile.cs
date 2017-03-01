using System;
using Composite.Data.Types;
using Composite.Data;
using Composite.Data.Plugins.DataProvider.Streams;
using Composite.Data.Streams;


namespace Composite.Plugins.Data.DataProviders.MediaFileProvider
{
    [FileStreamManager(typeof(FileSystemFileStreamManager))]
    internal class MediaFile : FileSystemFileBase, IMediaFile 
	{
        private readonly DataSourceId _dataSourceId;
        private string _keyPath;

        public MediaFile(IMediaFileData file, string storeId, DataSourceId dataSourceId, string filePath)
        {
            _dataSourceId = dataSourceId;
            StoreId = storeId;

            this.Id = file.Id;
            this.FileName = file.FileName;
            this.FolderPath = file.FolderPath;
            this.Title = file.Title;
            this.Description = file.Description;
            this.Tags = file.Tags;
            this.MimeType = file.MimeType;
            this.Length = file.Length;
            this.IsReadOnly = false;
            this.Culture = file.CultureInfo;
            this.CreationTime = file.CreationTime;
            this.LastWriteTime = file.LastWriteTime;

            this.SystemPath = filePath;
        }


        public Guid Id
        {
            get; internal set;
        }

        public string KeyPath
        {
            get { return _keyPath ?? (_keyPath = this.GetKeyPath()); }
        }

        public string CompositePath
        {
            get { return this.GetCompositePath(); }
            set { /* Do nothing. Used for deserialization purpouses */ }
        }

        public string StoreId
        {
            get;
            set;
        }

        public string FolderPath
        {
            get;
            set;
        }

        public string FileName
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

        public string Tags { get; set; }

        public string Culture
        {
            get;
            set;
        }

        public string MimeType
        {
            get;
            set;
        }

        public int? Length
        {
            get;
            set;
        }

        public DateTime? CreationTime
        {
            get;
            set;
        }

        public DateTime? LastWriteTime
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
