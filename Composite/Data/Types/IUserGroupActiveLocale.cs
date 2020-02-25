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
    [ImmutableTypeId("{f60f4da8-59df-460f-84bf-5bf20700036b}")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
	public interface IUserGroupActiveLocale : IData
	{
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{80c5cc7c-bf23-4c7d-bfe0-d168eda41d50}")]
        Guid Id { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{f28ada6a-12bd-43bf-aef8-1b693ee3d390}")]
        Guid UserGroupId { get; set; }


        /// <exclude />
        [NotNullValidator()]
        [StringSizeValidator(2, 16)]
        [StoreFieldType(PhysicalStoreFieldType.String, 16)]
        [ImmutableFieldId("{ddc38768-16e8-444c-a982-80f2a55b0b75}")]
        [ForeignKey(typeof(ISystemActiveLocale), nameof(ISystemActiveLocale.CultureName), AllowCascadeDeletes = true)]
        string CultureName { get; set; }
	}
}
