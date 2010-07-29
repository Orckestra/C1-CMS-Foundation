using System;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [ImmutableTypeId("{A7F15FD7-2175-42A9-8210-DB30BD45A1C1}")]
    [KeyPropertyName("Id")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    [DataScope(DataScopeIdentifier.PublicName)]
    [CachingAttribute(CachingType.Full)]
    public interface IPageTypePageTemplateRestriction : IData
    {
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{00695FA5-E6BC-492C-B519-6188131CED03}")]
        Guid Id { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{5B97F19B-C18B-4470-85BE-193E9208BB49}")]
        [ForeignKey(typeof(IPageType), "Id", AllowCascadeDeletes = true)]
        Guid PageTypeId { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{29A3D441-66EB-484D-A15D-077B5F070F42}")]
        [ForeignKey(typeof(IPageTemplate), "Id")]
        Guid PageTemplateId { get; set; }
    }
}
