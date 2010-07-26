using System.Linq;


namespace Composite.Data.Types.StoreIdFilter.Foundation
{
    internal interface IStoreIdFilterQueryable
    {
        IQueryable Source { get; }
    }
}
