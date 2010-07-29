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
        string Id { get; }



        string Title { get; }



        string Description { get; }



        bool IsReadOnly { get; }



        bool ProvidesMetadata { get; }
    }
}
