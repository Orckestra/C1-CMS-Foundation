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

namespace Composite.C1Console.Trees.Workflows
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
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.localizeDataCodeActivity_Localize = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.wizardFormActivity1 = new Composite.C1Console.Workflow.Activities.WizardFormActivity();
            this.initializeIfElseActivity_ValidateReferencingPropertyies = new System.Workflow.Activities.IfElseActivity();
            this.localizeDataStateInitializationActivity_Localize = new System.Workflow.Activities.StateInitializationActivity();
            this.showErrorEventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.showErrorStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.localizeDataStateActivity = new System.Workflow.Activities.StateActivity();
            this.showErrorStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "showErrorStateActivity";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "localizeDataStateActivity";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity3);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.setStateActivity2);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.ValidateReferencingProperties);
            this.ifElseBranchActivity1.Condition = codecondition1;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "finalStateActivity";
            // 
            // localizeDataCodeActivity_Localize
            // 
            this.localizeDataCodeActivity_Localize.Name = "localizeDataCodeActivity_Localize";
            this.localizeDataCodeActivity_Localize.ExecuteCode += new System.EventHandler(this.localizeDataCodeActivity_Localize_ExecuteCode);
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "finalStateActivity";
            // 
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // wizardFormActivity1
            // 
            this.wizardFormActivity1.ContainerLabel = null;
            this.wizardFormActivity1.FormDefinitionFileName = "\\Administrative\\TreeLocalizeData.xml";
            this.wizardFormActivity1.Name = "wizardFormActivity1";
            // 
            // initializeIfElseActivity_ValidateReferencingPropertyies
            // 
            this.initializeIfElseActivity_ValidateReferencingPropertyies.Activities.Add(this.ifElseBranchActivity1);
            this.initializeIfElseActivity_ValidateReferencingPropertyies.Activities.Add(this.ifElseBranchActivity2);
            this.initializeIfElseActivity_ValidateReferencingPropertyies.Name = "initializeIfElseActivity_ValidateReferencingPropertyies";
            // 
            // localizeDataStateInitializationActivity_Localize
            // 
            this.localizeDataStateInitializationActivity_Localize.Activities.Add(this.localizeDataCodeActivity_Localize);
            this.localizeDataStateInitializationActivity_Localize.Activities.Add(this.setStateActivity5);
            this.localizeDataStateInitializationActivity_Localize.Name = "localizeDataStateInitializationActivity_Localize";
            // 
            // showErrorEventDrivenActivity_Finish
            // 
            this.showErrorEventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity1);
            this.showErrorEventDrivenActivity_Finish.Activities.Add(this.setStateActivity4);
            this.showErrorEventDrivenActivity_Finish.Name = "showErrorEventDrivenActivity_Finish";
            // 
            // showErrorStateInitializationActivity
            // 
            this.showErrorStateInitializationActivity.Activities.Add(this.wizardFormActivity1);
            this.showErrorStateInitializationActivity.Name = "showErrorStateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.initializeIfElseActivity_ValidateReferencingPropertyies);
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
            this.cancelHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity1.Name = "cancelHandleExternalEventActivity1";
            // 
            // localizeDataStateActivity
            // 
            this.localizeDataStateActivity.Activities.Add(this.localizeDataStateInitializationActivity_Localize);
            this.localizeDataStateActivity.Name = "localizeDataStateActivity";
            // 
            // showErrorStateActivity
            // 
            this.showErrorStateActivity.Activities.Add(this.showErrorStateInitializationActivity);
            this.showErrorStateActivity.Activities.Add(this.showErrorEventDrivenActivity_Finish);
            this.showErrorStateActivity.Name = "showErrorStateActivity";
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
            this.Activities.Add(this.showErrorStateActivity);
            this.Activities.Add(this.localizeDataStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "LocalizeDataWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateInitializationActivity initializeStateInitializationActivity;
        private SetStateActivity setStateActivity1;
        private StateActivity finalStateActivity;
        private StateActivity initializeStateActivity;
        private SetStateActivity setStateActivity3;
        private SetStateActivity setStateActivity2;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private IfElseActivity initializeIfElseActivity_ValidateReferencingPropertyies;
        private StateActivity localizeDataStateActivity;
        private StateActivity showErrorStateActivity;
        private StateInitializationActivity localizeDataStateInitializationActivity_Localize;
        private StateInitializationActivity showErrorStateInitializationActivity;
        private SetStateActivity setStateActivity5;
        private CodeActivity localizeDataCodeActivity_Localize;
        private SetStateActivity setStateActivity4;
        private C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;
        private C1Console.Workflow.Activities.WizardFormActivity wizardFormActivity1;
        private EventDrivenActivity showErrorEventDrivenActivity_Finish;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;









































































































    }
}
