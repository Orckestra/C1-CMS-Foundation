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
    [KeyPropertyName("Id")]
    [Caching(CachingType.Full)]
    [LabelPropertyName("Username")]    
    [DataScope(DataScopeIdentifier.PublicName)]
    [ImmutableTypeId("{0E4BEF62-6C11-4029-B2F5-4BCC8E46F051}")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]    
	public interface IUserPermissionDefinition : IData
	{
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{95D7C9BF-F9E0-41aa-8EEB-8B3336390856}")]
        Guid Id { get; set; }


        /// <exclude />
        [NotNullValidator()]
        [StoreFieldType(PhysicalStoreFieldType.String, 64)]
        [ImmutableFieldId("{8BBE4B23-1B04-452b-B9A3-83EA3B2E52DB}")]
        [ForeignKey(typeof(IUser), "Username", AllowCascadeDeletes = true)]
        string Username { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        [ImmutableFieldId("{15D09268-1119-47d6-A004-99DEABFEF886}")]
        string SerializedEntityToken { get; set; }
	}    
}
