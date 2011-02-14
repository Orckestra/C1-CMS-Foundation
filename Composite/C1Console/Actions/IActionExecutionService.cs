using Composite.C1Console.Security;
using Composite.C1Console.Tasks;


namespace Composite.C1Console.Actions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IActionExecutionService : IFlowControllerService
    {
        /// <exclude />
        void Execute(EntityToken entityToken, ActionToken actionToken, TaskManagerEvent taskManagerEvent);
    }
}
