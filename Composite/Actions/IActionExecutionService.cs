using Composite.Security;
using Composite.Tasks;


namespace Composite.Actions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IActionExecutionService : IFlowControllerService
    {
        void Execute(EntityToken entityToken, ActionToken actionToken, TaskManagerEvent taskManagerEvent);
    }
}
