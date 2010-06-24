
namespace Composite.Data.Visualization
{
    public interface IVisualizedData
    {
        DataSourceId DataSourceId { get; }
        string Label { get; }
        //bool HasChildren { get; }
        //ResourceHandle Icon { get; }
        //ResourceHandle OpenedIcon { get; }
        string ToolTip { get; }
    }
}
