using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.IO;
using System.Linq;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Data;
using Composite.Data.Plugins.DataProvider;
using Composite.Data.Plugins.DataProvider.Streams;
using Composite.Data.Types;
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
        private DataProviderContext _context;
        private IMediaFileStore _store;
        private string _storeId;
        private string _storeTitle;
        private string _storeDescription;
        internal static string _workingDirectory;
        private static readonly int _storeType = 3;
        private static readonly int _folderType = 2;
        private static readonly int _fileType = 1;

        private readonly object _syncRoot = new object();
        private IQueryable<IMediaFile> _mediaFilesCachedQuery = null;
        private IQueryable<IMediaFileFolder> _mediaFoldersCachedQuery = null;

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

            DataEventSystemFacade.SubscribeToDataAfterAdd<IMediaFileData>(ClearQueryCache, false);
            DataEventSystemFacade.SubscribeToDataAfterUpdate<IMediaFileData>(ClearQueryCache, false);
            DataEventSystemFacade.SubscribeToDataDeleted<IMediaFileData>(ClearQueryCache, false);

            DataEventSystemFacade.SubscribeToDataAfterAdd<IMediaFolderData>(ClearQueryCache, false);
            DataEventSystemFacade.SubscribeToDataAfterUpdate<IMediaFolderData>(ClearQueryCache, false);
            DataEventSystemFacade.SubscribeToDataDeleted<IMediaFolderData>(ClearQueryCache, false);
        }

        private void ClearQueryCache(object sender, DataEventArgs dataeventargs)
        {
            lock (_syncRoot)
            {
                _mediaFilesCachedQuery = null;
                _mediaFoldersCachedQuery = null;
            }
        }


        public DataProviderContext Context
        {
            set { _context = value; }
        }



        public void Update(IEnumerable<IData> datas)
        {
            foreach (IData data in datas)
            {
                if (data == null)
                {
                    throw new ArgumentException("Data in list to update must be non-null");
                }
            }

            foreach (IData data in datas)
            {
                MediaDataId dataId = data.DataSourceId.DataId as MediaDataId;
                if (dataId == null)
                {
                    throw new ArgumentException("Invalid IData");
                }

                if (dataId.MediaType == _fileType)
                {
                    IMediaFile updatedFile = (IMediaFile)data;
                    IMediaFileData currentFileData = DataFacade.GetData<IMediaFileData>(x => x.Id == dataId.Id).First();
                    if ((updatedFile.FolderPath != currentFileData.FolderPath) || (updatedFile.FileName != currentFileData.FileName))
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
                else
                {
                    IMediaFileFolder updatedFolder = (IMediaFileFolder)data;
                    IMediaFolderData currentFolderData = DataFacade.GetData<IMediaFolderData>(x => x.Id == dataId.Id).First();

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

                        DataFacade.Update(foldersToUpdatePath.Cast<IData>());
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
                        DataFacade.Update(filesToUpdatePath.Cast<IData>());
                    }


                    CopyFolderData(updatedFolder, currentFolderData);
                    DataFacade.Update(currentFolderData);
                }
            }
        }



        public List<T> AddNew<T>(IEnumerable<T> datas) where T : class, IData
        {
            List<T> result = new List<T>();

            foreach (IData data in datas)
            {
                if (data == null)
                {
                    throw new ArgumentException("Data in list to add must be non-null");
                }
                CheckInterface(typeof(T));
            }

            foreach (IData data in datas)
            {

                if (typeof(T) == typeof(IMediaFile))
                {
                    IMediaFile mediaFile = (IMediaFile)data;
                    ValidateMediaFileData(mediaFile);

                    IMediaFileData fileData = DataFacade.BuildNew<IMediaFileData>();
                    fileData.Id = Guid.NewGuid();
                    CopyFileData(mediaFile, fileData);
                    fileData.LastWriteTime = DateTime.Now;
                    fileData.CreationTime = DateTime.Now;
                    using (Stream stream = mediaFile.GetReadStream())
                    {
                        if (stream == null) throw new InvalidOperationException(string.Format("GetReadStream returned null for type '{0}'", mediaFile.GetType()));
                        fileData.Length = (int)stream.Length;
                    }

                    string internalPath = Path.Combine(_workingDirectory, fileData.Id.ToString());
                    IMediaFile internalMediaFile = new MediaFile(fileData, Store.Id, _context.CreateDataSourceId(new MediaDataId() { MediaType = _fileType, Id = fileData.Id }, typeof(IMediaFile)), internalPath);
                    using (Stream readStream = mediaFile.GetReadStream())
                    {
                        using (Stream writeStream = internalMediaFile.GetNewWriteStream())
                        {
                            readStream.CopyTo(writeStream);
                        }
                    }
                    TransactionFileSystemFileStreamManager.WriteFileToDisk(internalMediaFile);
                    fileData = DataFacade.AddNew<IMediaFileData>(fileData);
                    result.Add(internalMediaFile as T);
                }
                else if (typeof(T) == typeof(IMediaFileFolder))
                {
                    IMediaFileFolder mediaFolder = (IMediaFileFolder)data;
                    ValidateFolderData(mediaFolder);
                    IMediaFolderData folderData = DataFacade.BuildNew<IMediaFolderData>();
                    folderData.Id = Guid.NewGuid();
                    CopyFolderData(mediaFolder, folderData);
                    folderData = DataFacade.AddNew<IMediaFolderData>(folderData);

                    result.Add(new MediaFileFolder(folderData, Store.Id, _context.CreateDataSourceId(new MediaDataId() { MediaType = _folderType, Id = folderData.Id }, typeof(IMediaFileFolder))) as T);
                }
            }
            return result;
        }



        public void Delete(IEnumerable<DataSourceId> dataSourceIds)
        {
            if (dataSourceIds.Any(f => f == null)) throw new ArgumentException("DataSourceIds must be non-null");

            foreach (DataSourceId dataSourceId in dataSourceIds)
            {
                MediaDataId dataId = dataSourceId.DataId as MediaDataId;
                if (dataId.MediaType == _folderType)
                {
                    IMediaFolderData folder = DataFacade.GetData<IMediaFolderData>(x => x.Id == dataId.Id).First();

                    string innerElementsPathPrefix = string.Format("{0}/", folder.Path);

                    var files = (from item in DataFacade.GetData<IMediaFileData>()
                                 where item.FolderPath.StartsWith(innerElementsPathPrefix) || item.FolderPath == folder.Path
                                 select item).ToList();

                    DataFacade.Delete<IMediaFolderData>(x => x.Path.StartsWith(innerElementsPathPrefix));
                    DataFacade.Delete(folder);

                    foreach (IMediaFileData file in files)
                    {
                        DeleteMediaFile(file.Id);
                    }
                }
                else
                {
                    DeleteMediaFile(dataId.Id);
                }
            }
        }



        public IEnumerable<Type> GetSupportedInterfaces()
        {
            return new List<Type>() { typeof(IMediaFile), typeof(IMediaFileFolder), typeof(IMediaFileStore) };
        }



        public IQueryable<T> GetData<T>() where T : class, IData
        {
            CheckInterface(typeof(T));

            if (typeof(T) == typeof(IMediaFile))
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


                            var publicDataScope = DataScopeIdentifier.Public;
                            foreach (IMediaFileData file in files)
                            {
                                string internalPath = Path.Combine(_workingDirectory, file.Id.ToString());
                                fileItems.Add(new MediaFile(file, Store.Id, _context.CreateDataSourceId(new MediaDataId { MediaType = _fileType, Id = file.Id }, typeof(IMediaFile), publicDataScope, CultureInfo.InvariantCulture), internalPath));
                            }
                            _mediaFilesCachedQuery = fileItems.AsQueryable();
                        }
                        mediaFilesQuery = _mediaFilesCachedQuery;
                    }
                }
                return mediaFilesQuery as IQueryable<T>;
            }


            if (typeof(T) == typeof(IMediaFileFolder))
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
                                var dataId = new MediaDataId { MediaType = _folderType, Id = folder.Id };
                                var dataSourceId = _context.CreateDataSourceId(dataId, typeof(IMediaFileFolder), publicDataScope, CultureInfo.InvariantCulture);
                                mediaFolderItems.Add(new MediaFileFolder(folder, Store.Id, dataSourceId));
                            }

                            _mediaFoldersCachedQuery = mediaFolderItems.AsQueryable();
                        }
                        mediaFoldersQuery = _mediaFoldersCachedQuery;
                    }
                }
                return mediaFoldersQuery as IQueryable<T>;
            }

            // an IMediaFileStore query
            return new[] { Store as T }.AsQueryable();
        }



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


            if (mediaDataId.MediaType == _folderType)
            {
                if (typeof(T) != typeof(IMediaFileFolder))
                {
                    throw new ArgumentException("The dataId specifies a IMediaFileFolder, but the generic method was invoked with different type");
                }
                IMediaFolderData folder = DataFacade.GetData<IMediaFolderData>().Where(x => x.Id == mediaDataId.Id).FirstOrDefault();
                if (folder == null)
                {
                    return null;
                }
                return new MediaFileFolder(folder, Store.Id,
                        _context.CreateDataSourceId(new MediaDataId() { MediaType = _folderType, Id = folder.Id }, typeof(IMediaFileFolder))) as T;
            }
            else if (mediaDataId.MediaType == _fileType)
            {
                if (typeof(T) != typeof(IMediaFile))
                {
                    throw new ArgumentException("The dataId specifies a IMediaFile, but the generic method was invoked with different type");
                }
                IMediaFileData file = DataFacade.GetData<IMediaFileData>().Where(x => x.Id == mediaDataId.Id).FirstOrDefault();
                if (file == null)
                {
                    return null;
                }

                string internalPath = Path.Combine(_workingDirectory, file.Id.ToString());
                return new MediaFile(file, Store.Id,
                       _context.CreateDataSourceId(new MediaDataId() { MediaType = _fileType, Id = file.Id }, typeof(IMediaFile)), internalPath) as T;

            }
            else
            {
                return Store as T;
            }
        }



        private IMediaFileStore Store
        {
            get
            {
                if (_store == null)
                {
                    _store = new MediaFileStore(_storeId, _storeTitle, _storeDescription, _context.CreateDataSourceId(new MediaDataId() { MediaType = _storeType }, typeof(IMediaFileStore)));
                }
                return _store;
            }
        }



        private void CheckInterface(Type interfaceType)
        {
            if (typeof(IMediaFile).IsAssignableFrom(interfaceType) == false &&
                typeof(IMediaFileFolder).IsAssignableFrom(interfaceType) == false &&
                typeof(IMediaFileStore).IsAssignableFrom(interfaceType) == false)
            {
                throw new ArgumentException(string.Format("Unexpected interface '{0}' - only '{1}, {2} and {3}' are supported", interfaceType, typeof(IMediaFile), typeof(IMediaFileFolder), typeof(IMediaFileStore)));
            }
        }




        private string GetParentFolderPath(string path)
        {
            if (path == "/")
            {
                return path;
            }

            string parentPath = path.Substring(0, path.LastIndexOf("/"));
            if (parentPath == "")
            {
                return "/";
            }

            return parentPath;
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

            var folder = (from item in GetData<IMediaFileFolder>()
                          where item.Path == path
                          select item).FirstOrDefault();
            if (folder == null)
            {
                return false;
            }
            return true;
        }



        private bool DoesFileExists(string path, string name)
        {
            var file = (from item in GetData<IMediaFile>()
                        where item.FolderPath == path && item.FileName == name
                        select item).FirstOrDefault();
            if (file == null)
            {
                return false;
            }
            return true;
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
            if (!DoesFolderExists(GetParentFolderPath(mediaFolder.Path)))
            {
                throw new ArgumentException("Could not find any parents folders on path " + GetParentFolderPath(mediaFolder.Path));
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
            public int MediaType { get; set; }
            public Guid Id { get; set; }
        }



        private sealed class MediaFileStore : IMediaFileStore
        {
            private DataSourceId _dataSourceId;



            public MediaFileStore(string id, string title, string description, DataSourceId dataSourceId)
            {
                Id = id;
                Title = title;
                Description = description;
                _dataSourceId = dataSourceId;
            }



            public string Id
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
            MediaFileDataProviderData configuration = objectConfiguration as MediaFileDataProviderData;

            if (configuration == null) throw new ArgumentException("Expected configuration to be of type MediaFileDataProviderData", "objectConfiguration");

            return new MediaFileProvider(configuration.RootDirectory, configuration.StoreId, configuration.StoreDescription, configuration.StoreTitle);
        }
    }
}
