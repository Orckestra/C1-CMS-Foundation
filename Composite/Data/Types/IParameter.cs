using System;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [ImmutableTypeId("{13A37602-A8D6-4b31-B3FE-4F20F038BE10}")]
    [KeyPropertyName(0, "OwnerId")]
    [KeyPropertyName(1, "ParameterId")]
    [DataScope(DataScopeIdentifier.PublicName)]
    [Caching(CachingType.Full)]
    [NotReferenceable]
    public interface IParameter : IData
	{
        /// <exclude />
        [ImmutableFieldId("{77C42214-8CAC-41ea-A1F9-7570E2549235}")]
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        Guid OwnerId { get; set; }


        /// <exclude />
        [ImmutableFieldId("{8610C316-4F7E-4d70-B42A-73F4D5568BE9}")]
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        Guid ParameterId { get; set; }


        /// <exclude />
        [ImmutableFieldId("{6B1CFEEA-2C07-4bf2-BAFD-187EDAA7E453}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 128)]
        string Name { get; set; }


        /// <exclude />
        [ImmutableFieldId("{57BA2948-A336-472f-A635-4B5A1D636707}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 128)]
        string Label { get; set; }


        /// <exclude />
        [ImmutableFieldId("{853D0AE0-DB10-4791-8624-3EEC027D0EF8}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 512)]
        string HelpText { get; set; }


        /// <exclude />
        [ImmutableFieldId("{5D983115-86BA-4bd6-86C9-90474E0C77B5}")]
        [StoreFieldType(PhysicalStoreFieldType.Integer)]
        int Position { get; set; }


        /// <exclude />
        [ImmutableFieldId("{08098E61-5BCC-4b0d-AB9B-8636CC45EC0A}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 512)]
        string TypeManagerName { get; set; }


        /// <exclude />
        [ImmutableFieldId("{21DADDA0-BFAE-4f9d-A3BC-9099771DE73A}")]
        [StoreFieldType(PhysicalStoreFieldType.LargeString, IsNullable = true)]
        string WidgetFunctionMarkup { get; set; }


        /// <exclude />
        [ImmutableFieldId("{16D47452-7933-46fd-A192-C2D10B695C0A}")]
        [StoreFieldType(PhysicalStoreFieldType.LargeString, IsNullable = true)]
        string DefaultValueFunctionMarkup { get; set; }


        /// <exclude />
        [ImmutableFieldId("{11E5E571-8927-414c-8528-40E6876B0613}")]
        [StoreFieldType(PhysicalStoreFieldType.LargeString, IsNullable = true)]
        string TestValueFunctionMarkup { get; set; }
    }
}
