using Composite.C1Console.Actions;


namespace Composite.C1Console.Tasks
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface ITaskManagerFlowControllerService : IFlowControllerService
	{
        /// <exclude />
        void OnStatus(TaskManagerEvent taskManagerEvent);
	}
}
