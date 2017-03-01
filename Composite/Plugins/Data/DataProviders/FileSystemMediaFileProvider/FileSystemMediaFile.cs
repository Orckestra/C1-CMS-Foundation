using System;
using System.Globalization;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using Composite.Core.IO;
using Composite.Data;
using Composite.Data.Plugins.DataProvider.Streams;
using Composite.Data.Streams;
using Composite.Data.Types;


namespace Composite.Plugins.Data.DataProviders.FileSystemMediaFileProvider
{
    [FileStreamManager(typeof(FileSystemFileStreamManager))]
    internal sealed class FileSystemMediaFile : FileSystemFileBase, IMediaFile
    {
        private static readonly MD5 HashingAlgorithm = MD5.Create(); 



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

        public string Tags
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
                C1FileInfo fileInfo = new C1FileInfo(this.SystemPath);

                return (int)fileInfo.Length;
            }
        }



        public DateTime? CreationTime
        {
            get 
            {
                return C1File.GetCreationTime(this.SystemPath);
            }
        }



        public DateTime? LastWriteTime
        {
            get 
            {
                return C1File.GetLastWriteTime(this.SystemPath);
            }
        }



        public bool IsReadOnly
        {
            get
            {
                return (C1File.GetAttributes(this.SystemPath) & FileAttributes.ReadOnly) == FileAttributes.ReadOnly;
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



        public DataSourceId DataSourceId
        {
            get;
            private set;
        }
    }
}
