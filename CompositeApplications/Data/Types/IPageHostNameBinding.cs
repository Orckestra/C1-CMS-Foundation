using System;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Data.Types
{
    [AutoUpdateble]
    [ImmutableTypeId("{AE1F92F3-995B-4338-BA55-3A8308EF64D6}")]
    [KeyPropertyName("HostName")]
    [DataScope(DataScopeIdentifier.PublicName)]
    [CachingAttribute(CachingType.Full)]
    public interface IPageHostNameBinding : IData
    {
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{81CD6406-1B47-47d7-9664-78C42A796A7C}")]
        [ForeignKey(typeof(IPage), "Id", AllowCascadeDeletes = true)]
        Guid PageId { get; set; }

        [StoreFieldType(PhysicalStoreFieldType.String, 255)]
        [ImmutableFieldId("{6A1C6FDB-7B1F-4e96-918B-32E8B1DE71EE}")]
        [NotNullValidator()]
        string HostName { get; set; }
    }
}
