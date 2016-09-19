using System;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [ImmutableTypeId("{3EAA3814-04E6-4c7f-8F1A-004A89BB0848}")]
    [KeyPropertyName(0, nameof(PageId))]
    [KeyPropertyName(1, nameof(PlaceHolderId))]
    [DataAncestorProvider(typeof(PropertyDataAncestorProvider))]
    [PropertyDataAncestorProvider(nameof(PageId), typeof(IPage), nameof(IPage.Id), null)]
    [DataScope(DataScopeIdentifier.PublicName)]
    [DataScope(DataScopeIdentifier.AdministratedName)]
    [CachingAttribute(CachingType.Full)]
    [PublishProcessControllerTypeAttribute(typeof(GenericPublishProcessController))]
    [Title("C1 Page Content")]
    public interface IPagePlaceholderContent : IData, IChangeHistory, ICreationHistory, IPublishControlled, ILocalizedControlled, IVersioned
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{19DFF302-F089-4900-8B64-35F88C82EC45}")]
        [ForeignKey(typeof(IPage), nameof(IPage.Id), AllowCascadeDeletes = true)]
        Guid PageId { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 255)]
        [ImmutableFieldId("{D8243AA6-A02A-4383-9ED1-2A7C1A8841E2}")]
        [NotNullValidator]
        string PlaceHolderId { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        [ImmutableFieldId("{DB0C7557-8C56-4924-A199-3A1E984BE2E8}")]
        string Content { get; set; }
    }

}
