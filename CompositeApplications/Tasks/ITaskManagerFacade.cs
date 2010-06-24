using System;
using Composite.Actions;
using Composite.Security;


namespace Composite.Tasks
{
	internal interface ITaskManagerFacade
	{
        void AttachTaskCreator(Func<EntityToken, ActionToken, Task> taskCreator);
        TaskContainer CreateNewTasks(EntityToken entityToken, ActionToken actionToken, TaskManagerEvent taskManagerEvent);
        TaskContainer RuntTasks(FlowToken flowToken, TaskManagerEvent taskManagerEvent);
        void CompleteTasks(FlowToken flowToken);
        void OnShutDown();
	}
}
