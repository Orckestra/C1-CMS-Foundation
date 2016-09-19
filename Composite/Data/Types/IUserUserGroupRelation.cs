using System;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;


namespace Composite.Data.Types
{
    /// <summary>    
    /// This data interface represents a user relation to a user group in Orckestra CMS. This can be used to query user group members through a <see cref="Composite.Data.DataConnection"/>. 
    /// </summary>
    [AutoUpdateble]
    [KeyPropertyName(0, "UserId")]
    [KeyPropertyName(1, "UserGroupId")]
    [DataScope(DataScopeIdentifier.PublicName)]
    [ImmutableTypeId("{956BC414-4612-4a8a-A673-B82695F322DD}")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    public interface IUserUserGroupRelation : IData
	{
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ForeignKey(typeof(IUser), "Id", AllowCascadeDeletes = true)]
        [ImmutableFieldId("{529E233A-0386-4cca-8A32-69FE156EAEE1}")]
        Guid UserId { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ForeignKey(typeof(IUserGroup), "Id", AllowCascadeDeletes = true)]
        [ImmutableFieldId("{9BB13E81-3125-45eb-87A8-D0DE671A3102}")]
        Guid UserGroupId { get; set; }
    }
}
