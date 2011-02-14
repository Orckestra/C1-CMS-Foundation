using System;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;
using Composite.Data.Validation.Validators;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [Caching(CachingType.Full)]
    [KeyPropertyName("Id")]
    [DataScope(DataScopeIdentifier.PublicName)]
    [ImmutableTypeId("{13A5FCB2-1481-4443-866D-8976B4789B6C}")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
	public interface ISystemActiveLocale : IData
	{
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{ABFBC594-8EE2-4578-9414-34713F1E9A39}")]
        Guid Id { get; set; }


        /// <exclude />
        [NotNullValidator()]
        [StringSizeValidator(2, 16)]
        [StoreFieldType(PhysicalStoreFieldType.String, 16)]
        [ImmutableFieldId("{4A1AEACC-846F-49d4-A0AE-A870AC2D840B}")]
        string CultureName { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 64)]
        [StringSizeValidator(0, 64)]
        [ImmutableFieldId("{85009F2B-EB00-4d9f-AC43-36D6BEB99181}")]
        string UrlMappingName { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Boolean)]
        [ImmutableFieldId("{3CF887A9-44FB-4193-A070-67E4324F9206}")]
        bool IsDefault { get; set; }
	}
}
