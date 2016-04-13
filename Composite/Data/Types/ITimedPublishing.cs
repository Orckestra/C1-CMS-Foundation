using System;

namespace Composite.Data.Types
{
    /// <summary>
    /// Represents a data item with timed publishing
    /// </summary>
    public interface ITimedPublishing: IVersioned, IData
    {
        /// <summary>
        /// Time from which the current version of the data item will be visible
        /// </summary>
        [StoreFieldType(PhysicalStoreFieldType.DateTime, IsNullable = true)]
        [ImmutableFieldId("{d70973a4-3b57-49b4-81ed-34ae92d8637f}")]
        DateTime? PublishTime { get; set; }

        /// <summary>
        /// Time until which the current version of the data item will be visible
        /// </summary>
        [StoreFieldType(PhysicalStoreFieldType.DateTime, IsNullable = true)]
        [ImmutableFieldId("{806d1edc-b3f2-4cb4-b18f-199cca9ee2df}")]
        DateTime? UnpublishTime { get; set; }

        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 128, IsNullable = true)]
        [ImmutableFieldId("{70b53ac6-d58e-4624-ab47-975e80853673}")]
        string VersionTag { get; set; }
    }
}
