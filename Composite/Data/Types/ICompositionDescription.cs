using System;
using Composite.Data.Types.Foundation;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Obsolete("See IPageMetaDataDesciption")]
    [AutoUpdateble]    
    [KeyPropertyName("Name")]
    [ImmutableTypeId("{1169850E-8495-4b8e-8B0F-FA620A08CC3D}")]
    [CachingAttribute(CachingType.Full)]
    [DataScope(DataScopeIdentifier.PublicName)]
    public interface ICompositionDescription : IAssociationDescription
    {
        /// <summary>
        /// Uniqueue name per meta data type
        /// </summary>
        [StoreFieldType(PhysicalStoreFieldType.String, 128)]
        [ImmutableFieldId("{63C51D2C-F54D-4123-BF12-D89F69776AF2}")]
        string Name { get; set; }


        /// <summary>
        /// Used when displaying meta data input fields on edit page
        /// </summary>
        [StoreFieldType(PhysicalStoreFieldType.String, 256)]
        [ImmutableFieldId("{BE0506DC-6717-40e0-B767-CCD502960719}")]
        string Label { get; set; }


        /// <summary>
        /// Used when displaying meta data input fields on edit page
        /// </summary>
        [StoreFieldType(PhysicalStoreFieldType.Integer)]
        [ImmutableFieldId("{9BC3DD37-ECA4-4fc6-892C-3E6CC6D388C6}")]
        int SortOrder { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{1DCF94D4-F1A7-411c-8EFD-8C010CB6A8EE}")]
        [ForeignKey(typeof(ICompositionContainer), "Id", AllowCascadeDeletes = true)]
        Guid CompositionContainerForeignKey { get; set; }        
    }
}
