using System;
using System.Collections.Generic;


namespace Composite.Data.Types
{
    /// Using the same name for a metadata definition is allowed iff metadata type and label are the same
    /// on all instances.
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [KeyPropertyName("Id")]
    [ImmutableTypeId("{F0101D4E-2EC2-4D24-B0BD-BE367DC7C3E1}")]
    [CachingAttribute(CachingType.Full)]
    [DataScope(DataScopeIdentifier.PublicName)]
    public interface IPageMetaDataDefinition : IData
    {
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [DefaultFieldNewGuidValue()]
        [ImmutableFieldId("{C30E50F4-64BF-46A8-B8C9-A8F8CA62C74D}")]
        Guid Id { get; set; }


        /// <summary>
        /// This is an id of a page or pagetype item and a reference to the
        /// elemen where this description is defined.
        /// This should be an id of a page or pagetype og Guid.Empty for 
        /// the whole website
        /// </summary>
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{5C8A6831-8B94-424c-90C7-7C9385E5DB7C}")]
        Guid DefiningItemId { get; set; }



        [StoreFieldType(PhysicalStoreFieldType.String, 128)]
        [ImmutableFieldId("{8B421E9F-F0B5-4D27-B1E9-87D6814EAC0F}")]
        string Name { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.String, 256)]
        [ImmutableFieldId("{3838006A-88D1-485F-8ED6-46E14E6A738B}")]
        string Label { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{9EA6FEA8-B2E7-4F44-A5F5-0169123CEC77}")]
        [ForeignKey(typeof(ICompositionContainer), "Id", AllowCascadeDeletes = true)]
        Guid MetaDataContainerId { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{1AD2B5F6-F5AE-496A-B9FA-47BF5E90F5F2}")]
        Guid MetaDataTypeId { get; set; }


        /// <summary>
        /// Start level number relativ to the page where this is defined.
        /// 0 will include the page it self
        /// </summary>
        [StoreFieldType(PhysicalStoreFieldType.Integer)]
        [ImmutableFieldId("{8AC8520E-97B9-4F58-B9A4-D5ED33C482EC}")]
        int StartLevel { get; set; }


        /// <summary>
        /// The number of levels this definition affects
        /// Use int.Max for branch
        /// </summary>
        [StoreFieldType(PhysicalStoreFieldType.Integer)]
        [ImmutableFieldId("{C76C80E0-C8DF-4A7B-8931-D3C3B229F44E}")]
        int Levels { get; set; }
    }




    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class PageMetaDataDefinitionEqualityComparer : IEqualityComparer<IPageMetaDataDefinition>
    {
        public bool Equals(IPageMetaDataDefinition x, IPageMetaDataDefinition y)
        {
            return x.Name == y.Name && x.MetaDataTypeId == y.MetaDataTypeId;
        }

        public int GetHashCode(IPageMetaDataDefinition obj)
        {
            return obj.Name.GetHashCode() ^ obj.MetaDataTypeId.GetHashCode();
        }
    }
}
