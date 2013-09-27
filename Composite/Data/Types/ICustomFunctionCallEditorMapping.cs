namespace Composite.Data.Types
{

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [ImmutableTypeId("{67cf4b4d-1376-4589-abd4-5cfa9966670b}")]
    [KeyPropertyName("FunctionName")]
    [DataScope(DataScopeIdentifier.PublicName)]
    [CachingAttribute(CachingType.Full)]
    public interface ICustomFunctionCallEditorMapping: IData
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 255)]
        [ImmutableFieldId("{1145f17b-c93b-443f-917e-88b7cc4e85c5}")]
        string FunctionName { get; set; }

        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 255)]
        [ImmutableFieldId("{96671d53-4657-439b-8abd-4e01f3c80fd7}")]
        string CustomEditorPath { get; set; }

        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Integer, IsNullable = true)]
        [ImmutableFieldId("{3af4e226-c06d-448d-a93e-3457cd4e9bf6}")]
        int? Width { get; set; }

        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Integer, IsNullable = true)]
        [ImmutableFieldId("{7bd25407-193b-42e5-ae59-26a99bdee2c1}")]
        int? Height { get; set; }
    }
}
 