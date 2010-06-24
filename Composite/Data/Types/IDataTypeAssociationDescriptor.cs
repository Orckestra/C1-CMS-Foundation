using System;


namespace Composite.Data.Types
{
    [Obsolete]
    [ImmutableTypeId("{F05D1E02-D613-4109-81A0-8071EA5F22A4}")]
    [AutoUpdatebleAttribute]
    [KeyPropertyName("TypeDescriptorId")]
    [KeyPropertyName("Id")]
    [CachingAttribute(CachingType.Full)]
    [DataScope(DataScopeIdentifier.PublicName)]
    [NotReferenceableAttribute]
	public interface IDataTypeAssociationDescriptor : IData
	{
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{DC7F4591-C270-4bfb-A6E4-8D6069A1F390}")]
        Guid TypeDescriptorId { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{D66267C3-43B9-48b1-9318-20AD9091FB6A}")]
        Guid Id { get; set; }

        [StoreFieldType(PhysicalStoreFieldType.String, 1024)]
        [ImmutableFieldId("{8CAB82CD-3CD5-45d4-ACD5-9290A131C340}")]
        string AssociatedInterfaceType { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.String, 128)]
        [ImmutableFieldId("{B4203FBE-37C6-4085-BD80-54896B77E840}")]
        string ForeignKeyPropertyName { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.String, 64)]
        [ImmutableFieldId("{FC51909C-E761-4477-B364-B2517EE26472}")]
        string AssociationType { get; set; }
	}
}
