using System;
using Composite.C1Console.Actions;



namespace Composite.C1Console.Tasks
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class Task
    {
        /// <exclude />
        public Task(string id, Type taskManagerType)
        {
            VerifyTaskManagerType(taskManagerType);

            this.Id = id;
            this.TaskManagerType = taskManagerType;
            this.StartTime = DateTime.Now;

            this.TaskManager = (ITaskManager)Activator.CreateInstance(taskManagerType);
        }


        /// <exclude />
        public string Id { get; private set; }

        /// <exclude />
        public Type TaskManagerType { get; private set; }

        /// <exclude />
        public DateTime StartTime { get; internal set; }

        internal ITaskManager TaskManager { get; set; }
        internal string FlowToken { get; set; }


        private static void VerifyTaskManagerType(Type taskManagerType)
        {
            if (taskManagerType == null) throw new ArgumentNullException("taskManagerType");
            if (typeof(ITaskManager).IsAssignableFrom(taskManagerType) == false) throw new ArgumentException("The type taskManagerType is not assigneble from the type: " + typeof(ITaskManager).FullName);
        }
    }
}
