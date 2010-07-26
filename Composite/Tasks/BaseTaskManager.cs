using System;


namespace Composite.Tasks
{
    internal class BaseTaskManager : ITaskManager
    {
        public virtual bool OnCreated(string taskId, TaskManagerEvent taskManagerEvent) { return true; }
        public virtual void OnCompleted(string taskId, TaskManagerEvent taskManagerEvent) { }

        public virtual void OnRun(string taskId, TaskManagerEvent taskManagerEvent) { }
        public virtual void OnStatus(string taskId, TaskManagerEvent taskManagerEvent) { }
        public virtual void OnIdle(string taskId, TaskManagerEvent taskManagerEvent) { }
    }
}
