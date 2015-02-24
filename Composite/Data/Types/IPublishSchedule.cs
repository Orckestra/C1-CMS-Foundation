using System;

namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [ImmutableTypeId("db542d7e-5cba-42e1-8a67-ad129941215c")]
    public interface IPublishSchedule : ISchedule
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.DateTime)]
        [ImmutableFieldId("d829eec8-76b0-46c7-9fdc-e93716451c91")]
        DateTime PublishDate { get; set; }
    }
}
