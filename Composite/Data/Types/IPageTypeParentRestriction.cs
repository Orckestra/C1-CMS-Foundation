using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Data.Hierarchy.DataAncestorProviders;
using Composite.Data.Hierarchy;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [ImmutableTypeId("{776694C8-0074-45FD-9358-41D61113EA34}")]
    [KeyPropertyName("Id")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    [DataScope(DataScopeIdentifier.PublicName)]
    [CachingAttribute(CachingType.Full)]
    public interface IPageTypeParentRestriction : IData
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{E0595ABC-1207-49D2-BA53-8055E8F4D851}")]
        Guid Id { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{42E5C8E5-9528-4C6F-94BD-DFA77F8D5FB7}")]
        [ForeignKey(typeof(IPageType), "Id", AllowCascadeDeletes = true)]
        Guid PageTypeId { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{4668D87F-245D-4DBB-BFD0-2F09DDB7CD64}")]
        [ForeignKey(typeof(IPageType), "Id", AllowCascadeDeletes=true)]
        Guid AllowedParentPageTypeId  { get; set; }
    }
}
