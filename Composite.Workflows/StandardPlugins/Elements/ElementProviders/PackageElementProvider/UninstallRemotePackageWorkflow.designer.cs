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

namespace Composite.StandardPlugins.Elements.ElementProviders.PackageElementProvider
{
    partial class UninstallRemotePackageWorkflow
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
            this.setStateActivity11 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity7 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity6 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity5 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity8 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseActivity_DidUnregistre = new System.Workflow.Activities.IfElseActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.step2WizardFormActivity = new Composite.Workflow.Activities.WizardFormActivity();
            this.ifElseBranchActivity4 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity3 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity12 = new System.Workflow.Activities.SetStateActivity();
            this.nextHandleExternalEventActivity3 = new Composite.Workflow.Activities.NextHandleExternalEventActivity();
            this.showUnregistreErrorWizardFormActivity = new Composite.Workflow.Activities.WizardFormActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity1 = new Composite.Workflow.Activities.FinishHandleExternalEventActivity();
            this.showErrorWizardFormActivity = new Composite.Workflow.Activities.WizardFormActivity();
            this.showErrorCodeActivity_Initialize = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.step3CodeActivity_RefreshTree = new System.Workflow.Activities.CodeActivity();
            this.closeCurrentViewActivity1 = new Composite.Workflow.Activities.CloseCurrentViewActivity();
            this.finishHandleExternalEventActivity2 = new Composite.Workflow.Activities.FinishHandleExternalEventActivity();
            this.step3WizardFormActivity = new Composite.Workflow.Activities.WizardFormActivity();
            this.setStateActivity10 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity3 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.step2IfElseActivity_DidValidate = new System.Workflow.Activities.IfElseActivity();
            this.step2CodeActivity_Uninstall = new System.Workflow.Activities.CodeActivity();
            this.nextHandleExternalEventActivity2 = new Composite.Workflow.Activities.NextHandleExternalEventActivity();
            this.step2IfElseActivity_Validate = new System.Workflow.Activities.IfElseActivity();
            this.step2CodeActivity_Validate = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity9 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.nextHandleExternalEventActivity1 = new Composite.Workflow.Activities.NextHandleExternalEventActivity();
            this.step1WizardFormActivity = new Composite.Workflow.Activities.WizardFormActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.showUnregistreErrorEventDrivenActivity_Next = new System.Workflow.Activities.EventDrivenActivity();
            this.showUnregistreErrorStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.showErrorEventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.showErrorStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step3EventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.step3StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step2EventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step2EventDrivenActivity_Next = new System.Workflow.Activities.EventDrivenActivity();
            this.step2StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step1EventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step1EventDrivenActivity_Next = new System.Workflow.Activities.EventDrivenActivity();
            this.step1StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.showUnregistreErrorActivity = new System.Workflow.Activities.StateActivity();
            this.showErrorStateActivity = new System.Workflow.Activities.StateActivity();
            this.step3StateActivity = new System.Workflow.Activities.StateActivity();
            this.step2StateActivity = new System.Workflow.Activities.StateActivity();
            this.step1StateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // setStateActivity11
            // 
            this.setStateActivity11.Name = "setStateActivity11";
            this.setStateActivity11.TargetStateName = "showUnregistreErrorActivity";
            // 
            // setStateActivity7
            // 
            this.setStateActivity7.Name = "setStateActivity7";
            this.setStateActivity7.TargetStateName = "step3StateActivity";
            // 
            // ifElseBranchActivity6
            // 
            this.ifElseBranchActivity6.Activities.Add(this.setStateActivity11);
            this.ifElseBranchActivity6.Name = "ifElseBranchActivity6";
            // 
            // ifElseBranchActivity5
            // 
            this.ifElseBranchActivity5.Activities.Add(this.setStateActivity7);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.DidUnregistre);
            this.ifElseBranchActivity5.Condition = codecondition1;
            this.ifElseBranchActivity5.Name = "ifElseBranchActivity5";
            // 
            // setStateActivity8
            // 
            this.setStateActivity8.Name = "setStateActivity8";
            this.setStateActivity8.TargetStateName = "showErrorStateActivity";
            // 
            // ifElseActivity_DidUnregistre
            // 
            this.ifElseActivity_DidUnregistre.Activities.Add(this.ifElseBranchActivity5);
            this.ifElseActivity_DidUnregistre.Activities.Add(this.ifElseBranchActivity6);
            this.ifElseActivity_DidUnregistre.Name = "ifElseActivity_DidUnregistre";
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "showErrorStateActivity";
            // 
            // step2WizardFormActivity
            // 
            this.step2WizardFormActivity.ContainerLabel = null;
            this.step2WizardFormActivity.FormDefinitionFileName = "\\Administrative\\PackageElementProviderUninstallRemotePackageStep2.xml";
            this.step2WizardFormActivity.Name = "step2WizardFormActivity";
            // 
            // ifElseBranchActivity4
            // 
            this.ifElseBranchActivity4.Activities.Add(this.setStateActivity8);
            this.ifElseBranchActivity4.Name = "ifElseBranchActivity4";
            // 
            // ifElseBranchActivity3
            // 
            this.ifElseBranchActivity3.Activities.Add(this.ifElseActivity_DidUnregistre);
            codecondition2.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.DidValidate);
            this.ifElseBranchActivity3.Condition = codecondition2;
            this.ifElseBranchActivity3.Name = "ifElseBranchActivity3";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity5);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.step2WizardFormActivity);
            codecondition3.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.DidValidate);
            this.ifElseBranchActivity1.Condition = codecondition3;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // setStateActivity12
            // 
            this.setStateActivity12.Name = "setStateActivity12";
            this.setStateActivity12.TargetStateName = "step3StateActivity";
            // 
            // nextHandleExternalEventActivity3
            // 
            this.nextHandleExternalEventActivity3.EventName = "Next";
            this.nextHandleExternalEventActivity3.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.nextHandleExternalEventActivity3.Name = "nextHandleExternalEventActivity3";
            // 
            // showUnregistreErrorWizardFormActivity
            // 
            this.showUnregistreErrorWizardFormActivity.ContainerLabel = null;
            this.showUnregistreErrorWizardFormActivity.FormDefinitionFileName = "\\Administrative\\PackageElementProviderUninstallRemotePackageShowUnregistreError.x" +
                "ml";
            this.showUnregistreErrorWizardFormActivity.Name = "showUnregistreErrorWizardFormActivity";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "finalStateActivity";
            // 
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // showErrorWizardFormActivity
            // 
            this.showErrorWizardFormActivity.ContainerLabel = null;
            this.showErrorWizardFormActivity.FormDefinitionFileName = "\\Administrative\\PackageElementProviderUninstallRemotePackageShowError.xml";
            this.showErrorWizardFormActivity.Name = "showErrorWizardFormActivity";
            // 
            // showErrorCodeActivity_Initialize
            // 
            this.showErrorCodeActivity_Initialize.Name = "showErrorCodeActivity_Initialize";
            this.showErrorCodeActivity_Initialize.ExecuteCode += new System.EventHandler(this.showErrorCodeActivity_Initialize_ExecuteCode);
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "finalStateActivity";
            // 
            // step3CodeActivity_RefreshTree
            // 
            this.step3CodeActivity_RefreshTree.Name = "step3CodeActivity_RefreshTree";
            this.step3CodeActivity_RefreshTree.ExecuteCode += new System.EventHandler(this.step3CodeActivity_RefreshTree_ExecuteCode);
            // 
            // closeCurrentViewActivity1
            // 
            this.closeCurrentViewActivity1.Name = "closeCurrentViewActivity1";
            // 
            // finishHandleExternalEventActivity2
            // 
            this.finishHandleExternalEventActivity2.EventName = "Finish";
            this.finishHandleExternalEventActivity2.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity2.Name = "finishHandleExternalEventActivity2";
            // 
            // step3WizardFormActivity
            // 
            this.step3WizardFormActivity.ContainerLabel = null;
            this.step3WizardFormActivity.FormDefinitionFileName = "\\Administrative\\PackageElementProviderUninstallRemotePackageStep3.xml";
            this.step3WizardFormActivity.Name = "step3WizardFormActivity";
            // 
            // setStateActivity10
            // 
            this.setStateActivity10.Name = "setStateActivity10";
            this.setStateActivity10.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity3
            // 
            this.cancelHandleExternalEventActivity3.EventName = "Cancel";
            this.cancelHandleExternalEventActivity3.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity3.Name = "cancelHandleExternalEventActivity3";
            // 
            // step2IfElseActivity_DidValidate
            // 
            this.step2IfElseActivity_DidValidate.Activities.Add(this.ifElseBranchActivity3);
            this.step2IfElseActivity_DidValidate.Activities.Add(this.ifElseBranchActivity4);
            this.step2IfElseActivity_DidValidate.Name = "step2IfElseActivity_DidValidate";
            // 
            // step2CodeActivity_Uninstall
            // 
            this.step2CodeActivity_Uninstall.Name = "step2CodeActivity_Uninstall";
            this.step2CodeActivity_Uninstall.ExecuteCode += new System.EventHandler(this.step2CodeActivity_Uninstall_ExecuteCode);
            // 
            // nextHandleExternalEventActivity2
            // 
            this.nextHandleExternalEventActivity2.EventName = "Next";
            this.nextHandleExternalEventActivity2.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.nextHandleExternalEventActivity2.Name = "nextHandleExternalEventActivity2";
            // 
            // step2IfElseActivity_Validate
            // 
            this.step2IfElseActivity_Validate.Activities.Add(this.ifElseBranchActivity1);
            this.step2IfElseActivity_Validate.Activities.Add(this.ifElseBranchActivity2);
            this.step2IfElseActivity_Validate.Name = "step2IfElseActivity_Validate";
            // 
            // step2CodeActivity_Validate
            // 
            this.step2CodeActivity_Validate.Name = "step2CodeActivity_Validate";
            this.step2CodeActivity_Validate.ExecuteCode += new System.EventHandler(this.step2CodeActivity_Validate_ExecuteCode);
            // 
            // setStateActivity9
            // 
            this.setStateActivity9.Name = "setStateActivity9";
            this.setStateActivity9.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity2
            // 
            this.cancelHandleExternalEventActivity2.EventName = "Cancel";
            this.cancelHandleExternalEventActivity2.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity2.Name = "cancelHandleExternalEventActivity2";
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "step2StateActivity";
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
            this.step1WizardFormActivity.FormDefinitionFileName = "\\Administrative\\PackageElementProviderUninstallRemotePackageStep1.xml";
            this.step1WizardFormActivity.Name = "step1WizardFormActivity";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "step1StateActivity";
            // 
            // showUnregistreErrorEventDrivenActivity_Next
            // 
            this.showUnregistreErrorEventDrivenActivity_Next.Activities.Add(this.nextHandleExternalEventActivity3);
            this.showUnregistreErrorEventDrivenActivity_Next.Activities.Add(this.setStateActivity12);
            this.showUnregistreErrorEventDrivenActivity_Next.Name = "showUnregistreErrorEventDrivenActivity_Next";
            // 
            // showUnregistreErrorStateInitializationActivity
            // 
            this.showUnregistreErrorStateInitializationActivity.Activities.Add(this.showUnregistreErrorWizardFormActivity);
            this.showUnregistreErrorStateInitializationActivity.Name = "showUnregistreErrorStateInitializationActivity";
            // 
            // showErrorEventDrivenActivity_Finish
            // 
            this.showErrorEventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity1);
            this.showErrorEventDrivenActivity_Finish.Activities.Add(this.setStateActivity3);
            this.showErrorEventDrivenActivity_Finish.Name = "showErrorEventDrivenActivity_Finish";
            // 
            // showErrorStateInitializationActivity
            // 
            this.showErrorStateInitializationActivity.Activities.Add(this.showErrorCodeActivity_Initialize);
            this.showErrorStateInitializationActivity.Activities.Add(this.showErrorWizardFormActivity);
            this.showErrorStateInitializationActivity.Name = "showErrorStateInitializationActivity";
            // 
            // step3EventDrivenActivity_Finish
            // 
            this.step3EventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity2);
            this.step3EventDrivenActivity_Finish.Activities.Add(this.closeCurrentViewActivity1);
            this.step3EventDrivenActivity_Finish.Activities.Add(this.step3CodeActivity_RefreshTree);
            this.step3EventDrivenActivity_Finish.Activities.Add(this.setStateActivity4);
            this.step3EventDrivenActivity_Finish.Name = "step3EventDrivenActivity_Finish";
            // 
            // step3StateInitializationActivity
            // 
            this.step3StateInitializationActivity.Activities.Add(this.step3WizardFormActivity);
            this.step3StateInitializationActivity.Name = "step3StateInitializationActivity";
            // 
            // step2EventDrivenActivity_Cancel
            // 
            this.step2EventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity3);
            this.step2EventDrivenActivity_Cancel.Activities.Add(this.setStateActivity10);
            this.step2EventDrivenActivity_Cancel.Name = "step2EventDrivenActivity_Cancel";
            // 
            // step2EventDrivenActivity_Next
            // 
            this.step2EventDrivenActivity_Next.Activities.Add(this.nextHandleExternalEventActivity2);
            this.step2EventDrivenActivity_Next.Activities.Add(this.step2CodeActivity_Uninstall);
            this.step2EventDrivenActivity_Next.Activities.Add(this.step2IfElseActivity_DidValidate);
            this.step2EventDrivenActivity_Next.Name = "step2EventDrivenActivity_Next";
            // 
            // step2StateInitializationActivity
            // 
            this.step2StateInitializationActivity.Activities.Add(this.step2CodeActivity_Validate);
            this.step2StateInitializationActivity.Activities.Add(this.step2IfElseActivity_Validate);
            this.step2StateInitializationActivity.Name = "step2StateInitializationActivity";
            // 
            // step1EventDrivenActivity_Cancel
            // 
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.setStateActivity9);
            this.step1EventDrivenActivity_Cancel.Name = "step1EventDrivenActivity_Cancel";
            // 
            // step1EventDrivenActivity_Next
            // 
            this.step1EventDrivenActivity_Next.Activities.Add(this.nextHandleExternalEventActivity1);
            this.step1EventDrivenActivity_Next.Activities.Add(this.setStateActivity6);
            this.step1EventDrivenActivity_Next.Name = "step1EventDrivenActivity_Next";
            // 
            // step1StateInitializationActivity
            // 
            this.step1StateInitializationActivity.Activities.Add(this.step1WizardFormActivity);
            this.step1StateInitializationActivity.Name = "step1StateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.setStateActivity2);
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
            // showUnregistreErrorActivity
            // 
            this.showUnregistreErrorActivity.Activities.Add(this.showUnregistreErrorStateInitializationActivity);
            this.showUnregistreErrorActivity.Activities.Add(this.showUnregistreErrorEventDrivenActivity_Next);
            this.showUnregistreErrorActivity.Name = "showUnregistreErrorActivity";
            // 
            // showErrorStateActivity
            // 
            this.showErrorStateActivity.Activities.Add(this.showErrorStateInitializationActivity);
            this.showErrorStateActivity.Activities.Add(this.showErrorEventDrivenActivity_Finish);
            this.showErrorStateActivity.Name = "showErrorStateActivity";
            // 
            // step3StateActivity
            // 
            this.step3StateActivity.Activities.Add(this.step3StateInitializationActivity);
            this.step3StateActivity.Activities.Add(this.step3EventDrivenActivity_Finish);
            this.step3StateActivity.Name = "step3StateActivity";
            // 
            // step2StateActivity
            // 
            this.step2StateActivity.Activities.Add(this.step2StateInitializationActivity);
            this.step2StateActivity.Activities.Add(this.step2EventDrivenActivity_Next);
            this.step2StateActivity.Activities.Add(this.step2EventDrivenActivity_Cancel);
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
            // UninstallRemotePackageWorkflow
            // 
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.step1StateActivity);
            this.Activities.Add(this.step2StateActivity);
            this.Activities.Add(this.step3StateActivity);
            this.Activities.Add(this.showErrorStateActivity);
            this.Activities.Add(this.showUnregistreErrorActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "UninstallRemotePackageWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateInitializationActivity initializeStateInitializationActivity;
        private SetStateActivity setStateActivity1;
        private StateActivity finalStateActivity;
        private StateActivity initializeStateActivity;
        private SetStateActivity setStateActivity2;
        private EventDrivenActivity showErrorEventDrivenActivity_Finish;
        private StateInitializationActivity showErrorStateInitializationActivity;
        private EventDrivenActivity step3EventDrivenActivity_Finish;
        private StateInitializationActivity step3StateInitializationActivity;
        private EventDrivenActivity step2EventDrivenActivity_Next;
        private StateInitializationActivity step2StateInitializationActivity;
        private EventDrivenActivity step1EventDrivenActivity_Next;
        private StateInitializationActivity step1StateInitializationActivity;
        private StateActivity showErrorStateActivity;
        private StateActivity step3StateActivity;
        private StateActivity step2StateActivity;
        private StateActivity step1StateActivity;
        private SetStateActivity setStateActivity3;
        private SetStateActivity setStateActivity4;
        private Composite.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;
        private Composite.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity2;
        private Composite.Workflow.Activities.NextHandleExternalEventActivity nextHandleExternalEventActivity2;
        private Composite.Workflow.Activities.NextHandleExternalEventActivity nextHandleExternalEventActivity1;
        private Composite.Workflow.Activities.WizardFormActivity step1WizardFormActivity;
        private Composite.Workflow.Activities.WizardFormActivity step2WizardFormActivity;
        private CodeActivity step2CodeActivity_Validate;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private IfElseActivity step2IfElseActivity_Validate;
        private SetStateActivity setStateActivity5;
        private SetStateActivity setStateActivity6;
        private CodeActivity step2CodeActivity_Uninstall;
        private SetStateActivity setStateActivity8;
        private SetStateActivity setStateActivity7;
        private IfElseBranchActivity ifElseBranchActivity4;
        private IfElseBranchActivity ifElseBranchActivity3;
        private IfElseActivity step2IfElseActivity_DidValidate;
        private Composite.Workflow.Activities.WizardFormActivity step3WizardFormActivity;
        private CodeActivity step3CodeActivity_RefreshTree;
        private CodeActivity showErrorCodeActivity_Initialize;
        private Composite.Workflow.Activities.WizardFormActivity showErrorWizardFormActivity;
        private SetStateActivity setStateActivity10;
        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity3;
        private SetStateActivity setStateActivity9;
        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;
        private EventDrivenActivity step2EventDrivenActivity_Cancel;
        private EventDrivenActivity step1EventDrivenActivity_Cancel;
        private IfElseBranchActivity ifElseBranchActivity6;
        private IfElseBranchActivity ifElseBranchActivity5;
        private IfElseActivity ifElseActivity_DidUnregistre;
        private SetStateActivity setStateActivity11;
        private Composite.Workflow.Activities.WizardFormActivity showUnregistreErrorWizardFormActivity;
        private EventDrivenActivity showUnregistreErrorEventDrivenActivity_Next;
        private StateInitializationActivity showUnregistreErrorStateInitializationActivity;
        private StateActivity showUnregistreErrorActivity;
        private SetStateActivity setStateActivity12;
        private Composite.Workflow.Activities.NextHandleExternalEventActivity nextHandleExternalEventActivity3;
        private Composite.Workflow.Activities.CloseCurrentViewActivity closeCurrentViewActivity1;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;




























































































































    }
}
