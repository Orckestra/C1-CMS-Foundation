using System.Linq;
using System.Collections.Generic;


namespace Composite.Data.Foundation
{
    public interface IDataFacadeQueryable
    {
        IEnumerable<IQueryable> Sources { get; }
    }
}
