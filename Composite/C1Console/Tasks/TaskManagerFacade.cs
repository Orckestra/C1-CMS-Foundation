using System;
using Composite.C1Console.Actions;
using Composite.C1Console.Security;


namespace Composite.C1Console.Tasks
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class TaskManagerFacade
    {
        private static ITaskManagerFacade _implementation;
        private static readonly object _syncRoot = new object();

        internal static ITaskManagerFacade Implementation
        {
            get
            {
                // Avoiding initialization in a static constructor so sql timeouts won't cause the type initialization exception
                var implementation = _implementation;
                if(implementation == null)
                {
                    lock(_syncRoot)
                    {
                        implementation = _implementation;
                        if(implementation == null)
                        {
                            _implementation = implementation = new TaskManagerFacadeImpl();
                        }
                    }
                }

                return implementation;
            } 
            set
            {
                _implementation = value;
            }
        }       



        /// <exclude />
        public static void AttachTaskCreator(Func<EntityToken, ActionToken, Task> taskCreator)
        {
            Implementation.AttachTaskCreator(taskCreator);
        }



        internal static TaskContainer CreateNewTasks(EntityToken entityToken, ActionToken actionToken, TaskManagerEvent taskManagerEvent)
        {
            return Implementation.CreateNewTasks(entityToken, actionToken, taskManagerEvent);
        }



        /// <exclude />
        public static TaskContainer RuntTasks(FlowToken flowToken, TaskManagerEvent taskManagerEvent)
        {
            return Implementation.RuntTasks(flowToken, taskManagerEvent);
        }



        internal static void CompleteTasks(FlowToken flowToken)
        {
            Implementation.CompleteTasks(flowToken);
        }
    }
}
