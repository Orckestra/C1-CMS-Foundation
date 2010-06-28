using System.Linq;
using System.Collections.Generic;


namespace Composite.Data.Visualization
{
    internal interface IDataVisualizer
    {
        IEnumerable<IVisualizedData> Visualize<T>(IQueryable<T> data) where T : class, IData;
    }
}
