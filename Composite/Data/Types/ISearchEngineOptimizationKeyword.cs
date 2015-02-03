using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;
using Composite.Data.ProcessControlled;
using Composite.Data.Validation.Validators;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [Caching(CachingType.Full)]
    [KeyPropertyName("Keyword")]
    [DataScope(DataScopeIdentifier.PublicName)]
    [ImmutableTypeId("{895F967D-EEAA-437a-9463-E1F95C214ED6}")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    public interface ISearchEngineOptimizationKeyword : IData, ILocalizedControlled
    {
        /// <exclude />
        [NotNullValidator()]
        [StringSizeValidator(1, 128)]
        [StoreFieldType(PhysicalStoreFieldType.String, 128)]
        [ImmutableFieldId("{87EE9B0E-3212-472b-8FDB-2984798CDB79}")]
        string Keyword { get; set; }
    }
}
