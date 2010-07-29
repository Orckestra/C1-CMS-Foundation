using System;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [KeyPropertyName("Id")]
    [CachingAttribute(CachingType.Full)]
    [DataScope(DataScopeIdentifier.PublicName)]
    [ImmutableTypeId("{BAB5A2C3-880F-4b1b-AFEE-D1058015B9ED}")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
	public interface IPackageServerSource : IData
	{
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{7B151CE0-F094-4610-BDF8-8EE4F07003E5}")]
        Guid Id { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        [ImmutableFieldId("{93E401CE-1AEE-4ba7-AE5B-C7FE0A872A1A}")]
        [NotNullValidator()]
        string Url { get; set; }
	}
}
