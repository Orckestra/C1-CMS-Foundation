using System;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [KeyPropertyName("Id")]
    [ImmutableTypeId("{1488334F-2AB6-4D8D-9E1B-7EE4A990469D}")]
    [CachingAttribute(CachingType.Full)]
    [DataScope(DataScopeIdentifier.PublicName)]
    public interface IPageFolderDefinition : IData
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [DefaultFieldNewGuidValue()]
        [ImmutableFieldId("{383F3019-60AD-4E16-8ACF-6568A4A13B2A}")]
        Guid Id { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]        
        [ImmutableFieldId("{3FF30313-C5C0-49CB-A8E6-1875864F8EAC}")]
        Guid PageId { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{619E698B-9D3B-4DFA-BA1C-A591446FF1A2}")]
        Guid FolderTypeId { get; set; }
    }
}
