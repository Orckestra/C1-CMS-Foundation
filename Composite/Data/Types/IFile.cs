using Composite.Data.Types.Foundation;
using Composite.Serialization;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [BuildNewHandler(typeof(IFileBuildNewHandler))]
    [DataScope(DataScopeIdentifier.PublicName)]
    [SerializerHandler(typeof(ExceptingSerializerHandler))]
    public interface IFile : IData
    {
        [ImmutableFieldId("{B9B50947-EE78-4744-9128-0832A66243D5}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 512)]
        string FolderPath { get; set; }


        [ImmutableFieldId("{4FD98564-6077-4c6d-86E1-9C7F44B65E50}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 128)]
        string FileName { get; set; }

    }
}