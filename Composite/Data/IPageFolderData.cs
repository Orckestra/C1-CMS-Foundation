

namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [DataAssociationAttribute(typeof(Composite.Data.Types.IPage), "PageId", DataAssociationType.Aggregation)]
    public interface IPageFolderData : IPageData
    {
    }
}
