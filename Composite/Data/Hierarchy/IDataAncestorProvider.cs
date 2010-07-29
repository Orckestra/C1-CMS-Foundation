using Composite.Data;


namespace Composite.Data.Hierarchy
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IDataAncestorProvider
    {
        IData GetParent(IData data);
    }
}
