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
    [ImmutableTypeId("{20040E85-B2DE-40a8-A2BD-58ADA19DA2E4}")]
    [DataScope(DataScopeIdentifier.AdministratedName)]
	public interface IPageUnpublishSchedule : IData
	{
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{247BD023-54DC-44ab-BB2A-3044FE94A75B}")]
        Guid Id { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{43E1F55C-7CBE-4000-BDA7-B91EDEE9093A}")]
        Guid PageId { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{D8E2C07B-F8F3-4312-8630-68DEBAA0D2B7}")]
        Guid WorkflowInstanceId { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.DateTime)]
        [ImmutableFieldId("{B6091456-8BAC-4caf-B692-C5F14E5C10DB}")]
        DateTime UnpublishDate { get; set; }


        [NotNullValidator()]
        [StringSizeValidator(2, 16)]
        [StoreFieldType(PhysicalStoreFieldType.String, 16)]
        [DefaultFieldStringValue("")]
        [ImmutableFieldId("{9D62C8D3-E42F-4926-8E45-5B465A59C8A6}")]
        string LocaleCultureName { get; set; }
	}
}
