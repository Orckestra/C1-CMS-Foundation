using Composite.C1Console.Actions;
using Composite.Data;


namespace Composite.C1Console.Actions
{
    internal interface IDataAction
    {
        DataActionSourceId DataActionSourceId { get; }
        ActionResult Execute(IData data);
    }
}
