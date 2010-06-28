namespace Composite.Tasks
{
    internal sealed class TaskManagerFlowControllerService : ITaskManagerFlowControllerService
	{
        private TaskContainer TaskContainer { get; set; }


        public TaskManagerFlowControllerService(TaskContainer taskContainer)
        {
            Verify.IsNotNull(taskContainer, "taskContainer");

            this.TaskContainer = taskContainer;
        }


        public void OnStatus(TaskManagerEvent taskManagerEvent)
        {
            this.TaskContainer.OnStatus(taskManagerEvent);
        }
	}
}
