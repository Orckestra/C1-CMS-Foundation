using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.ProcessControlled;
using Composite.Data.Types;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [DataScope(DataScopeIdentifier.PublicName)]
    [DataScope(DataScopeIdentifier.AdministratedName)]
    [PublishProcessControllerType(typeof(GenericPublishProcessController))]
    [DataAssociationAttribute(typeof(Composite.Data.Types.IPage), "PageId", DataAssociationType.Composition)]
    public interface IPageMetaData : IPageData, IPublishControlled, IVersioned
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 128)]
        [ImmutableFieldId("{B2A5EE23-848D-4D0B-A801-FDF68F9F899E}")]
        string FieldName { get; set; }
    }
}
