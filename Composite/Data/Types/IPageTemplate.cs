using System;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [ImmutableTypeId("{7B54D7D2-6BE6-48a6-9AE1-2E0373073D1D}")]
    [KeyPropertyName("Id")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    [DataScope(DataScopeIdentifier.PublicName)]
    [LabelPropertyName("Title")]
    [CachingAttribute(CachingType.Full)]
    public interface IPageTemplate : IData
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{E94FDE4D-7FDB-4b0e-A320-83EE73A73397}")]
        Guid Id { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 249)]
        [ImmutableFieldId("{BF377CD5-A96F-44f1-91AF-CF2E6F530E61}")]
        [NotNullValidator()]
        string Title { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 255)]
        [ImmutableFieldId("{0F654E1F-1453-428f-9EC9-7CC9CFBD59DC}")]
        string PageTemplateFilePath { get; set; }
    }
}
