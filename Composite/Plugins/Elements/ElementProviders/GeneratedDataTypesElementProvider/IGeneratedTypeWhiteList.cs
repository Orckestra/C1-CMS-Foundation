using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;


namespace Composite.Data.Types
{
    /// <summary>  
    /// Reference to a generated/static data type that has to be shown in the 'Content' perspective, under 'Website Items' element
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [ImmutableTypeId("{C447589F-B6DE-4f52-A520-F20E05BA2DB5}")]
    [KeyPropertyName("TypeManagerTypeName")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    [DataScope(DataScopeIdentifier.AdministratedName)]
    [Caching(CachingType.Full)]
	public interface IGeneratedTypeWhiteList : IData
	{
        /// <exclude />
        [ImmutableFieldId("{60243CA2-7B4A-4982-A7CF-D7557FFE611E}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 256)]
        string TypeManagerTypeName { get; set; }
	}
}
