using System;
using Composite.Data.Types.Foundation;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Obsolete("See IPageFolderDesciption")]
    [AutoUpdateble]
    [KeyPropertyName("Id")]
    [ImmutableTypeId("{EC2C4D8D-03E2-4e0d-887D-DAAA509BAA44}")]
    [CachingAttribute(CachingType.Full)]
    [DataScope(DataScopeIdentifier.PublicName)]
    public interface IAggregationDescription : IAssociationDescription
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{1E9D171A-3256-427e-8A83-8EDDC8895140}")]
        Guid Id { get; set; }
    }
}
