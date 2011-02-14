using System;

namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [TypeVersion(2)]
    [ImmutableTypeId("{cb22316c-4e41-4fe5-a30d-5abc35af124a}")]
    [KeyPropertyName("Id")]
    [DataScope(DataScopeIdentifier.PublicName)]
    [NotReferenceable]
    [CachingAttribute(CachingType.Full)]
    public interface IMediaFolderData : IData
	{
        /// <exclude />
        [ImmutableFieldId("{aa5d40be-d250-4794-b517-bd6977658273}")]
        [StoreFieldType(PhysicalStoreFieldType.Guid)]        
        Guid Id { get; set; }


        /// <exclude />
        [ImmutableFieldId("{cd4f0524-3bfd-4110-bc93-e99713a7a5b7}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 2048, IsNullable = false)]        
        string Path { get; set; }


        /// <exclude />
        [ImmutableFieldId("{4df0e07f-24c0-4d62-bdc7-d50620a530db}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 256, IsNullable = true)]
        string Title { get; set; }


        /// <exclude />
        [ImmutableFieldId("{65e42128-8580-4898-a2fd-0e35cf771c24}")]
        [StoreFieldType(PhysicalStoreFieldType.LargeString, IsNullable = true)]
        string Description { get; set; }
	}
}
