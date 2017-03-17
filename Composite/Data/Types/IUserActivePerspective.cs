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
    [ImmutableTypeId("{A7C6D249-1A71-4486-A252-706D8E1981D8}")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    [Caching(CachingType.Full)]
    public interface IUserActivePerspective : IData
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{9BB04474-DB50-4df1-8EF1-562DE7F58B1A}")]
        Guid Id { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 128)]
        [ImmutableFieldId("{2D5BC444-377A-4337-9486-8210630E6E09}")]
        [ForeignKey(typeof(IUser), "Username", AllowCascadeDeletes = true)]
        string Username { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        [ImmutableFieldId("{5AC5A7E4-4A75-4926-AB53-1A736732A9D4}")]
        string SerializedEntityToken { get; set; }
    }
}
