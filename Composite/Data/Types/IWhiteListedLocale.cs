using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;
using Composite.Validation.Validators;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Data.Types
{
    [AutoUpdateble]
    [Caching(CachingType.Full)]
    [KeyPropertyName("CultureName")]
    [DataScope(DataScopeIdentifier.PublicName)]
    [ImmutableTypeId("{C5423F9A-AAFF-478c-88C4-6BA32293067D}")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    public interface IWhiteListedLocale : IData
    {
        [NotNullValidator()]
        [StringSizeValidator(2, 16)]
        [StoreFieldType(PhysicalStoreFieldType.String, 16)]
        [ImmutableFieldId("{5AAB5381-5739-4502-A2C3-F3AAE0E93CCE}")]
        string CultureName { get; set; }
    }
}
