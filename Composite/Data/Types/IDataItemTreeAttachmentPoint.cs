using System;
using Composite.C1Console.Elements.Plugins.ElementAttachingProvider;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;


namespace Composite.Data.Types
{
    /// <summary>
    /// Represents a link between a tree definition and a data item.
    /// F.e. a tree that shows navigation elements, attached to a specific C1 page.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [ImmutableTypeId("{24CDC117-4510-41C4-8A73-D1B4CD85FE2A}")]
    [KeyPropertyName(nameof(Id))]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    [DataScope(DataScopeIdentifier.PublicName)]
    [Caching(CachingType.Full)]
    public interface IDataItemTreeAttachmentPoint : IData
    {
        /// <summary>
        /// The Id value for the attachment point.
        /// </summary>
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{BEB44A8E-37FD-4FA6-A420-B252B8590AD6}")]
        Guid Id { get; set; }


        /// <summary>
        /// The Id of the tree that is attached.
        /// </summary>
        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        [ImmutableFieldId("{FA9A44E0-9D41-491A-86C0-BC5189FFC023}")]
        string TreeId { get; set; }


        /// <summary>
        /// The position in which the tree elements should be shown, f.e. "Top" or "Bottom". See <see cref="ElementAttachingProviderPosition"/>
        /// </summary>
        [StoreFieldType(PhysicalStoreFieldType.String, 64)]
        [ImmutableFieldId("{6624A6CF-29DC-4E6A-8B88-25514BC00758}")]
        string Position { get; set; }


        /// <summary>
        /// The data type of the data item, to which a tree is attached.
        /// </summary>
        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        [ImmutableFieldId("{F08DB525-2218-4379-A6F6-A9A904DEF6FE}")]
        string InterfaceType { get; set; }


        /// <summary>
        /// The key value of the data item to which a tree is attached.
        /// </summary>
        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        [ImmutableFieldId("{8A50C365-586D-45F5-8881-EC3878E16593}")]
        string KeyValue { get; set; }
    }
}
