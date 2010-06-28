using Composite.Actions;
using Composite.Data;


namespace Composite.Actions
{
    internal interface IDataAction
    {
        DataActionSourceId DataActionSourceId { get; }
        ActionResult Execute(IData data);
    }
}
