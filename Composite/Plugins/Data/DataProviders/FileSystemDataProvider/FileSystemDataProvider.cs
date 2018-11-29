using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.IO;
using System.Linq;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.Plugins.DataProvider;
using Composite.Data.Plugins.DataProvider.Streams;
using Composite.Data.Types;
using Composite.Plugins.Data.DataProviders.FileSystemDataProvider.Foundation;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;
using System.Diagnostics;


namespace Composite.Plugins.Data.DataProviders.FileSystemDataProvider
{
    [ConfigurationElementType(typeof(FileSystemDataProviderData))]
    internal class FileSystemDataProvider : IWritableDataProvider, IFileSystemDataProvider
    {
        private DataProviderContext _context;

        private string _resolvedRootDirectory;
        private Type _fileInterfaceType;
        private string _fileSearchPattern;
        private SearchOption _fileSearchOptions;
        private int _resolvedRootDirectoryPathLength;
        private Type _fileSystemFileTypeWithInterface;

        private object _lock = new object();



        internal FileSystemDataProvider(string resolvedRootDirectory, Type fileInterfaceType, string fileSearchPattern, bool topDirectoryOnly)
        {
            if (string.IsNullOrEmpty(resolvedRootDirectory)) throw new ArgumentNullException("resolvedRootDirectory");
            if (fileInterfaceType == null) throw new ArgumentNullException("fileInterfaceType");
            if (string.IsNullOrEmpty(fileSearchPattern)) throw new ArgumentNullException("fileSearchPattern");

            if (typeof(IFile).IsAssignableFrom(fileInterfaceType) == false) throw new ArgumentException(string.Format("The interface '{0}' does not implement the interface '{1}'", fileInterfaceType, typeof(IFile)));
            if (typeof(IFile).GetPropertiesRecursively().Count < fileInterfaceType.GetPropertiesRecursively().Count) throw new ArgumentException(string.Format("The interface '{0}' may not have any properties", fileInterfaceType));

            resolvedRootDirectory = resolvedRootDirectory.Replace("/", @"\");

            if (Path.IsPathRooted(resolvedRootDirectory) == false) throw new ArgumentException("Path must be rooted", "resolvedRootDirectory");

            if (resolvedRootDirectory.EndsWith("/") || resolvedRootDirectory.EndsWith(@"\")) resolvedRootDirectory = resolvedRootDirectory.Substring(0, resolvedRootDirectory.Length - 1);

            _resolvedRootDirectory = resolvedRootDirectory;
            _fileInterfaceType = fileInterfaceType;
            _fileSearchPattern = fileSearchPattern;

            _resolvedRootDirectoryPathLength = _resolvedRootDirectory.Length;
            _fileSearchOptions = (topDirectoryOnly ? SearchOption.TopDirectoryOnly : SearchOption.AllDirectories);

            _fileSystemFileTypeWithInterface = FileSystemFileGenerator.GenerateFileSystemFileWithInterface(fileInterfaceType);
        }



        public DataProviderContext Context
        {
            set { _context = value; }
        }



        public IEnumerable<Type> GetSupportedInterfaces()
        {
            List<Type> supportedInterfaces = new List<Type>();

            supportedInterfaces.Add(_fileInterfaceType);

            return supportedInterfaces;
        }



        public IQueryable<T> GetData<T>() where T : class, IData
        {
            CheckInterface(typeof(T));

            return GetFiles<T>();
        }



        public T GetData<T>(IDataId dataId) where T : class, IData
        {
            CheckInterface(typeof(T));

            FileSystemFileDataId fileSystemFileDataId = dataId as FileSystemFileDataId;

            if (fileSystemFileDataId == null)
            {
                return null;
            }

            return BuildNewFileSystemFile<T>(fileSystemFileDataId.FullPath);
        }



        public void Update(IEnumerable<IData> datas)
        {
            foreach (IData data in datas)
            {
                CheckInterface(data.GetType());

                FileSystemFileDataId id = (FileSystemFileDataId)data.DataSourceId.DataId;
                string oldPath = id.FullPath;

                FileSystemFile file = (FileSystemFile)data;

                file.SystemPath = CreateSystemPath(file.Path);

                FileSystemFileStreamManager.WriteFileToDisk(file);

                if (file.SystemPath != oldPath)
                {
                    C1File.Delete(oldPath);
                }
            }
        }



        public List<T> AddNew<T>(IEnumerable<T> datas) where T : class, IData
        {
            List<T> result = new List<T>();

            foreach (IData data in datas)
            {
                CheckInterface(data.GetType());

                IFile file = (IFile)data;

                string filename = CreateSystemPath( Path.Combine(file.FolderPath, file.FileName));

                FileSystemFile fileSystemFile = Activator.CreateInstance(_fileSystemFileTypeWithInterface) as FileSystemFile;
                fileSystemFile.SetDataSourceId(_context.CreateDataSourceId(new FileSystemFileDataId(filename), _fileInterfaceType));
                fileSystemFile.FolderPath = file.FolderPath;
                fileSystemFile.FileName = file.FileName;
                fileSystemFile.SystemPath = filename;

                using (C1StreamReader streamReader = new C1StreamReader(file.GetReadStream()))
                {
                    using (C1StreamWriter streamWriter = new C1StreamWriter(fileSystemFile.GetNewWriteStream()))
                    {
                        streamWriter.Write(streamReader.ReadToEnd());
                    }
                }

                FileSystemFileStreamManager.WriteFileToDisk(fileSystemFile);

                result.Add(fileSystemFile as T);
            }

            return result;
        }



        public void Delete(IEnumerable<DataSourceId> dataSourceIds)
        {
            foreach (DataSourceId dataSourceId in dataSourceIds)
            {
                FileSystemFileDataId dataId = (FileSystemFileDataId)dataSourceId.DataId;

                FileSystemFileStreamManager.DeleteFile(dataId.FullPath);

                C1File.Delete(dataId.FullPath);
            }
        }



        [DebuggerStepThrough]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass", Justification = "This is what we want, touch is used later on")]
        public bool ValidatePath<TFile>(TFile file, out string errorMessage) 
            where TFile: IFile
        {
            errorMessage = "";

            string filename = CreateSystemPath(Path.Combine(file.FolderPath, file.FileName));

            if (filename.Length > 250) return false;

            return true;
        }



        private IQueryable<T> GetFiles<T>() where T : class, IData
        {
            var result =
                from file in C1Directory.GetFiles(_resolvedRootDirectory, _fileSearchPattern, _fileSearchOptions)
                select BuildNewFileSystemFile<T>(file);

            return result.AsQueryable();
        }



        private void CheckInterface(Type interfaceType)
        {
            if (_fileInterfaceType.IsAssignableFrom(interfaceType) == false) throw new ArgumentException(string.Format("Unexpected interface '{0}' - only '{1}' is supported", interfaceType, _fileInterfaceType));
        }



        private T BuildNewFileSystemFile<T>(string fullPath) where T : class, IData
        {
            string localPath = fullPath.Substring(_resolvedRootDirectoryPathLength).Replace('/', '\\');

            return BuildNewFileSystemFile<T>(_context.CreateDataSourceId(new FileSystemFileDataId(fullPath), _fileInterfaceType), localPath, fullPath);
        }



        private T BuildNewFileSystemFile<T>(DataSourceId dataSourceId, string localPath, string fullPath) where T : class, IData
        {
            FileSystemFile fileSystemFile = Activator.CreateInstance(_fileSystemFileTypeWithInterface) as FileSystemFile;
            fileSystemFile.SetDataSourceId(dataSourceId);
            fileSystemFile.FolderPath = Path.GetDirectoryName(localPath);
            fileSystemFile.FileName = Path.GetFileName(localPath);
            fileSystemFile.SystemPath = fullPath;

            return fileSystemFile as T;
        }



        private string CreateSystemPath(string localPath)
        {
            localPath = localPath.Replace('/', '\\');
            if (localPath.StartsWith("\\") == false) throw new InvalidOperationException(string.Format("The path '{0}' should start with a '\\'", localPath));

            string lPath = localPath.Remove(0, 1);

            string s = Path.Combine(_resolvedRootDirectory, lPath);

            return Path.Combine(_resolvedRootDirectory, lPath);
        }
    }




    [Assembler(typeof(FileSystemDataProviderAssembler))]
    internal sealed class FileSystemDataProviderData : DataProviderData
    {
        private const string _rootDirectoryProperty = "rootDirectory";
        [ConfigurationProperty(_rootDirectoryProperty, IsRequired = true)]
        public string RootDirectory
        {
            get { return (string)base[_rootDirectoryProperty]; }
            set { base[_rootDirectoryProperty] = value; }
        }


        private const string _fileSearchPatternProperty = "fileSearchPattern";
        [ConfigurationProperty(_fileSearchPatternProperty, IsRequired = false, DefaultValue = "*")]
        public string FileSearchPattern
        {
            get { return (string)base[_fileSearchPatternProperty]; }
            set { base[_fileSearchPatternProperty] = value; }
        }


        private const string _topDirectoryOnlyProperty = "topDirectoryOnly";
        [ConfigurationProperty(_topDirectoryOnlyProperty, IsRequired = false, DefaultValue = false)]
        public bool TopDirectoryOnly
        {
            get { return (bool)base[_topDirectoryOnlyProperty]; }
            set { base[_topDirectoryOnlyProperty] = value; }
        }


        private const string _fileInterfaceTypeProperty = "fileInterfaceType";
        [ConfigurationProperty(_fileInterfaceTypeProperty, IsRequired = false, DefaultValue = typeof(IFile))]
        [TypeConverter(typeof(TypeManagerTypeNameConverter))]
        public Type FileInterfaceType
        {
            get { return (Type)base[_fileInterfaceTypeProperty]; }
            set { base[_fileInterfaceTypeProperty] = value; }
        }
    }




    internal sealed class FileSystemDataProviderAssembler : IAssembler<IDataProvider, DataProviderData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IDataProvider Assemble(IBuilderContext context, DataProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            FileSystemDataProviderData configuration = objectConfiguration as FileSystemDataProviderData;

            if (configuration == null) throw new ArgumentException("Expected configuration to be of type FileSystemDataProviderData", "objectConfiguration");

            string resolvedRootDirectory = PathUtil.Resolve(configuration.RootDirectory);

            if (typeof(IFile).IsAssignableFrom(configuration.FileInterfaceType) == false)
            {
                string invalidInterfaceSelectionMsg = string.Format("The supplied fileInterfaceType '{0}' does not implement '{1}'", configuration.FileInterfaceType, typeof(IFile));
                throw new ConfigurationErrorsException(invalidInterfaceSelectionMsg, configuration.ElementInformation.Source, configuration.ElementInformation.LineNumber);
            }

            if (string.IsNullOrEmpty(configuration.FileSearchPattern))
            {
                string invalidFileSearchPatternMsg = "The file search pattern can not be empty. Use '*' for all files.";
                throw new ConfigurationErrorsException(invalidFileSearchPatternMsg, configuration.ElementInformation.Source, configuration.ElementInformation.LineNumber);
            }

            return new FileSystemDataProvider(resolvedRootDirectory, configuration.FileInterfaceType, configuration.FileSearchPattern, configuration.TopDirectoryOnly);
        }
    }

}
