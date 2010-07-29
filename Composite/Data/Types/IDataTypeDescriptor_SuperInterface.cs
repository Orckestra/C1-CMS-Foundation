using System;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Obsolete]
    [ImmutableTypeId("{5113259E-BB9C-42ca-92BF-7F7283B7C232}")]
    [AutoUpdateble]
    [KeyPropertyName("TypeDescriptorId")]
    [KeyPropertyName("InterfaceTypeName")]
    [CachingAttribute(CachingType.Full)]
    [DataScope(DataScopeIdentifier.PublicName)]
    [NotReferenceableAttribute]
	public interface IDataTypeDescriptor_SuperInterface : IData
	{
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{4D7CFC90-74AA-4fe6-9568-CF658869F865}")]
        Guid TypeDescriptorId { get; set; }

        [StoreFieldType(PhysicalStoreFieldType.String, 1024)]
        [ImmutableFieldId("{FD6A8473-7FA2-4f43-9306-9F5E24BB9A9F}")]
        string InterfaceTypeName { get; set; }
	}
}
