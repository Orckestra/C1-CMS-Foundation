using System;

namespace Composite.Workflow
{
    public enum WorkflowPersistingType
    {
        /// <summary>
        /// Never persisted
        /// </summary>
        Never, 

        /// <summary>
        /// Workflow with this type of persistence will be unloaded after entering "Idle" state
        /// </summary>
        Idle, 
     
        /// <summary>
        /// Workflow will be unloaded and serialized while shutting down
        /// </summary>
        Shutdown
    }



    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
    public sealed class AllowPersistingWorkflowAttribute : Attribute
    {
        public AllowPersistingWorkflowAttribute(WorkflowPersistingType workflowPersistingType)
        {
            this.WorkflowPersistingType = workflowPersistingType;
        }


        public WorkflowPersistingType WorkflowPersistingType
        {
            get;
            private set;
        }
    }
}
