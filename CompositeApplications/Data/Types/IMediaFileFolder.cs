using System;
using Composite.Data.Hierarchy;
using Data.Types;


namespace Composite.Data.Types
{
    [Title("C1 Media Folder")]
    [TypeVersion(2)]
    [KeyPropertyName("KeyPath")]
    [DataAncestorProviderAttribute(typeof(MediaFileDataAncesorProvider))]
    [DataScope(DataScopeIdentifier.PublicName)]
    [ImmutableTypeId("{76C4D9D8-2558-4475-801B-FB56C5E923A3}")]
    [LabelPropertyName("CompositePath")]
    [RelevantToUserType(UserType.Developer)]
    public interface IMediaFileFolder : IData
    {
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{84c8046c-a53c-42dd-bd54-b64c6f7511c1}")]
        Guid Id { get; }


        [StoreFieldType(PhysicalStoreFieldType.String, 2048)]
        [ImmutableFieldId("{e03e1acb-b5bd-4354-bfd4-5e2626381d82}")]
        string KeyPath { get; }


        [ImmutableFieldId("{ADB2660D-BAB3-499a-AE12-50AA703FA3B0}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 2048)]
        string CompositePath { get; set; }



        [ImmutableFieldId("{814D45C9-D424-4420-8DBB-3F93E4EF24E2}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 32)]
        string StoreId { get; set; }



        [ImmutableFieldId("{A71332BC-F6E5-4e1b-8BB6-7C6AA57BECC6}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 2048)]
        string Path { get; set; }



        [ImmutableFieldId("{E4DBB69F-B1F6-46a1-A8A6-BDDD4CB344D6}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 256)]
        string Title { get; set; }



        [ImmutableFieldId("{51CF6EFA-66C3-413e-9FCD-06EA52871182}")]
        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        string Description { get; set; }



        [ImmutableFieldId("{FA03F9D5-C8AF-469c-BC02-F11118D21A0F}")]
        [StoreFieldType(PhysicalStoreFieldType.Boolean)]
        bool IsReadOnly { get; }
    }
}
