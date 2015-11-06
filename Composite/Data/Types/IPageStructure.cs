using System;
using System.ComponentModel;

namespace Composite.Data.Types
{
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)]
    [AutoUpdateble]
    [ImmutableTypeId("{797A1A98-6E5C-4a1e-B346-AE547A1F4E90}")]
    [KeyPropertyName("Id")]
    [DataScope(DataScopeIdentifier.PublicName)]
    [Caching(CachingType.Full)]
    public interface IPageStructure : IGenericSortable
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{CBB49E56-A05C-4a33-9F8B-9253C2EDB9C2}")]
        Guid Id { get; set; }

        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{57AF0FDA-BA4F-4281-ACAF-A56C28FEF2E6}")]
        Guid ParentId { get; set; }
    }
}
