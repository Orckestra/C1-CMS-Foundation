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
    [ImmutableTypeId("{8CCA4975-8FE0-464A-A806-A098E9138FAE}")]
    [KeyPropertyName("Id")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    [DataScope(DataScopeIdentifier.PublicName)]
    [Caching(CachingType.Full)]
    public interface IInlineFunction : IData
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{720643FF-9743-414B-AE2C-88A8CC4DADBB}")]
        Guid Id { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 128)]
        [ImmutableFieldId("{A3710B8F-BD8E-4A9A-BB7B-A796198C55B9}")]
        [Composite.Data.Validation.Validators.StringSizeValidator(1, 128)]
        [NotNullValidator()]
        string Name { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 128)]
        [ImmutableFieldId("{8C5BA3EE-FE14-4346-8CF2-8A0BEDAF94FB}")]
        [Composite.Data.Validation.Validators.StringSizeValidator(1, 128)]
        string Namespace { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        [ImmutableFieldId("{935757BE-4959-4CBD-92BC-2ABD40C2969B}")]
        string Description { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 512)]
        [ImmutableFieldId("{623358E0-506A-463F-A0D5-C6B6B8F916C3}")]
        string CodePath { get; set; }
    }
}
