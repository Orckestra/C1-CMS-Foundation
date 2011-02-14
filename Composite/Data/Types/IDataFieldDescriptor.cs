using System;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Obsolete]
    [ImmutableTypeId("{0DA33842-2B1F-495a-883E-ECE63BA49FB1}")]
    [AutoUpdateble]
    [KeyPropertyName("TypeDescriptorId")]
    [KeyPropertyName("Id")]
    [CachingAttribute(CachingType.Full)]
    [DataScope(DataScopeIdentifier.PublicName)]
    [NotReferenceableAttribute]
    public interface IDataFieldDescriptor : IData
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{7FF54052-3FCD-4d21-B363-29950D7BA527}")]
        Guid TypeDescriptorId { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{688561F7-6A58-4741-9676-4DDDE30C8990}")]
        Guid Id { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 256)]
        [ImmutableFieldId("{0AE7AC46-9D96-4338-A251-7DBE73B7CD37}")]
        string Name { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 1024)]
        [ImmutableFieldId("{2AF4A013-1681-4fb9-8870-52E06502A316}")]
        string StoreType { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 1024)]
        [ImmutableFieldId("{2E8793E0-3497-49cf-A3B6-30524882610A}")]
        string InstanceType { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Integer)]
        [ImmutableFieldId("{149799e0-cba9-4c07-8a74-eeac6ce027f3}")]
        [DefaultFieldIntValue(0)]        
        int Position { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Integer)]
        [ImmutableFieldId("{A0CF0393-1AA9-423e-AE68-BEC84735D5A8}")]
        [DefaultFieldIntValue(0)]
        int GroupByPriority { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 1024, IsNullable = true)]
        [ImmutableFieldId("{351D7BD8-05C7-4324-BEC3-84050827AF84}")]
        string DefaultValue { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Boolean)]
        [ImmutableFieldId("{8FB4AFC7-5516-4cd7-9CCA-2A5B66B7BE9D}")]
        bool IsNullable { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Boolean)]
        [ImmutableFieldId("{FB60B2DD-1B51-47ae-B659-8966C546A733}")]
        bool Inherited { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 1024, IsNullable = true)]
        [ImmutableFieldId("{EE8E8A68-4763-4867-A4E1-2E8E4E1EBD7C}")]
        string ForeignKeyReferenceTypeName { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.LargeString, IsNullable = true)]
        [ImmutableFieldId("{80F471BC-EE4C-48d0-89D7-A27F4B2E37CA}")]
        string NewInstanceDefaultFieldValue { get; set; }
    }
}
