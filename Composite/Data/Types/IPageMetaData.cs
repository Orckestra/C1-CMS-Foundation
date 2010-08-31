
namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [DataAssociationAttribute(typeof(Composite.Data.Types.IPage), "PageId", DataAssociationType.Composition)]
    public interface IPageMetaData : IData
    {
        [StoreFieldType(PhysicalStoreFieldType.String, 128)]
        [ImmutableFieldId("{B2A5EE23-848D-4D0B-A801-FDF68F9F899E}")]
        string FieldName { get; set; }
    }
}
