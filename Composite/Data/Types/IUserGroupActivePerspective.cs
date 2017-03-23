using System;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [AutoUpdateble]
    [KeyPropertyName(nameof(Id))]
    [DataScope(DataScopeIdentifier.PublicName)]
    [ImmutableTypeId("{13FBE551-DC00-4ad4-8720-7FF66264C002}")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    [Caching(CachingType.Full)]
    public interface IUserGroupActivePerspective : IData
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{2BC54612-C92E-4cc4-8B6B-2B4C9EABADC5}")]
        Guid Id { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{45B9D62A-6DDC-4bdf-BFE3-4D4CD0D6A658}")]
        Guid UserGroupId { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        [ImmutableFieldId("{56CAEDCB-600D-476c-B085-617CA773721F}")]
        string SerializedEntityToken { get; set; }
    }
}
