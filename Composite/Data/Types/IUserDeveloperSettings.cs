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
    [ImmutableTypeId("{10ECFF01-0590-4b9a-9FD0-EE7BD1EC0CD8}")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
	public interface IUserDeveloperSettings : IData
	{
        [NotNullValidator()]
        [StringSizeValidator(2, 64)]
        [StoreFieldType(PhysicalStoreFieldType.String, 64)]
        [ImmutableFieldId("{F2425F85-5B41-4f73-8F9A-54CAAAE266FC}")]
        string Username { get; set; }


        [NotNullValidator()]
        [StoreFieldType(PhysicalStoreFieldType.String, 256)]
        [ImmutableFieldId("{303F58C7-5F51-4b53-BDEF-ED8025E6EA1A}")]
        string LastSpecifiedNamespace { get; set; }
    }
}
