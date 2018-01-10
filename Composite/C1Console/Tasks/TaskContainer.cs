using System;
using System.Collections.Generic;
using Composite.C1Console.Actions;
using Composite.Core;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.Types;


namespace Composite.C1Console.Tasks
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class TaskContainer : IDisposable
    {
        private static readonly string LogTitle = typeof (TaskContainer).Name;

        private readonly List<Task> _tasks;
        private bool _disposed;



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


        /// <summary>
        /// Saves tasks to database
        /// </summary>
        public void SaveTasks()
        {
            foreach (Task task in _tasks)
            {
                try
                {
                    ITaskItem taskItem = DataFacade.BuildNew<ITaskItem>();
                    taskItem.Id = Guid.NewGuid();
                    taskItem.TaskId = task.Id;
                    taskItem.TaskManagerType = TypeManager.SerializeType(task.TaskManagerType);
                    taskItem.SerializedFlowToken = task.FlowToken;
                    taskItem.StartTime = task.StartTime;

                    DataFacade.AddNew<ITaskItem>(taskItem);
                }
                catch (Exception ex)
                {
                    Log.LogError(LogTitle, "Error while attempt to persist a task");
                    Log.LogError(LogTitle, ex);
                }
            }
        }


#if LeakCheck
        private string stack = Environment.StackTrace;

        /// <exclude />
        ~TaskContainer()
        {
            Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
            Dispose(false);
        }
#endif

        /// <exclude />
        public void Dispose()
        {
            Dispose(true);
#if LeakCheck
            GC.SuppressFinalize(this);
#endif
        }


        /// <exclude />
        public void Dispose(bool disposing)
        {
            if (disposing && !_disposed)
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
