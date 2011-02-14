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
    [ImmutableTypeId("{D3AC39D8-1FE6-4BB3-BFEA-2DAFECACF0FC}")]
    [KeyPropertyName("Id")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    [DataScope(DataScopeIdentifier.PublicName)]
    [Caching(CachingType.Full)]
    public interface IInlineFunctionAssemblyReference : IData
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{9F7C1C30-E115-479D-9471-AEB83A9AAF63}")]
        Guid Id { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{E08E79F6-ED40-447D-A2B6-592704FE7B96}")]
        Guid Function { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 128)]
        [ImmutableFieldId("{30DA8550-252A-4EBB-A9D4-78DA26784E4B}")]
        [NotNullValidator()]
        string Name { get; set; }


        /// <summary>
        /// This could be either Bin or System
        /// </summary>
        [StoreFieldType(PhysicalStoreFieldType.String, 128)]
        [ImmutableFieldId("{221D7E98-3859-49BF-AEED-57C580396680}")]
        string Location { get; set; }
    }
}
