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
    [DataScope(DataScopeIdentifier.PublicName)]
    [ImmutableTypeId("{72786B98-C6B6-4192-9438-A4DFB72CF086}")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    public interface IUserGroupPermissionDefinition : IData
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{EE4DD9A0-F0EB-43b7-82DE-7B6B81C02913}")]
        Guid Id { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{E2F41EFE-70CA-448f-86DD-C41FD19E6274}")]
        Guid UserGroupId { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        [ImmutableFieldId("{03FB7549-1C6E-401a-983C-9C0793102A7A}")]
        string SerializedEntityToken { get; set; }
    }
}
