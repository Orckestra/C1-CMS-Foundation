using System;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Data.Types
{
    [AutoUpdateble]
    [ImmutableTypeId("{0DE2844A-6B26-4566-B1D6-A460C68B1E3B}")]
    [KeyPropertyName("Id")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    [DataScope(DataScopeIdentifier.PublicName)]
    [Caching(CachingType.Full)]
    public interface IMethodBasedFunctionInfo : IData
    {
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{131D6F2F-01A8-40b5-882B-CCC03AF8C986}")]
        Guid Id { get; set; }


        [NotNullValidator()]
        [StoreFieldType(PhysicalStoreFieldType.String, 512)]
        [ImmutableFieldId("{36460984-0281-485b-985B-D9686697D3D4}")]        
        string Type { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.String, 64)]
        [ImmutableFieldId("{5CC73160-98FF-4d13-A5AB-FB20946C9064}")]
        string MethodName { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.String, 512)]
        [ImmutableFieldId("{62C8BC67-B0A6-4cd6-9694-AD55460C5C90}")]
        string Namespace { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.String, 64)]
        [ImmutableFieldId("{D8108EA4-0E3D-49d1-8687-1E1FFEB69029}")]
        string UserMethodName { get; set; }
    }
}
