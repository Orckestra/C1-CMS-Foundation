using Composite.Data.ProcessControlled.ProcessControllers.GenericLocalizeProcessController;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Data.ProcessControlled
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [LocalizeProcessControllerType(typeof(GenericLocalizeProcessController))]
    public interface ILocalizedControlled : IProcessControlled
    {
        [StoreFieldType(PhysicalStoreFieldType.String, 16)]
        [ImmutableFieldId("{E271D3EB-A8EB-49ea-9BB5-E5A54F88298F}")]
        [NotNullValidator()]
        [DefaultFieldStringValue("")] // Invariant
        string CultureName { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.String, 16)]
        [ImmutableFieldId("{0456EBB0-7FB1-46cd-9A23-4AE9AA3337FA}")]
        [NotNullValidator()]
        [DefaultFieldStringValue("")] // Invariant
        string SourceCultureName { get; set; }
    }
}
