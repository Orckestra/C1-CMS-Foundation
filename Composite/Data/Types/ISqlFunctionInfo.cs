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
    [ImmutableTypeId("{2D78129F-863F-4c5a-B126-1405628351AC}")]
    [KeyPropertyName("Id")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    [DataScope(DataScopeIdentifier.PublicName)]
    [Caching(CachingType.Full)]
    [NotReferenceable]
    public interface ISqlFunctionInfo : IData
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{8C69D7E7-D36D-4d0a-AD6F-C17C13C84F0F}")]
        Guid Id { get; set;}


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 255)]
        [ImmutableFieldId("{CACA9F21-97CC-4b6d-8901-893F376E9F54}")]
        [NotNullValidator()]
        string Name { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{3352125A-456D-41e9-9431-6701FCA1010D}")]
        Guid ConnectionId { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Boolean)]
        [ImmutableFieldId("{776C9FF2-ED3C-4d9f-867D-15062B392714}")]
        bool IsStoredProcedure { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Boolean)]
        [ImmutableFieldId("{A1586CD5-6006-494a-A638-BFAA209D817B}")]
        bool ReturnsXml { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Boolean)]
        [ImmutableFieldId("{7DDDDAAA-D1A6-4a98-8B34-426125001A35}")]
        bool IsQuery { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        [ImmutableFieldId("{BE436E9F-A199-436a-911D-2E6B5C2A4A6E}")]
        string Command { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 255)]
        [ImmutableFieldId("{B6686738-1485-49b1-95D5-944C72D1897C}")]
        [NotNullValidator()]
        string Namespace { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 512)]
        [ImmutableFieldId("{89609E03-AFA4-42b6-90AA-FC5CFBAA2136}")]
        string Description { get; set; }
    }
}
