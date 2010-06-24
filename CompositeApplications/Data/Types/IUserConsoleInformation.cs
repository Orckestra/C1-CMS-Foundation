using System;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Data.Types
{
    [AutoUpdateble]
    [ImmutableTypeId("{7630098C-CF7B-4e16-A86F-E455FA871ABF}")]
    [KeyPropertyName("Id")]
    [LabelPropertyName("Id")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    [DataScope(DataScopeIdentifier.PublicName)]    
	public interface IUserConsoleInformation : IData
	{
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{2F91C083-A3BB-4226-B229-66FE2D653A35}")]
        Guid Id { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.String, 64)]
        [ImmutableFieldId("{11154624-8574-48c0-97B0-E1AFFEAC7AD4}")]
        [NotNullValidator()]
        string Username { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.String, 64)]
        [ImmutableFieldId("{A955C07B-9FDC-40b2-8C18-87D097E94329}")]
        [NotNullValidator()]
        string ConsoleId { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.DateTime)]
        [ImmutableFieldId("{39567CE9-C85F-439e-871D-EC97F3F79016}")]
        DateTime TimeStamp { get; set; }
	}
}
