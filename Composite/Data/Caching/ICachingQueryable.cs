using System.Linq;


namespace Composite.Data.Caching
{
    public interface ICachingQueryable
    {
        IQueryable Source { get; }
    }
}
