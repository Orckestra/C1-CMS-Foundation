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
    [ImmutableTypeId("{4169D18C-8445-4419-8863-F26955AA66D1}")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    public interface IUserPermissionDefinitionPermissionType : IData
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{945834C0-32B8-4ad6-89D9-396415A6D938}")]
        Guid Id { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{EF4BB677-6BCF-4f3a-B416-76C3DCD174CB}")]
        [ForeignKey(typeof(IUserPermissionDefinition), "Id", AllowCascadeDeletes = true)]
        Guid UserPermissionDefinitionId { get; set; }


        /// <exclude />
        [NotNullValidator()]
        [StoreFieldType(PhysicalStoreFieldType.String, 64)]
        [ImmutableFieldId("{E7512410-3FD4-4d3b-9D8A-45734A21CB1D}")]
        string PermissionTypeName { get; set; }
    }
}
