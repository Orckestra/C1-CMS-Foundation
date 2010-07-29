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
    [ImmutableTypeId("{24CDC117-4510-41C4-8A73-D1B4CD85FE2A}")]
    [KeyPropertyName("Id")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    [DataScope(DataScopeIdentifier.PublicName)]
    [CachingAttribute(CachingType.Full)]
    public interface IDataItemTreeAttachmentPoint : IData
    {
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{BEB44A8E-37FD-4FA6-A420-B252B8590AD6}")]
        Guid Id { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        [ImmutableFieldId("{FA9A44E0-9D41-491A-86C0-BC5189FFC023}")]
        string TreeId { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.String, 64)]
        [ImmutableFieldId("{6624A6CF-29DC-4E6A-8B88-25514BC00758}")]
        string Position { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        [ImmutableFieldId("{F08DB525-2218-4379-A6F6-A9A904DEF6FE}")]
        string InterfaceType { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        [ImmutableFieldId("{8A50C365-586D-45F5-8881-EC3878E16593}")]
        string KeyValue { get; set; }
    }
}
