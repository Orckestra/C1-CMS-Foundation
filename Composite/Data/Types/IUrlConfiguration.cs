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
    [ImmutableTypeId("{5552C35A-A72A-55F1-9630-ACC66FE44BBE}")]
    [DataScope(DataScopeIdentifier.PublicName)]
    [KeyPropertyName("Id")]
    [RelevantToUserType(UserType.Developer)]
    [CachingAttribute(CachingType.Full)]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    public interface IUrlConfiguration : IData
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{D0C48D08-1318-7441-D2C0-425D31894C1F}")]
        Guid Id { get; set; }
        
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 255, IsNullable = false)]
        [ImmutableFieldId("{C0504E0C-B487-3951-AA18-DBF28DD681B5}")]
        [RegexValidator(@"^((\.([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9]))*)$")]
        string PageUrlSuffix { get; set; }
    } 
}
