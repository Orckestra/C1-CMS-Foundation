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
    partial class ChangeOwnForeignLocaleWorkflow
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
            this.setStateActivity7 = new System.Workflow.Activities.SetStateActivity();
            this.finalizeCodeActivity_Finalize = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.dataDialogFormActivity2 = new Composite.C1Console.Workflow.Activities.DataDialogFormActivity();
            this.step1CodeActivity_Initialize = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.dataDialogFormActivity1 = new Composite.C1Console.Workflow.Activities.DataDialogFormActivity();
            this.ifElseActivity_HasActiveLocales = new System.Workflow.Activities.IfElseActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step1EventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step1EventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.step1StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.noOrOneActiveLocaleEventDrivenActivit_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.noOrOneActiveLocaleStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.finalizeStateActivity = new System.Workflow.Activities.StateActivity();
            this.step1StateActivity = new System.Workflow.Activities.StateActivity();
            this.noOrOneActiveLocaleStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "noOrOneActiveLocaleStateActivity";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "step1StateActivity";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity3);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.setStateActivity2);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.HasActiveLocales);
            this.ifElseBranchActivity1.Condition = codecondition1;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // setStateActivity7
            // 
            this.setStateActivity7.Name = "setStateActivity7";
            this.setStateActivity7.TargetStateName = "finalStateActivity";
            // 
            // finalizeCodeActivity_Finalize
            // 
            this.finalizeCodeActivity_Finalize.Name = "finalizeCodeActivity_Finalize";
            this.finalizeCodeActivity_Finalize.ExecuteCode += new System.EventHandler(this.finalizeCodeActivity_Finalize_ExecuteCode);
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity2
            // 
            this.cancelHandleExternalEventActivity2.EventName = "Cancel";
            this.cancelHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity2.Name = "cancelHandleExternalEventActivity2";
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "finalizeStateActivity";
            // 
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // dataDialogFormActivity2
            // 
            this.dataDialogFormActivity2.ContainerLabel = null;
            this.dataDialogFormActivity2.FormDefinitionFileName = "\\Administrative\\ChangeOwnForeignLocaleStep1.xml";
            this.dataDialogFormActivity2.Name = "dataDialogFormActivity2";
            // 
            // step1CodeActivity_Initialize
            // 
            this.step1CodeActivity_Initialize.Name = "step1CodeActivity_Initialize";
            this.step1CodeActivity_Initialize.ExecuteCode += new System.EventHandler(this.step1CodeActivity_Initialize_ExecuteCode);
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "finalStateActivity";
            // 
            // finishHandleExternalEventActivity2
            // 
            this.finishHandleExternalEventActivity2.EventName = "Finish";
            this.finishHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity2.Name = "finishHandleExternalEventActivity2";
            // 
            // dataDialogFormActivity1
            // 
            this.dataDialogFormActivity1.ContainerLabel = null;
            this.dataDialogFormActivity1.FormDefinitionFileName = "\\Administrative\\ChangeOwnForeignLocaleNoOrOneActiveLocale.xml";
            this.dataDialogFormActivity1.Name = "dataDialogFormActivity1";
            // 
            // ifElseActivity_HasActiveLocales
            // 
            this.ifElseActivity_HasActiveLocales.Activities.Add(this.ifElseBranchActivity1);
            this.ifElseActivity_HasActiveLocales.Activities.Add(this.ifElseBranchActivity2);
            this.ifElseActivity_HasActiveLocales.Name = "ifElseActivity_HasActiveLocales";
            // 
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.finalizeCodeActivity_Finalize);
            this.finalizeStateInitializationActivity.Activities.Add(this.setStateActivity7);
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
            this.step1EventDrivenActivity_Finish.Activities.Add(this.setStateActivity6);
            this.step1EventDrivenActivity_Finish.Name = "step1EventDrivenActivity_Finish";
            // 
            // step1StateInitializationActivity
            // 
            this.step1StateInitializationActivity.Activities.Add(this.step1CodeActivity_Initialize);
            this.step1StateInitializationActivity.Activities.Add(this.dataDialogFormActivity2);
            this.step1StateInitializationActivity.Name = "step1StateInitializationActivity";
            // 
            // noOrOneActiveLocaleEventDrivenActivit_Finish
            // 
            this.noOrOneActiveLocaleEventDrivenActivit_Finish.Activities.Add(this.finishHandleExternalEventActivity2);
            this.noOrOneActiveLocaleEventDrivenActivit_Finish.Activities.Add(this.setStateActivity4);
            this.noOrOneActiveLocaleEventDrivenActivit_Finish.Name = "noOrOneActiveLocaleEventDrivenActivit_Finish";
            // 
            // noOrOneActiveLocaleStateInitializationActivity
            // 
            this.noOrOneActiveLocaleStateInitializationActivity.Activities.Add(this.dataDialogFormActivity1);
            this.noOrOneActiveLocaleStateInitializationActivity.Name = "noOrOneActiveLocaleStateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.ifElseActivity_HasActiveLocales);
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
            // noOrOneActiveLocaleStateActivity
            // 
            this.noOrOneActiveLocaleStateActivity.Activities.Add(this.noOrOneActiveLocaleStateInitializationActivity);
            this.noOrOneActiveLocaleStateActivity.Activities.Add(this.noOrOneActiveLocaleEventDrivenActivit_Finish);
            this.noOrOneActiveLocaleStateActivity.Name = "noOrOneActiveLocaleStateActivity";
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
            // ChangeOwnForeignLocaleWorkflow
            // 
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.noOrOneActiveLocaleStateActivity);
            this.Activities.Add(this.step1StateActivity);
            this.Activities.Add(this.finalizeStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "ChangeOwnForeignLocaleWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateInitializationActivity initializeStateInitializationActivity;
        private SetStateActivity setStateActivity1;
        private StateActivity finalStateActivity;
        private StateActivity initializeStateActivity;
        private StateActivity noOrOneActiveLocaleStateActivity;
        private StateInitializationActivity finalizeStateInitializationActivity;
        private StateInitializationActivity step1StateInitializationActivity;
        private StateInitializationActivity noOrOneActiveLocaleStateInitializationActivity;
        private StateActivity finalizeStateActivity;
        private StateActivity step1StateActivity;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private IfElseActivity ifElseActivity_HasActiveLocales;
        private SetStateActivity setStateActivity3;
        private SetStateActivity setStateActivity2;
        private Composite.C1Console.Workflow.Activities.DataDialogFormActivity dataDialogFormActivity1;
        private Composite.C1Console.Workflow.Activities.DataDialogFormActivity dataDialogFormActivity2;
        private EventDrivenActivity step1EventDrivenActivity_Cancel;
        private EventDrivenActivity step1EventDrivenActivity_Finish;
        private CodeActivity finalizeCodeActivity_Finalize;
        private SetStateActivity setStateActivity5;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;
        private SetStateActivity setStateActivity6;
        private Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;
        private CodeActivity step1CodeActivity_Initialize;
        private SetStateActivity setStateActivity4;
        private Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity2;
        private EventDrivenActivity noOrOneActiveLocaleEventDrivenActivit_Finish;
        private SetStateActivity setStateActivity7;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;























































































































    }
}
