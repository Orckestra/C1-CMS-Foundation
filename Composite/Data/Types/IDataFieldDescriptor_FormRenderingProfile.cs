using System;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Obsolete]
    [ImmutableTypeId("{B0CB5A43-3898-4887-ACED-B58151FC4561}")]
    [AutoUpdatebleAttribute]
    [KeyPropertyName("TypeDescriptorId")]
    [KeyPropertyName("FieldDescriptorId")]
    [CachingAttribute(CachingType.Full)]
    [DataScope(DataScopeIdentifier.PublicName)]
    [NotReferenceableAttribute]
    public interface IDataFieldDescriptor_FormRenderingProfile : IData
	{
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{0fc19e72-f51a-445d-b275-275596dc8fa9}")]
        Guid TypeDescriptorId { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{3D5F7842-F261-4145-89D1-CF667DEF7559}")]
        Guid FieldDescriptorId { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 256)]
        [ImmutableFieldId("{9D3395B7-7F32-42b3-9A4B-C533D3B79EF1}")]
        string Label { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 2048)]
        [ImmutableFieldId("{3BB7431F-057F-4d11-85FE-4FD8E1411C22}")]
        string HelpText { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 1024)]
        [ImmutableFieldId("{0E854217-455D-4849-B037-32CC430B488B}")]
        string WidgetFunctionMarkup { get; set; }
	}
}
