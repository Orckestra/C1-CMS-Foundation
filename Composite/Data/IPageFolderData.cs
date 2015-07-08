

using System;

namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [Obsolete("Use IPageDataFolder instead and remember to define key fields")]
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public interface IPageFolderData : IPageDataFolder, IPageData
    {
    }


    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [DataAssociationAttribute(typeof(Composite.Data.Types.IPage), "PageId", DataAssociationType.Aggregation)]
    public interface IPageDataFolder : IPageRelatedData
    {
    }
}
