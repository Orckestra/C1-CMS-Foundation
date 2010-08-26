using System;
using System.Linq;
using Composite.Data;
using Composite.Data.Types;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.C1Console.Actions;
using System.Collections.Generic;


namespace Composite.C1Console.Tasks
{
    internal static class TaskManagerFacade
    {
        private static ITaskManagerFacade _implementation = new TaskManagerFacadeImpl();

        internal static ITaskManagerFacade Implementation { get { return _implementation; } set { _implementation = value; } }


        static TaskManagerFacade()
        {
            GlobalEventSystemFacade.SubscribeToShutDownEvent(OnShutDown);
        }
        



        public static void AttachTaskCreator(Func<EntityToken, ActionToken, Task> taskCreator)
        {
            _implementation.AttachTaskCreator(taskCreator);
        }



        internal static TaskContainer CreateNewTasks(EntityToken entityToken, ActionToken actionToken, TaskManagerEvent taskManagerEvent)
        {
            return _implementation.CreateNewTasks(entityToken, actionToken, taskManagerEvent);
        }



        public static TaskContainer RuntTasks(FlowToken flowToken, TaskManagerEvent taskManagerEvent)
        {
            return _implementation.RuntTasks(flowToken, taskManagerEvent);
        }



        internal static void CompleteTasks(FlowToken flowToken)
        {
            _implementation.CompleteTasks(flowToken);
        }



        private static void OnShutDown(ShutDownEventArgs args)
        {
            _implementation.OnShutDown();
        }
    }
}
