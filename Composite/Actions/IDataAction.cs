using Composite.Actions;
using Composite.Data;


namespace Composite.Actions
{
    public interface IDataAction
    {
        DataActionSourceId DataActionSourceId { get; }
        ActionResult Execute(IData data);
    }
}
