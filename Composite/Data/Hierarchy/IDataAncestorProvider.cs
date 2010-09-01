using Composite.Data;


namespace Composite.Data.Hierarchy
{
    /// <summary>    
    /// Implementations of this interface is used for determining hierarchy when
    /// data items are used as elements in trees. 
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IDataAncestorProvider
    {
        IData GetParent(IData data);
    }
}
