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
    [KeyPropertyName("Username")]
    [LabelPropertyName("Username")]
    [DataScope(DataScopeIdentifier.PublicName)]
    [ImmutableTypeId("{F89054CB-C0E0-41ad-948D-4AEA4055C3A3}")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    public interface IUserSettings : IData
    {
        /// <exclude />
        [NotNullValidator()]
        [StringSizeValidator(2, 64)]
        [StoreFieldType(PhysicalStoreFieldType.String, 64)]
        [ImmutableFieldId("{A7BEC71E-0CA9-4b33-A1E7-F2B5B5744647}")]
        [ForeignKey(typeof(IUser), "Username", AllowCascadeDeletes = true)]
        string Username { get; set; }


        /// <exclude />
        [NotNullValidator()]
        [StringSizeValidator(2, 16)]
        [StoreFieldType(PhysicalStoreFieldType.String, 16)]
        [ImmutableFieldId("{9D62C8D3-E42F-4926-8E45-5B465A59C8A6}")]
        string CultureName { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 16, IsNullable = true)]
        [ImmutableFieldId("{931130A1-5CDD-487a-B51F-76A0396D3216}")]
        string CurrentActiveLocaleCultureName { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 16, IsNullable = true)]
        [ImmutableFieldId("{0D354A92-461D-4ff8-B797-F2897119CD3B}")]
        string ForeignLocaleCultureName { get; set; }
    }
}
