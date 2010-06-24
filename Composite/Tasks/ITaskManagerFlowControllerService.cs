using Composite.Actions;


namespace Composite.Tasks
{
    public interface ITaskManagerFlowControllerService : IFlowControllerService
	{
        void OnStatus(TaskManagerEvent taskManagerEvent);
	}
}
