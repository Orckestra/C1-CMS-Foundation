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
    [TypeVersion(2)]
    [ImmutableTypeId("{EEA30040-5B54-46c6-826A-4633E563AB70}")]
    [KeyPropertyName("Id")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    [DataScope(DataScopeIdentifier.PublicName)]
    [Caching(CachingType.Full)]
    [NotReferenceable]
    public interface ISqlConnection : IData
	{
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{37861406-C595-4c16-8845-B77DCF1B4EAB}")]
        Guid Id { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Boolean)]
        [ImmutableFieldId("{0887CB9C-1FC6-4d18-A288-CC6D8A44CCC8}")]
        bool IsMsSql { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 1024)]
        [ImmutableFieldId("{82F89ADD-060D-4f09-B69A-16509CB2E730}")]
        string EncryptedConnectionString { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 255)]
        [ImmutableFieldId("{9CBA57D7-6EA8-45da-BC0B-AFD929212B73}")]
        string Name { get; set; }
	}
}
