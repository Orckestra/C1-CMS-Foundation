namespace Composite.Data.Types
{
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
