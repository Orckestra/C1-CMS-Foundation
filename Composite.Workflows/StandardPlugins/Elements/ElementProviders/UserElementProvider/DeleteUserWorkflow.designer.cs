using System;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.Collections;
using System.Drawing;
using System.Reflection;
using System.Workflow.ComponentModel.Compiler;
using System.Workflow.ComponentModel.Serialization;
using System.Workflow.ComponentModel;
using System.Workflow.ComponentModel.Design;
using System.Workflow.Runtime;
using System.Workflow.Activities;
using System.Workflow.Activities.Rules;
using Composite.C1Console.Workflow;

namespace Composite.Plugins.Elements.ElementProviders.UserElementProvider
{
    partial class DeleteUserWorkflow
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
            System.Workflow.Activities.CodeCondition codecondition1 = new System.Workflow.Activities.CodeCondition();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.showConsoleMessageBoxActivity1 = new Composite.C1Console.Workflow.Activities.ShowConsoleMessageBoxActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.finalizeCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.closeCurrentViewActivity1 = new Composite.C1Console.Workflow.Activities.CloseCurrentViewActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.step1WizzardFormActivity = new Composite.C1Console.Workflow.Activities.ConfirmDialogFormActivity();
            this.ifElseActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.initializeCodeActivity_Initialize = new System.Workflow.Activities.CodeActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step1EventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step1EventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.step1StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.finalizeStateActivity = new System.Workflow.Activities.StateActivity();
            this.step1StateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            this.finishState = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "step1StateActivity";
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "finishState";
            // 
            // showConsoleMessageBoxActivity1
            // 
            this.showConsoleMessageBoxActivity1.DialogType = Composite.C1Console.Events.DialogType.Error;
            this.showConsoleMessageBoxActivity1.Message = "${Composite.Management, DeleteUserWorkflow.DeleteSelfErrorMessage}";
            this.showConsoleMessageBoxActivity1.Name = "showConsoleMessageBoxActivity1";
            this.showConsoleMessageBoxActivity1.Title = "${Composite.Management, DeleteUserWorkflow.DeleteSelfTitle}";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity3);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.showConsoleMessageBoxActivity1);
            this.ifElseBranchActivity1.Activities.Add(this.setStateActivity6);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.IsDeleteSelf);
            this.ifElseBranchActivity1.Condition = codecondition1;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "finishState";
            // 
            // finalizeCodeActivity
            // 
            this.finalizeCodeActivity.Name = "finalizeCodeActivity";
            this.finalizeCodeActivity.ExecuteCode += new System.EventHandler(this.finalizeCodeActivity_ExecuteCode);
            // 
            // closeCurrentViewActivity1
            // 
            this.closeCurrentViewActivity1.Name = "closeCurrentViewActivity1";
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "finishState";
            // 
            // cancelHandleExternalEventActivity2
            // 
            this.cancelHandleExternalEventActivity2.EventName = "Cancel";
            this.cancelHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity2.Name = "cancelHandleExternalEventActivity2";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "finalizeStateActivity";
            // 
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // step1WizzardFormActivity
            // 
            this.step1WizzardFormActivity.ContainerLabel = null;
            this.step1WizzardFormActivity.FormDefinitionFileName = "\\Administrative\\DeleteUserStep1.xml";
            this.step1WizzardFormActivity.Name = "step1WizzardFormActivity";
            // 
            // ifElseActivity1
            // 
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity1);
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity2);
            this.ifElseActivity1.Name = "ifElseActivity1";
            // 
            // initializeCodeActivity_Initialize
            // 
            this.initializeCodeActivity_Initialize.Name = "initializeCodeActivity_Initialize";
            this.initializeCodeActivity_Initialize.ExecuteCode += new System.EventHandler(this.initializeCodeActivity_Initialize_ExecuteCode);
            // 
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.closeCurrentViewActivity1);
            this.finalizeStateInitializationActivity.Activities.Add(this.finalizeCodeActivity);
            this.finalizeStateInitializationActivity.Activities.Add(this.setStateActivity4);
            this.finalizeStateInitializationActivity.Name = "finalizeStateInitializationActivity";
            // 
            // step1EventDrivenActivity_Cancel
            // 
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.setStateActivity5);
            this.step1EventDrivenActivity_Cancel.Name = "step1EventDrivenActivity_Cancel";
            // 
            // step1EventDrivenActivity_Finish
            // 
            this.step1EventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity1);
            this.step1EventDrivenActivity_Finish.Activities.Add(this.setStateActivity2);
            this.step1EventDrivenActivity_Finish.Name = "step1EventDrivenActivity_Finish";
            // 
            // step1StateInitializationActivity
            // 
            this.step1StateInitializationActivity.Activities.Add(this.step1WizzardFormActivity);
            this.step1StateInitializationActivity.Name = "step1StateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.initializeCodeActivity_Initialize);
            this.initializeStateInitializationActivity.Activities.Add(this.ifElseActivity1);
            this.initializeStateInitializationActivity.Name = "initializeStateInitializationActivity";
            // 
            // setStateActivity1
            // 
            this.setStateActivity1.Name = "setStateActivity1";
            this.setStateActivity1.TargetStateName = "finishState";
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
            // step1StateActivity
            // 
            this.step1StateActivity.Activities.Add(this.step1StateInitializationActivity);
            this.step1StateActivity.Activities.Add(this.step1EventDrivenActivity_Finish);
            this.step1StateActivity.Activities.Add(this.step1EventDrivenActivity_Cancel);
            this.step1StateActivity.Name = "step1StateActivity";
            // 
            // initializeStateActivity
            // 
            this.initializeStateActivity.Activities.Add(this.initializeStateInitializationActivity);
            this.initializeStateActivity.Name = "initializeStateActivity";
            // 
            // eventDrivenActivity_GlobalCancel
            // 
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.cancelHandleExternalEventActivity1);
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.setStateActivity1);
            this.eventDrivenActivity_GlobalCancel.Name = "eventDrivenActivity_GlobalCancel";
            // 
            // finishState
            // 
            this.finishState.Name = "finishState";
            // 
            // DeleteUserWorkflow
            // 
            this.Activities.Add(this.finishState);
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.step1StateActivity);
            this.Activities.Add(this.finalizeStateActivity);
            this.CompletedStateName = "finishState";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "DeleteUserWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private StateActivity finishState;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateInitializationActivity initializeStateInitializationActivity;
        private SetStateActivity setStateActivity1;
        private StateActivity initializeStateActivity;
        private Composite.C1Console.Workflow.Activities.ConfirmDialogFormActivity step1WizzardFormActivity;
        private StateInitializationActivity step1StateInitializationActivity;
        private StateActivity step1StateActivity;
        private CodeActivity finalizeCodeActivity;
        private StateInitializationActivity finalizeStateInitializationActivity;
        private EventDrivenActivity step1EventDrivenActivity_Finish;
        private StateActivity finalizeStateActivity;
        private SetStateActivity setStateActivity2;
        private SetStateActivity setStateActivity3;
        private SetStateActivity setStateActivity4;
        private Composite.C1Console.Workflow.Activities.CloseCurrentViewActivity closeCurrentViewActivity1;
        private Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;
        private SetStateActivity setStateActivity5;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;
        private EventDrivenActivity step1EventDrivenActivity_Cancel;
        private CodeActivity initializeCodeActivity_Initialize;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private IfElseActivity ifElseActivity1;
        private SetStateActivity setStateActivity6;
        private Composite.C1Console.Workflow.Activities.ShowConsoleMessageBoxActivity showConsoleMessageBoxActivity1;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;






























































































































    }
}
