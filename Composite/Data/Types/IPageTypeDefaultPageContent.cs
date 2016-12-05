using System;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [ImmutableTypeId("{C326C3F7-81C4-47BD-9C17-83BE2CF980BA}")]
    [KeyPropertyName("Id")]
    [LabelPropertyName("PlaceHolderId")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    [DataScope(DataScopeIdentifier.PublicName)]
    [CachingAttribute(CachingType.Full)]
    public interface IPageTypeDefaultPageContent : IData
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{0EB4D9D3-32BB-4850-AAB7-B20CFBA4F571}")]
        Guid Id { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{B2CD7FDA-1CF5-4461-A6DB-1F188B28B054}")]
        [ForeignKey(typeof(IPageType), "Id", AllowCascadeDeletes = true)]
        Guid PageTypeId { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 255)]
        [ImmutableFieldId("{122F2047-B01E-4F67-BBA3-CA67E50D985E}")]
        [NotNullValidator()]        
        string PlaceHolderId { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        [ImmutableFieldId("{0D1DEE90-220D-4741-AFD6-E18DB982A673}")]
        string Content { get; set; }

        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 64, IsNullable = true)]
        [ImmutableFieldId("{68880B4B-437F-4041-BF44-FB77ADCE75AA}")]
        string ContainerClasses { get; set; }
    }
}
