using System;
using System.Collections.Generic;
using Composite.C1Console.Actions;


namespace Composite.C1Console.Tasks
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class TaskContainer : IDisposable
    {
        private List<Task> _tasks;
        private bool _disposed = false;



        internal TaskContainer(List<Task> tasks, TaskManagerEvent taskManagerEvent)
        {
            _tasks = tasks;

            foreach (Task task in _tasks)
            {
                task.TaskManager.OnRun(task.Id, taskManagerEvent);
            }
        }



        /// <exclude />
        public void UpdateTasksWithFlowToken(FlowToken flowToken)
        {
            foreach (Task task in _tasks)
            {
                task.FlowToken = flowToken.Serialize();
            }
        }



        /// <exclude />
        public void OnStatus(TaskManagerEvent taskManagerEvent)
        {
            foreach (Task task in _tasks)
            {
                task.TaskManager.OnStatus(task.Id, taskManagerEvent);
            }
        }



        /// <exclude />
        public void SetOnIdleTaskManagerEvent(TaskManagerEvent taskManagerEvent)
        {
            _onIdleTaskManagerEvent = taskManagerEvent;
        }


        private TaskManagerEvent _onIdleTaskManagerEvent;


        /// <exclude />
        ~TaskContainer()
        {
            Dispose();
        }



        /// <exclude />
        public void Dispose()
        {
            if (_disposed == false)
            {
                _disposed = true;

                foreach (Task task in _tasks)
                {
                    task.TaskManager.OnIdle(task.Id, _onIdleTaskManagerEvent);
                }
            }
        }
    }
}
