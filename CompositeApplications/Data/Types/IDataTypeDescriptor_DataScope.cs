using System;


namespace Composite.Data.Types
{
    [Obsolete]
    [ImmutableTypeId("{69a40cea-11f4-4e4f-84b3-80b7babebf8a}")]
    [AutoUpdateble]
    [KeyPropertyName("TypeDescriptorId")]
    [KeyPropertyName("SerializedDataScopeIdentifier")]
    [CachingAttribute(CachingType.Full)]
    [DataScope(DataScopeIdentifier.PublicName)]
    [NotReferenceableAttribute]
    public interface IDataTypeDescriptor_DataScope : IData
    {
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{9059bc84-7822-480f-bb48-11e08ef08f88}")]
        Guid TypeDescriptorId { get; set; }

        [StoreFieldType(PhysicalStoreFieldType.String, 64)]
        [ImmutableFieldId("{f66787d8-8be5-4fde-8ae0-6bc5f9397dcb}")]
        string SerializedDataScopeIdentifier { get; set; }
    }
}
