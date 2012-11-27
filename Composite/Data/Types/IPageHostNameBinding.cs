using System;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [ImmutableTypeId("{AE1F92F3-995B-4338-BA55-3A8308EF64D6}")]
    [KeyPropertyName("HostName")]
    [DataScope(DataScopeIdentifier.PublicName)]
    [CachingAttribute(CachingType.Full)]
    [Obsolete("No longer used, replaced by Composite.Data.Types.IHostnameBinding")]
    public interface IPageHostNameBinding : IData
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{81CD6406-1B47-47d7-9664-78C42A796A7C}")]
        [ForeignKey(typeof(IPage), "Id", AllowCascadeDeletes = true)]
        Guid PageId { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 255)]
        [ImmutableFieldId("{6A1C6FDB-7B1F-4e96-918B-32E8B1DE71EE}")]
        [NotNullValidator()]
        string HostName { get; set; }
    }
}
