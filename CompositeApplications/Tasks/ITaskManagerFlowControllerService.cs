using Composite.Actions;


namespace Composite.Tasks
{
    internal interface ITaskManagerFlowControllerService : IFlowControllerService
	{
        void OnStatus(TaskManagerEvent taskManagerEvent);
	}
}
