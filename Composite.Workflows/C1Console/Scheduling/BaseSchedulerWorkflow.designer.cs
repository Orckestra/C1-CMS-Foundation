using System.Workflow.Activities;

namespace Composite.C1Console.Scheduling
{
    partial class BaseSchedulerWorkflow
    {
        #region Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this� method with the code editor.
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCode]
        private void InitializeComponent()
        {
            this.CanModifyActivities = true;
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.finalizeCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.waitDelayActivity = new System.Workflow.Activities.DelayActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.initializeCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.waitEventDrivenActivity_Timeout = new System.Workflow.Activities.EventDrivenActivity();
            this.waitStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity19 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.finalizeStateActivity = new System.Workflow.Activities.StateActivity();
            this.waitStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            this.finishState = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "finishState";
            // 
            // finalizeCodeActivity
            // 
            this.finalizeCodeActivity.Name = "finalizeCodeActivity";
            this.finalizeCodeActivity.ExecuteCode += new System.EventHandler(this.finalizeCodeActivity_ExecuteCode);
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "finalizeStateActivity";
            // 
            // waitDelayActivity
            // 
            this.waitDelayActivity.Name = "waitDelayActivity";
            this.waitDelayActivity.TimeoutDuration = System.TimeSpan.Parse("00:00:15");
            // 
            // setStateActivity1
            // 
            this.setStateActivity1.Name = "setStateActivity1";
            this.setStateActivity1.TargetStateName = "waitStateActivity";
            // 
            // initializeCodeActivity
            // 
            this.initializeCodeActivity.Name = "initializeCodeActivity";
            this.initializeCodeActivity.ExecuteCode += new System.EventHandler(this.initializeCodeActivity_ExecuteCode);
            // 
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.finalizeCodeActivity);
            this.finalizeStateInitializationActivity.Activities.Add(this.setStateActivity3);
            this.finalizeStateInitializationActivity.Name = "finalizeStateInitializationActivity";
            // 
            // waitEventDrivenActivity_Timeout
            // 
            this.waitEventDrivenActivity_Timeout.Activities.Add(this.waitDelayActivity);
            this.waitEventDrivenActivity_Timeout.Activities.Add(this.setStateActivity2);
            this.waitEventDrivenActivity_Timeout.Name = "waitEventDrivenActivity_Timeout";
            // 
            // waitStateInitializationActivity
            // 
            this.waitStateInitializationActivity.Name = "waitStateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.initializeCodeActivity);
            this.initializeStateInitializationActivity.Activities.Add(this.setStateActivity1);
            this.initializeStateInitializationActivity.Name = "initializeStateInitializationActivity";
            // 
            // setStateActivity19
            // 
            this.setStateActivity19.Name = "setStateActivity19";
            this.setStateActivity19.TargetStateName = "finishState";
            // 
            // cancelHandleExternalEventActivity1
            // 
            this.cancelHandleExternalEventActivity1.EventName = "Cancel";
            this.cancelHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity1.Name = "cancelHandleExternalEventActivity1";
            // 
            // finalizeStateActivity
            // 
            this.finalizeStateActivity.Activities.Add(this.finalizeStateInitializationActivity);
            this.finalizeStateActivity.Name = "finalizeStateActivity";
            // 
            // waitStateActivity
            // 
            this.waitStateActivity.Activities.Add(this.waitStateInitializationActivity);
            this.waitStateActivity.Activities.Add(this.waitEventDrivenActivity_Timeout);
            this.waitStateActivity.Name = "waitStateActivity";
            // 
            // initializeStateActivity
            // 
            this.initializeStateActivity.Activities.Add(this.initializeStateInitializationActivity);
            this.initializeStateActivity.Name = "initializeStateActivity";
            // 
            // eventDrivenActivity_GlobalCancel
            // 
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.cancelHandleExternalEventActivity1);
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.setStateActivity19);
            this.eventDrivenActivity_GlobalCancel.Name = "eventDrivenActivity_GlobalCancel";
            // 
            // finishState
            // 
            this.finishState.Name = "finishState";
            // 
            // PagePublishSchedulerWorkflow
            // 
            this.Activities.Add(this.finishState);
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.waitStateActivity);
            this.Activities.Add(this.finalizeStateActivity);
            this.CompletedStateName = "finishState";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "PagePublishSchedulerWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private StateActivity finishState;
        private SetStateActivity setStateActivity19;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateInitializationActivity waitStateInitializationActivity;
        private StateInitializationActivity initializeStateInitializationActivity;
        private StateActivity waitStateActivity;
        private StateActivity initializeStateActivity;
        private DelayActivity waitDelayActivity;
        private SetStateActivity setStateActivity1;
        private EventDrivenActivity waitEventDrivenActivity_Timeout;
        private CodeActivity finalizeCodeActivity;
        private StateInitializationActivity finalizeStateInitializationActivity;
        private StateActivity finalizeStateActivity;
        private SetStateActivity setStateActivity3;
        private SetStateActivity setStateActivity2;
        private CodeActivity initializeCodeActivity;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;
    }
}
