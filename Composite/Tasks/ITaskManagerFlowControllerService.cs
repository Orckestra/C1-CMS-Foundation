using Composite.Actions;


namespace Composite.Tasks
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface ITaskManagerFlowControllerService : IFlowControllerService
	{
        void OnStatus(TaskManagerEvent taskManagerEvent);
	}
}
