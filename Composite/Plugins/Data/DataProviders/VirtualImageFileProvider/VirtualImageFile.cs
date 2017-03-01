using System;
using Composite.Data.Types;
using Composite.Data;

namespace Composite.Plugins.Data.DataProviders.VirtualImageFileProvider
{
	internal sealed class VirtualImageFile : IImageFile
	{
        private IMediaFile _sourceFile;

        internal VirtualImageFile(IMediaFile sourceFile)
        {
            _sourceFile = sourceFile;
        }



        public string CompositePath
        {
            get { return this.GetCompositePath(); }
            set { throw new NotImplementedException(); }
        }



        public string FolderPath
        {
            get
            {
                return _sourceFile.FolderPath;
            }
            set
            {
                _sourceFile.FolderPath = value; ;
            }
        }

        public string FileName
        {
            get
            {
                return _sourceFile.FileName;
            }
            set
            {
                _sourceFile.FileName = value; ;
            }
        }

        public DataSourceId DataSourceId
        {
            get { return _sourceFile.DataSourceId; }
        }

        public string StoreId
        {
            get
            {
                return _sourceFile.StoreId;
            }
            set
            {
                _sourceFile.StoreId = value;;
            }
        }

        public string Title
        {
            get
            {
                return _sourceFile.Title;
            }
            set
            {
                _sourceFile.Title = value;;
            }
        }

        public string Description
        {
            get
            {
                return _sourceFile.Description;
            }
            set
            {
                _sourceFile.Description = value;;
            }
        }

        public string Tags
        {
            get
            {
                return _sourceFile.Tags;
            }
            set
            {
                _sourceFile.Tags = value; ;
            }
        }

       
        public string Culture
        {
            get
            {
                return _sourceFile.Culture;
            }
            set
            {
                _sourceFile.Culture = value;;
            }
        }

        public string MimeType
        {
            get { return _sourceFile.MimeType; }
        }

        public int? Length
        {
            get { return _sourceFile.Length; }
        }

        public DateTime? CreationTime
        {
            get { return _sourceFile.CreationTime; }
        }

        public DateTime? LastWriteTime
        {
            get { return _sourceFile.LastWriteTime; }
        }

        public bool IsReadOnly
        {
            get { return _sourceFile.IsReadOnly; }
        }

        public Guid Id
        {
            get { return _sourceFile.Id; }
        }

        public string KeyPath
        {
            get { return _sourceFile.KeyPath; }
        }
    }
}
