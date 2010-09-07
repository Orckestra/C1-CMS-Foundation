namespace Composite.C1Console.Tasks
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class TaskManagerFlowControllerService : ITaskManagerFlowControllerService
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
