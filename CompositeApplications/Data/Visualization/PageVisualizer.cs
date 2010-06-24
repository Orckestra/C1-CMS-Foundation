using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;

using Composite.Data.Visualization;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Data.Visualization
{
    public class VisualizedPageData : IVisualizedData
    {
        public VisualizedPageData(DataSourceId dataSourceId, string label, string toolTip)
        {
            this.DataSourceId = dataSourceId;
            this.Label = label;
            this.ToolTip = toolTip;
        }

        public DataSourceId DataSourceId { get; internal set; }
        public string Label { get; internal set; }
        public string ToolTip { get; internal set; }
    }

    public class PageVisualizer : IDataVisualizer
    {
        public IEnumerable<IVisualizedData> Visualize<T>(IQueryable<T> data) where T : class, Composite.Data.IData
        {
            IQueryable<IPage> pageQueryable = (IQueryable<IPage>)data;
            IEnumerable<IVisualizedData> visualizers =
                from dataElement in pageQueryable
                select new VisualizedPageData(dataElement.DataSourceId, dataElement.Title, dataElement.DataSourceId.ToString()) as IVisualizedData;

            return visualizers;
        }

    }
}
