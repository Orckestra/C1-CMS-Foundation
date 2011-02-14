using System;

namespace Composite.C1Console.Workflow
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
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


    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
    public sealed class AllowPersistingWorkflowAttribute : Attribute
    {
        /// <exclude />
        public AllowPersistingWorkflowAttribute(WorkflowPersistingType workflowPersistingType)
        {
            this.WorkflowPersistingType = workflowPersistingType;
        }


        /// <exclude />
        public WorkflowPersistingType WorkflowPersistingType
        {
            get;
            private set;
        }
    }
}
