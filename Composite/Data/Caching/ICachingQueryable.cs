using System.Linq;


namespace Composite.Data.Caching
{
    internal interface ICachingQueryable
    {
        IQueryable Source { get; }
    }
}
