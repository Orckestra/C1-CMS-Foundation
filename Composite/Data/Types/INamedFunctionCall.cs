using System;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;


namespace Composite.Data.Types
{
    [AutoUpdateble]
    [ImmutableTypeId("{7eccf947-1abd-43d5-b28b-551a44a3fe96}")]
    [KeyPropertyName("XsltFunctionId")]
    [KeyPropertyName("Name")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    [DataScope(DataScopeIdentifier.PublicName)]
    [Caching(CachingType.Full)]
    [NotReferenceable]
    public interface INamedFunctionCall : IData
    {
        [ImmutableFieldId("{f60e9cda-a461-4234-b225-5ea3eb51a1fb}")]
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        Guid XsltFunctionId { get; set; }


        [ImmutableFieldId("{4c042ad7-9bf5-4875-a369-3720c1b79380}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 256)]
        string Name { get; set; }


        [ImmutableFieldId("{cfc67bfa-2252-4642-91dc-623ca9e1d027}")]
        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        string SerializedFunction { get; set; }
    }
}
