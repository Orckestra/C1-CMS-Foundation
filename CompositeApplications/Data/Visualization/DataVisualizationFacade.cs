using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Data.Visualization.Foundation;


namespace Composite.Data.Visualization
{
    public static class DataVisualizationFacade
    {
        public static IEnumerable<IVisualizedData> Visualize<T>(IQueryable<T> data)
            where T : class, IData
        {
            if (data == null) throw new ArgumentNullException();

            IDataVisualizer visualizer = DataVisualizerCache.GetVisualizer(typeof(T));

            return visualizer.Visualize<T>(data);
        }
    }
}
