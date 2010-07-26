using Composite.Data;
namespace Composite.Data.Hierarchy
{
    public interface IDataAncestorProvider
    {
        IData GetParent(IData data);
    }
}
