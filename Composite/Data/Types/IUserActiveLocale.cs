using System;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;
using Composite.Data.Validation.Validators;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [Caching(CachingType.Full)]
    [KeyPropertyName("Id")]    
    [DataScope(DataScopeIdentifier.PublicName)]
    [ImmutableTypeId("{9187ABF1-DDD6-4470-A29E-766FABD5BA53}")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
	public interface IUserActiveLocale : IData
	{
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{65638F6C-0610-4563-8552-EF26FDCC7FF3}")]
        Guid Id { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.String, 64)]
        [ImmutableFieldId("{DA8843CA-C550-4b73-93F8-5CB8C40C086C}")]
        [ForeignKey(typeof(IUserSettings), "Username")]
        string Username { get; set; }


        [NotNullValidator()]
        [StringSizeValidator(2, 16)]
        [StoreFieldType(PhysicalStoreFieldType.String, 16)]
        [ImmutableFieldId("{D11E77B2-459B-43e4-9F98-CB5A9F44A812}")]
        string CultureName { get; set; }
	}
}
