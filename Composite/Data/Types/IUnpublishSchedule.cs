using System;

namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [ImmutableTypeId("e0ec4c0f-31d9-42af-ba1a-65b102945a51")]
    public interface IUnpublishSchedule : ISchedule
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.DateTime)]
        [ImmutableFieldId("024666a4-7c22-4fb5-8ddd-3fc248ce15ac")]
        DateTime UnpublishDate { get; set; }
    }
}