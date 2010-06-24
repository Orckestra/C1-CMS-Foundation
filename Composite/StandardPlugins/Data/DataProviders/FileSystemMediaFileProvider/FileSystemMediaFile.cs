using System;
using System.Security.Cryptography;
using System.Text;
using Composite.Data.Types;
using Composite.Data;
using System.Globalization;
using Composite.Data.Plugins.DataProvider.Streams;
using Composite.Data.Streams;
using Composite.IO;
using System.IO;

namespace Composite.StandardPlugins.Data.DataProviders.FileSystemMediaFileProvider
{
    [FileStreamManager(typeof(FileSystemFileStreamManager))]
    internal sealed class FileSystemMediaFile : FileSystemFileBase, IMediaFile
    {
        private static readonly MD5 HashingAlgorithm = MD5.Create(); 

        private FileInfo _fileInfo;


        public FileSystemMediaFile(string systemPath, string fileName, string folderName, string storeId, DataSourceId dataSourceId)
        {
            Id = CalculateId(folderName, fileName);
            SystemPath = systemPath;
            FileName = fileName;
            FolderPath = folderName;
            StoreId = storeId;
            DataSourceId = dataSourceId;
        }

        private static Guid CalculateId(string folderName, string fileName)
        {
            return GetHashValue(folderName + "/" + fileName);
        }

        private static Guid GetHashValue(string value)
        {
            var bytes = HashingAlgorithm.ComputeHash(Encoding.ASCII.GetBytes(value));
            return new Guid(bytes);
        }


        public Guid Id
        {
            get; internal set;
        }

        public string KeyPath
        {
            get { return this.GetKeyPath();  }
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



        public string Title
        {
            get
            {
                return this.FileName;
            }
            set
            {
                this.FileName = value;
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
            }
        }



        public string Culture
        {
            get
            {
                return CultureInfo.InvariantCulture.Name;
            }
            set
            {
                ;
            }
        }



        public string MimeType
        {
            get { return MimeTypeInfo.GetCanonicalFromExtension(Path.GetExtension(this.FileName)); }
        }




        public int? Length
        {
            get 
            {
                return (int)this.FileInfo.Length;
            }
        }



        public DateTime? CreationTime
        {
            get 
            {
                return this.FileInfo.CreationTime;
            }
        }



        public DateTime? LastWriteTime
        {
            get 
            {
                return this.FileInfo.LastWriteTime;
            }
        }



        public bool IsReadOnly
        {
            get
            {
                return this.FileInfo.IsReadOnly;
            }
            set
            {
                ;
            }
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



        private FileInfo FileInfo
        {
            get
            {
                if (_fileInfo == null)
                {
                    _fileInfo = new FileInfo(this.SystemPath);
                }
                return _fileInfo;
            }
        }


        public DataSourceId DataSourceId
        {
            get;
            private set;
        }
    }
}
