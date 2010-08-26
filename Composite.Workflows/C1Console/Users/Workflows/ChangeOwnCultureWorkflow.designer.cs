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

namespace Composite.C1Console.Users.Workflows
{
    partial class ChangeOwnCultureWorkflow
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
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.confirmDialogFormActivity1 = new Composite.C1Console.Workflow.Activities.ConfirmDialogFormActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.handleExternalEventActivity1 = new System.Workflow.Activities.HandleExternalEventActivity();
            this.ifElseActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.stepInitialize_codeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity3 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity11 = new System.Workflow.Activities.SetStateActivity();
            this.handleExternalEventActivity3 = new System.Workflow.Activities.HandleExternalEventActivity();
            this.step1WizardFormActivity = new Composite.C1Console.Workflow.Activities.DataDialogFormActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.rebootConsoleActivity = new System.Workflow.Activities.CodeActivity();
            this.closeCurrentViewActivity1 = new Composite.C1Console.Workflow.Activities.CloseCurrentViewActivity();
            this.stepFinalize_codeActivity = new System.Workflow.Activities.CodeActivity();
            this.confirm_eventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.confirm_eventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.stateInitializationActivity1 = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity19 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step1_eventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step1_eventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.step1StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.confirmChangeAndReboot = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            this.initializeActivity = new System.Workflow.Activities.StateActivity();
            this.step1State = new System.Workflow.Activities.StateActivity();
            this.finalizeActivity = new System.Workflow.Activities.StateActivity();
            this.finishState = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "finishState";
            // 
            // confirmDialogFormActivity1
            // 
            this.confirmDialogFormActivity1.ContainerLabel = null;
            this.confirmDialogFormActivity1.FormDefinitionFileName = "\\Administrative\\ChangeOwnCultureConfirmReboot.xml";
            this.confirmDialogFormActivity1.Name = "confirmDialogFormActivity1";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity6);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.confirmDialogFormActivity1);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.CultureHasChanged);
            this.ifElseBranchActivity1.Condition = codecondition1;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "finishState";
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
            this.setStateActivity2.TargetStateName = "finalizeActivity";
            // 
            // handleExternalEventActivity1
            // 
            this.handleExternalEventActivity1.EventName = "Finish";
            this.handleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.handleExternalEventActivity1.Name = "handleExternalEventActivity1";
            // 
            // ifElseActivity1
            // 
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity1);
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity2);
            this.ifElseActivity1.Name = "ifElseActivity1";
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "step1State";
            // 
            // stepInitialize_codeActivity
            // 
            this.stepInitialize_codeActivity.Name = "stepInitialize_codeActivity";
            this.stepInitialize_codeActivity.ExecuteCode += new System.EventHandler(this.stepInitialize_codeActivity_ExecuteCode);
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "finishState";
            // 
            // cancelHandleExternalEventActivity3
            // 
            this.cancelHandleExternalEventActivity3.EventName = "Cancel";
            this.cancelHandleExternalEventActivity3.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity3.Name = "cancelHandleExternalEventActivity3";
            // 
            // setStateActivity11
            // 
            this.setStateActivity11.Name = "setStateActivity11";
            this.setStateActivity11.TargetStateName = "confirmChangeAndReboot";
            // 
            // handleExternalEventActivity3
            // 
            this.handleExternalEventActivity3.EventName = "Finish";
            this.handleExternalEventActivity3.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.handleExternalEventActivity3.Name = "handleExternalEventActivity3";
            // 
            // step1WizardFormActivity
            // 
            this.step1WizardFormActivity.ContainerLabel = "Add new";
            this.step1WizardFormActivity.FormDefinitionFileName = "\\Administrative\\ChangeOwnCulture.xml";
            this.step1WizardFormActivity.Name = "step1WizardFormActivity";
            // 
            // setStateActivity1
            // 
            this.setStateActivity1.Name = "setStateActivity1";
            this.setStateActivity1.TargetStateName = "finishState";
            // 
            // rebootConsoleActivity
            // 
            this.rebootConsoleActivity.Name = "rebootConsoleActivity";
            this.rebootConsoleActivity.ExecuteCode += new System.EventHandler(this.rebootConsoleActivity_ExecuteCode);
            // 
            // closeCurrentViewActivity1
            // 
            this.closeCurrentViewActivity1.Name = "closeCurrentViewActivity1";
            // 
            // stepFinalize_codeActivity
            // 
            this.stepFinalize_codeActivity.Name = "stepFinalize_codeActivity";
            this.stepFinalize_codeActivity.ExecuteCode += new System.EventHandler(this.stepFinalize_codeActivity_ExecuteCode);
            // 
            // confirm_eventDrivenActivity_Cancel
            // 
            this.confirm_eventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.confirm_eventDrivenActivity_Cancel.Activities.Add(this.setStateActivity3);
            this.confirm_eventDrivenActivity_Cancel.Name = "confirm_eventDrivenActivity_Cancel";
            // 
            // confirm_eventDrivenActivity_Finish
            // 
            this.confirm_eventDrivenActivity_Finish.Activities.Add(this.handleExternalEventActivity1);
            this.confirm_eventDrivenActivity_Finish.Activities.Add(this.setStateActivity2);
            this.confirm_eventDrivenActivity_Finish.Name = "confirm_eventDrivenActivity_Finish";
            // 
            // stateInitializationActivity1
            // 
            this.stateInitializationActivity1.Activities.Add(this.ifElseActivity1);
            this.stateInitializationActivity1.Name = "stateInitializationActivity1";
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
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.stepInitialize_codeActivity);
            this.initializeStateInitializationActivity.Activities.Add(this.setStateActivity4);
            this.initializeStateInitializationActivity.Name = "initializeStateInitializationActivity";
            // 
            // step1_eventDrivenActivity_Cancel
            // 
            this.step1_eventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity3);
            this.step1_eventDrivenActivity_Cancel.Activities.Add(this.setStateActivity5);
            this.step1_eventDrivenActivity_Cancel.Name = "step1_eventDrivenActivity_Cancel";
            // 
            // step1_eventDrivenActivity_Finish
            // 
            this.step1_eventDrivenActivity_Finish.Activities.Add(this.handleExternalEventActivity3);
            this.step1_eventDrivenActivity_Finish.Activities.Add(this.setStateActivity11);
            this.step1_eventDrivenActivity_Finish.Name = "step1_eventDrivenActivity_Finish";
            // 
            // step1StateInitializationActivity
            // 
            this.step1StateInitializationActivity.Activities.Add(this.step1WizardFormActivity);
            this.step1StateInitializationActivity.Name = "step1StateInitializationActivity";
            // 
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.stepFinalize_codeActivity);
            this.finalizeStateInitializationActivity.Activities.Add(this.closeCurrentViewActivity1);
            this.finalizeStateInitializationActivity.Activities.Add(this.rebootConsoleActivity);
            this.finalizeStateInitializationActivity.Activities.Add(this.setStateActivity1);
            this.finalizeStateInitializationActivity.Name = "finalizeStateInitializationActivity";
            // 
            // confirmChangeAndReboot
            // 
            this.confirmChangeAndReboot.Activities.Add(this.stateInitializationActivity1);
            this.confirmChangeAndReboot.Activities.Add(this.confirm_eventDrivenActivity_Finish);
            this.confirmChangeAndReboot.Activities.Add(this.confirm_eventDrivenActivity_Cancel);
            this.confirmChangeAndReboot.Name = "confirmChangeAndReboot";
            // 
            // eventDrivenActivity_GlobalCancel
            // 
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.cancelHandleExternalEventActivity1);
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.setStateActivity19);
            this.eventDrivenActivity_GlobalCancel.Name = "eventDrivenActivity_GlobalCancel";
            // 
            // initializeActivity
            // 
            this.initializeActivity.Activities.Add(this.initializeStateInitializationActivity);
            this.initializeActivity.Name = "initializeActivity";
            // 
            // step1State
            // 
            this.step1State.Activities.Add(this.step1StateInitializationActivity);
            this.step1State.Activities.Add(this.step1_eventDrivenActivity_Finish);
            this.step1State.Activities.Add(this.step1_eventDrivenActivity_Cancel);
            this.step1State.Name = "step1State";
            // 
            // finalizeActivity
            // 
            this.finalizeActivity.Activities.Add(this.finalizeStateInitializationActivity);
            this.finalizeActivity.Name = "finalizeActivity";
            // 
            // finishState
            // 
            this.finishState.Name = "finishState";
            // 
            // ChangeOwnCultureWorkflow
            // 
            this.Activities.Add(this.finishState);
            this.Activities.Add(this.finalizeActivity);
            this.Activities.Add(this.step1State);
            this.Activities.Add(this.initializeActivity);
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.confirmChangeAndReboot);
            this.CompletedStateName = "finishState";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeActivity";
            this.Name = "ChangeOwnCultureWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private StateInitializationActivity step1StateInitializationActivity;
        private HandleExternalEventActivity handleExternalEventActivity3;
        private EventDrivenActivity step1_eventDrivenActivity_Finish;
        private StateActivity finishState;
        private StateActivity finalizeActivity;
        private StateInitializationActivity finalizeStateInitializationActivity;
        private Composite.C1Console.Workflow.Activities.CloseCurrentViewActivity closeCurrentViewActivity1;
        private CodeActivity stepFinalize_codeActivity;
        private SetStateActivity setStateActivity4;
        private StateInitializationActivity initializeStateInitializationActivity;
        private StateActivity initializeActivity;
        private CodeActivity stepInitialize_codeActivity;
        private SetStateActivity setStateActivity11;
        private Composite.C1Console.Workflow.Activities.DataDialogFormActivity step1WizardFormActivity;
        private SetStateActivity setStateActivity1;
        private SetStateActivity setStateActivity19;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;
        private SetStateActivity setStateActivity2;
        private HandleExternalEventActivity handleExternalEventActivity1;
        private Composite.C1Console.Workflow.Activities.ConfirmDialogFormActivity confirmDialogFormActivity1;
        private EventDrivenActivity confirm_eventDrivenActivity_Finish;
        private StateInitializationActivity stateInitializationActivity1;
        private StateActivity confirmChangeAndReboot;
        private CodeActivity rebootConsoleActivity;
        private SetStateActivity setStateActivity3;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;
        private SetStateActivity setStateActivity5;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity3;
        private EventDrivenActivity confirm_eventDrivenActivity_Cancel;
        private EventDrivenActivity step1_eventDrivenActivity_Cancel;
        private SetStateActivity setStateActivity6;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private IfElseActivity ifElseActivity1;
        private StateActivity step1State;




















































































































    }
}
