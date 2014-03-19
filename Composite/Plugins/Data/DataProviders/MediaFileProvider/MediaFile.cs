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
        private DataSourceId _dataSourceId;
        private IMediaFileData _innerFile;
        private string _keyPath;

        // Loading values of "CreationTime and LastWrite time appears to be very slow, and therefore we have a lazy initialization for them
        private bool _creationTimeInitialized = false;
        private bool _lastWriteTimeInitialized = false;

        private DateTime? _creationTime;
        private DateTime? _lastWriteTime;

        public MediaFile(IMediaFileData file, string storeId, DataSourceId dataSourceId, string filePath)
        {
            _dataSourceId = dataSourceId;
            StoreId = storeId;
            Guid fileId = file.Id;

            this.Id = fileId;
            this.FileName = file.FileName;
            this.FolderPath = file.FolderPath;
            this.Title = file.Title;
            this.Description = file.Description;
            this.MimeType = file.MimeType;
            this.Length = file.Length;
            this.IsReadOnly = false;
            this.Culture = file.CultureInfo;

            this.SystemPath = filePath;

            _innerFile = file;
        }


        public Guid Id
        {
            get; internal set;
        }

        public string KeyPath
        {
            get
            {
                if (_keyPath == null)
                {
                    _keyPath = this.GetKeyPath();
                }
                return _keyPath;
            }
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
            get
            {
                if(!_creationTimeInitialized)
                {
                    _creationTime = _innerFile.CreationTime;
                    _creationTimeInitialized = true;
                }
                return _creationTime;
            }
            set
            {
                _creationTimeInitialized = true;
                _creationTime = value;
            }
        }

        public DateTime? LastWriteTime
        {
            get
            {
                if (!_lastWriteTimeInitialized)
                {
                    _lastWriteTime = _innerFile.LastWriteTime;
                    _lastWriteTimeInitialized = true;
                }
                return _lastWriteTime;
            }
            set
            {
                _lastWriteTime = value;
                _lastWriteTimeInitialized = true;
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
