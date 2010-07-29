using System;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [KeyPropertyName("Id")]
    [ImmutableTypeId("{ECE41A30-0FC4-4902-B5C5-A607D8A9B298}")]
    [CachingAttribute(CachingType.Full)]
    [DataScope(DataScopeIdentifier.PublicName)]
	public interface ICompositionContainer : IData
	{
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{B9E34D3F-C8C0-4692-8EE4-31B174C96477}")]
        Guid Id { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.String, 256)]
        [ImmutableFieldId("{572769B5-89CA-4ee8-9CD1-DE9D61702CA0}")]
        string Label { get; set; }
	}
}
