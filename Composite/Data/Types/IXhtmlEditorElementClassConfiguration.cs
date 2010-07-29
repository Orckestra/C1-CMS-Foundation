namespace Composite.Data.Types
{
    /// <summary>
    /// Describes a concrete element class name configuration for an XHTML Editor
    /// </summary>    
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [ImmutableTypeId("{E73D643F-D8D4-45ff-B757-D0149F43D24C}")]
    [KeyPropertyName("ConfigurationName")]
    [KeyPropertyName("ElementName")]
    [KeyPropertyName("ClassName")]
    [DataScope(DataScopeIdentifier.AdministratedName)]
    public interface IXhtmlEditorElementClassConfiguration : IData
    {
        [ImmutableFieldId("{01687E1C-5D60-496f-B6EF-DA4FFA096E18}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 128)]
        string ConfigurationName { get; set; }

        [ImmutableFieldId("{DC77C829-5284-4387-85B9-C67634B07E34}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 128)]
        string ElementName { get; set; }

        [ImmutableFieldId("{6311E515-41D8-4686-B6E6-CA6BE9CD9685}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 128)]
        string ClassName { get; set; }
    }
}

