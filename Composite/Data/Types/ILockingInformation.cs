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
    [ImmutableTypeId("{306F78E9-CA7B-429b-8D7F-CB4B4DD44E5A}")]
    [KeyPropertyName("Id")]
    [LabelPropertyName("Id")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    [DataScope(DataScopeIdentifier.PublicName)]    
    public interface ILockingInformation : IData
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{C0A019A4-33BE-46a3-B27C-ED7AF010976C}")]
        Guid Id { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        [ImmutableFieldId("{34BD5C80-C5FD-4932-A1E6-3459E2D7802D}")]
        [NotNullValidator()]
        string LockKey { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        [ImmutableFieldId("{9B13A361-9CCD-4dfc-97E5-8D9CA3C54660}")]
        [NotNullValidator()]
        string SerializedOwnerId { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 64)]
        [ImmutableFieldId("{CADF7240-45C0-43a6-A6A1-D60887CC2D51}")]
        [NotNullValidator()]
        string Username { get; set; }
    }
}
