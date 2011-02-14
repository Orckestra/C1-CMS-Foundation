using System;

namespace Composite.Data.Types.Foundation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Obsolete("See IPageMetaDataDesciption")]
    [AutoUpdateble]
    [KeyPropertyName("Id")]
    [CachingAttribute(CachingType.Full)]
    [DataScope(DataScopeIdentifier.PublicName)]
    public interface IAssociationVisability : IData
	{
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{94B60BC6-C4E5-4f5f-AB8C-5D31CF12AD40}")]
        Guid Id { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{23F79A74-744C-4dcd-88DA-088C865D0B6A}")]
        Guid AssociatedImmutableTypeId { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{46E9D0BC-54C9-4f71-9326-0C59D5063EEB}")]
        Guid AssociationImmutableTypeId { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 256)]
        [ImmutableFieldId("{2A0A85D6-2766-4ad6-8862-54456680407D}")]
        string VisabilityRule { get; set; }
	}
}
