using System.Linq;
using System.Collections.Generic;


namespace Composite.Data.Visualization
{
    public interface IDataVisualizer
    {
        IEnumerable<IVisualizedData> Visualize<T>(IQueryable<T> data) where T : class, IData;
    }
}
