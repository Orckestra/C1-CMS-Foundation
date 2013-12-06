using Composite.Data.ProcessControlled.ProcessControllers.GenericLocalizeProcessController;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Data.ProcessControlled
{
    /// <summary>
    /// Implement this interface to allow your data type to exist in multiple language scopes (i.e. enable localizing of data).
    /// </summary>
    [LocalizeProcessControllerType(typeof(GenericLocalizeProcessController))]
    public interface ILocalizedControlled : IProcessControlled
    {
        /// <summary>
        /// The locale data originaled from.
        /// </summary>
        [StoreFieldType(PhysicalStoreFieldType.String, 16)]
        [ImmutableFieldId("{0456EBB0-7FB1-46cd-9A23-4AE9AA3337FA}")]
        [NotNullValidator()]
        [DefaultFieldStringValue("")] // Invariant
        string SourceCultureName { get; set; }
    }
}
