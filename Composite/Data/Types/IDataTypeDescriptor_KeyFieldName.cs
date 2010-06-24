using System;


namespace Composite.Data.Types
{
    [Obsolete]
    [ImmutableTypeId("{1698785D-33AF-4f07-BA39-A118FDEED4A0}")]
    [AutoUpdatebleAttribute]
    [KeyPropertyName("TypeDescriptorId")]
    [KeyPropertyName("Name")]
    [CachingAttribute(CachingType.Full)]
    [DataScope(DataScopeIdentifier.PublicName)]
    [NotReferenceableAttribute]
    public interface IDataTypeDescriptor_KeyFieldName : IData
    {
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{FC540000-891F-4e47-BD1B-E315BEF1AB71}")]
        Guid TypeDescriptorId { get; set; }

        [StoreFieldType(PhysicalStoreFieldType.String, 255)]
        [ImmutableFieldId("{CEF5B674-A316-4bdc-BA90-B5F01274F89B}")]
        string Name { get; set; }
    }
}
