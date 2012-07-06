using System.Workflow.Activities;

namespace Composite.Plugins.Elements.ElementProviders.RazorFunctionProviderElementProvider
{
    partial class AddNewRazorFunctionWorkflow
    {
        #region Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCode]
        private void InitializeComponent()
        {
            this.CanModifyActivities = true;
            System.Workflow.Activities.CodeCondition codecondition1 = new System.Workflow.Activities.CodeCondition();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.finalizecodeActivity = new System.Workflow.Activities.CodeActivity();
            this.closeCurrentViewActivity1 = new Composite.C1Console.Workflow.Activities.CloseCurrentViewActivity();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.dialogFormActivity1 = new Composite.C1Console.Workflow.Activities.DataDialogFormActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.initializeCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.validateStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity7 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.stateInitializationActivity4 = new System.Workflow.Activities.StateInitializationActivity();
            this.step1EventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step1EventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.stateInitializationActivity2 = new System.Workflow.Activities.StateInitializationActivity();
            this.stateInitializationActivity1 = new System.Workflow.Activities.StateInitializationActivity();
            this.validateStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalizeStateActivity = new System.Workflow.Activities.StateActivity();
            this.step1StateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "step1StateActivity";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "finalizeStateActivity";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity4);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.setStateActivity3);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.IsValidData);
            this.ifElseBranchActivity1.Condition = codecondition1;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // ifElseActivity1
            // 
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity1);
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity2);
            this.ifElseActivity1.Name = "ifElseActivity1";
            // 
            // setStateActivity1
            // 
            this.setStateActivity1.Name = "setStateActivity1";
            this.setStateActivity1.TargetStateName = "finalStateActivity";
            // 
            // finalizecodeActivity
            // 
            this.finalizecodeActivity.Name = "finalizecodeActivity";
            this.finalizecodeActivity.ExecuteCode += new System.EventHandler(this.finalizecodeActivity_ExecuteCode);
            // 
            // closeCurrentViewActivity1
            // 
            this.closeCurrentViewActivity1.Name = "closeCurrentViewActivity1";
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity2
            // 
            this.cancelHandleExternalEventActivity2.EventName = "Cancel";
            this.cancelHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity2.Name = "cancelHandleExternalEventActivity2";
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "validateStateActivity";
            // 
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // dialogFormActivity1
            // 
            this.dialogFormActivity1.ContainerLabel = "Add new";
            this.dialogFormActivity1.FormDefinitionFileName = "\\Administrative\\AddNewRazorFunction.xml";
            this.dialogFormActivity1.Name = "dialogFormActivity1";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "step1StateActivity";
            // 
            // initializeCodeActivity
            // 
            this.initializeCodeActivity.Name = "initializeCodeActivity";
            this.initializeCodeActivity.ExecuteCode += new System.EventHandler(this.initializeCodeActivity_ExecuteCode);
            // 
            // validateStateInitializationActivity
            // 
            this.validateStateInitializationActivity.Activities.Add(this.ifElseActivity1);
            this.validateStateInitializationActivity.Name = "validateStateInitializationActivity";
            // 
            // setStateActivity7
            // 
            this.setStateActivity7.Name = "setStateActivity7";
            this.setStateActivity7.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity1
            // 
            this.cancelHandleExternalEventActivity1.EventName = "Cancel";
            this.cancelHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity1.Name = "cancelHandleExternalEventActivity1";
            // 
            // stateInitializationActivity4
            // 
            this.stateInitializationActivity4.Activities.Add(this.closeCurrentViewActivity1);
            this.stateInitializationActivity4.Activities.Add(this.finalizecodeActivity);
            this.stateInitializationActivity4.Activities.Add(this.setStateActivity1);
            this.stateInitializationActivity4.Name = "stateInitializationActivity4";
            // 
            // step1EventDrivenActivity_Cancel
            // 
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.setStateActivity6);
            this.step1EventDrivenActivity_Cancel.Name = "step1EventDrivenActivity_Cancel";
            // 
            // step1EventDrivenActivity_Finish
            // 
            this.step1EventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity1);
            this.step1EventDrivenActivity_Finish.Activities.Add(this.setStateActivity5);
            this.step1EventDrivenActivity_Finish.Name = "step1EventDrivenActivity_Finish";
            // 
            // stateInitializationActivity2
            // 
            this.stateInitializationActivity2.Activities.Add(this.dialogFormActivity1);
            this.stateInitializationActivity2.Name = "stateInitializationActivity2";
            // 
            // stateInitializationActivity1
            // 
            this.stateInitializationActivity1.Activities.Add(this.initializeCodeActivity);
            this.stateInitializationActivity1.Activities.Add(this.setStateActivity2);
            this.stateInitializationActivity1.Name = "stateInitializationActivity1";
            // 
            // validateStateActivity
            // 
            this.validateStateActivity.Activities.Add(this.validateStateInitializationActivity);
            this.validateStateActivity.Name = "validateStateActivity";
            // 
            // eventDrivenActivity_GlobalCancel
            // 
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.cancelHandleExternalEventActivity1);
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.setStateActivity7);
            this.eventDrivenActivity_GlobalCancel.Name = "eventDrivenActivity_GlobalCancel";
            // 
            // finalStateActivity
            // 
            this.finalStateActivity.Name = "finalStateActivity";
            // 
            // finalizeStateActivity
            // 
            this.finalizeStateActivity.Activities.Add(this.stateInitializationActivity4);
            this.finalizeStateActivity.Name = "finalizeStateActivity";
            // 
            // step1StateActivity
            // 
            this.step1StateActivity.Activities.Add(this.stateInitializationActivity2);
            this.step1StateActivity.Activities.Add(this.step1EventDrivenActivity_Finish);
            this.step1StateActivity.Activities.Add(this.step1EventDrivenActivity_Cancel);
            this.step1StateActivity.Name = "step1StateActivity";
            // 
            // initializeStateActivity
            // 
            this.initializeStateActivity.Activities.Add(this.stateInitializationActivity1);
            this.initializeStateActivity.Name = "initializeStateActivity";
            // 
            // AddNewRazorFunctionWorkflow
            // 
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.step1StateActivity);
            this.Activities.Add(this.finalizeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.validateStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "AddNewRazorFunctionWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private StateActivity finalStateActivity;

        private StateActivity finalizeStateActivity;

        private StateActivity step1StateActivity;

        private StateInitializationActivity stateInitializationActivity4;

        private StateInitializationActivity stateInitializationActivity2;

        private StateInitializationActivity stateInitializationActivity1;

        private SetStateActivity setStateActivity1;

        private C1Console.Workflow.Activities.CloseCurrentViewActivity closeCurrentViewActivity1;

        private SetStateActivity setStateActivity5;

        private C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;

        private CodeActivity initializeCodeActivity;

        private EventDrivenActivity step1EventDrivenActivity_Finish;

        private C1Console.Workflow.Activities.DataDialogFormActivity dialogFormActivity1;

        private CodeActivity finalizecodeActivity;

        private SetStateActivity setStateActivity7;

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;

        private EventDrivenActivity eventDrivenActivity_GlobalCancel;

        private SetStateActivity setStateActivity2;

        private IfElseBranchActivity ifElseBranchActivity2;

        private IfElseBranchActivity ifElseBranchActivity1;

        private IfElseActivity ifElseActivity1;

        private StateInitializationActivity validateStateInitializationActivity;

        private StateActivity validateStateActivity;

        private SetStateActivity setStateActivity4;

        private SetStateActivity setStateActivity3;

        private SetStateActivity setStateActivity6;

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;

        private EventDrivenActivity step1EventDrivenActivity_Cancel;

        private StateActivity initializeStateActivity;















































































    }
}
