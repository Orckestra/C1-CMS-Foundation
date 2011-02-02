using System;
using System.IO;
using System.Runtime.Serialization;
using Composite.Core.IO;
using Composite.Core.IO.Plugins.IOProvider;


namespace Composite.Core.Implementation
{
    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public class C1FileInfoImplementation
    {
        private IC1FileInfo _fileInfo;

        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        public C1FileInfoImplementation(string path)
        {
            _fileInfo = IOFacade.CreateC1FileInfo(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public string DirectoryName
        {
            get
            {
                return _fileInfo.DirectoryName;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public C1DirectoryInfo Directory
        {
            get
            {
                return _fileInfo.Directory;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public string Name
        {
            get
            {
                return _fileInfo.Name;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public string FullName
        {
            get
            {
                return _fileInfo.FullName;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public bool Exists
        {
            get
            {
                return _fileInfo.Exists;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public string Extension
        {
            get
            {
                return _fileInfo.Extension;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public bool IsReadOnly
        {
            get
            {
                return _fileInfo.IsReadOnly;
            }
            set
            {
                _fileInfo.IsReadOnly = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public long Length
        {
            get
            {
                return _fileInfo.Length;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public FileAttributes Attributes
        {
            get
            {
                return _fileInfo.Attributes;
            }
            set
            {
                _fileInfo.Attributes = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        public C1FileStream Create()
        {
            return _fileInfo.Create();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        public C1StreamWriter CreateText()
        {
            return _fileInfo.CreateText();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        public C1StreamWriter AppendText()
        {
            return _fileInfo.AppendText();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="mode"></param>
        /// <returns></returns>
        public C1FileStream Open(FileMode mode)
        {
            return _fileInfo.Open(mode);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="mode"></param>
        /// <param name="access"></param>
        /// <returns></returns>
        public C1FileStream Open(FileMode mode, FileAccess access)
        {
            return _fileInfo.Open(mode, access);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="mode"></param>
        /// <param name="access"></param>
        /// <param name="share"></param>
        /// <returns></returns>
        public C1FileStream Open(FileMode mode, FileAccess access, FileShare share)
        {
            return _fileInfo.Open(mode, access, share);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        public C1FileStream OpenRead()
        {
            return _fileInfo.OpenRead();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        public C1StreamReader OpenText()
        {
            return _fileInfo.OpenText();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        public C1FileStream OpenWrite()
        {
            return _fileInfo.OpenWrite();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="destinationFileName"></param>
        /// <returns></returns>
        public C1FileInfo CopyTo(string destinationFileName)
        {
            return _fileInfo.CopyTo(destinationFileName);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="destinationFileName"></param>
        /// <param name="overwrite"></param>
        /// <returns></returns>
        public C1FileInfo CopyTo(string destinationFileName, bool overwrite)
        {
            return _fileInfo.CopyTo(destinationFileName, overwrite);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="destinationFileName"></param>
        public void MoveTo(string destinationFileName)
        {
            _fileInfo.MoveTo(destinationFileName);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="destinationFileName"></param>
        /// <param name="destinationBackupFileName"></param>
        /// <returns></returns>
        public C1FileInfo Replace(string destinationFileName, string destinationBackupFileName)
        {
            return _fileInfo.Replace(destinationFileName, destinationBackupFileName);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="destinationFileName"></param>
        /// <param name="destinationBackupFileName"></param>
        /// <param name="ignoreMetadataErrors"></param>
        /// <returns></returns>
        public C1FileInfo Replace(string destinationFileName, string destinationBackupFileName, bool ignoreMetadataErrors)
        {
            return _fileInfo.Replace(destinationFileName, destinationBackupFileName, ignoreMetadataErrors);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public void Delete()
        {
            _fileInfo.Delete();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public void Refresh()
        {
            _fileInfo.Refresh();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="info"></param>
        /// <param name="context"></param>
        public void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            _fileInfo.GetObjectData(info, context);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public DateTime CreationTime
        {
            get
            {
                return _fileInfo.CreationTime;
            }
            set
            {
                _fileInfo.CreationTime = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public DateTime CreationTimeUtc
        {
            get
            {
                return _fileInfo.CreationTimeUtc;
            }
            set
            {
                _fileInfo.CreationTimeUtc = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public DateTime LastAccessTime
        {
            get
            {
                return _fileInfo.LastAccessTime;
            }
            set
            {
                _fileInfo.LastAccessTime = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public DateTime LastAccessTimeUtc
        {
            get
            {
                return _fileInfo.LastAccessTimeUtc;
            }
            set
            {
                _fileInfo.LastAccessTimeUtc = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public DateTime LastWriteTime
        {
            get
            {
                return _fileInfo.LastWriteTime;
            }
            set
            {
                _fileInfo.LastWriteTime = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public DateTime LastWriteTimeUtc
        {
            get
            {
                return _fileInfo.LastWriteTimeUtc;
            }
            set
            {
                _fileInfo.LastWriteTimeUtc = value;
            }
        }
    }
}
