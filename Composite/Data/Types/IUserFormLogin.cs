using System;
using Composite.C1Console.Security;
using Composite.Data.Validation.Validators;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;

namespace Composite.Data.Types
{
    /// <summary>
    /// Contains information about console user's password and login status (whether it is locked)
    /// </summary>
    [AutoUpdateble]
    [KeyPropertyName("UserId")]
    [DataScope(DataScopeIdentifier.PublicName)]
    [ImmutableTypeId("{137a4e25-3b97-4c41-9ca2-2bea99fc2a2c}")]
    [Caching(CachingType.Full)]
    public interface IUserFormLogin: IData
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{3576f435-1ca4-4e22-94e8-1a5165ee9d60}")]
        [ForeignKey(typeof(IUser), "Id", AllowCascadeDeletes = true)]
        Guid UserId { get; set; }

        /// <exclude />
        [NotNullValidator]
        [StringSizeValidator(1, 64)]
        [StoreFieldType(PhysicalStoreFieldType.String, 64)]
        [ImmutableFieldId("{dbfb9790-ec68-44fc-bab7-f46517c5abcf}")]
        string Folder { get; set; }

        /// <summary>
        /// Determines whether the user is locked
        /// </summary>
        [StoreFieldType(PhysicalStoreFieldType.Boolean)]
        [DefaultFieldBoolValue(false)]
        [ImmutableFieldId("{43df4e85-383d-47f1-8396-6d4bbfcf7d22}")]
        bool IsLocked { get; set; }

        /// <summary>
        /// Contains a code describing lockout reason (f.e. locked by an administrator or automatically after X failed login attempts)
        /// For possible values, see enumeration <see cref="UserLockoutReason"/>
        /// </summary>
        [StoreFieldType(PhysicalStoreFieldType.Integer)]
        [DefaultFieldIntValue(0)]
        [ImmutableFieldId("{10651e29-e64f-4550-a123-7c24a38dc97b}")]
        int LockoutReason { get; set; }

        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 256)]
        [ImmutableFieldId("{fd51ed7d-5b4d-4abc-a682-6d01047e496a}")]
        string PasswordHash { get; set; }

        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 128)]
        [ImmutableFieldId("{ff1d3308-3822-4bd9-bf04-7c7b8cf6142b}")]
        string PasswordHashSalt { get; set; }

        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.DateTime)]
        [ImmutableFieldId("{bc2fb04a-802d-4c69-ac0c-9a71e95a8c97}")]
        [DefaultFieldNowDateTimeValue]
        DateTime LastPasswordChangeDate { get; set; }
    }
}
