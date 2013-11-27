using System;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;


namespace Composite.Data.Types
{
    /// <summary>    
    /// A named function call for an xslt function
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [ImmutableTypeId("{7eccf947-1abd-43d5-b28b-551a44a3fe96}")]
    [KeyPropertyName(0, "XsltFunctionId")]
    [KeyPropertyName(1, "Name")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    [DataScope(DataScopeIdentifier.PublicName)]
    [Caching(CachingType.Full)]
    [NotReferenceable]
    public interface INamedFunctionCall : IData
    {
        /// <exclude />
        [ImmutableFieldId("{f60e9cda-a461-4234-b225-5ea3eb51a1fb}")]
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        Guid XsltFunctionId { get; set; }


        /// <exclude />
        [ImmutableFieldId("{4c042ad7-9bf5-4875-a369-3720c1b79380}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 256)]
        string Name { get; set; }


        /// <exclude />
        [ImmutableFieldId("{cfc67bfa-2252-4642-91dc-623ca9e1d027}")]
        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        string SerializedFunction { get; set; }
    }
}
