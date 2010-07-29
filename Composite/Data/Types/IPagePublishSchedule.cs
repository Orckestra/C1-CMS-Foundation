using System;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using Composite.Validation.Validators;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [KeyPropertyName("Id")]
    [ImmutableTypeId("{545F5E10-31A2-40df-9FE8-DBAD1CFB9824}")]
    [DataScope(DataScopeIdentifier.AdministratedName)]
	public interface IPagePublishSchedule : IData
	{
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{3C0EF006-85BE-4761-BAEB-A785AFB805A2}")]
        Guid Id { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{38A48198-F4F6-4bcd-8499-74FAB902CB44}")]
        Guid PageId { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{AEE4442E-2778-470f-9822-8CCAB99DC54F}")]
        Guid WorkflowInstanceId { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.DateTime)]
        [ImmutableFieldId("{F8B01277-1887-4f58-9AEE-396D38210D8F}")]
        DateTime PublishDate { get; set; }


        [NotNullValidator()]
        [StringSizeValidator(2, 16)]
        [StoreFieldType(PhysicalStoreFieldType.String, 16)]
        [DefaultFieldStringValue("")]
        [ImmutableFieldId("{9D62C8D3-E42F-4926-8E45-5B465A59C8A6}")]
        string LocaleCultureName { get; set; }
	}
}
