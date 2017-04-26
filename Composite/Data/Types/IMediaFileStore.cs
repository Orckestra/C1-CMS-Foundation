namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [KeyPropertyName("Id")]
    [DataScope(DataScopeIdentifier.PublicName)]
    public interface IMediaFileStore : IData
    {
        /// <exclude />
        string Id { get; }


        /// <exclude />
        string Title { get; }


        /// <exclude />
        string Description { get; }

        /// <exclude />
        bool IsReadOnly { get; }


        /// <exclude />
        bool ProvidesMetadata { get; }
    }
}
