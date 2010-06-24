using System;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Data.Types
{
    [AutoUpdateble]
    [ImmutableTypeId("{08BAFC6D-841B-4ad7-B565-F3F5A962952A}")]
    [KeyPropertyName("Id")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]    
    [DataScope(DataScopeIdentifier.PublicName)]
    [CachingAttribute(CachingType.Full)]    
    public interface ITaskItem : IData
    {
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{EE312CF7-AB0A-4b4c-B524-4C92E475F08E}")]
        Guid Id { get; set; }        


        [StoreFieldType(PhysicalStoreFieldType.String, 255)]
        [ImmutableFieldId("{C800E783-7C68-4b3d-B839-56685104DC65}")]
        [NotNullValidator()]
        string TaskId { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.String, 2048)]
        [ImmutableFieldId("{28474560-8CE3-4f6f-A83D-C4F996228BF2}")]
        [NotNullValidator()]
        string TaskManagerType { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        [ImmutableFieldId("{F7B9A678-B0BD-4ba5-8805-C8C2B52921AB}")]
        [NotNullValidator()]
        string SerializedFlowToken { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.DateTime)]
        [ImmutableFieldId("{34E4FC09-6FFF-4fcc-BB40-59F437B2FAB6}")]
        DateTime StartTime { get; set; }
    }
}
