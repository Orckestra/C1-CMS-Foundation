using System;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [ImmutableTypeId("{56916e07-6e3c-4488-8b46-78f6cb74ac2e}")]
    [KeyPropertyName("Id")]
    [DataScope(DataScopeIdentifier.PublicName)]
    [NotReferenceable]
    [CachingAttribute(CachingType.Full)]    
    public interface IMediaFileData : IData
	{
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{04f39c14-7243-4152-9e05-f28e496feba1}")]
        Guid Id { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 2048, IsNullable = false)]
        [ImmutableFieldId("{f832f793-be88-418e-b134-1a72558643d0}")]
        [NotNullValidator]
        string FolderPath { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 2048, IsNullable = false)]
        [ImmutableFieldId("{00e64f23-aec9-4527-b964-4accd4cef548}")]
        [NotNullValidator]
        string FileName { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 256, IsNullable = true)]
        [ImmutableFieldId("{aac2be13-e487-49b9-90f9-1afc495ea844}")]
        string Title { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.LargeString, IsNullable = true)]
        [ImmutableFieldId("{6993c337-88c6-4e90-a1c2-64aeb73f0650}")]
        string Description { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 128, IsNullable = true)]
        [ImmutableFieldId("{068b92aa-3f46-43ab-b258-fa80dbb56fd6}")]
        string CultureInfo { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 256, IsNullable = true)]
        [ImmutableFieldId("{fdd38995-b933-44ba-9ad5-d5235ef0e402}")]
        string MimeType { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Integer, IsNullable = true)]
        [ImmutableFieldId("{cbab34f8-deaa-45cd-915c-dbe027110b25}")]
        [DefaultFieldIntValue(-1)]
        int? Length { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.DateTime, IsNullable = true)]
        [ImmutableFieldId("{d9095572-6a08-4115-999a-b70a449c827e}")]
        [DefaultFieldNowDateTimeValue]
        DateTime? CreationTime { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.DateTime, IsNullable = true)]
        [ImmutableFieldId("{d3b83ba0-35e0-4168-98a7-80cc4ebfc891}")]
        [DefaultFieldNowDateTimeValue]
        DateTime? LastWriteTime { get; set; }
	}
}
