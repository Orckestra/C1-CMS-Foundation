using System;
using System.Workflow.Activities;


namespace Composite.Workflow
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [ExternalDataExchange()]
    public interface IFormsWorkflowEventService
    {
        event EventHandler<FormEventArgs> Save;
        event EventHandler<FormEventArgs> Next;
        event EventHandler<FormEventArgs> Previous;
        event EventHandler<FormEventArgs> Finish;
        event EventHandler<FormEventArgs> Cancel;

        event EventHandler<FormEventArgs> Preview;

        event EventHandler<FormEventArgs> CustomEvent01;
        event EventHandler<FormEventArgs> CustomEvent02;
        event EventHandler<FormEventArgs> CustomEvent03;
        event EventHandler<FormEventArgs> CustomEvent04;
        event EventHandler<FormEventArgs> CustomEvent05;

        event EventHandler<FormEventArgs> ChildWorkflowDone;

    }
}
