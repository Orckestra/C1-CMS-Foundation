using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.IO;
using System.Linq;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Routing;
using Composite.Data;
using Composite.Data.Plugins.DataProvider;
using Composite.Data.Plugins.DataProvider.Streams;
using Composite.Data.Types;
using Composite.Plugins.Routing.MediaUrlProviders;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Plugins.Data.DataProviders.MediaFileProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [ConfigurationElementType(typeof(MediaFileDataProviderData))]
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public sealed class MediaFileProvider : IWritableDataProvider
    {
        /// <exclude />
        public enum MediaElementType
        {
            /// <exclude />
            File = 1,
            /// <exclude />
            Folder = 2,
            /// <exclude />
            Store = 3
        }

        private DataProviderContext _context;
        private IMediaFileStore _store;
        private readonly string _storeId;
        private readonly string _storeTitle;
        private readonly string _storeDescription;
        internal static string _workingDirectory; // NOTE: this field is accessed via reflection as well.


        private readonly object _syncRoot = new object();
        private IQueryable<IMediaFile> _mediaFilesCachedQuery;
        private IQueryable<IMediaFileFolder> _mediaFoldersCachedQuery;
        private readonly DefaultMediaUrlProvider _mediaUrlProvider;

        internal MediaFileProvider(string rootDirectory, string storeId, string storeDescription, string storeTitle)
        {
            _workingDirectory = PathUtil.Resolve(rootDirectory);
            if (!C1Directory.Exists(_workingDirectory))
            {
                C1Directory.CreateDirectory(_workingDirectory);
            }

            _storeId = storeId;
            _storeTitle = storeTitle;
            _storeDescription = storeDescription;

            DataEventSystemFacade.SubscribeToStoreChanged<IMediaFileData>(ClearQueryCache, false);
            DataEventSystemFacade.SubscribeToStoreChanged<IMediaFolderData>(ClearQueryCache, false);

            _mediaUrlProvider = new DefaultMediaUrlProvider(storeId);
            MediaUrls.RegisterMediaUrlProvider(storeId, _mediaUrlProvider);
        }

        private void ClearQueryCache(object sender, StoreEventArgs storeEventArgs)
        {
            lock (_syncRoot)
            {
                _mediaFilesCachedQuery = null;
                _mediaFoldersCachedQuery = null;
            }
        }


        /// <exclude />
        public DataProviderContext Context
        {
            set { _context = value; }
        }



        /// <exclude />
        public void Update(IEnumerable<IData> dataset)
        {
            if (dataset.Any(data => data == null))
            {
                throw new ArgumentException("Data in list to update must be non-null");
            }

            foreach (IData data in dataset)
            {
                MediaDataId dataId = data.DataSourceId.DataId as MediaDataId;
                if (dataId == null)
                {
                    throw new ArgumentException("Invalid IData");
                }

                if (dataId.MediaType == MediaElementType.File)
                {
                    UpdateMediaFile((IMediaFile) data);
                }
                else if (dataId.MediaType == MediaElementType.Folder)
                {
                    UpdateMediaFileFolder((IMediaFileFolder) data);
                }
                else
                {
                    throw new InvalidOperationException("Unexpected media type '{0}'".FormatWith(dataId.MediaType));
                }
            }
        }

        private void UpdateMediaFile(IMediaFile updatedFile)
        {
            Guid id = updatedFile.Id;

            IMediaFileData currentFileData = DataFacade.GetData<IMediaFileData>(x => x.Id == id).First();
            if (updatedFile.FolderPath != currentFileData.FolderPath || updatedFile.FileName != currentFileData.FileName)
            {
                ValidateMediaFileData(updatedFile);
            }
            CopyFileData(updatedFile, currentFileData);
            currentFileData.LastWriteTime = DateTime.Now;
            using (Stream stream = updatedFile.GetReadStream())
            {
                currentFileData.Length = (int)stream.Length;
            }
            TransactionFileSystemFileStreamManager.WriteFileToDisk(updatedFile);
            DataFacade.Update(currentFileData);
        }

        private void UpdateMediaFileFolder(IMediaFileFolder updatedFolder)
        {
            Guid mediaFolderId = updatedFolder.Id;
            IMediaFolderData currentFolderData = DataFacade.GetData<IMediaFolderData>(x => x.Id == mediaFolderId).First();

            if (updatedFolder.Path != currentFolderData.Path)
            {
                ValidateFolderData(updatedFolder);
            }

            string oldPath = currentFolderData.Path;
            string oldPathWithSlash = oldPath + "/";
            List<IMediaFolderData> foldersToUpdatePath =
                (from item in DataFacade.GetData<IMediaFolderData>()
                 where item.Path.StartsWith(oldPathWithSlash) && item.Id != currentFolderData.Id
                 select item).ToList();

            if (foldersToUpdatePath.Count > 0)
            {
                foreach (IMediaFolderData item in foldersToUpdatePath)
                {
                    item.Path = updatedFolder.Path + item.Path.Substring(oldPath.Length);
                }

                DataFacade.Update(foldersToUpdatePath);
            }


            List<IMediaFileData> filesToUpdatePath =
                (from item in DataFacade.GetData<IMediaFileData>()
                 where item.FolderPath == oldPath
                    || item.FolderPath.StartsWith(oldPathWithSlash)
                 select item).ToList();

            if (filesToUpdatePath.Count > 0)
            {
                foreach (IMediaFileData mediaFileData in filesToUpdatePath)
                {
                    mediaFileData.FolderPath = updatedFolder.Path + mediaFileData.FolderPath.Substring(oldPath.Length);
                }
                DataFacade.Update(filesToUpdatePath);
            }


            CopyFolderData(updatedFolder, currentFolderData);
            DataFacade.Update(currentFolderData);
        }


        /// <exclude />
        public List<T> AddNew<T>(IEnumerable<T> dataset) where T : class, IData
        {
            var result = new List<T>();

            if (dataset.Any(data => data == null))
            {
                throw new ArgumentException("Data in list to add must be non-null");
            }

            CheckInterface(typeof(T));

            foreach (IData data in dataset)
            {
                if (typeof(T) == typeof(IMediaFile))
                {
                    result.Add(AddMediaFile((IMediaFile) data) as T);
                }
                else if (typeof(T) == typeof(IMediaFileFolder))
                {
                    result.Add(AddMediaFileFolder( (IMediaFileFolder)data) as T);
                }
            }
            return result;
        }


        private IMediaFile AddMediaFile(IMediaFile mediaFile)
        {
            ValidateMediaFileData(mediaFile);

            IMediaFileData fileData = DataFacade.BuildNew<IMediaFileData>();
            fileData.Id = Guid.NewGuid();
            CopyFileData(mediaFile, fileData);

            fileData.LastWriteTime = fileData.CreationTime = DateTime.Now;

            IMediaFile internalMediaFile;

            using (Stream readStream = mediaFile.GetReadStream())
            {
                Verify.IsNotNull(readStream, "GetReadStream returned null for type '{0}'", mediaFile.GetType());
                fileData.Length = (int)readStream.Length;
            
                string internalPath = Path.Combine(_workingDirectory, fileData.Id.ToString());
                internalMediaFile = new MediaFile(fileData, Store.Id, _context.CreateDataSourceId(
                    new MediaDataId
                    {
                        MediaType = MediaElementType.File, 
                        Id = fileData.Id
                    }, 
                    typeof(IMediaFile)), internalPath);
            
                using (Stream writeStream = internalMediaFile.GetNewWriteStream())
                {
                    readStream.CopyTo(writeStream);
                }
            }
            TransactionFileSystemFileStreamManager.WriteFileToDisk(internalMediaFile);
            fileData = DataFacade.AddNew<IMediaFileData>(fileData);

            return internalMediaFile;
        }


        private MediaFileFolder AddMediaFileFolder(IMediaFileFolder mediaFolder)
        {
            ValidateFolderData(mediaFolder);

            var folderData = DataFacade.BuildNew<IMediaFolderData>();
            folderData.Id = Guid.NewGuid();
            CopyFolderData(mediaFolder, folderData);
            folderData = DataFacade.AddNew<IMediaFolderData>(folderData);

            return new MediaFileFolder(folderData, Store.Id, _context.CreateDataSourceId(
                new MediaDataId
                {
                    MediaType = MediaElementType.Folder, 
                    Id = folderData.Id
                }, 
                typeof(IMediaFileFolder)));
        }

        /// <exclude />
        public void Delete(IEnumerable<DataSourceId> dataSourceIds)
        {
            if (dataSourceIds.Any(f => f == null)) throw new ArgumentException("DataSourceIds must be non-null");

            foreach (DataSourceId dataSourceId in dataSourceIds)
            {
                MediaDataId dataId = dataSourceId.DataId as MediaDataId;
                if (dataId.MediaType == MediaElementType.Folder)
                {
                    DeleteMediaFolder(dataId.Id);
                }
                else if (dataId.MediaType == MediaElementType.File)
                {
                    DeleteMediaFile(dataId.Id);
                }
                else
                {
                    throw new InvalidOperationException("Unexpected media type '{0}'".FormatWith(dataId.MediaType));
                }
            }
        }


        private void DeleteMediaFolder(Guid mediaFolderId)
        {
            IMediaFolderData folder = DataFacade.GetData<IMediaFolderData>(x => x.Id == mediaFolderId).First();

            string folderPath = folder.Path;
            string innerElementsPathPrefix = string.Format("{0}/", folderPath);

            var files = (from item in DataFacade.GetData<IMediaFileData>()
                         where item.FolderPath.StartsWith(innerElementsPathPrefix) || item.FolderPath == folderPath
                         select item).ToList();

            DataFacade.Delete<IMediaFolderData>(x => x.Path.StartsWith(innerElementsPathPrefix));
            DataFacade.Delete(folder);

            foreach (IMediaFileData file in files)
            {
                DeleteMediaFile(file.Id);
            }
        }


        /// <exclude />
        public IEnumerable<Type> GetSupportedInterfaces()
        {
            return new [] { typeof(IMediaFile), typeof(IMediaFileFolder), typeof(IMediaFileStore) };
        }



        /// <exclude />
        public IQueryable<T> GetData<T>() where T : class, IData
        {
            CheckInterface(typeof(T));

            if (typeof(T) == typeof(IMediaFile))
            {
                return GetMediaFiles() as IQueryable<T>;
            }


            if (typeof(T) == typeof(IMediaFileFolder))
            {
                return GetMediaFileFolders() as IQueryable<T>;
            }

            // an IMediaFileStore query
            return new[] { Store as T }.AsQueryable();
        }


        private IQueryable<IMediaFile> GetMediaFiles()
        {
            IQueryable<IMediaFile> mediaFilesQuery = _mediaFilesCachedQuery;
            if (mediaFilesQuery == null)
            {
                lock (_syncRoot)
                {
                    if (_mediaFilesCachedQuery == null)
                    {
                        var fileItems = new List<IMediaFile>();

                        IQueryable<IMediaFileData> files = DataFacade.GetData<IMediaFileData>();

                        // DDZ: now the whole list of media files is loaded to memory, should be rewritten to return 
                        // a proper IQueryable, similar to our VirtualImageFileQueryable

                        var publicDataScope = DataScopeIdentifier.Public;
                        foreach (IMediaFileData file in files)
                        {
                            string internalPath = Path.Combine(_workingDirectory, file.Id.ToString());
                            fileItems.Add(new MediaFile(file, Store.Id, _context.CreateDataSourceId(
                                new MediaDataId
                                {
                                    MediaType = MediaElementType.File, Id = file.Id
                                }, 
                                typeof(IMediaFile), publicDataScope, CultureInfo.InvariantCulture), internalPath));
                        }
                        _mediaFilesCachedQuery = fileItems.AsQueryable();
                    }
                    mediaFilesQuery = _mediaFilesCachedQuery;
                }
            }
            return mediaFilesQuery;
        }

        private IQueryable<IMediaFileFolder> GetMediaFileFolders()
        {
            IQueryable<IMediaFileFolder> mediaFoldersQuery = _mediaFoldersCachedQuery;
            if (mediaFoldersQuery == null)
            {
                lock (_syncRoot)
                {
                    if (_mediaFoldersCachedQuery == null)
                    {
                        var mediaFolderItems = new List<IMediaFileFolder>();

                        IQueryable<IMediaFolderData> folders = DataFacade.GetData<IMediaFolderData>();

                        var publicDataScope = DataScopeIdentifier.Public;
                        foreach (IMediaFolderData folder in folders)
                        {
                            var dataId = new MediaDataId { MediaType = MediaElementType.Folder, Id = folder.Id };
                            var dataSourceId = _context.CreateDataSourceId(dataId, typeof(IMediaFileFolder), publicDataScope, CultureInfo.InvariantCulture);
                            mediaFolderItems.Add(new MediaFileFolder(folder, Store.Id, dataSourceId));
                        }

                        _mediaFoldersCachedQuery = mediaFolderItems.AsQueryable();
                    }
                    mediaFoldersQuery = _mediaFoldersCachedQuery;
                }
            }

            return mediaFoldersQuery;
        }

        /// <exclude />
        public T GetData<T>(IDataId dataId) where T : class, IData
        {
            if (dataId == null)
            {
                throw new ArgumentNullException("dataId");
            }
            CheckInterface(typeof(T));

            MediaDataId mediaDataId = dataId as MediaDataId;
            if (mediaDataId == null)
            {
                return null;
            }


            if (mediaDataId.MediaType == MediaElementType.Folder)
            {
                if (typeof(T) != typeof(IMediaFileFolder))
                {
                    throw new ArgumentException("The dataId specifies a IMediaFileFolder, but the generic method was invoked with different type");
                }

                IMediaFolderData folder = DataFacade.GetData<IMediaFolderData>().FirstOrDefault(x => x.Id == mediaDataId.Id);
                if (folder == null)
                {
                    return null;
                }
                return new MediaFileFolder(folder, Store.Id,
                        _context.CreateDataSourceId(new MediaDataId { MediaType = MediaElementType.Folder, Id = folder.Id }, typeof(IMediaFileFolder))) as T;
            }

            if (mediaDataId.MediaType == MediaElementType.File)
            {
                if (typeof(T) != typeof(IMediaFile))
                {
                    throw new ArgumentException("The dataId specifies a IMediaFile, but the generic method was invoked with different type");
                }

                IMediaFileData file = DataFacade.GetData<IMediaFileData>().FirstOrDefault(x => x.Id == mediaDataId.Id);
                if (file == null)
                {
                    return null;
                }

                string internalPath = Path.Combine(_workingDirectory, file.Id.ToString());
                return new MediaFile(file, Store.Id,
                       _context.CreateDataSourceId(new MediaDataId { MediaType = MediaElementType.File, Id = file.Id }, typeof(IMediaFile)), internalPath) as T;

            }
            
            return Store as T;
        }



        private IMediaFileStore Store
        {
            get
            {
                if (_store == null)
                {
                    _store = new MediaFileStore(_storeId, _storeTitle, _storeDescription, _context.CreateDataSourceId(
                        new MediaDataId { MediaType = MediaElementType.Store }, typeof(IMediaFileStore)));
                }
                return _store;
            }
        }



        private void CheckInterface(Type interfaceType)
        {
            if (!typeof(IMediaFile).IsAssignableFrom(interfaceType) &&
                !typeof(IMediaFileFolder).IsAssignableFrom(interfaceType) &&
                !typeof(IMediaFileStore).IsAssignableFrom(interfaceType))
            {
                throw new ArgumentException(string.Format("Unexpected interface '{0}' - only '{1}, {2} and {3}' are supported", interfaceType, typeof(IMediaFile), typeof(IMediaFileFolder), typeof(IMediaFileStore)));
            }
        }



        private void DeleteMediaFile(Guid id)
        {
            string fullPath = Path.Combine(_workingDirectory, id.ToString());
            if (C1File.Exists(fullPath))
            {
                C1File.Delete(fullPath);
            }

            DataFacade.Delete<IMediaFileData>(x => x.Id == id);
        }



        private bool DoesFolderExists(string path)
        {
            if (path == "/")
            {
                return true;
            }

            return GetData<IMediaFileFolder>().Any(item => item.Path == path);
        }



        private bool DoesFileExists(string path, string name)
        {
            return GetData<IMediaFile>().Any(item => item.FolderPath == path && item.FileName == name);
        }



        private void CopyFileData(IMediaFile from, IMediaFileData to)
        {
            to.CultureInfo = from.Culture;
            to.Description = from.Description;
            to.FileName = from.FileName;
            to.FolderPath = from.FolderPath;
            to.Length = from.Length;
            to.MimeType = MimeTypeInfo.GetCanonical(from.MimeType);
            to.Title = from.Title;
        }



        private void CopyFolderData(IMediaFileFolder from, IMediaFolderData to)
        {
            to.Description = from.Description;
            to.Path = from.Path;
            to.Title = from.Title;
        }



        private void ValidateMediaFileData(IMediaFile mediaFile)
        {
            if (!mediaFile.FolderPath.IsCorrectFolderName('/'))
            {
                throw new ArgumentException("Invalid folder name");
            }
            if (!DoesFolderExists(mediaFile.FolderPath))
            {
                throw new ArgumentException("Could not find any parents folders on path " + mediaFile.FolderPath);
            }
            if (DoesFileExists(mediaFile.FolderPath, mediaFile.FileName))
            {
                throw new ArgumentException("File " + mediaFile.FileName + " already exists on path " + mediaFile.FolderPath);
            }
        }



        private void ValidateFolderData(IMediaFileFolder mediaFolder)
        {
            if (!mediaFolder.Path.IsCorrectFolderName('/'))
            {
                throw new ArgumentException("Invalid folder name");
            }
            if (!DoesFolderExists(mediaFolder.GetParentFolderPath()))
            {
                throw new ArgumentException("Could not find any parents folders on path " + mediaFolder.GetParentFolderPath());
            }
            if (DoesFolderExists(mediaFolder.Path))
            {
                throw new ArgumentException("Folder already exists on path " + mediaFolder.Path);
            }
        }



        /// <summary>    
        /// </summary>
        /// <exclude />
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        public sealed class MediaDataId : IDataId
        {
            /// <exclude />
            public MediaElementType MediaType { get; set; }

            /// <exclude />
            public Guid Id { get; set; }
        }



        private sealed class MediaFileStore : IMediaFileStore
        {
            private readonly DataSourceId _dataSourceId;



            public MediaFileStore(string id, string title, string description, DataSourceId dataSourceId)
            {
                Id = id;
                Title = title;
                Description = description;
                _dataSourceId = dataSourceId;
            }



            public string Id { get; set; }

            public string Title { get; set; }

            public string Description { get; set; }


            public bool IsReadOnly
            {
                get { return false; }
            }



            public bool ProvidesMetadata
            {
                get { return true; }
            }



            public DataSourceId DataSourceId
            {
                get { return _dataSourceId; }
            }
        }
    }



    [Assembler(typeof(MediaFileProviderAssembler))]
    internal sealed class MediaFileDataProviderData : DataProviderData
    {
        private const string _rootDirectoryProperty = "rootDirectory";
        [ConfigurationProperty(_rootDirectoryProperty, IsRequired = true)]
        public string RootDirectory
        {
            get { return (string)base[_rootDirectoryProperty]; }
            set { base[_rootDirectoryProperty] = value; }
        }



        private const string _dataProviderProperty = "dataProvider";
        [ConfigurationProperty(_dataProviderProperty, IsRequired = false, DefaultValue = "")]
        public string DataProvider
        {
            get { return (string)base[_dataProviderProperty]; }
            set { base[_dataProviderProperty] = value; }
        }



        private const string _storeIdProperty = "storeId";
        [ConfigurationProperty(_storeIdProperty, IsRequired = true)]
        public string StoreId
        {
            get { return (string)base[_storeIdProperty]; }
            set { base[_storeIdProperty] = value; }
        }



        private const string _storeDescriptionProperty = "storeDescription";
        [ConfigurationProperty(_storeDescriptionProperty, IsRequired = true)]
        public string StoreDescription
        {
            get { return (string)base[_storeDescriptionProperty]; }
            set { base[_storeDescriptionProperty] = value; }
        }



        private const string _storeTitleProperty = "storeTitle";
        [ConfigurationProperty(_storeTitleProperty, IsRequired = true)]
        public string StoreTitle
        {
            get { return (string)base[_storeTitleProperty]; }
            set { base[_storeTitleProperty] = value; }
        }
    }



    internal sealed class MediaFileProviderAssembler : IAssembler<IDataProvider, DataProviderData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IDataProvider Assemble(IBuilderContext context, DataProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            var configuration = objectConfiguration as MediaFileDataProviderData;

            if (configuration == null) throw new ArgumentException("Expected configuration to be of type MediaFileDataProviderData", "objectConfiguration");

            return new MediaFileProvider(configuration.RootDirectory, configuration.StoreId, configuration.StoreDescription, configuration.StoreTitle);
        }
    }
}
