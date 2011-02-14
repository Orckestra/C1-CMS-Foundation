using System;
using System.Workflow.Activities;


namespace Composite.C1Console.Workflow
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [ExternalDataExchange()]
    public interface IFormsWorkflowEventService
    {
        /// <exclude />
        event EventHandler<FormEventArgs> Save;

        /// <exclude />
        event EventHandler<FormEventArgs> Next;

        /// <exclude />
        event EventHandler<FormEventArgs> Previous;

        /// <exclude />
        event EventHandler<FormEventArgs> Finish;

        /// <exclude />
        event EventHandler<FormEventArgs> Cancel;

        /// <exclude />
        event EventHandler<FormEventArgs> Preview;

        /// <exclude />
        event EventHandler<FormEventArgs> CustomEvent01;

        /// <exclude />
        event EventHandler<FormEventArgs> CustomEvent02;

        /// <exclude />
        event EventHandler<FormEventArgs> CustomEvent03;

        /// <exclude />
        event EventHandler<FormEventArgs> CustomEvent04;

        /// <exclude />
        event EventHandler<FormEventArgs> CustomEvent05;

        /// <exclude />
        event EventHandler<FormEventArgs> ChildWorkflowDone;

    }
}
