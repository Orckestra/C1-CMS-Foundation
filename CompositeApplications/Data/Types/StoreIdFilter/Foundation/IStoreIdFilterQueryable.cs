using System.Linq;


namespace Composite.Data.Types.StoreIdFilter.Foundation
{
    public interface IStoreIdFilterQueryable
    {
        IQueryable Source { get; }
    }
}
