using System;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Data.Types
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]  
    [Title("Hostname configuration")]
    [AutoUpdateble]
    [TypeVersion(1)]
    [ImmutableTypeId("{C1E6BDA9-D325-7128-95D9-4723A8EAEAD6}")]
    [DataScope(DataScopeIdentifier.PublicName)]
    [KeyPropertyName("Id")]
    [RelevantToUserType(UserType.Developer)]
    [CachingAttribute(CachingType.Full)]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    public interface IHostnameConfiguration : IData
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{1E04A275-B62D-25E0-7EC7-2D010E02DE34}")]
        Guid Id { get; set; }
        
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 255, IsNullable = false)]
        [ImmutableFieldId("{B5953D03-E9B9-616D-CBE9-6E9A69AE8A20}")]
        string PageUrlSuffix { get; set; }
    } 
}
