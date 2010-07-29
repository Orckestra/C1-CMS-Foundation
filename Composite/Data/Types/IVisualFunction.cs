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
    [ImmutableTypeId("{FB2EAE51-1214-491d-8174-3A99DF90DFFA}")]
    [KeyPropertyName("Id")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    [DataScope(DataScopeIdentifier.PublicName)]
    [Caching(CachingType.Full)]
    [NotReferenceable]
    public interface IVisualFunction : IData
	{
        [ImmutableFieldId("{F8678EC3-FA5A-4141-9C93-130C93A49413}")]
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        Guid Id { get; set; }


        [ImmutableFieldId("{6CED428C-6190-4176-9E6D-C6DBCF9BD4C3}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 256)]
        string Name { get; set; }


        [ImmutableFieldId("{D6E1D464-1343-4f08-AB97-759D7DD1EB80}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 512)]
        string Namespace { get; set; }


        [ImmutableFieldId("{A40492CA-BEB9-43cb-83CA-082889575A36}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 512)]
        string Description { get; set; }


        [ImmutableFieldId("{4737CCE8-9302-438a-87B0-DF28C974DC57}")]
        [StoreFieldType(PhysicalStoreFieldType.String,256)]
        string TypeManagerName { get; set; }


        [ImmutableFieldId("{FE3D5717-8F42-48e8-A089-AD431BEA1708}")]
        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        string XhtmlTemplate { get; set; }


        [ImmutableFieldId("{92479348-53B0-410d-8200-B3C6D7AFE54E}")]
        [StoreFieldType(PhysicalStoreFieldType.Integer)]
        int MaximumItemsToList { get; set; }


        [ImmutableFieldId("{3E41CE01-166F-41fb-A0FA-93EB5E3391DA}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 64)]
        string OrderbyFieldName { get; set; }

        [ImmutableFieldId("{790B0F2E-CAB7-4eea-9EB2-5E49C8DE7575}")]
        [StoreFieldType(PhysicalStoreFieldType.Boolean)]
        [DefaultFieldBoolValue(true)]
        bool OrderbyAscending { get; set; }
    }
}
