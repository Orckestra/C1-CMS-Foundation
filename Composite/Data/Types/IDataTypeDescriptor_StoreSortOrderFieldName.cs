using System;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Obsolete]
    [ImmutableTypeId("{6FCF28F8-3EE2-4272-AB61-10543A2CECBF}")]
    [AutoUpdatebleAttribute]
    [KeyPropertyName("TypeDescriptorId")]
    [KeyPropertyName("FieldName")]
    [CachingAttribute(CachingType.Full)]
    [DataScope(DataScopeIdentifier.PublicName)]
    [NotReferenceableAttribute]
    public interface IDataTypeDescriptor_StoreSortOrderFieldName : IData
	{
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{A675F96F-D452-4f86-B11C-388A4ED870C8}")]
        Guid TypeDescriptorId { get; set; }

        [StoreFieldType(PhysicalStoreFieldType.String, 255)]
        [ImmutableFieldId("{C63ADD60-2DE2-4bb1-A90E-4E01221C2578}")]
        string FieldName { get; set; }

        [StoreFieldType(PhysicalStoreFieldType.Integer)]
        [ImmutableFieldId("{AB1746B5-7F46-4e9b-AE92-70BE8079A6FA}")]
        int SortOrder { get; set; }
	}
}
