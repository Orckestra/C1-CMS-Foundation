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
    [LabelPropertyName("PermissionTypeName")]
    [DataScope(DataScopeIdentifier.PublicName)]
    [ImmutableTypeId("{21FA38B5-7B45-4f2d-9F40-2BDDA80724B8}")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    public interface IUserGroupPermissionDefinitionPermissionType : IData
    {
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{DCEDF510-8742-431b-B10C-66ADCCC6A71F}")]
        Guid Id { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{32D99BCA-1DD2-4b52-9887-5089B5EAA055}")]
        [ForeignKey(typeof(IUserGroupPermissionDefinition), "Id", AllowCascadeDeletes = true)]
        Guid UserGroupPermissionDefinitionId { get; set; }


        [NotNullValidator()]
        [StoreFieldType(PhysicalStoreFieldType.String, 64)]
        [ImmutableFieldId("{63A05B43-EF86-4e8c-801B-A80D4D0202AA}")]
        string PermissionTypeName { get; set; }
    }
}
