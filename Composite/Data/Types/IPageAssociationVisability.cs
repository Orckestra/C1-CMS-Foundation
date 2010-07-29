using System;
using Composite.Data.Types.Foundation;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Obsolete("See IPageMetaDataDesciption")]
    [ImmutableTypeId("{C580B163-3544-43d1-AC01-F62476224E8A}")]
    public interface IPageAssociationVisability : IAssociationVisability
    {
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{5C8A6831-8B94-424c-90C7-7C9385E5DB7C}")]
        Guid PageForeignKey { get; set; }
    }
}
