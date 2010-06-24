using System;
using Composite.Data;
using Composite.Data.Plugins.DataProvider.Streams;
using Composite.Data.Streams;
using Composite.Data.Types;


namespace Composite.StandardPlugins.Elements.ElementProviders.MediaFileProviderElementProvider
{
    [FileStreamManager(typeof(FileSystemFileStreamManager))]
    internal sealed class WorkflowMediaFile : FileSystemFileBase, IMediaFile
    {
        public WorkflowMediaFile()
        {
            Title = string.Empty;
            Description = string.Empty;
            MimeType = string.Empty;
            DataSourceId = new DataSourceId(typeof(IMediaFile));
        }



        public WorkflowMediaFile(IMediaFile file)
        {
            Id = file.Id;
            StoreId = file.StoreId;
            Title = file.Title;
            Culture = file.Culture;
            CreationTime = file.CreationTime;
            DataSourceId = file.DataSourceId;
            Description = file.Description;
            FileName = file.FileName;
            FolderPath = file.FolderPath;
            IsReadOnly = file.IsReadOnly;
            LastWriteTime = file.LastWriteTime;
            Length = file.Length;
            MimeType = file.MimeType;
        }



        public Guid Id
        {
            get; internal set;
        }

        public string KeyPath
        {
            get { return this.GetKeyPath(); }
        }

        public string CompositePath
        {
            get { return this.GetCompositePath(); }
            set { throw new InvalidOperationException(); }
        }



        public string StoreId
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
            get;
            set;
        }



        public DateTime? LastWriteTime
        {
            get;
            set;
        }



        public bool IsReadOnly
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



        public DataSourceId DataSourceId
        {
            get;
            set;
        }
    }
}
