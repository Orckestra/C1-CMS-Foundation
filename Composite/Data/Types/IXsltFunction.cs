using System;
using Composite.Data;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;
using Composite.Data.Caching;
using Composite.Validation.Validators;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [ImmutableTypeId("{F6F0B424-0AFA-4d9a-9DF1-C57F2B7F7C8D}")]
    [KeyPropertyName("Id")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    [DataScope(DataScopeIdentifier.PublicName)]
    public interface IXsltFunction : IData
    {
        [ImmutableFieldId("{25E73650-E7F8-4a4b-8510-9BDA1C1B2D61}")]
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        Guid Id { get; set; }


        [ImmutableFieldId("{8DD6A2E7-CDCE-46b9-B517-36D633B98311}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 256)]
        [Composite.Validation.Validators.StringSizeValidator(1, 256)]
        string Name { get; set; }


        [ImmutableFieldId("{DC241562-2B30-4d06-852D-12E5CFF81EE8}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 512)]
        [Composite.Validation.Validators.StringSizeValidator(1, 512)]
        string Namespace { get; set; }


        [ImmutableFieldId("{2670BEEE-4A6A-4f0f-83E6-8103EEA25D09}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 512)]
        string Description { get; set; }


        [ImmutableFieldId("{1B695E1A-9EBD-4ce8-BA36-711D1E84D8AF}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 32)]
        string OutputXmlSubType { get; set; }


        [ImmutableFieldId("{271AEA09-75CC-45d5-9D7F-C96B1177D046}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 1024)]
        string XslFilePath { get; set; }
    }
}
