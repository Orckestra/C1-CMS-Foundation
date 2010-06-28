using Composite.Data;
namespace Composite.Data.Hierarchy
{
    internal interface IDataAncestorProvider
    {
        IData GetParent(IData data);
    }
}
