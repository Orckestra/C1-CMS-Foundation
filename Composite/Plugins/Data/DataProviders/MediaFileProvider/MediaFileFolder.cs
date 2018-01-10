using System;
using Composite.Data.Types;
using Composite.Data;
using Newtonsoft.Json;


namespace Composite.Plugins.Data.DataProviders.MediaFileProvider
{
    internal sealed class MediaFileFolder : IMediaFileFolder
    {
        public MediaFileFolder(IMediaFolderData folder, string storeId, DataSourceId dataSourceId)
        {
            DataSourceId = dataSourceId;

            Id = folder.Id;
            Description = folder.Description;
            Title = folder.Title;
            StoreId = storeId;
            Path = folder.Path;
        }

        [JsonConstructor]
        private MediaFileFolder(Guid id,string description,string title,string path, string storeId, DataSourceId dataSourceId)
        {
            DataSourceId = dataSourceId;

            Id = id;
            Description = description;
            Title = title;
            StoreId = storeId;
            Path = path;
        }

        public Guid Id
        {
            get; private set;
        }

        public string KeyPath => this.GetKeyPath();

        [JsonIgnore]
        public string CompositePath
        {
            get => this.GetCompositePath();
            set => throw new NotImplementedException();
        }

        public string StoreId
        {
            get;
            set;
        }

        public string Path
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
            get;
            set;
        }

        public DataSourceId DataSourceId { get; }
    }
}
