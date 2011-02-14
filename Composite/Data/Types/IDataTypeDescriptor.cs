using System;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Obsolete]
    [ImmutableTypeId("{CFABB0C0-BC84-43ce-AAB5-532B254AF456}")]
    [AutoUpdatebleAttribute]
    [KeyPropertyName("Id")]
    [CachingAttribute(CachingType.Full)]
    [DataScope(DataScopeIdentifier.PublicName)]
    [NotReferenceableAttribute]
    public interface IDataTypeDescriptor : IData
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{0682939A-2E8B-4557-90F8-EDD5EEB63FDD}")]
        Guid Id { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 256)]
        [ImmutableFieldId("{AD5EC528-E84A-47fd-AAE7-D35F7B14DC14}")]
        string Name { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 1024)]
        [ImmutableFieldId("{921686E8-9B31-4e23-9601-56CBB20261DB}")]
        string Namespace { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 64)]
        [ImmutableFieldId("{29BF21B7-320C-44f4-A526-5FB99E235DAF}")]
        [DefaultFieldStringValue("")]
        string Title { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 1280)]
        [ImmutableFieldId("{B4669964-8823-4bde-A0DE-6FC5D7E514DC}")]
        string TypeManagerTypeName { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 256, IsNullable = true)]
        [ImmutableFieldId("{A17EBC76-859C-4246-9BC2-66CFC7A7BDC6}")]
        string LabelFieldName { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Integer)]
        [ImmutableFieldId("{1ED4B7B0-8A57-4072-BFC3-0B12523E723A}")]
        int Version { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Boolean)]
        [ImmutableFieldId("{C68F6C37-4701-4019-AACF-74D60CA907D9}")]
        bool CodeGenerated { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Boolean)]
        [ImmutableFieldId("{CB2073CA-F2DD-485b-9B03-1D2544CED324}")]
        [DefaultFieldBoolValue(false)]
        bool Cachable { get; set; }
    }
}
