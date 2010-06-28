using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;

using Composite.Data.Visualization;
using Composite.Data;

namespace Composite.Data.Visualization
{
    internal class MinimalVisualizedData : IVisualizedData
    {
        public MinimalVisualizedData(DataSourceId dataSourceId)
        {
            this.DataSourceId = dataSourceId;
            this.Label = dataSourceId.ToString();
            this.ToolTip = dataSourceId.ToString();
        }

        public DataSourceId DataSourceId { get; internal set; }
        public string Label { get; internal set; }
        public string ToolTip  { get; internal set; }
    }

    internal class MinimalVisualizer : IDataVisualizer
    {
        public IEnumerable<IVisualizedData> Visualize<T>(IQueryable<T> data) where T : class, Composite.Data.IData
        {
            IEnumerable<IVisualizedData> visualizers =
                from dataElement in data
                select new MinimalVisualizedData(dataElement.DataSourceId) as IVisualizedData;

            return visualizers;
        }

    }
}
