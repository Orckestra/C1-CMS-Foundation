using System;
using Composite.C1Console.Security;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;
using Composite.Data.Validation.Validators;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Data.Types
{
    /// <summary>    
    /// Contains information about a password previously used by a user.  
    /// </summary>
    [AutoUpdateble]
    [KeyPropertyName("Id")]
    [DataScope(DataScopeIdentifier.PublicName)]
    [ImmutableTypeId("{63651A11-0D1B-4ADC-99E7-C2B71B5A26B1}")]
    public interface IUserPasswordHistory : IData
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{F71AFE78-EED8-4BCC-BFBE-C1BDE5B792E0}")]
        Guid Id { get; set; }
        
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{2B266EF3-AD8C-4CFD-8407-211A2CF3044E}")]
        [ForeignKey(typeof(IUser), "Id", AllowCascadeDeletes = true)]
        Guid UserId { get; set; }

        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 256)]
        [ImmutableFieldId("{B75CD57F-73E5-4C63-9DFE-11380825E37F}")]
        string PasswordHash { get; set; }
        
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 128)]
        [ImmutableFieldId("{2A789CF6-6E29-40F5-9462-D8CA39953C33}")]
        string PasswordSalt { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.DateTime)]
        [ImmutableFieldId("{0D7D5E71-521C-456F-A6ED-577DE68B58C8}")]
        [DefaultFieldNowDateTimeValue]
        DateTime SetDate { get; set; }
    }
}
