using System;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Data.Types
{
    [AutoUpdateble]
    [ImmutableTypeId("{40063ED1-D547-4aff-AD58-F0BB68D571AC}")]
    [KeyPropertyName("Id")]
    [LabelPropertyName("Id")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    [DataScope(DataScopeIdentifier.PublicName)]    
    public interface IFlowInformation : IData
    {
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{375703F5-33AA-45c7-B3B1-401726A9A98C}")]
        Guid Id { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.String, 64)]
        [ImmutableFieldId("{829CC401-E0D0-427b-9DCD-4AD19E6FBCB3}")]
        [NotNullValidator()]
        string Username { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.String, 64)]
        [ImmutableFieldId("{57AF5100-F625-4640-A418-BC149A22B718}")]
        [NotNullValidator()]
        string ConsoleId { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        [ImmutableFieldId("{5C389A14-B2C6-494e-A14B-1E1E38ECFFDD}")]        
        string SerializedFlowToken { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        [ImmutableFieldId("{9432E3D8-8C66-47dd-B71D-A9D5C84E855C}")]
        string SerializedEntityToken { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        [ImmutableFieldId("{D2AE7893-4C3B-419a-8BC3-5387457AA9E4}")]
        string SerializedActionToken { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.DateTime)]
        [ImmutableFieldId("{AF38EF8B-34FA-4d42-B49B-E427259E00F3}")]
        DateTime TimeStamp { get; set; }
    }
}
