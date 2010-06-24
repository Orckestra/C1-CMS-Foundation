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
using Composite.Workflow;

namespace Composite.Users.Workflows
{
    partial class ChangeOwnPasswordWorkflow
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
            System.Workflow.Activities.CodeCondition codecondition2 = new System.Workflow.Activities.CodeCondition();
            this.setStateActivity20 = new System.Workflow.Activities.SetStateActivity();
            this.InitializeConditionsNotMetAlertActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.ChangePasswordWorkflow_Initialize = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.initializeConditionsNotMetBranchActivity = new System.Workflow.Activities.IfElseBranchActivity();
            this.initializeConditionsMetBranchActivity = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.initializeConditionsMetIfElseActivity = new System.Workflow.Activities.IfElseActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.handleExternalEventActivity2 = new System.Workflow.Activities.HandleExternalEventActivity();
            this.ifElseActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.handleExternalEventActivity1 = new System.Workflow.Activities.HandleExternalEventActivity();
            this.dataDialogFormActivity1 = new Composite.Workflow.Activities.DataDialogFormActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.closeCurrentViewActivity1 = new Composite.Workflow.Activities.CloseCurrentViewActivity();
            this.stepFinalize_codeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity19 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step1_eventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step1_eventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.step1StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            this.initializeActivity = new System.Workflow.Activities.StateActivity();
            this.step1State = new System.Workflow.Activities.StateActivity();
            this.finalizeActivity = new System.Workflow.Activities.StateActivity();
            this.finishState = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity20
            // 
            this.setStateActivity20.Name = "setStateActivity20";
            this.setStateActivity20.TargetStateName = "finishState";
            // 
            // InitializeConditionsNotMetAlertActivity
            // 
            this.InitializeConditionsNotMetAlertActivity.Name = "InitializeConditionsNotMetAlertActivity";
            this.InitializeConditionsNotMetAlertActivity.ExecuteCode += new System.EventHandler(this.InitializeConditionsNotMetAlertActivity_ExecuteCode);
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "step1State";
            // 
            // ChangePasswordWorkflow_Initialize
            // 
            this.ChangePasswordWorkflow_Initialize.Name = "ChangePasswordWorkflow_Initialize";
            this.ChangePasswordWorkflow_Initialize.ExecuteCode += new System.EventHandler(this.ChangePasswordWorkflow_Initialize_ExecuteCode);
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "step1State";
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "finalizeActivity";
            // 
            // initializeConditionsNotMetBranchActivity
            // 
            this.initializeConditionsNotMetBranchActivity.Activities.Add(this.InitializeConditionsNotMetAlertActivity);
            this.initializeConditionsNotMetBranchActivity.Activities.Add(this.setStateActivity20);
            this.initializeConditionsNotMetBranchActivity.Name = "initializeConditionsNotMetBranchActivity";
            // 
            // initializeConditionsMetBranchActivity
            // 
            this.initializeConditionsMetBranchActivity.Activities.Add(this.ChangePasswordWorkflow_Initialize);
            this.initializeConditionsMetBranchActivity.Activities.Add(this.setStateActivity2);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.EnsurePasswordUpdatesAreSupported);
            this.initializeConditionsMetBranchActivity.Condition = codecondition1;
            this.initializeConditionsMetBranchActivity.Name = "initializeConditionsMetBranchActivity";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity5);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.setStateActivity4);
            codecondition2.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.ValidateSpecifiedPasswords);
            this.ifElseBranchActivity1.Condition = codecondition2;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // initializeConditionsMetIfElseActivity
            // 
            this.initializeConditionsMetIfElseActivity.Activities.Add(this.initializeConditionsMetBranchActivity);
            this.initializeConditionsMetIfElseActivity.Activities.Add(this.initializeConditionsNotMetBranchActivity);
            this.initializeConditionsMetIfElseActivity.Name = "initializeConditionsMetIfElseActivity";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "finishState";
            // 
            // handleExternalEventActivity2
            // 
            this.handleExternalEventActivity2.EventName = "Cancel";
            this.handleExternalEventActivity2.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.handleExternalEventActivity2.Name = "handleExternalEventActivity2";
            // 
            // ifElseActivity1
            // 
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity1);
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity2);
            this.ifElseActivity1.Name = "ifElseActivity1";
            // 
            // handleExternalEventActivity1
            // 
            this.handleExternalEventActivity1.EventName = "Finish";
            this.handleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.handleExternalEventActivity1.Name = "handleExternalEventActivity1";
            // 
            // dataDialogFormActivity1
            // 
            this.dataDialogFormActivity1.ContainerLabel = null;
            this.dataDialogFormActivity1.FormDefinitionFileName = "\\Administrative\\ChangeOwnPassword.xml";
            this.dataDialogFormActivity1.Name = "dataDialogFormActivity1";
            // 
            // setStateActivity1
            // 
            this.setStateActivity1.Name = "setStateActivity1";
            this.setStateActivity1.TargetStateName = "finishState";
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
            // setStateActivity19
            // 
            this.setStateActivity19.Name = "setStateActivity19";
            this.setStateActivity19.TargetStateName = "finishState";
            // 
            // cancelHandleExternalEventActivity1
            // 
            this.cancelHandleExternalEventActivity1.EventName = "Cancel";
            this.cancelHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity1.Name = "cancelHandleExternalEventActivity1";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.initializeConditionsMetIfElseActivity);
            this.initializeStateInitializationActivity.Name = "initializeStateInitializationActivity";
            // 
            // step1_eventDrivenActivity_Cancel
            // 
            this.step1_eventDrivenActivity_Cancel.Activities.Add(this.handleExternalEventActivity2);
            this.step1_eventDrivenActivity_Cancel.Activities.Add(this.setStateActivity3);
            this.step1_eventDrivenActivity_Cancel.Name = "step1_eventDrivenActivity_Cancel";
            // 
            // step1_eventDrivenActivity_Finish
            // 
            this.step1_eventDrivenActivity_Finish.Activities.Add(this.handleExternalEventActivity1);
            this.step1_eventDrivenActivity_Finish.Activities.Add(this.ifElseActivity1);
            this.step1_eventDrivenActivity_Finish.Name = "step1_eventDrivenActivity_Finish";
            // 
            // step1StateInitializationActivity
            // 
            this.step1StateInitializationActivity.Activities.Add(this.dataDialogFormActivity1);
            this.step1StateInitializationActivity.Name = "step1StateInitializationActivity";
            // 
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.stepFinalize_codeActivity);
            this.finalizeStateInitializationActivity.Activities.Add(this.closeCurrentViewActivity1);
            this.finalizeStateInitializationActivity.Activities.Add(this.setStateActivity1);
            this.finalizeStateInitializationActivity.Name = "finalizeStateInitializationActivity";
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
            // ChangeOwnPasswordWorkflow
            // 
            this.Activities.Add(this.finishState);
            this.Activities.Add(this.finalizeActivity);
            this.Activities.Add(this.step1State);
            this.Activities.Add(this.initializeActivity);
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.CompletedStateName = "finishState";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeActivity";
            this.Name = "ChangeOwnPasswordWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private StateInitializationActivity step1StateInitializationActivity;
        private HandleExternalEventActivity handleExternalEventActivity1;
        private EventDrivenActivity step1_eventDrivenActivity_Finish;
        private StateActivity finishState;
        private StateActivity finalizeActivity;
        private StateInitializationActivity finalizeStateInitializationActivity;
        private Composite.Workflow.Activities.CloseCurrentViewActivity closeCurrentViewActivity1;
        private CodeActivity stepFinalize_codeActivity;
        private StateInitializationActivity initializeStateInitializationActivity;
        private StateActivity initializeActivity;
        private SetStateActivity setStateActivity1;
        private SetStateActivity setStateActivity19;
        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;
        private CodeActivity ChangePasswordWorkflow_Initialize;
        private Composite.Workflow.Activities.DataDialogFormActivity dataDialogFormActivity1;
        private SetStateActivity setStateActivity2;
        private SetStateActivity setStateActivity3;
        private HandleExternalEventActivity handleExternalEventActivity2;
        private EventDrivenActivity step1_eventDrivenActivity_Cancel;
        private SetStateActivity setStateActivity4;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private IfElseActivity ifElseActivity1;
        private SetStateActivity setStateActivity5;
        private SetStateActivity setStateActivity20;
        private CodeActivity InitializeConditionsNotMetAlertActivity;
        private IfElseBranchActivity initializeConditionsNotMetBranchActivity;
        private IfElseBranchActivity initializeConditionsMetBranchActivity;
        private IfElseActivity initializeConditionsMetIfElseActivity;
        private StateActivity step1State;
























































































































    }
}
