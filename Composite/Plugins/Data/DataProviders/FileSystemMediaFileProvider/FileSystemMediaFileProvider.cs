using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using Composite.Core.IO;
using Composite.Data;
using Composite.Data.Plugins.DataProvider;
using Composite.Data.Types;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Plugins.Data.DataProviders.FileSystemMediaFileProvider
{
    [ConfigurationElementType(typeof(MediaArchiveDataProviderData))]
    internal sealed class FileSystemMediaFileProvider : IWritableDataProvider
    {
        private readonly string _storeId;
        private readonly string _storeDescription;
        private readonly string _storeTitle;
        private readonly string _rootDir;
        private readonly string[] _excludedDirs;
        private MediaArchiveStore _store;
        private DataProviderContext _context;
        private static readonly int _folderType = 1;
        private static readonly int _fileType = 2;
        private static readonly int _storeType = 3;

        public FileSystemMediaFileProvider(string rootDir, string[] excludedDirs, string storeId, string storeDesc, string storeTitle)
        {
            _rootDir = rootDir;
            _excludedDirs = excludedDirs;
            _storeId = storeId;
            _storeDescription = storeDesc;
            _storeTitle = storeTitle;
        }



        private IMediaFileStore Store
        {
            get
            {
                if (_store == null)
                {
                    _store = new MediaArchiveStore(_storeId, _storeTitle, _storeDescription, 
                        _context.CreateDataSourceId(new MediaDataId(_storeType), typeof(IMediaFileStore)));
                }
                return _store;
            }
        }



        public DataProviderContext Context
        {
            set { _context = value; }
        }



        public IEnumerable<Type> GetSupportedInterfaces()
        {
            return new List<Type> { typeof(IMediaFile), typeof(IMediaFileFolder), typeof(IMediaFileStore) };
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

                    if (updatedFile.StoreId != this.Store.Id)
                    {
                        continue;
                    }
                    if (updatedFile.IsReadOnly)
                    {
                        throw new ArgumentException("Cannot update read only media file " + dataId.FileName);
                    }

                    if (updatedFile.FileName != dataId.FileName || updatedFile.FolderPath != dataId.Path)
                    {
                        string oldPos = GetAbsolutePath(dataId);
                        string newPos = GetAbsolutePath(updatedFile);
                        C1File.Move(oldPos, newPos);                        
                    }

                    using (Stream readStream = updatedFile.GetReadStream())
                    {
                        using (Stream writeStream = C1File.Open(GetAbsolutePath(updatedFile), FileMode.Create))
                        {
                            readStream.CopyTo(writeStream);
                        }
                    }
                }
                else
                {
                    IMediaFileFolder updatedFolder = (IMediaFileFolder)data;
                    if (updatedFolder.StoreId != this.Store.Id)
                    {
                        continue;
                    }
                    if (updatedFolder.IsReadOnly)
                    {
                        throw new ArgumentException("Cannot update read only media folder " + dataId.Path);
                    }
                    C1Directory.Move(GetAbsolutePath(dataId), GetAbsolutePath(updatedFolder));
                }
            }
        }



        public List<T> AddNew<T>(IEnumerable<T> datas) where T : class, IData
        {
            var result = new List<T>();

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
                    IMediaFile file = (IMediaFile) data;
                    string fullPath = Path.Combine(Path.Combine(_rootDir, file.FolderPath.Remove(0, 1)), file.FileName);

                    using (Stream readStream = file.GetReadStream())
                    {
                        using (Stream writeStream = C1File.Open(fullPath, FileMode.CreateNew))
                        {
                            readStream.CopyTo(writeStream);
                        }
                    }
                    
                    result.Add(CreateFile(fullPath) as T);
                }
                else if (typeof(T) == typeof(IMediaFileFolder))
                {
                    IMediaFileFolder folder = (IMediaFileFolder)data;
                    string fullPath = Path.Combine(_rootDir, folder.Path.Remove(0, 1));

                    C1Directory.CreateDirectory(fullPath);
                    result.Add(CreateFolder(fullPath) as T);
                }
            }
            return result;
        }



        public void Delete(IEnumerable<DataSourceId> dataSourceIds)
        {
            foreach (DataSourceId dataSourceId in dataSourceIds)
            {
                if (dataSourceId == null)
                {
                    throw new ArgumentException("DataSourceIds must me non-null");
                }
            }

            foreach (DataSourceId dataSourceId in dataSourceIds)
            {
                MediaDataId dataId = dataSourceId.DataId as MediaDataId;
                
                if (dataId.MediaType == _fileType)
                {
                    if(IsReadOnlyFolder(dataId.Path))
                    {
                        throw new ArgumentException("Cannot delete read only file " + dataId.FileName);
                    }
                    C1File.Delete(GetAbsolutePath(dataId));
                }
                else
                {
                    if (IsReadOnlyFolder(dataId.Path))
                    {
                        throw new ArgumentException("Cannot delete read only folder " + dataId.Path);
                    }
                    C1Directory.Delete(GetAbsolutePath(dataId), true);
                }
            }
        }



        public IQueryable<T> GetData<T>() where T : class, IData
        {
            CheckInterface(typeof(T));

            if (typeof(T) == typeof(IMediaFile))
            {
                var excludePaths =
                    (from dir in _excludedDirs
                     select PathUtil.Resolve(_rootDir + dir.Replace('/', '\\')) + @"\").ToList();

                var matches =
                    from filePath in C1Directory.GetFiles( _rootDir, "*", SearchOption.AllDirectories)
                    where !excludePaths.Where( filePath.StartsWith ).Any()
                    select CreateFile( filePath );

                return matches.Cast<T>().AsQueryable();
            }

            if (typeof(T) == typeof(IMediaFileFolder))
            {
                var excludePaths =
                    (from dir in _excludedDirs
                     select PathUtil.Resolve(_rootDir + dir.Replace('/','\\')) + @"\").ToList();

                var matches =
                    from dirPath in C1Directory.GetDirectories(_rootDir, "*", SearchOption.AllDirectories)
                    where !excludePaths.Any(f => (dirPath + @"\").StartsWith(f))
                    select CreateFolder(dirPath);

                return matches.Cast<T>().AsQueryable();
            }

            return new List<T> { Store as T}.AsQueryable<T>();
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

                FileSystemMediaFileFolder folder = (from dirInfo in C1Directory.GetDirectories(_rootDir, "*", SearchOption.AllDirectories)
                                                    where GetRelativePath(dirInfo) == mediaDataId.Path
                                                    select CreateFolder(dirInfo)).FirstOrDefault();
                return folder as T;
            }

            if (mediaDataId.MediaType == _fileType)
            {
                if (typeof(T) != typeof(IMediaFile))
                {
                    throw new ArgumentException("The dataId specifies a IMediaFile, but the generic method was invoked with different type");
                }

                FileSystemMediaFile file = (from fileInfo in C1Directory.GetFiles(_rootDir, "*", SearchOption.AllDirectories)
                                            where GetRelativePath(Path.GetDirectoryName(fileInfo)) == mediaDataId.Path && Path.GetFileName(fileInfo) == mediaDataId.FileName
                                            select CreateFile(fileInfo)).FirstOrDefault();

                return file as T;
            }

            return Store as T;
        }



        internal sealed class MediaDataId : IDataId
        {
            public MediaDataId(int type, string path = null, string fileName = null)
            {
                MediaType = type;
                Path = path;
                FileName = fileName;
            }

            public int MediaType { get; }
            public string Path { get; }
            public string FileName { get; }

            public override int GetHashCode() => MediaType ^ (Path ?? "").GetHashCode() ^ (FileName ?? "").GetHashCode();
        }



        private string GetAbsolutePath(IMediaFile file)
        {
            return Path.Combine(Path.Combine(_rootDir, file.FolderPath.Remove(0, 1)), file.FileName);
        }



        private string GetAbsolutePath(IMediaFileFolder folder)
        {
            return Path.Combine(_rootDir, folder.Path.Remove(0, 1));
        }



        private string GetAbsolutePath(MediaDataId mediaData)
        {
            string folderPath = Path.Combine(_rootDir, mediaData.Path.Remove(0, 1));

            if (mediaData.MediaType == _fileType)
            {
                return Path.Combine(folderPath, mediaData.FileName);
            }

            return folderPath;
        }
        
        
        
        private bool IsReadOnlyFolder(string folder)
        {
            var folders = from item in _excludedDirs
                          where folder == item || (item.StartsWith(folder) && item[folder.Length] == '/')
                          select item;
            return folders.Any();
        }



        private bool IsExcludedFolder(string folder)
        {
            var folders = from item in _excludedDirs
                          where folder == item || (folder.StartsWith(item) && folder[item.Length] == '/')
                          select item;
            return folders.Any();
        }



        private string GetRelativePath(string path)
        {
            string result = path.Substring(_rootDir.Length).Replace("\\", @"/");
            return result == string.Empty ? "/" : result;
        }



        private FileSystemMediaFileFolder CreateFolder(string dir)
        {
            string relativeDir = GetRelativePath(dir);
            var folder = new FileSystemMediaFileFolder(relativeDir, Store.Id,
                _context.CreateDataSourceId(new MediaDataId(_folderType, relativeDir), typeof(IMediaFileFolder)));
            folder.IsReadOnly = IsReadOnlyFolder(folder.Path);
            return folder;
        }


        private FileSystemMediaFile CreateFile(string filePath)
        {
            string relativeDir = GetRelativePath(Path.GetDirectoryName(filePath));
            string fileName = Path.GetFileName(filePath);

            DataSourceId dataSourceId = _context.CreateDataSourceId(new MediaDataId (_fileType , relativeDir, fileName), typeof(IMediaFile));
            return new FileSystemMediaFile(filePath, fileName, relativeDir, this.Store.Id, dataSourceId);
        }



        private void CheckInterface(Type interfaceType)
        {
            if (!typeof(IMediaFile).IsAssignableFrom(interfaceType) &&
                !typeof(IMediaFileFolder).IsAssignableFrom(interfaceType) &&
                !typeof(IMediaFileStore).IsAssignableFrom(interfaceType))
            {
                throw new ArgumentException($"Unexpected interface '{interfaceType}' - only '{typeof(IMediaFile)}, {typeof(IMediaFileFolder)} and {typeof(IMediaFileStore)}' are supported");
            }
        }



        private sealed class MediaArchiveStore : IMediaFileStore
        {
            public MediaArchiveStore(string id, string title, string description, DataSourceId dataSourceId)
            {
                Id = id;
                Title = title;
                Description = description;
                DataSourceId = dataSourceId;
            }

            public string Id { get; }

            public string Title { get; }

            public string Description { get; }

            //public string Tags { get; set; }

            public bool IsReadOnly => false;

            public bool ProvidesMetadata => false;

            public DataSourceId DataSourceId { get; }
        }
    }

    [Assembler(typeof(FileSystemMediaFileProviderAssembler))]
    internal sealed class MediaArchiveDataProviderData : DataProviderData
    {
        private const string _rootDirectoryProperty = "rootDirectory";
        [ConfigurationProperty(_rootDirectoryProperty, IsRequired = true)]
        public string RootDirectory
        {
            get { return (string)base[_rootDirectoryProperty]; }
            set { base[_rootDirectoryProperty] = value; }
        }
        
        
        
        private const string _excludedDirectoriesProperty = "excludedDirectories";
        [ConfigurationProperty(_excludedDirectoriesProperty, IsRequired = true)]
        public string ExcludedDirectories
        {
            get { return (string)base[_excludedDirectoriesProperty]; }
            set { base[_excludedDirectoriesProperty] = value; }
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



    internal sealed class FileSystemMediaFileProviderAssembler : IAssembler<IDataProvider, DataProviderData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IDataProvider Assemble(IBuilderContext context, DataProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            MediaArchiveDataProviderData configuration = objectConfiguration as MediaArchiveDataProviderData;

            if (configuration == null) throw new ArgumentException("Expected configuration to be of type MediaFileDataProviderData", "objectConfiguration");

            string resolvedRootDirectory = PathUtil.Resolve(configuration.RootDirectory);
            if (!C1Directory.Exists(resolvedRootDirectory))
            {
                string directoryNotFoundMsg = $"Directory '{configuration.RootDirectory}' not found";
                throw new ConfigurationErrorsException(directoryNotFoundMsg, configuration.ElementInformation.Source, configuration.ElementInformation.LineNumber);
            }
            if (resolvedRootDirectory.EndsWith("\\"))
            {
                resolvedRootDirectory = Path.GetDirectoryName(resolvedRootDirectory);
            }

            string[] excludedDirs;
            if (configuration.ExcludedDirectories == null)
            {
                excludedDirs = Array.Empty<string>();
            }
            else
            {
                excludedDirs = configuration.ExcludedDirectories.Split(';');
            }

            return new FileSystemMediaFileProvider(resolvedRootDirectory, excludedDirs, configuration.StoreId, configuration.StoreDescription, configuration.StoreTitle);
        }
    }
}
