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
    [KeyPropertyName("CultureName")]
    [DataScope(DataScopeIdentifier.PublicName)]
    [ImmutableTypeId("{C5423F9A-AAFF-478c-88C4-6BA32293067D}")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    [Obsolete("Was used to filter possible culture while adding another language to the site. Now all the registered in Windows languages are awailable.")]
    public interface IWhiteListedLocale : IData
    {
        /// <exclude />
        [NotNullValidator()]
        [StringSizeValidator(2, 16)]
        [StoreFieldType(PhysicalStoreFieldType.String, 16)]
        [ImmutableFieldId("{5AAB5381-5739-4502-A2C3-F3AAE0E93CCE}")]
        string CultureName { get; set; }
    }
}
