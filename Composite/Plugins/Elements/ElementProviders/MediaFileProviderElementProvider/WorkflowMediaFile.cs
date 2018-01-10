using System;
using Composite.Data;
using Composite.Data.Plugins.DataProvider.Streams;
using Composite.Data.Streams;
using Composite.Data.Types;


namespace Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [FileStreamManager(typeof(FileSystemFileStreamManager))]
    public sealed class WorkflowMediaFile : FileSystemFileBase, IMediaFile
    {
        /// <exclude />
        public WorkflowMediaFile()
        {
            Title = string.Empty;
            Description = string.Empty;
            MimeType = string.Empty;
            Tags = string.Empty;
            DataSourceId = new DataSourceId(typeof(IMediaFile));
        }



        /// <exclude />
        public WorkflowMediaFile(IMediaFile file)
        {
            Id = file.Id;
            StoreId = file.StoreId;
            Title = file.Title;
            Culture = file.Culture;
            CreationTime = file.CreationTime;
            DataSourceId = file.DataSourceId;
            Description = file.Description;
            Tags = file.Tags;
            FileName = file.FileName;
            FolderPath = file.FolderPath;
            IsReadOnly = file.IsReadOnly;
            LastWriteTime = file.LastWriteTime;
            Length = file.Length;
            MimeType = file.MimeType;
        }



        /// <exclude />
        public Guid Id
        {
            get; internal set;
        }



        /// <exclude />
        public string KeyPath
        {
            get { return this.GetKeyPath(); }
        }



        /// <exclude />
        public string CompositePath
        {
            get { return this.GetCompositePath(); }
            set { throw new InvalidOperationException(); }
        }



        /// <exclude />
        public string StoreId
        {
            get;
            set;
        }



        /// <exclude />
        public string Title
        {
            get;
            set;
        }



        /// <exclude />
        public string Description
        {
            get;
            set;
        }

        /// <exclude />
        public string Tags { get; set; }



        /// <exclude />
        public string Culture
        {
            get;
            set;
        }



        /// <exclude />
        public string MimeType
        {
            get;
            set;
        }



        /// <exclude />
        public int? Length
        {
            get;
            set;
        }

        
        /// <exclude />
        public DateTime? CreationTime
        {
            get;
            set;
        }



        /// <exclude />
        public DateTime? LastWriteTime
        {
            get;
            set;
        }



        /// <exclude />
        public bool IsReadOnly
        {
            get;
            set;
        }



        /// <exclude />
        public string FolderPath
        {
            get;
            set;
        }



        /// <exclude />
        public string FileName
        {
            get;
            set;
        }



        /// <exclude />
        public DataSourceId DataSourceId
        {
            get;
            set;
        }
    }
}
