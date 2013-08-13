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
    }
}
 