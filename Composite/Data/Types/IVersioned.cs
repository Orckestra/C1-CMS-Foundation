using System;

namespace Composite.Data.Types
{
    /// <summary>
    /// Represents a data type that supports multiple versions of the same data item
    /// </summary>
    [VersionKeyPropertyName(nameof(VersionId))]
    public interface IVersioned : IData
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{f42d511b-1d76-4c05-a895-99f23b757e1e}")]
        [DefaultFieldNewGuidValue]
        Guid VersionId { get; set; }
    }
}
