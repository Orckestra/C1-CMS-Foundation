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

namespace Composite.StandardPlugins.Elements.ElementProviders.LocalizationElementProvider
{
    partial class RemoveSystemLocaleWorkflow
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
            System.Workflow.Activities.CodeCondition codecondition3 = new System.Workflow.Activities.CodeCondition();
            System.Workflow.Activities.CodeCondition codecondition4 = new System.Workflow.Activities.CodeCondition();
            this.setStateActivity10 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity11 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity4 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity3 = new System.Workflow.Activities.IfElseBranchActivity();
            this.if_IsCurrentDefaultLocale = new System.Workflow.Activities.IfElseActivity();
            this.if_IsTypesUsingLocalization = new System.Workflow.Activities.IfElseActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity6 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity5 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity8 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity7 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity8 = new System.Workflow.Activities.SetStateActivity();
            this.finalizeCodeActivity_Finalize = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity7 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity3 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity1 = new Composite.Workflow.Activities.FinishHandleExternalEventActivity();
            this.step2WizardFormActivity = new Composite.Workflow.Activities.ConfirmDialogFormActivity();
            this.setStateActivity14 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity3 = new Composite.Workflow.Activities.FinishHandleExternalEventActivity();
            this.abortWizardFormActivity = new Composite.Workflow.Activities.ConfirmDialogFormActivity();
            this.if_IsLastLocale = new System.Workflow.Activities.IfElseActivity();
            this.ifElseActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step3EventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step2EventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.step2StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.abortEventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.abortStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.finalizeStateActivity = new System.Workflow.Activities.StateActivity();
            this.step2StateActivity = new System.Workflow.Activities.StateActivity();
            this.abortStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // setStateActivity10
            // 
            this.setStateActivity10.Name = "setStateActivity10";
            this.setStateActivity10.TargetStateName = "step2StateActivity";
            // 
            // setStateActivity11
            // 
            this.setStateActivity11.Name = "setStateActivity11";
            this.setStateActivity11.TargetStateName = "abortStateActivity";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.IsCurrentDefaultLocale);
            this.ifElseBranchActivity1.Condition = codecondition1;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // ifElseBranchActivity4
            // 
            this.ifElseBranchActivity4.Activities.Add(this.setStateActivity10);
            this.ifElseBranchActivity4.Name = "ifElseBranchActivity4";
            // 
            // ifElseBranchActivity3
            // 
            this.ifElseBranchActivity3.Activities.Add(this.setStateActivity11);
            codecondition2.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.IsTypesUsingLocalization);
            this.ifElseBranchActivity3.Condition = codecondition2;
            this.ifElseBranchActivity3.Name = "ifElseBranchActivity3";
            // 
            // if_IsCurrentDefaultLocale
            // 
            this.if_IsCurrentDefaultLocale.Activities.Add(this.ifElseBranchActivity1);
            this.if_IsCurrentDefaultLocale.Activities.Add(this.ifElseBranchActivity2);
            this.if_IsCurrentDefaultLocale.Name = "if_IsCurrentDefaultLocale";
            // 
            // if_IsTypesUsingLocalization
            // 
            this.if_IsTypesUsingLocalization.Activities.Add(this.ifElseBranchActivity3);
            this.if_IsTypesUsingLocalization.Activities.Add(this.ifElseBranchActivity4);
            this.if_IsTypesUsingLocalization.Name = "if_IsTypesUsingLocalization";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "step2StateActivity";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "abortStateActivity";
            // 
            // ifElseBranchActivity6
            // 
            this.ifElseBranchActivity6.Activities.Add(this.if_IsCurrentDefaultLocale);
            this.ifElseBranchActivity6.Name = "ifElseBranchActivity6";
            // 
            // ifElseBranchActivity5
            // 
            this.ifElseBranchActivity5.Activities.Add(this.if_IsTypesUsingLocalization);
            codecondition3.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.IsCurrentDefaultLocale);
            this.ifElseBranchActivity5.Condition = codecondition3;
            this.ifElseBranchActivity5.Name = "ifElseBranchActivity5";
            // 
            // ifElseBranchActivity8
            // 
            this.ifElseBranchActivity8.Activities.Add(this.setStateActivity3);
            this.ifElseBranchActivity8.Name = "ifElseBranchActivity8";
            // 
            // ifElseBranchActivity7
            // 
            this.ifElseBranchActivity7.Activities.Add(this.setStateActivity2);
            codecondition4.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.IsOnlyActiveLocaleForSomeUsers);
            this.ifElseBranchActivity7.Condition = codecondition4;
            this.ifElseBranchActivity7.Name = "ifElseBranchActivity7";
            // 
            // setStateActivity8
            // 
            this.setStateActivity8.Name = "setStateActivity8";
            this.setStateActivity8.TargetStateName = "finalStateActivity";
            // 
            // finalizeCodeActivity_Finalize
            // 
            this.finalizeCodeActivity_Finalize.Name = "finalizeCodeActivity_Finalize";
            this.finalizeCodeActivity_Finalize.ExecuteCode += new System.EventHandler(this.finalizeCodeActivity_Finalize_ExecuteCode);
            // 
            // setStateActivity7
            // 
            this.setStateActivity7.Name = "setStateActivity7";
            this.setStateActivity7.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity3
            // 
            this.cancelHandleExternalEventActivity3.EventName = "Cancel";
            this.cancelHandleExternalEventActivity3.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity3.Name = "cancelHandleExternalEventActivity3";
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "finalizeStateActivity";
            // 
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // step2WizardFormActivity
            // 
            this.step2WizardFormActivity.ContainerLabel = null;
            this.step2WizardFormActivity.FormDefinitionFileName = "\\Administrative\\RemoveSystemLocaleStep2.xml";
            this.step2WizardFormActivity.Name = "step2WizardFormActivity";
            // 
            // setStateActivity14
            // 
            this.setStateActivity14.Name = "setStateActivity14";
            this.setStateActivity14.TargetStateName = "finalStateActivity";
            // 
            // finishHandleExternalEventActivity3
            // 
            this.finishHandleExternalEventActivity3.EventName = "Finish";
            this.finishHandleExternalEventActivity3.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity3.Name = "finishHandleExternalEventActivity3";
            // 
            // abortWizardFormActivity
            // 
            this.abortWizardFormActivity.ContainerLabel = null;
            this.abortWizardFormActivity.FormDefinitionFileName = "\\Administrative\\RemoveSystemLocaleAbort.xml";
            this.abortWizardFormActivity.Name = "abortWizardFormActivity";
            // 
            // if_IsLastLocale
            // 
            this.if_IsLastLocale.Activities.Add(this.ifElseBranchActivity5);
            this.if_IsLastLocale.Activities.Add(this.ifElseBranchActivity6);
            this.if_IsLastLocale.Enabled = false;
            this.if_IsLastLocale.Name = "if_IsLastLocale";
            // 
            // ifElseActivity1
            // 
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity7);
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity8);
            this.ifElseActivity1.Name = "ifElseActivity1";
            // 
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.finalizeCodeActivity_Finalize);
            this.finalizeStateInitializationActivity.Activities.Add(this.setStateActivity8);
            this.finalizeStateInitializationActivity.Name = "finalizeStateInitializationActivity";
            // 
            // step3EventDrivenActivity_Cancel
            // 
            this.step3EventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity3);
            this.step3EventDrivenActivity_Cancel.Activities.Add(this.setStateActivity7);
            this.step3EventDrivenActivity_Cancel.Name = "step3EventDrivenActivity_Cancel";
            // 
            // step2EventDrivenActivity_Finish
            // 
            this.step2EventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity1);
            this.step2EventDrivenActivity_Finish.Activities.Add(this.setStateActivity6);
            this.step2EventDrivenActivity_Finish.Name = "step2EventDrivenActivity_Finish";
            // 
            // step2StateInitializationActivity
            // 
            this.step2StateInitializationActivity.Activities.Add(this.step2WizardFormActivity);
            this.step2StateInitializationActivity.Name = "step2StateInitializationActivity";
            // 
            // abortEventDrivenActivity_Finish
            // 
            this.abortEventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity3);
            this.abortEventDrivenActivity_Finish.Activities.Add(this.setStateActivity14);
            this.abortEventDrivenActivity_Finish.Name = "abortEventDrivenActivity_Finish";
            // 
            // abortStateInitializationActivity
            // 
            this.abortStateInitializationActivity.Activities.Add(this.abortWizardFormActivity);
            this.abortStateInitializationActivity.Name = "abortStateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.ifElseActivity1);
            this.initializeStateInitializationActivity.Activities.Add(this.if_IsLastLocale);
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
            // finalizeStateActivity
            // 
            this.finalizeStateActivity.Activities.Add(this.finalizeStateInitializationActivity);
            this.finalizeStateActivity.Name = "finalizeStateActivity";
            // 
            // step2StateActivity
            // 
            this.step2StateActivity.Activities.Add(this.step2StateInitializationActivity);
            this.step2StateActivity.Activities.Add(this.step2EventDrivenActivity_Finish);
            this.step2StateActivity.Activities.Add(this.step3EventDrivenActivity_Cancel);
            this.step2StateActivity.Name = "step2StateActivity";
            // 
            // abortStateActivity
            // 
            this.abortStateActivity.Activities.Add(this.abortStateInitializationActivity);
            this.abortStateActivity.Activities.Add(this.abortEventDrivenActivity_Finish);
            this.abortStateActivity.Name = "abortStateActivity";
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
            // RemoveSystemLocaleWorkflow
            // 
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.abortStateActivity);
            this.Activities.Add(this.step2StateActivity);
            this.Activities.Add(this.finalizeStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "RemoveSystemLocaleWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateInitializationActivity initializeStateInitializationActivity;
        private SetStateActivity setStateActivity1;
        private StateActivity finalStateActivity;
        private StateActivity initializeStateActivity;
        private StateActivity abortStateActivity;
        private Composite.Workflow.Activities.ConfirmDialogFormActivity step2WizardFormActivity;
        private StateInitializationActivity finalizeStateInitializationActivity;
        private StateInitializationActivity step2StateInitializationActivity;
        private StateInitializationActivity abortStateInitializationActivity;
        private StateActivity finalizeStateActivity;
        private StateActivity step2StateActivity;
        private Composite.Workflow.Activities.ConfirmDialogFormActivity abortWizardFormActivity;
        private EventDrivenActivity step2EventDrivenActivity_Finish;
        private SetStateActivity setStateActivity7;
        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity3;
        private SetStateActivity setStateActivity6;
        private Composite.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;
        private EventDrivenActivity step3EventDrivenActivity_Cancel;
        private SetStateActivity setStateActivity8;
        private CodeActivity finalizeCodeActivity_Finalize;
        private EventDrivenActivity abortEventDrivenActivity_Finish;
        private SetStateActivity setStateActivity14;
        private Composite.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity3;
        private SetStateActivity setStateActivity10;
        private SetStateActivity setStateActivity11;
        private IfElseBranchActivity ifElseBranchActivity4;
        private IfElseBranchActivity ifElseBranchActivity3;
        private SetStateActivity setStateActivity3;
        private IfElseActivity if_IsTypesUsingLocalization;
        private IfElseBranchActivity ifElseBranchActivity6;
        private IfElseBranchActivity ifElseBranchActivity5;
        private IfElseActivity if_IsLastLocale;
        private SetStateActivity setStateActivity2;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private IfElseActivity if_IsCurrentDefaultLocale;
        private IfElseBranchActivity ifElseBranchActivity8;
        private IfElseBranchActivity ifElseBranchActivity7;
        private IfElseActivity ifElseActivity1;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;








































































































































    }
}
