using Composite.Security;
using Composite.Tasks;


namespace Composite.Actions
{
    internal interface IActionExecutionService : IFlowControllerService
    {
        void Execute(EntityToken entityToken, ActionToken actionToken, TaskManagerEvent taskManagerEvent);
    }
}
