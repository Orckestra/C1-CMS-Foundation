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

namespace Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    partial class LocalizeDataWorkflow
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
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.wizardFormActivity1 = new Composite.Workflow.Activities.WizardFormActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity1 = new Composite.Workflow.Activities.FinishHandleExternalEventActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.localizeCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.ifElseActivity_ValidateLocalizeProcess = new System.Workflow.Activities.IfElseActivity();
            this.showErrorStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.showErrorEventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.localizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.showErrorStateActivity = new System.Workflow.Activities.StateActivity();
            this.localizeStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "showErrorStateActivity";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "localizeStateActivity";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity5);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.setStateActivity2);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.ValidateLocalizeProcess);
            this.ifElseBranchActivity1.Condition = codecondition1;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // wizardFormActivity1
            // 
            this.wizardFormActivity1.ContainerLabel = null;
            this.wizardFormActivity1.FormDefinitionFileName = "\\Administrative\\LocalizeData.xml";
            this.wizardFormActivity1.Name = "wizardFormActivity1";
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "finalStateActivity";
            // 
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "finalStateActivity";
            // 
            // localizeCodeActivity
            // 
            this.localizeCodeActivity.Name = "localizeCodeActivity";
            this.localizeCodeActivity.ExecuteCode += new System.EventHandler(this.localizeCodeActivity_ExecuteCode);
            // 
            // ifElseActivity_ValidateLocalizeProcess
            // 
            this.ifElseActivity_ValidateLocalizeProcess.Activities.Add(this.ifElseBranchActivity1);
            this.ifElseActivity_ValidateLocalizeProcess.Activities.Add(this.ifElseBranchActivity2);
            this.ifElseActivity_ValidateLocalizeProcess.Name = "ifElseActivity_ValidateLocalizeProcess";
            // 
            // showErrorStateInitializationActivity
            // 
            this.showErrorStateInitializationActivity.Activities.Add(this.wizardFormActivity1);
            this.showErrorStateInitializationActivity.Name = "showErrorStateInitializationActivity";
            // 
            // showErrorEventDrivenActivity_Finish
            // 
            this.showErrorEventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity1);
            this.showErrorEventDrivenActivity_Finish.Activities.Add(this.setStateActivity4);
            this.showErrorEventDrivenActivity_Finish.Name = "showErrorEventDrivenActivity_Finish";
            // 
            // localizeStateInitializationActivity
            // 
            this.localizeStateInitializationActivity.Activities.Add(this.localizeCodeActivity);
            this.localizeStateInitializationActivity.Activities.Add(this.setStateActivity3);
            this.localizeStateInitializationActivity.Name = "localizeStateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.ifElseActivity_ValidateLocalizeProcess);
            this.initializeStateInitializationActivity.Name = "initializeStateInitializationActivity";
            // 
            // setStateActivity1
            // 
            this.setStateActivity1.Name = "setStateActivity1";
            this.setStateActivity1.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity1
            // 
            this.cancelHandleExternalEventActivity1.EventName = "Cancel";
            this.cancelHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity1.Name = "cancelHandleExternalEventActivity1";
            // 
            // showErrorStateActivity
            // 
            this.showErrorStateActivity.Activities.Add(this.showErrorEventDrivenActivity_Finish);
            this.showErrorStateActivity.Activities.Add(this.showErrorStateInitializationActivity);
            this.showErrorStateActivity.Name = "showErrorStateActivity";
            // 
            // localizeStateActivity
            // 
            this.localizeStateActivity.Activities.Add(this.localizeStateInitializationActivity);
            this.localizeStateActivity.Name = "localizeStateActivity";
            // 
            // finalStateActivity
            // 
            this.finalStateActivity.Name = "finalStateActivity";
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
            // LocalizeDataWorkflow
            // 
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.localizeStateActivity);
            this.Activities.Add(this.showErrorStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "LocalizeDataWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateInitializationActivity initializeStateInitializationActivity;
        private SetStateActivity setStateActivity1;
        private StateActivity finalStateActivity;
        private StateActivity initializeStateActivity;
        private CodeActivity localizeCodeActivity;
        private SetStateActivity setStateActivity2;
        private StateInitializationActivity localizeStateInitializationActivity;
        private StateActivity localizeStateActivity;
        private SetStateActivity setStateActivity3;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private IfElseActivity ifElseActivity_ValidateLocalizeProcess;
        private EventDrivenActivity showErrorEventDrivenActivity_Finish;
        private StateActivity showErrorStateActivity;
        private SetStateActivity setStateActivity4;
        private Composite.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;
        private StateInitializationActivity showErrorStateInitializationActivity;
        private Composite.Workflow.Activities.WizardFormActivity wizardFormActivity1;
        private SetStateActivity setStateActivity5;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;





















































































































    }
}
