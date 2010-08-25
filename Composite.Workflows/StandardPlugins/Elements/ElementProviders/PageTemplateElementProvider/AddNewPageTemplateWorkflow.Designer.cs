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

namespace Composite.StandardPlugins.Elements.ElementProviders.PageTemplateElementProvider
{
    partial class AddNewPageTemplateWorkflow
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
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.showFieldErrorCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.codeActivity2 = new System.Workflow.Activities.CodeActivity();
            this.closeCurrentViewActivity1 = new Composite.Workflow.Activities.CloseCurrentViewActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.ifElseActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.finishHandleExternalEventActivity1 = new Composite.Workflow.Activities.FinishHandleExternalEventActivity();
            this.wizzardFormActivity1 = new Composite.Workflow.Activities.DataDialogFormActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.codeActivity1 = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step1EventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step1EventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.step1StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.finializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.step1StateActivity = new System.Workflow.Activities.StateActivity();
            this.initalizeStateActivity = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "finializeStateActivity";
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "step1StateActivity";
            // 
            // showFieldErrorCodeActivity
            // 
            this.showFieldErrorCodeActivity.Name = "showFieldErrorCodeActivity";
            this.showFieldErrorCodeActivity.ExecuteCode += new System.EventHandler(this.showFieldErrorCodeActivity_ExecuteCode);
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity6);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.showFieldErrorCodeActivity);
            this.ifElseBranchActivity1.Activities.Add(this.setStateActivity5);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.IsTitleUsed);
            this.ifElseBranchActivity1.Condition = codecondition1;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "finalStateActivity";
            // 
            // codeActivity2
            // 
            this.codeActivity2.Name = "codeActivity2";
            this.codeActivity2.ExecuteCode += new System.EventHandler(this.codeActivity2_ExecuteCode);
            // 
            // closeCurrentViewActivity1
            // 
            this.closeCurrentViewActivity1.Name = "closeCurrentViewActivity1";
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity2
            // 
            this.cancelHandleExternalEventActivity2.EventName = "Cancel";
            this.cancelHandleExternalEventActivity2.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity2.Name = "cancelHandleExternalEventActivity2";
            // 
            // ifElseActivity1
            // 
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity1);
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity2);
            this.ifElseActivity1.Name = "ifElseActivity1";
            // 
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // wizzardFormActivity1
            // 
            this.wizzardFormActivity1.ContainerLabel = "Add new";
            this.wizzardFormActivity1.FormDefinitionFileName = "\\Administrative\\AddNewPageTemplateStep1.xml";
            this.wizzardFormActivity1.Name = "wizzardFormActivity1";
            // 
            // setStateActivity1
            // 
            this.setStateActivity1.Name = "setStateActivity1";
            this.setStateActivity1.TargetStateName = "step1StateActivity";
            // 
            // codeActivity1
            // 
            this.codeActivity1.Name = "codeActivity1";
            this.codeActivity1.ExecuteCode += new System.EventHandler(this.codeActivity1_ExecuteCode);
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity1
            // 
            this.cancelHandleExternalEventActivity1.EventName = "Cancel";
            this.cancelHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity1.Name = "cancelHandleExternalEventActivity1";
            // 
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.closeCurrentViewActivity1);
            this.finalizeStateInitializationActivity.Activities.Add(this.codeActivity2);
            this.finalizeStateInitializationActivity.Activities.Add(this.setStateActivity2);
            this.finalizeStateInitializationActivity.Name = "finalizeStateInitializationActivity";
            // 
            // step1EventDrivenActivity_Cancel
            // 
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.setStateActivity4);
            this.step1EventDrivenActivity_Cancel.Name = "step1EventDrivenActivity_Cancel";
            // 
            // step1EventDrivenActivity_Finish
            // 
            this.step1EventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity1);
            this.step1EventDrivenActivity_Finish.Activities.Add(this.ifElseActivity1);
            this.step1EventDrivenActivity_Finish.Name = "step1EventDrivenActivity_Finish";
            // 
            // step1StateInitializationActivity
            // 
            this.step1StateInitializationActivity.Activities.Add(this.wizzardFormActivity1);
            this.step1StateInitializationActivity.Name = "step1StateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.codeActivity1);
            this.initializeStateInitializationActivity.Activities.Add(this.setStateActivity1);
            this.initializeStateInitializationActivity.Name = "initializeStateInitializationActivity";
            // 
            // eventDrivenActivity_GlobalCancel
            // 
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.cancelHandleExternalEventActivity1);
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.setStateActivity3);
            this.eventDrivenActivity_GlobalCancel.Name = "eventDrivenActivity_GlobalCancel";
            // 
            // finalStateActivity
            // 
            this.finalStateActivity.Name = "finalStateActivity";
            // 
            // finializeStateActivity
            // 
            this.finializeStateActivity.Activities.Add(this.finalizeStateInitializationActivity);
            this.finializeStateActivity.Name = "finializeStateActivity";
            // 
            // step1StateActivity
            // 
            this.step1StateActivity.Activities.Add(this.step1StateInitializationActivity);
            this.step1StateActivity.Activities.Add(this.step1EventDrivenActivity_Finish);
            this.step1StateActivity.Activities.Add(this.step1EventDrivenActivity_Cancel);
            this.step1StateActivity.Name = "step1StateActivity";
            // 
            // initalizeStateActivity
            // 
            this.initalizeStateActivity.Activities.Add(this.initializeStateInitializationActivity);
            this.initalizeStateActivity.Name = "initalizeStateActivity";
            // 
            // AddNewPageTemplateWorkflow
            // 
            this.Activities.Add(this.initalizeStateActivity);
            this.Activities.Add(this.step1StateActivity);
            this.Activities.Add(this.finializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initalizeStateActivity";
            this.Name = "AddNewPageTemplateWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private SetStateActivity setStateActivity2;

        private SetStateActivity setStateActivity1;

        private StateInitializationActivity finalizeStateInitializationActivity;

        private EventDrivenActivity step1EventDrivenActivity_Finish;

        private StateInitializationActivity step1StateInitializationActivity;

        private StateInitializationActivity initializeStateInitializationActivity;

        private StateActivity finalStateActivity;

        private StateActivity finializeStateActivity;

        private StateActivity step1StateActivity;

        private SetStateActivity setStateActivity6;

        private Composite.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;

        private CodeActivity codeActivity1;

        private Composite.Workflow.Activities.DataDialogFormActivity wizzardFormActivity1;

        private CodeActivity codeActivity2;

        private SetStateActivity setStateActivity3;

        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;

        private EventDrivenActivity eventDrivenActivity_GlobalCancel;

        private SetStateActivity setStateActivity4;

        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;

        private EventDrivenActivity step1EventDrivenActivity_Cancel;

        private Composite.Workflow.Activities.CloseCurrentViewActivity closeCurrentViewActivity1;

        private IfElseBranchActivity ifElseBranchActivity2;

        private IfElseBranchActivity ifElseBranchActivity1;

        private IfElseActivity ifElseActivity1;

        private CodeActivity showFieldErrorCodeActivity;

        private SetStateActivity setStateActivity5;

        private StateActivity initalizeStateActivity;

























    }
}
