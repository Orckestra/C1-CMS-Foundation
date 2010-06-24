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
    partial class EnableTypeLocalizationWorkflow
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
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity10 = new System.Workflow.Activities.SetStateActivity();
            this.NoReferencesInLocalizedDataActivity3 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ThereAreReferencesInLocalizedDataActivity4 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity8 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity12 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity4 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity11 = new System.Workflow.Activities.SetStateActivity();
            this.nextHandleExternalEventActivity2 = new Composite.Workflow.Activities.NextHandleExternalEventActivity();
            this.wizardFormActivity1 = new Composite.Workflow.Activities.WizardFormActivity();
            this.setStateActivity9 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity2 = new Composite.Workflow.Activities.FinishHandleExternalEventActivity();
            this.noLocalesDataDialogFormActivity = new Composite.Workflow.Activities.DataDialogFormActivity();
            this.finalizeCodeActivity_Finalize = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity7 = new System.Workflow.Activities.SetStateActivity();
            this.previousHandleExternalEventActivity1 = new Composite.Workflow.Activities.PreviousHandleExternalEventActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity3 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity1 = new Composite.Workflow.Activities.FinishHandleExternalEventActivity();
            this.step2WizardFormActivity = new Composite.Workflow.Activities.WizardFormActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.nextHandleExternalEventActivity1 = new Composite.Workflow.Activities.NextHandleExternalEventActivity();
            this.step1WizardFormActivity = new Composite.Workflow.Activities.WizardFormActivity();
            this.step1CodeActivity_Initialize = new System.Workflow.Activities.CodeActivity();
            this.initializeIfElseActivity_LocalesExists = new System.Workflow.Activities.IfElseActivity();
            this.eventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.eventDrivenActivity_Next = new System.Workflow.Activities.EventDrivenActivity();
            this.stateInitializationActivity1 = new System.Workflow.Activities.StateInitializationActivity();
            this.noLocalesEventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.noLocalesStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step2EventDrivenActivity_Previous = new System.Workflow.Activities.EventDrivenActivity();
            this.step2EventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step2EventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.step2StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step1EventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step1EventDrivenActivity_Next = new System.Workflow.Activities.EventDrivenActivity();
            this.step1StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.referencesExistsStateActivity = new System.Workflow.Activities.StateActivity();
            this.noLocalesStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalizeStateActivity = new System.Workflow.Activities.StateActivity();
            this.step2StateActivity = new System.Workflow.Activities.StateActivity();
            this.step1StateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "step1StateActivity";
            // 
            // setStateActivity10
            // 
            this.setStateActivity10.Name = "setStateActivity10";
            this.setStateActivity10.TargetStateName = "referencesExistsStateActivity";
            // 
            // NoReferencesInLocalizedDataActivity3
            // 
            this.NoReferencesInLocalizedDataActivity3.Activities.Add(this.setStateActivity6);
            this.NoReferencesInLocalizedDataActivity3.Name = "NoReferencesInLocalizedDataActivity3";
            // 
            // ThereAreReferencesInLocalizedDataActivity4
            // 
            this.ThereAreReferencesInLocalizedDataActivity4.Activities.Add(this.setStateActivity10);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.ThereAreReferencesInLocalizedData);
            this.ThereAreReferencesInLocalizedDataActivity4.Condition = codecondition1;
            this.ThereAreReferencesInLocalizedDataActivity4.Name = "ThereAreReferencesInLocalizedDataActivity4";
            // 
            // setStateActivity8
            // 
            this.setStateActivity8.Name = "setStateActivity8";
            this.setStateActivity8.TargetStateName = "noLocalesStateActivity";
            // 
            // ifElseActivity1
            // 
            this.ifElseActivity1.Activities.Add(this.ThereAreReferencesInLocalizedDataActivity4);
            this.ifElseActivity1.Activities.Add(this.NoReferencesInLocalizedDataActivity3);
            this.ifElseActivity1.Name = "ifElseActivity1";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity8);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.ifElseActivity1);
            codecondition2.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.LocalesExists);
            this.ifElseBranchActivity1.Condition = codecondition2;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // setStateActivity12
            // 
            this.setStateActivity12.Name = "setStateActivity12";
            this.setStateActivity12.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity4
            // 
            this.cancelHandleExternalEventActivity4.EventName = "Cancel";
            this.cancelHandleExternalEventActivity4.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity4.Name = "cancelHandleExternalEventActivity4";
            // 
            // setStateActivity11
            // 
            this.setStateActivity11.Name = "setStateActivity11";
            this.setStateActivity11.TargetStateName = "step2StateActivity";
            // 
            // nextHandleExternalEventActivity2
            // 
            this.nextHandleExternalEventActivity2.EventName = "Next";
            this.nextHandleExternalEventActivity2.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.nextHandleExternalEventActivity2.Name = "nextHandleExternalEventActivity2";
            // 
            // wizardFormActivity1
            // 
            this.wizardFormActivity1.ContainerLabel = null;
            this.wizardFormActivity1.FormDefinitionFileName = "/Administrative/EnableTypeLocalizationStep3.xml";
            this.wizardFormActivity1.Name = "wizardFormActivity1";
            // 
            // setStateActivity9
            // 
            this.setStateActivity9.Name = "setStateActivity9";
            this.setStateActivity9.TargetStateName = "finalStateActivity";
            // 
            // finishHandleExternalEventActivity2
            // 
            this.finishHandleExternalEventActivity2.EventName = "Finish";
            this.finishHandleExternalEventActivity2.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity2.Name = "finishHandleExternalEventActivity2";
            // 
            // noLocalesDataDialogFormActivity
            // 
            this.noLocalesDataDialogFormActivity.ContainerLabel = null;
            this.noLocalesDataDialogFormActivity.FormDefinitionFileName = "/Administrative/EnableTypeLocalizationNoLocales.xml";
            this.noLocalesDataDialogFormActivity.Name = "noLocalesDataDialogFormActivity";
            // 
            // finalizeCodeActivity_Finalize
            // 
            this.finalizeCodeActivity_Finalize.Name = "finalizeCodeActivity_Finalize";
            this.finalizeCodeActivity_Finalize.ExecuteCode += new System.EventHandler(this.finalizeCodeActivity_Finalize_ExecuteCode);
            // 
            // setStateActivity7
            // 
            this.setStateActivity7.Name = "setStateActivity7";
            this.setStateActivity7.TargetStateName = "step1StateActivity";
            // 
            // previousHandleExternalEventActivity1
            // 
            this.previousHandleExternalEventActivity1.EventName = "Previous";
            this.previousHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.previousHandleExternalEventActivity1.Name = "previousHandleExternalEventActivity1";
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity3
            // 
            this.cancelHandleExternalEventActivity3.EventName = "Cancel";
            this.cancelHandleExternalEventActivity3.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity3.Name = "cancelHandleExternalEventActivity3";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "finalizeStateActivity";
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
            this.step2WizardFormActivity.FormDefinitionFileName = "/Administrative/EnableTypeLocalizationStep2.xml";
            this.step2WizardFormActivity.Name = "step2WizardFormActivity";
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
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "step2StateActivity";
            // 
            // nextHandleExternalEventActivity1
            // 
            this.nextHandleExternalEventActivity1.EventName = "Next";
            this.nextHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.nextHandleExternalEventActivity1.Name = "nextHandleExternalEventActivity1";
            // 
            // step1WizardFormActivity
            // 
            this.step1WizardFormActivity.ContainerLabel = null;
            this.step1WizardFormActivity.FormDefinitionFileName = "/Administrative/EnableTypeLocalizationStep1.xml";
            this.step1WizardFormActivity.Name = "step1WizardFormActivity";
            // 
            // step1CodeActivity_Initialize
            // 
            this.step1CodeActivity_Initialize.Name = "step1CodeActivity_Initialize";
            this.step1CodeActivity_Initialize.ExecuteCode += new System.EventHandler(this.step1CodeActivity_Initialize_ExecuteCode);
            // 
            // initializeIfElseActivity_LocalesExists
            // 
            this.initializeIfElseActivity_LocalesExists.Activities.Add(this.ifElseBranchActivity1);
            this.initializeIfElseActivity_LocalesExists.Activities.Add(this.ifElseBranchActivity2);
            this.initializeIfElseActivity_LocalesExists.Name = "initializeIfElseActivity_LocalesExists";
            // 
            // eventDrivenActivity_Cancel
            // 
            this.eventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity4);
            this.eventDrivenActivity_Cancel.Activities.Add(this.setStateActivity12);
            this.eventDrivenActivity_Cancel.Name = "eventDrivenActivity_Cancel";
            // 
            // eventDrivenActivity_Next
            // 
            this.eventDrivenActivity_Next.Activities.Add(this.nextHandleExternalEventActivity2);
            this.eventDrivenActivity_Next.Activities.Add(this.setStateActivity11);
            this.eventDrivenActivity_Next.Name = "eventDrivenActivity_Next";
            // 
            // stateInitializationActivity1
            // 
            this.stateInitializationActivity1.Activities.Add(this.wizardFormActivity1);
            this.stateInitializationActivity1.Name = "stateInitializationActivity1";
            // 
            // noLocalesEventDrivenActivity_Finish
            // 
            this.noLocalesEventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity2);
            this.noLocalesEventDrivenActivity_Finish.Activities.Add(this.setStateActivity9);
            this.noLocalesEventDrivenActivity_Finish.Name = "noLocalesEventDrivenActivity_Finish";
            // 
            // noLocalesStateInitializationActivity
            // 
            this.noLocalesStateInitializationActivity.Activities.Add(this.noLocalesDataDialogFormActivity);
            this.noLocalesStateInitializationActivity.Name = "noLocalesStateInitializationActivity";
            // 
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.finalizeCodeActivity_Finalize);
            this.finalizeStateInitializationActivity.Name = "finalizeStateInitializationActivity";
            // 
            // step2EventDrivenActivity_Previous
            // 
            this.step2EventDrivenActivity_Previous.Activities.Add(this.previousHandleExternalEventActivity1);
            this.step2EventDrivenActivity_Previous.Activities.Add(this.setStateActivity7);
            this.step2EventDrivenActivity_Previous.Name = "step2EventDrivenActivity_Previous";
            // 
            // step2EventDrivenActivity_Cancel
            // 
            this.step2EventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity3);
            this.step2EventDrivenActivity_Cancel.Activities.Add(this.setStateActivity5);
            this.step2EventDrivenActivity_Cancel.Name = "step2EventDrivenActivity_Cancel";
            // 
            // step2EventDrivenActivity_Finish
            // 
            this.step2EventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity1);
            this.step2EventDrivenActivity_Finish.Activities.Add(this.setStateActivity2);
            this.step2EventDrivenActivity_Finish.Name = "step2EventDrivenActivity_Finish";
            // 
            // step2StateInitializationActivity
            // 
            this.step2StateInitializationActivity.Activities.Add(this.step2WizardFormActivity);
            this.step2StateInitializationActivity.Name = "step2StateInitializationActivity";
            // 
            // step1EventDrivenActivity_Cancel
            // 
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.setStateActivity4);
            this.step1EventDrivenActivity_Cancel.Name = "step1EventDrivenActivity_Cancel";
            // 
            // step1EventDrivenActivity_Next
            // 
            this.step1EventDrivenActivity_Next.Activities.Add(this.nextHandleExternalEventActivity1);
            this.step1EventDrivenActivity_Next.Activities.Add(this.setStateActivity3);
            this.step1EventDrivenActivity_Next.Name = "step1EventDrivenActivity_Next";
            // 
            // step1StateInitializationActivity
            // 
            this.step1StateInitializationActivity.Activities.Add(this.step1CodeActivity_Initialize);
            this.step1StateInitializationActivity.Activities.Add(this.step1WizardFormActivity);
            this.step1StateInitializationActivity.Name = "step1StateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.initializeIfElseActivity_LocalesExists);
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
            // referencesExistsStateActivity
            // 
            this.referencesExistsStateActivity.Activities.Add(this.stateInitializationActivity1);
            this.referencesExistsStateActivity.Activities.Add(this.eventDrivenActivity_Next);
            this.referencesExistsStateActivity.Activities.Add(this.eventDrivenActivity_Cancel);
            this.referencesExistsStateActivity.Name = "referencesExistsStateActivity";
            // 
            // noLocalesStateActivity
            // 
            this.noLocalesStateActivity.Activities.Add(this.noLocalesStateInitializationActivity);
            this.noLocalesStateActivity.Activities.Add(this.noLocalesEventDrivenActivity_Finish);
            this.noLocalesStateActivity.Name = "noLocalesStateActivity";
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
            this.step2StateActivity.Activities.Add(this.step2EventDrivenActivity_Cancel);
            this.step2StateActivity.Activities.Add(this.step2EventDrivenActivity_Previous);
            this.step2StateActivity.Name = "step2StateActivity";
            // 
            // step1StateActivity
            // 
            this.step1StateActivity.Activities.Add(this.step1StateInitializationActivity);
            this.step1StateActivity.Activities.Add(this.step1EventDrivenActivity_Next);
            this.step1StateActivity.Activities.Add(this.step1EventDrivenActivity_Cancel);
            this.step1StateActivity.Name = "step1StateActivity";
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
            // EnableTypeLocalizationWorkflow
            // 
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.step1StateActivity);
            this.Activities.Add(this.step2StateActivity);
            this.Activities.Add(this.finalizeStateActivity);
            this.Activities.Add(this.noLocalesStateActivity);
            this.Activities.Add(this.referencesExistsStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "EnableTypeLocalizationWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateInitializationActivity initializeStateInitializationActivity;
        private SetStateActivity setStateActivity1;
        private StateActivity finalStateActivity;
        private StateActivity initializeStateActivity;
        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity3;
        private Composite.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;
        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;
        private Composite.Workflow.Activities.NextHandleExternalEventActivity nextHandleExternalEventActivity1;
        private EventDrivenActivity step2EventDrivenActivity_Cancel;
        private EventDrivenActivity step2EventDrivenActivity_Finish;
        private StateInitializationActivity step2StateInitializationActivity;
        private EventDrivenActivity step1EventDrivenActivity_Cancel;
        private EventDrivenActivity step1EventDrivenActivity_Next;
        private StateInitializationActivity step1StateInitializationActivity;
        private StateActivity finalizeStateActivity;
        private StateActivity step2StateActivity;
        private StateActivity step1StateActivity;
        private CodeActivity finalizeCodeActivity_Finalize;
        private StateInitializationActivity finalizeStateInitializationActivity;
        private SetStateActivity setStateActivity5;
        private SetStateActivity setStateActivity2;
        private SetStateActivity setStateActivity4;
        private SetStateActivity setStateActivity3;
        private SetStateActivity setStateActivity6;
        private Composite.Workflow.Activities.WizardFormActivity step2WizardFormActivity;
        private Composite.Workflow.Activities.WizardFormActivity step1WizardFormActivity;
        private SetStateActivity setStateActivity7;
        private Composite.Workflow.Activities.PreviousHandleExternalEventActivity previousHandleExternalEventActivity1;
        private CodeActivity step1CodeActivity_Initialize;
        private EventDrivenActivity step2EventDrivenActivity_Previous;
        private IfElseBranchActivity ifElseBranchActivity1;
        private Composite.Workflow.Activities.DataDialogFormActivity noLocalesDataDialogFormActivity;
        private IfElseActivity initializeIfElseActivity_LocalesExists;
        private StateInitializationActivity noLocalesStateInitializationActivity;
        private StateActivity noLocalesStateActivity;
        private SetStateActivity setStateActivity9;
        private Composite.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity2;
        private EventDrivenActivity noLocalesEventDrivenActivity_Finish;
        private StateActivity referencesExistsStateActivity;
        private StateInitializationActivity stateInitializationActivity1;
        private SetStateActivity setStateActivity8;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ThereAreReferencesInLocalizedDataActivity4;
        private IfElseBranchActivity NoReferencesInLocalizedDataActivity3;
        private IfElseActivity ifElseActivity1;
        private SetStateActivity setStateActivity10;
        private Composite.Workflow.Activities.WizardFormActivity wizardFormActivity1;
        private EventDrivenActivity eventDrivenActivity_Next;
        private SetStateActivity setStateActivity11;
        private Composite.Workflow.Activities.NextHandleExternalEventActivity nextHandleExternalEventActivity2;
        private SetStateActivity setStateActivity12;
        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity4;
        private EventDrivenActivity eventDrivenActivity_Cancel;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;













































































































































    }
}
