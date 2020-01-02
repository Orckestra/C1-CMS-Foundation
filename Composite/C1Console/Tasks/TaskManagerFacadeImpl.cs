using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Actions;
using Composite.C1Console.Security;
using Composite.Core;
using Composite.Data;
using Composite.Core.Linq;
using Composite.Data.Types;
using Composite.Core.Threading;
using Composite.Core.Types;


namespace Composite.C1Console.Tasks
{
    internal class TaskManagerFacadeImpl : ITaskManagerFacade
    {
        private readonly List<Func<EntityToken, ActionToken, Task>> _taskCreators = new List<Func<EntityToken, ActionToken, Task>>();
        private readonly List<Task> _tasks = new List<Task>();

        private readonly object _lock = new object();


        public TaskManagerFacadeImpl()
        {
            LoadTasks();
        }



        public void AttachTaskCreator(Func<EntityToken, ActionToken, Task> taskCreator)
        {
            _taskCreators.Add(taskCreator);
        }



        public TaskContainer CreateNewTasks(EntityToken entityToken, ActionToken actionToken, TaskManagerEvent taskManagerEvent)
        {
            List<Task> newTasks = new List<Task>();

            lock (_lock)
            {
                foreach (Func<EntityToken, ActionToken, Task> taskCreator in _taskCreators)
                {
                    try
                    {
                        Task task = taskCreator(entityToken, actionToken);
                        if (task == null) continue;

                        bool result = task.TaskManager.OnCreated(task.Id, taskManagerEvent);
                        if (result == false) continue;

                        _tasks.Add(task);
                        newTasks.Add(task);
                    }
                    catch (Exception ex)
                    {
                        Log.LogError("TaskManagerFacade", "Starting new task failed with following exception");
                        Log.LogError("TaskManagerFacade", ex);
                    }
                }
            }

            return new TaskContainer(newTasks, null);
        }

        public TaskContainer RuntTasks(FlowToken flowToken, TaskManagerEvent taskManagerEvent)
        {
            string serializedFlowToken = flowToken.Serialize();

            List<Task> tasks;
            lock (_lock)
            {
                tasks = _tasks.Where(f => f.FlowToken == serializedFlowToken).ToList();
            }

            return new TaskContainer(tasks, taskManagerEvent);
        }



        public void CompleteTasks(FlowToken flowToken)
        {
            string serializedFlowToken = flowToken.Serialize();

            lock (_lock)
            {
                List<Task> tasks = _tasks.Where(f => f.FlowToken == serializedFlowToken).ToList();
                foreach (Task task in tasks)
                {
                    task.TaskManager.OnCompleted(task.Id, null);
                    _tasks.Remove(task);

                    DataFacade.Delete<ITaskItem>(f => f.TaskId == task.Id);
                }
            }
        }
     

        /// <summary>
        /// Loads task persisted in database
        /// </summary>
        private void LoadTasks()
        {
            using (ThreadDataManager.EnsureInitialize())
            {
                IEnumerable<ITaskItem> taskItems = DataFacade.GetData<ITaskItem>().Evaluate();

                var toDelete = new List<ITaskItem>();

                foreach (ITaskItem taskItem in taskItems)
                {
                    Type type = TypeManager.TryGetType(taskItem.TaskManagerType);
                    if (type == null)
                    {
                        Log.LogWarning(nameof(TaskManagerFacade),
                            $"Removing task item with id '{taskItem.TaskId}'. The Task Manager Type '{taskItem.TaskManagerType}' can not be found.");

                        toDelete.Add(taskItem);

                        if (toDelete.Count >= 100)
                        {
                            DataFacade.Delete<ITaskItem>(toDelete);
                            toDelete.Clear();
                        }
                        continue;
                    }

                    Task task = new Task(taskItem.TaskId, type)
                    {
                        StartTime = taskItem.StartTime,
                        FlowToken = taskItem.SerializedFlowToken
                    };

                    _tasks.Add(task);
                }

                if (toDelete.Count > 0)
                {
                    DataFacade.Delete<ITaskItem>(toDelete);
                }
            }
        }
    }
}
