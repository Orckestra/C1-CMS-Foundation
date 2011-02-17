using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Actions;
using Composite.C1Console.Security;
using Composite.Data;
using Composite.Core.Linq;
using Composite.Data.Types;
using Composite.Core.Threading;
using Composite.Core.Types;
using Composite.Core.Logging;


namespace Composite.C1Console.Tasks
{
    internal class TaskManagerFacadeImpl : ITaskManagerFacade
    {
        private List<Func<EntityToken, ActionToken, Task>> _taskCreators = new List<Func<EntityToken, ActionToken, Task>>();
        private List<Task> _tasks = new List<Task>();

        private object _lock = new object();


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
                        LoggingService.LogError("TaskManagerFacade", "Starting new task failed with following exception");
                        LoggingService.LogError("TaskManagerFacade", ex);
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
                }
            }
        }



        public void OnShutDown()
        {
            PersistTasks();
        }



        private void LoadTasks()
        {
            using (ThreadDataManager.EnsureInitialize())
            {
                IEnumerable<ITaskItem> taskItems = DataFacade.GetData<ITaskItem>().Evaluate();
                foreach (ITaskItem taskItem in taskItems)
                {
                    Type type = TypeManager.TryGetType(taskItem.TaskManagerType);
                    if (type == null)
                    {
                        LoggingService.LogWarning("TaskManagerFacade", string.Format("Could not get the type '{0}'", taskItem.TaskManagerType));
                        LoggingService.LogWarning("TaskManagerFacade", string.Format("Removing task item with id '{0}'. The Task Manager Type can not be found.", taskItem.TaskId));
                        DataFacade.Delete<ITaskItem>(taskItem);
                        continue;
                    }

                    Task task = new Task(taskItem.TaskId, type);
                    task.StartTime = taskItem.StartTime;
                    task.FlowToken = taskItem.SerializedFlowToken;

                    _tasks.Add(task);
                }
            }
        }



        private void PersistTasks()
        {
            lock (_lock)
            {
                DataFacade.Delete<ITaskItem>(f => true);

                foreach (Task task in _tasks)
                {
                    ITaskItem taskItem = DataFacade.BuildNew<ITaskItem>();
                    taskItem.Id = Guid.NewGuid();
                    taskItem.TaskId = task.Id;
                    taskItem.TaskManagerType = TypeManager.SerializeType(task.TaskManagerType);
                    taskItem.SerializedFlowToken = task.FlowToken;
                    taskItem.StartTime = task.StartTime;

                    DataFacade.AddNew<ITaskItem>(taskItem);
                }

                _tasks = new List<Task>();
            }
        }
    }
}
