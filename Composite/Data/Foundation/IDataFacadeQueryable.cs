using System;
using System.Linq;
using System.Collections.Generic;


namespace Composite.Data.Foundation
{
    internal interface IDataFacadeQueryable
    {
        ICollection<IQueryable> Sources { get; }
        Type InterfaceType { get; }
    }
}
