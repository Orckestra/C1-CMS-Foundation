using System.Linq;
using System.Collections.Generic;


namespace Composite.Data.Foundation
{
    internal interface IDataFacadeQueryable
    {
        IEnumerable<IQueryable> Sources { get; }
    }
}
