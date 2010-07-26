using System;

namespace Composite.Data.Types
{
    [Obsolete]
    [ImmutableTypeId("{A64230E3-63C3-4c2a-BF4B-23FFD2B92E2E}")]
    [AutoUpdateble]
    [KeyPropertyName("TypeDescriptorId")]
    [KeyPropertyName("Id")]
    [CachingAttribute(CachingType.Full)]
    [DataScope(DataScopeIdentifier.PublicName)]
    [NotReferenceableAttribute]
	public interface IDataFieldDescriptor_ValidatorFunctionMarkup : IData
	{
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{FA08753F-48DB-496b-B074-B4A4B3C647E0}")]
        Guid Id { get; set; }

        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{19FB9F69-0769-4e00-9D00-7C1341C13E49}")]
        Guid TypeDescriptorId { get; set; }

        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{50233771-0020-407c-A975-85C9BD69BA74}")]
        Guid FieldDescriptorId { get; set; }

        [StoreFieldType(PhysicalStoreFieldType.String, 1280)]
        [ImmutableFieldId("{9BE98AA7-8436-475f-9360-DF211BEDF840}")]
        string ValidatorFunctionMarkup { get; set; }
	}
}
