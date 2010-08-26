using System;
using Composite.C1Console.Actions;
using Composite.C1Console.Security;


namespace Composite.C1Console.Tasks
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
