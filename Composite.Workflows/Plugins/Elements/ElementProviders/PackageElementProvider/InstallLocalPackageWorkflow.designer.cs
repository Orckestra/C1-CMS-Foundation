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

namespace Composite.Plugins.Elements.ElementProviders.PackageElementProvider
{
    partial class InstallLocalPackageWorkflow
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
            this.setStateActivity9 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity5 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity4 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.step1If_DidValidate = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.closeCurrentViewActivity2 = new Composite.C1Console.Workflow.Activities.CloseCurrentViewActivity();
            this.cleanupCodeActivity_Cleanup = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity7 = new System.Workflow.Activities.SetStateActivity();
            this.step3CodeActivity_RefreshTree = new System.Workflow.Activities.CodeActivity();
            this.closeCurrentViewActivity1 = new Composite.C1Console.Workflow.Activities.CloseCurrentViewActivity();
            this.finishHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.step3WizardFormActivity = new Composite.C1Console.Workflow.Activities.WizardFormActivity();
            this.setStateActivity8 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.showErrorWizardFormActivity = new Composite.C1Console.Workflow.Activities.WizardFormActivity();
            this.showErrorCodeActivity_Initialize = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity11 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity3 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.step2IfElseActivity_DidValidate = new System.Workflow.Activities.IfElseActivity();
            this.step2CodeActivity_Install = new System.Workflow.Activities.CodeActivity();
            this.nextHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.NextHandleExternalEventActivity();
            this.step2WizardFormActivity = new Composite.C1Console.Workflow.Activities.WizardFormActivity();
            this.setStateActivity10 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.ifElseActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.step1CodeActivity_ValidateInstallation = new System.Workflow.Activities.CodeActivity();
            this.nextHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.NextHandleExternalEventActivity();
            this.step1WizardFormActivity = new Composite.C1Console.Workflow.Activities.WizardFormActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.initializeCodeActivity_Initialize = new System.Workflow.Activities.CodeActivity();
            this.cleanupStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step3EventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.step3StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.showErrorEventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.showErrorStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step2EventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step2EventDrivenActivity_Next = new System.Workflow.Activities.EventDrivenActivity();
            this.step2StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step1EventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step1EventDrivenActivity_Next = new System.Workflow.Activities.EventDrivenActivity();
            this.step1StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.cleanupStateActivity = new System.Workflow.Activities.StateActivity();
            this.step3StateActivity = new System.Workflow.Activities.StateActivity();
            this.showErrorStateActivity = new System.Workflow.Activities.StateActivity();
            this.step2StateActivity = new System.Workflow.Activities.StateActivity();
            this.step1StateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // setStateActivity9
            // 
            this.setStateActivity9.Name = "setStateActivity9";
            this.setStateActivity9.TargetStateName = "showErrorStateActivity";
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "step3StateActivity";
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "showErrorStateActivity";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "step2StateActivity";
            // 
            // ifElseBranchActivity5
            // 
            this.ifElseBranchActivity5.Activities.Add(this.setStateActivity9);
            this.ifElseBranchActivity5.Name = "ifElseBranchActivity5";
            // 
            // ifElseBranchActivity4
            // 
            this.ifElseBranchActivity4.Activities.Add(this.setStateActivity6);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.DidValidate);
            this.ifElseBranchActivity4.Condition = codecondition1;
            this.ifElseBranchActivity4.Name = "ifElseBranchActivity4";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity4);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // step1If_DidValidate
            // 
            this.step1If_DidValidate.Activities.Add(this.setStateActivity3);
            codecondition2.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.DidValidate);
            this.step1If_DidValidate.Condition = codecondition2;
            this.step1If_DidValidate.Name = "step1If_DidValidate";
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "finalStateActivity";
            // 
            // closeCurrentViewActivity2
            // 
            this.closeCurrentViewActivity2.Name = "closeCurrentViewActivity2";
            // 
            // cleanupCodeActivity_Cleanup
            // 
            this.cleanupCodeActivity_Cleanup.Name = "cleanupCodeActivity_Cleanup";
            this.cleanupCodeActivity_Cleanup.ExecuteCode += new System.EventHandler(this.cleanupCodeActivity_Cleanup_ExecuteCode);
            // 
            // setStateActivity7
            // 
            this.setStateActivity7.Name = "setStateActivity7";
            this.setStateActivity7.TargetStateName = "finalStateActivity";
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
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // step3WizardFormActivity
            // 
            this.step3WizardFormActivity.ContainerLabel = null;
            this.step3WizardFormActivity.FormDefinitionFileName = "\\Administrative\\PackageElementProviderInstallLocalPackageStep3.xml";
            this.step3WizardFormActivity.Name = "step3WizardFormActivity";
            // 
            // setStateActivity8
            // 
            this.setStateActivity8.Name = "setStateActivity8";
            this.setStateActivity8.TargetStateName = "finalStateActivity";
            // 
            // finishHandleExternalEventActivity2
            // 
            this.finishHandleExternalEventActivity2.EventName = "Finish";
            this.finishHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity2.Name = "finishHandleExternalEventActivity2";
            // 
            // showErrorWizardFormActivity
            // 
            this.showErrorWizardFormActivity.ContainerLabel = null;
            this.showErrorWizardFormActivity.FormDefinitionFileName = "\\Administrative\\PackageElementProviderInstallLocalPackageShowError.xml";
            this.showErrorWizardFormActivity.Name = "showErrorWizardFormActivity";
            // 
            // showErrorCodeActivity_Initialize
            // 
            this.showErrorCodeActivity_Initialize.Name = "showErrorCodeActivity_Initialize";
            this.showErrorCodeActivity_Initialize.ExecuteCode += new System.EventHandler(this.showErrorCodeActivity_Initialize_ExecuteCode);
            // 
            // setStateActivity11
            // 
            this.setStateActivity11.Name = "setStateActivity11";
            this.setStateActivity11.TargetStateName = "cleanupStateActivity";
            // 
            // cancelHandleExternalEventActivity3
            // 
            this.cancelHandleExternalEventActivity3.EventName = "Cancel";
            this.cancelHandleExternalEventActivity3.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity3.Name = "cancelHandleExternalEventActivity3";
            // 
            // step2IfElseActivity_DidValidate
            // 
            this.step2IfElseActivity_DidValidate.Activities.Add(this.ifElseBranchActivity4);
            this.step2IfElseActivity_DidValidate.Activities.Add(this.ifElseBranchActivity5);
            this.step2IfElseActivity_DidValidate.Name = "step2IfElseActivity_DidValidate";
            // 
            // step2CodeActivity_Install
            // 
            this.step2CodeActivity_Install.Name = "step2CodeActivity_Install";
            this.step2CodeActivity_Install.ExecuteCode += new System.EventHandler(this.step2CodeActivity_Install_ExecuteCode);
            // 
            // nextHandleExternalEventActivity2
            // 
            this.nextHandleExternalEventActivity2.EventName = "Next";
            this.nextHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.nextHandleExternalEventActivity2.Name = "nextHandleExternalEventActivity2";
            // 
            // step2WizardFormActivity
            // 
            this.step2WizardFormActivity.ContainerLabel = null;
            this.step2WizardFormActivity.FormDefinitionFileName = "\\Administrative\\PackageElementProviderInstallLocalPackageStep2.xml";
            this.step2WizardFormActivity.Name = "step2WizardFormActivity";
            // 
            // setStateActivity10
            // 
            this.setStateActivity10.Name = "setStateActivity10";
            this.setStateActivity10.TargetStateName = "cleanupStateActivity";
            // 
            // cancelHandleExternalEventActivity2
            // 
            this.cancelHandleExternalEventActivity2.EventName = "Cancel";
            this.cancelHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity2.Name = "cancelHandleExternalEventActivity2";
            // 
            // ifElseActivity1
            // 
            this.ifElseActivity1.Activities.Add(this.step1If_DidValidate);
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity2);
            this.ifElseActivity1.Name = "ifElseActivity1";
            // 
            // step1CodeActivity_ValidateInstallation
            // 
            this.step1CodeActivity_ValidateInstallation.Name = "step1CodeActivity_ValidateInstallation";
            this.step1CodeActivity_ValidateInstallation.ExecuteCode += new System.EventHandler(this.step1CodeActivity_ValidateInstallation_ExecuteCode);
            // 
            // nextHandleExternalEventActivity1
            // 
            this.nextHandleExternalEventActivity1.EventName = "Next";
            this.nextHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.nextHandleExternalEventActivity1.Name = "nextHandleExternalEventActivity1";
            // 
            // step1WizardFormActivity
            // 
            this.step1WizardFormActivity.ContainerLabel = null;
            this.step1WizardFormActivity.FormDefinitionFileName = "\\Administrative\\PackageElementProviderInstallLocalPackageStep1.xml";
            this.step1WizardFormActivity.Name = "step1WizardFormActivity";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "step1StateActivity";
            // 
            // initializeCodeActivity_Initialize
            // 
            this.initializeCodeActivity_Initialize.Name = "initializeCodeActivity_Initialize";
            this.initializeCodeActivity_Initialize.ExecuteCode += new System.EventHandler(this.initializeCodeActivity_Initialize_ExecuteCode);
            // 
            // cleanupStateInitializationActivity
            // 
            this.cleanupStateInitializationActivity.Activities.Add(this.cleanupCodeActivity_Cleanup);
            this.cleanupStateInitializationActivity.Activities.Add(this.closeCurrentViewActivity2);
            this.cleanupStateInitializationActivity.Activities.Add(this.setStateActivity5);
            this.cleanupStateInitializationActivity.Name = "cleanupStateInitializationActivity";
            // 
            // step3EventDrivenActivity_Finish
            // 
            this.step3EventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity1);
            this.step3EventDrivenActivity_Finish.Activities.Add(this.closeCurrentViewActivity1);
            this.step3EventDrivenActivity_Finish.Activities.Add(this.step3CodeActivity_RefreshTree);
            this.step3EventDrivenActivity_Finish.Activities.Add(this.setStateActivity7);
            this.step3EventDrivenActivity_Finish.Name = "step3EventDrivenActivity_Finish";
            // 
            // step3StateInitializationActivity
            // 
            this.step3StateInitializationActivity.Activities.Add(this.step3WizardFormActivity);
            this.step3StateInitializationActivity.Name = "step3StateInitializationActivity";
            // 
            // showErrorEventDrivenActivity_Finish
            // 
            this.showErrorEventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity2);
            this.showErrorEventDrivenActivity_Finish.Activities.Add(this.setStateActivity8);
            this.showErrorEventDrivenActivity_Finish.Name = "showErrorEventDrivenActivity_Finish";
            // 
            // showErrorStateInitializationActivity
            // 
            this.showErrorStateInitializationActivity.Activities.Add(this.showErrorCodeActivity_Initialize);
            this.showErrorStateInitializationActivity.Activities.Add(this.showErrorWizardFormActivity);
            this.showErrorStateInitializationActivity.Name = "showErrorStateInitializationActivity";
            // 
            // step2EventDrivenActivity_Cancel
            // 
            this.step2EventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity3);
            this.step2EventDrivenActivity_Cancel.Activities.Add(this.setStateActivity11);
            this.step2EventDrivenActivity_Cancel.Name = "step2EventDrivenActivity_Cancel";
            // 
            // step2EventDrivenActivity_Next
            // 
            this.step2EventDrivenActivity_Next.Activities.Add(this.nextHandleExternalEventActivity2);
            this.step2EventDrivenActivity_Next.Activities.Add(this.step2CodeActivity_Install);
            this.step2EventDrivenActivity_Next.Activities.Add(this.step2IfElseActivity_DidValidate);
            this.step2EventDrivenActivity_Next.Name = "step2EventDrivenActivity_Next";
            // 
            // step2StateInitializationActivity
            // 
            this.step2StateInitializationActivity.Activities.Add(this.step2WizardFormActivity);
            this.step2StateInitializationActivity.Name = "step2StateInitializationActivity";
            // 
            // step1EventDrivenActivity_Cancel
            // 
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.setStateActivity10);
            this.step1EventDrivenActivity_Cancel.Name = "step1EventDrivenActivity_Cancel";
            // 
            // step1EventDrivenActivity_Next
            // 
            this.step1EventDrivenActivity_Next.Activities.Add(this.nextHandleExternalEventActivity1);
            this.step1EventDrivenActivity_Next.Activities.Add(this.step1CodeActivity_ValidateInstallation);
            this.step1EventDrivenActivity_Next.Activities.Add(this.ifElseActivity1);
            this.step1EventDrivenActivity_Next.Name = "step1EventDrivenActivity_Next";
            // 
            // step1StateInitializationActivity
            // 
            this.step1StateInitializationActivity.Activities.Add(this.step1WizardFormActivity);
            this.step1StateInitializationActivity.Name = "step1StateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.initializeCodeActivity_Initialize);
            this.initializeStateInitializationActivity.Activities.Add(this.setStateActivity2);
            this.initializeStateInitializationActivity.Name = "initializeStateInitializationActivity";
            // 
            // setStateActivity1
            // 
            this.setStateActivity1.Name = "setStateActivity1";
            this.setStateActivity1.TargetStateName = "cleanupStateActivity";
            // 
            // cancelHandleExternalEventActivity1
            // 
            this.cancelHandleExternalEventActivity1.EventName = "Cancel";
            this.cancelHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity1.Name = "cancelHandleExternalEventActivity1";
            // 
            // cleanupStateActivity
            // 
            this.cleanupStateActivity.Activities.Add(this.cleanupStateInitializationActivity);
            this.cleanupStateActivity.Name = "cleanupStateActivity";
            // 
            // step3StateActivity
            // 
            this.step3StateActivity.Activities.Add(this.step3StateInitializationActivity);
            this.step3StateActivity.Activities.Add(this.step3EventDrivenActivity_Finish);
            this.step3StateActivity.Name = "step3StateActivity";
            // 
            // showErrorStateActivity
            // 
            this.showErrorStateActivity.Activities.Add(this.showErrorStateInitializationActivity);
            this.showErrorStateActivity.Activities.Add(this.showErrorEventDrivenActivity_Finish);
            this.showErrorStateActivity.Name = "showErrorStateActivity";
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
            // InstallLocalPackageWorkflow
            // 
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.step1StateActivity);
            this.Activities.Add(this.step2StateActivity);
            this.Activities.Add(this.showErrorStateActivity);
            this.Activities.Add(this.step3StateActivity);
            this.Activities.Add(this.cleanupStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "InstallLocalPackageWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateInitializationActivity initializeStateInitializationActivity;
        private SetStateActivity setStateActivity1;
        private StateActivity finalStateActivity;
        private StateActivity initializeStateActivity;
        private Composite.C1Console.Workflow.Activities.WizardFormActivity step1WizardFormActivity;
        private EventDrivenActivity step1EventDrivenActivity_Next;
        private StateInitializationActivity step1StateInitializationActivity;
        private StateActivity step1StateActivity;
        private SetStateActivity setStateActivity2;
        private CodeActivity initializeCodeActivity_Initialize;
        private CodeActivity step1CodeActivity_ValidateInstallation;
        private SetStateActivity setStateActivity4;
        private SetStateActivity setStateActivity3;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity step1If_DidValidate;
        private IfElseActivity ifElseActivity1;
        private Composite.C1Console.Workflow.Activities.NextHandleExternalEventActivity nextHandleExternalEventActivity1;
        private StateActivity showErrorStateActivity;
        private StateActivity step2StateActivity;
        private Composite.C1Console.Workflow.Activities.WizardFormActivity step2WizardFormActivity;
        private StateInitializationActivity step2StateInitializationActivity;
        private CodeActivity step2CodeActivity_Install;
        private Composite.C1Console.Workflow.Activities.NextHandleExternalEventActivity nextHandleExternalEventActivity2;
        private EventDrivenActivity step2EventDrivenActivity_Next;
        private Composite.C1Console.Workflow.Activities.WizardFormActivity step3WizardFormActivity;
        private StateInitializationActivity step3StateInitializationActivity;
        private StateActivity step3StateActivity;
        private SetStateActivity setStateActivity7;
        private Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;
        private SetStateActivity setStateActivity6;
        private EventDrivenActivity step3EventDrivenActivity_Finish;
        private EventDrivenActivity showErrorEventDrivenActivity_Finish;
        private StateInitializationActivity showErrorStateInitializationActivity;
        private Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity2;
        private Composite.C1Console.Workflow.Activities.WizardFormActivity showErrorWizardFormActivity;
        private SetStateActivity setStateActivity8;
        private CodeActivity step3CodeActivity_RefreshTree;
        private SetStateActivity setStateActivity9;
        private IfElseBranchActivity ifElseBranchActivity5;
        private IfElseBranchActivity ifElseBranchActivity4;
        private IfElseActivity step2IfElseActivity_DidValidate;
        private CodeActivity showErrorCodeActivity_Initialize;
        private SetStateActivity setStateActivity5;
        private CodeActivity cleanupCodeActivity_Cleanup;
        private StateInitializationActivity cleanupStateInitializationActivity;
        private StateActivity cleanupStateActivity;
        private SetStateActivity setStateActivity11;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity3;
        private SetStateActivity setStateActivity10;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;
        private EventDrivenActivity step2EventDrivenActivity_Cancel;
        private EventDrivenActivity step1EventDrivenActivity_Cancel;
        private Composite.C1Console.Workflow.Activities.CloseCurrentViewActivity closeCurrentViewActivity2;
        private Composite.C1Console.Workflow.Activities.CloseCurrentViewActivity closeCurrentViewActivity1;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;






































































































































































    }
}
