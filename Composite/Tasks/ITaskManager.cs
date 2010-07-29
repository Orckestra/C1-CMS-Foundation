using System;
using Composite.Actions;


namespace Composite.Tasks
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class TaskManagerEvent
    {
    }


    internal class FlowTaskManagerEvent : TaskManagerEvent
    {
        public FlowTaskManagerEvent(FlowToken flowToken)
        {
            this.FlowToken = flowToken;
        }


        public FlowToken FlowToken { get; private set; }
    }



	internal interface ITaskManager
	{

        /// <summary>
        /// This is called when the tast is created for the first time.
        /// If this method returns false, the task will not get started and
        /// no more events on the task mananger will get called.
        /// </summary>
        /// <param name="taskId"></param>
        /// <param name="taskManagerEvent"></param>
        /// <returns></returns>
        bool OnCreated(string taskId, TaskManagerEvent taskManagerEvent);



        /// <summary>
        /// This is called just before an action/flow is started
        /// </summary>
        /// <param name="taskId"></param>
        /// <param name="taskManagerEvent"></param>
        void OnRun(string taskId, TaskManagerEvent taskManagerEvent);


        /// <summary>
        /// This this will always be called after OnRun and before OnIdle.
        /// It may not be called, and it might also be called more than once.
        /// Check the <paramref name="taskManagerEvent"/> for more information on the call
        /// </summary>
        /// <param name="taskId"></param>
        /// <param name="taskManagerEvent"></param>
        void OnStatus(string taskId, TaskManagerEvent taskManagerEvent);


        /// <summary>
        /// This is called after an action/flow has gone idle
        /// </summary>
        /// <param name="taskId"></param>
        /// <param name="taskManagerEvent"></param>
        void OnIdle(string taskId, TaskManagerEvent taskManagerEvent);


        /// <summary>
        /// This is called when the task is compleated.
        /// </summary>
        void OnCompleted(string taskId, TaskManagerEvent taskManagerEvent);
	}
}
