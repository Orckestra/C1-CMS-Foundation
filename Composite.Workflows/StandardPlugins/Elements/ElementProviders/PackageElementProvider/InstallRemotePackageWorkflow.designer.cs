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
    partial class InstallRemotePackageWorkflow
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
            System.Workflow.Activities.CodeCondition codecondition5 = new System.Workflow.Activities.CodeCondition();
            System.Workflow.Activities.CodeCondition codecondition6 = new System.Workflow.Activities.CodeCondition();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity10 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity9 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity7 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity19 = new System.Workflow.Activities.SetStateActivity();
            this.showFieldMessageActivity1 = new Composite.Workflow.Activities.ShowFieldMessageActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity17 = new System.Workflow.Activities.SetStateActivity();
            this.step2WizardFormActivity = new Composite.Workflow.Activities.WizardFormActivity();
            this.setStateActivity18 = new System.Workflow.Activities.SetStateActivity();
            this.initializeIfElseActivity_IsAddOnFree = new System.Workflow.Activities.IfElseActivity();
            this.ifElseBranchActivity6 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity5 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity4 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity3 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity12 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity11 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity8 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity7 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity10 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity9 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity12 = new System.Workflow.Activities.SetStateActivity();
            this.cleanupCodeActivity_Cleanup = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity11 = new System.Workflow.Activities.SetStateActivity();
            this.step5CodeActivity_RefreshTree = new System.Workflow.Activities.CodeActivity();
            this.closeCurrentViewActivity1 = new Composite.Workflow.Activities.CloseCurrentViewActivity();
            this.finishHandleExternalEventActivity2 = new Composite.Workflow.Activities.FinishHandleExternalEventActivity();
            this.step5WizardFormActivity = new Composite.Workflow.Activities.WizardFormActivity();
            this.setStateActivity16 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity5 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.step4IfElseActivity_DidValidate = new System.Workflow.Activities.IfElseActivity();
            this.step4CodeActivity_Install = new System.Workflow.Activities.CodeActivity();
            this.nextHandleExternalEventActivity4 = new Composite.Workflow.Activities.NextHandleExternalEventActivity();
            this.step4WizardFormActivity = new Composite.Workflow.Activities.WizardFormActivity();
            this.setStateActivity8 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity1 = new Composite.Workflow.Activities.FinishHandleExternalEventActivity();
            this.showErrorWizardFormActivity = new Composite.Workflow.Activities.WizardFormActivity();
            this.showErrorCodeActivity_Initialize = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity15 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity4 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.step3IfElseActivity_DidValidate = new System.Workflow.Activities.IfElseActivity();
            this.step3CodeActivity_DownloadAndValidate = new System.Workflow.Activities.CodeActivity();
            this.nextHandleExternalEventActivity3 = new Composite.Workflow.Activities.NextHandleExternalEventActivity();
            this.step3WizardFormActivity = new Composite.Workflow.Activities.WizardFormActivity();
            this.setStateActivity14 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity3 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.ifElseActivity2 = new System.Workflow.Activities.IfElseActivity();
            this.nextHandleExternalEventActivity2 = new Composite.Workflow.Activities.NextHandleExternalEventActivity();
            this.ifElseActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.step2StateStepcodeActivity_Initialize = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity13 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.nextHandleExternalEventActivity1 = new Composite.Workflow.Activities.NextHandleExternalEventActivity();
            this.step1WizardFormActivity = new Composite.Workflow.Activities.WizardFormActivity();
            this.initializeIfElseActivity_DidValidate = new System.Workflow.Activities.IfElseActivity();
            this.initializeStateCodeActivity_Initialize = new System.Workflow.Activities.CodeActivity();
            this.cleanupStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step5EventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.step5StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step4EventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step4EventDrivenActivity_Next = new System.Workflow.Activities.EventDrivenActivity();
            this.step4StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.showErrorEventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.showErrorStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step3EventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step3EventDrivenActivity_Next = new System.Workflow.Activities.EventDrivenActivity();
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
            this.cleanupStateActivity = new System.Workflow.Activities.StateActivity();
            this.step5StateActivity = new System.Workflow.Activities.StateActivity();
            this.step4StateActivity = new System.Workflow.Activities.StateActivity();
            this.showErrorStateActivity = new System.Workflow.Activities.StateActivity();
            this.step3StateActivity = new System.Workflow.Activities.StateActivity();
            this.step2StateActivity = new System.Workflow.Activities.StateActivity();
            this.step1StateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "step1StateActivity";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "step2StateActivity";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity3);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.setStateActivity2);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.IsAddOnFree);
            this.ifElseBranchActivity1.Condition = codecondition1;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // setStateActivity10
            // 
            this.setStateActivity10.Name = "setStateActivity10";
            this.setStateActivity10.TargetStateName = "showErrorStateActivity";
            // 
            // setStateActivity9
            // 
            this.setStateActivity9.Name = "setStateActivity9";
            this.setStateActivity9.TargetStateName = "step5StateActivity";
            // 
            // setStateActivity7
            // 
            this.setStateActivity7.Name = "setStateActivity7";
            this.setStateActivity7.TargetStateName = "showErrorStateActivity";
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "step4StateActivity";
            // 
            // setStateActivity19
            // 
            this.setStateActivity19.Name = "setStateActivity19";
            this.setStateActivity19.TargetStateName = "step2StateActivity";
            // 
            // showFieldMessageActivity1
            // 
            this.showFieldMessageActivity1.FieldBindingPath = "EulaAccepted";
            this.showFieldMessageActivity1.Message = "${Composite.StandardPlugins.PackageElementProvider, InstallRemoteAddOn.Step2.Acce" +
                "ptMissing}";
            this.showFieldMessageActivity1.Name = "showFieldMessageActivity1";
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "step3StateActivity";
            // 
            // setStateActivity17
            // 
            this.setStateActivity17.Name = "setStateActivity17";
            this.setStateActivity17.TargetStateName = "showErrorStateActivity";
            // 
            // step2WizardFormActivity
            // 
            this.step2WizardFormActivity.ContainerLabel = null;
            this.step2WizardFormActivity.FormDefinitionFileName = "\\Administrative\\PackageElementProviderInstallRemotePackageStep2.xml";
            this.step2WizardFormActivity.Name = "step2WizardFormActivity";
            // 
            // setStateActivity18
            // 
            this.setStateActivity18.Name = "setStateActivity18";
            this.setStateActivity18.TargetStateName = "showErrorStateActivity";
            // 
            // initializeIfElseActivity_IsAddOnFree
            // 
            this.initializeIfElseActivity_IsAddOnFree.Activities.Add(this.ifElseBranchActivity1);
            this.initializeIfElseActivity_IsAddOnFree.Activities.Add(this.ifElseBranchActivity2);
            this.initializeIfElseActivity_IsAddOnFree.Name = "initializeIfElseActivity_IsAddOnFree";
            // 
            // ifElseBranchActivity6
            // 
            this.ifElseBranchActivity6.Activities.Add(this.setStateActivity10);
            this.ifElseBranchActivity6.Name = "ifElseBranchActivity6";
            // 
            // ifElseBranchActivity5
            // 
            this.ifElseBranchActivity5.Activities.Add(this.setStateActivity9);
            codecondition2.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.DidValidate);
            this.ifElseBranchActivity5.Condition = codecondition2;
            this.ifElseBranchActivity5.Name = "ifElseBranchActivity5";
            // 
            // ifElseBranchActivity4
            // 
            this.ifElseBranchActivity4.Activities.Add(this.setStateActivity7);
            this.ifElseBranchActivity4.Name = "ifElseBranchActivity4";
            // 
            // ifElseBranchActivity3
            // 
            this.ifElseBranchActivity3.Activities.Add(this.setStateActivity6);
            codecondition3.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.DidValidate);
            this.ifElseBranchActivity3.Condition = codecondition3;
            this.ifElseBranchActivity3.Name = "ifElseBranchActivity3";
            // 
            // ifElseBranchActivity12
            // 
            this.ifElseBranchActivity12.Activities.Add(this.showFieldMessageActivity1);
            this.ifElseBranchActivity12.Activities.Add(this.setStateActivity19);
            this.ifElseBranchActivity12.Name = "ifElseBranchActivity12";
            // 
            // ifElseBranchActivity11
            // 
            this.ifElseBranchActivity11.Activities.Add(this.setStateActivity5);
            codecondition4.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.EulaAccepted);
            this.ifElseBranchActivity11.Condition = codecondition4;
            this.ifElseBranchActivity11.Name = "ifElseBranchActivity11";
            // 
            // ifElseBranchActivity8
            // 
            this.ifElseBranchActivity8.Activities.Add(this.setStateActivity17);
            this.ifElseBranchActivity8.Name = "ifElseBranchActivity8";
            // 
            // ifElseBranchActivity7
            // 
            this.ifElseBranchActivity7.Activities.Add(this.step2WizardFormActivity);
            codecondition5.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.DidValidate);
            this.ifElseBranchActivity7.Condition = codecondition5;
            this.ifElseBranchActivity7.Name = "ifElseBranchActivity7";
            // 
            // ifElseBranchActivity10
            // 
            this.ifElseBranchActivity10.Activities.Add(this.setStateActivity18);
            this.ifElseBranchActivity10.Name = "ifElseBranchActivity10";
            // 
            // ifElseBranchActivity9
            // 
            this.ifElseBranchActivity9.Activities.Add(this.initializeIfElseActivity_IsAddOnFree);
            codecondition6.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.DidValidate);
            this.ifElseBranchActivity9.Condition = codecondition6;
            this.ifElseBranchActivity9.Name = "ifElseBranchActivity9";
            // 
            // setStateActivity12
            // 
            this.setStateActivity12.Name = "setStateActivity12";
            this.setStateActivity12.TargetStateName = "finalStateActivity";
            // 
            // cleanupCodeActivity_Cleanup
            // 
            this.cleanupCodeActivity_Cleanup.Name = "cleanupCodeActivity_Cleanup";
            this.cleanupCodeActivity_Cleanup.ExecuteCode += new System.EventHandler(this.cleanupCodeActivity_Cleanup_ExecuteCode);
            // 
            // setStateActivity11
            // 
            this.setStateActivity11.Name = "setStateActivity11";
            this.setStateActivity11.TargetStateName = "finalStateActivity";
            // 
            // step5CodeActivity_RefreshTree
            // 
            this.step5CodeActivity_RefreshTree.Name = "step5CodeActivity_RefreshTree";
            this.step5CodeActivity_RefreshTree.ExecuteCode += new System.EventHandler(this.step5CodeActivity_RefreshTree_ExecuteCode);
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
            // step5WizardFormActivity
            // 
            this.step5WizardFormActivity.ContainerLabel = null;
            this.step5WizardFormActivity.FormDefinitionFileName = "\\Administrative\\PackageElementProviderInstallRemotePackageStep5.xml";
            this.step5WizardFormActivity.Name = "step5WizardFormActivity";
            // 
            // setStateActivity16
            // 
            this.setStateActivity16.Name = "setStateActivity16";
            this.setStateActivity16.TargetStateName = "cleanupStateActivity";
            // 
            // cancelHandleExternalEventActivity5
            // 
            this.cancelHandleExternalEventActivity5.EventName = "Cancel";
            this.cancelHandleExternalEventActivity5.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity5.Name = "cancelHandleExternalEventActivity5";
            // 
            // step4IfElseActivity_DidValidate
            // 
            this.step4IfElseActivity_DidValidate.Activities.Add(this.ifElseBranchActivity5);
            this.step4IfElseActivity_DidValidate.Activities.Add(this.ifElseBranchActivity6);
            this.step4IfElseActivity_DidValidate.Name = "step4IfElseActivity_DidValidate";
            // 
            // step4CodeActivity_Install
            // 
            this.step4CodeActivity_Install.Name = "step4CodeActivity_Install";
            this.step4CodeActivity_Install.ExecuteCode += new System.EventHandler(this.step4CodeActivity_Install_ExecuteCode);
            // 
            // nextHandleExternalEventActivity4
            // 
            this.nextHandleExternalEventActivity4.EventName = "Next";
            this.nextHandleExternalEventActivity4.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.nextHandleExternalEventActivity4.Name = "nextHandleExternalEventActivity4";
            // 
            // step4WizardFormActivity
            // 
            this.step4WizardFormActivity.ContainerLabel = null;
            this.step4WizardFormActivity.FormDefinitionFileName = "\\Administrative\\PackageElementProviderInstallRemotePackageStep4.xml";
            this.step4WizardFormActivity.Name = "step4WizardFormActivity";
            // 
            // setStateActivity8
            // 
            this.setStateActivity8.Name = "setStateActivity8";
            this.setStateActivity8.TargetStateName = "finalStateActivity";
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
            this.showErrorWizardFormActivity.FormDefinitionFileName = "\\Administrative\\PackageElementProviderInstallRemotePackageShowError.xml";
            this.showErrorWizardFormActivity.Name = "showErrorWizardFormActivity";
            // 
            // showErrorCodeActivity_Initialize
            // 
            this.showErrorCodeActivity_Initialize.Name = "showErrorCodeActivity_Initialize";
            this.showErrorCodeActivity_Initialize.ExecuteCode += new System.EventHandler(this.showErrorCodeActivity_Initialize_ExecuteCode);
            // 
            // setStateActivity15
            // 
            this.setStateActivity15.Name = "setStateActivity15";
            this.setStateActivity15.TargetStateName = "cleanupStateActivity";
            // 
            // cancelHandleExternalEventActivity4
            // 
            this.cancelHandleExternalEventActivity4.EventName = "Cancel";
            this.cancelHandleExternalEventActivity4.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity4.Name = "cancelHandleExternalEventActivity4";
            // 
            // step3IfElseActivity_DidValidate
            // 
            this.step3IfElseActivity_DidValidate.Activities.Add(this.ifElseBranchActivity3);
            this.step3IfElseActivity_DidValidate.Activities.Add(this.ifElseBranchActivity4);
            this.step3IfElseActivity_DidValidate.Name = "step3IfElseActivity_DidValidate";
            // 
            // step3CodeActivity_DownloadAndValidate
            // 
            this.step3CodeActivity_DownloadAndValidate.Name = "step3CodeActivity_DownloadAndValidate";
            this.step3CodeActivity_DownloadAndValidate.ExecuteCode += new System.EventHandler(this.step3CodeActivity_DownloadAndValidate_ExecuteCode);
            // 
            // nextHandleExternalEventActivity3
            // 
            this.nextHandleExternalEventActivity3.EventName = "Next";
            this.nextHandleExternalEventActivity3.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.nextHandleExternalEventActivity3.Name = "nextHandleExternalEventActivity3";
            // 
            // step3WizardFormActivity
            // 
            this.step3WizardFormActivity.ContainerLabel = null;
            this.step3WizardFormActivity.FormDefinitionFileName = "\\Administrative\\PackageElementProviderInstallRemotePackageStep3.xml";
            this.step3WizardFormActivity.Name = "step3WizardFormActivity";
            // 
            // setStateActivity14
            // 
            this.setStateActivity14.Name = "setStateActivity14";
            this.setStateActivity14.TargetStateName = "cleanupStateActivity";
            // 
            // cancelHandleExternalEventActivity3
            // 
            this.cancelHandleExternalEventActivity3.EventName = "Cancel";
            this.cancelHandleExternalEventActivity3.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity3.Name = "cancelHandleExternalEventActivity3";
            // 
            // ifElseActivity2
            // 
            this.ifElseActivity2.Activities.Add(this.ifElseBranchActivity11);
            this.ifElseActivity2.Activities.Add(this.ifElseBranchActivity12);
            this.ifElseActivity2.Name = "ifElseActivity2";
            // 
            // nextHandleExternalEventActivity2
            // 
            this.nextHandleExternalEventActivity2.EventName = "Next";
            this.nextHandleExternalEventActivity2.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.nextHandleExternalEventActivity2.Name = "nextHandleExternalEventActivity2";
            // 
            // ifElseActivity1
            // 
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity7);
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity8);
            this.ifElseActivity1.Name = "ifElseActivity1";
            // 
            // step2StateStepcodeActivity_Initialize
            // 
            this.step2StateStepcodeActivity_Initialize.Name = "step2StateStepcodeActivity_Initialize";
            this.step2StateStepcodeActivity_Initialize.ExecuteCode += new System.EventHandler(this.step2StateStepcodeActivity_Initialize_ExecuteCode);
            // 
            // setStateActivity13
            // 
            this.setStateActivity13.Name = "setStateActivity13";
            this.setStateActivity13.TargetStateName = "cleanupStateActivity";
            // 
            // cancelHandleExternalEventActivity2
            // 
            this.cancelHandleExternalEventActivity2.EventName = "Cancel";
            this.cancelHandleExternalEventActivity2.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity2.Name = "cancelHandleExternalEventActivity2";
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "step2StateActivity";
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
            this.step1WizardFormActivity.FormDefinitionFileName = "\\Administrative\\PackageElementProviderInstallRemotePackageStep1.xml";
            this.step1WizardFormActivity.Name = "step1WizardFormActivity";
            // 
            // initializeIfElseActivity_DidValidate
            // 
            this.initializeIfElseActivity_DidValidate.Activities.Add(this.ifElseBranchActivity9);
            this.initializeIfElseActivity_DidValidate.Activities.Add(this.ifElseBranchActivity10);
            this.initializeIfElseActivity_DidValidate.Name = "initializeIfElseActivity_DidValidate";
            // 
            // initializeStateCodeActivity_Initialize
            // 
            this.initializeStateCodeActivity_Initialize.Name = "initializeStateCodeActivity_Initialize";
            this.initializeStateCodeActivity_Initialize.ExecuteCode += new System.EventHandler(this.initializeStateCodeActivity_Initialize_ExecuteCode);
            // 
            // cleanupStateInitializationActivity
            // 
            this.cleanupStateInitializationActivity.Activities.Add(this.cleanupCodeActivity_Cleanup);
            this.cleanupStateInitializationActivity.Activities.Add(this.setStateActivity12);
            this.cleanupStateInitializationActivity.Name = "cleanupStateInitializationActivity";
            // 
            // step5EventDrivenActivity_Finish
            // 
            this.step5EventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity2);
            this.step5EventDrivenActivity_Finish.Activities.Add(this.closeCurrentViewActivity1);
            this.step5EventDrivenActivity_Finish.Activities.Add(this.step5CodeActivity_RefreshTree);
            this.step5EventDrivenActivity_Finish.Activities.Add(this.setStateActivity11);
            this.step5EventDrivenActivity_Finish.Name = "step5EventDrivenActivity_Finish";
            // 
            // step5StateInitializationActivity
            // 
            this.step5StateInitializationActivity.Activities.Add(this.step5WizardFormActivity);
            this.step5StateInitializationActivity.Name = "step5StateInitializationActivity";
            // 
            // step4EventDrivenActivity_Cancel
            // 
            this.step4EventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity5);
            this.step4EventDrivenActivity_Cancel.Activities.Add(this.setStateActivity16);
            this.step4EventDrivenActivity_Cancel.Name = "step4EventDrivenActivity_Cancel";
            // 
            // step4EventDrivenActivity_Next
            // 
            this.step4EventDrivenActivity_Next.Activities.Add(this.nextHandleExternalEventActivity4);
            this.step4EventDrivenActivity_Next.Activities.Add(this.step4CodeActivity_Install);
            this.step4EventDrivenActivity_Next.Activities.Add(this.step4IfElseActivity_DidValidate);
            this.step4EventDrivenActivity_Next.Name = "step4EventDrivenActivity_Next";
            // 
            // step4StateInitializationActivity
            // 
            this.step4StateInitializationActivity.Activities.Add(this.step4WizardFormActivity);
            this.step4StateInitializationActivity.Name = "step4StateInitializationActivity";
            // 
            // showErrorEventDrivenActivity_Finish
            // 
            this.showErrorEventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity1);
            this.showErrorEventDrivenActivity_Finish.Activities.Add(this.setStateActivity8);
            this.showErrorEventDrivenActivity_Finish.Name = "showErrorEventDrivenActivity_Finish";
            // 
            // showErrorStateInitializationActivity
            // 
            this.showErrorStateInitializationActivity.Activities.Add(this.showErrorCodeActivity_Initialize);
            this.showErrorStateInitializationActivity.Activities.Add(this.showErrorWizardFormActivity);
            this.showErrorStateInitializationActivity.Name = "showErrorStateInitializationActivity";
            // 
            // step3EventDrivenActivity_Cancel
            // 
            this.step3EventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity4);
            this.step3EventDrivenActivity_Cancel.Activities.Add(this.setStateActivity15);
            this.step3EventDrivenActivity_Cancel.Name = "step3EventDrivenActivity_Cancel";
            // 
            // step3EventDrivenActivity_Next
            // 
            this.step3EventDrivenActivity_Next.Activities.Add(this.nextHandleExternalEventActivity3);
            this.step3EventDrivenActivity_Next.Activities.Add(this.step3CodeActivity_DownloadAndValidate);
            this.step3EventDrivenActivity_Next.Activities.Add(this.step3IfElseActivity_DidValidate);
            this.step3EventDrivenActivity_Next.Name = "step3EventDrivenActivity_Next";
            // 
            // step3StateInitializationActivity
            // 
            this.step3StateInitializationActivity.Activities.Add(this.step3WizardFormActivity);
            this.step3StateInitializationActivity.Name = "step3StateInitializationActivity";
            // 
            // step2EventDrivenActivity_Cancel
            // 
            this.step2EventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity3);
            this.step2EventDrivenActivity_Cancel.Activities.Add(this.setStateActivity14);
            this.step2EventDrivenActivity_Cancel.Name = "step2EventDrivenActivity_Cancel";
            // 
            // step2EventDrivenActivity_Next
            // 
            this.step2EventDrivenActivity_Next.Activities.Add(this.nextHandleExternalEventActivity2);
            this.step2EventDrivenActivity_Next.Activities.Add(this.ifElseActivity2);
            this.step2EventDrivenActivity_Next.Name = "step2EventDrivenActivity_Next";
            // 
            // step2StateInitializationActivity
            // 
            this.step2StateInitializationActivity.Activities.Add(this.step2StateStepcodeActivity_Initialize);
            this.step2StateInitializationActivity.Activities.Add(this.ifElseActivity1);
            this.step2StateInitializationActivity.Name = "step2StateInitializationActivity";
            // 
            // step1EventDrivenActivity_Cancel
            // 
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.setStateActivity13);
            this.step1EventDrivenActivity_Cancel.Name = "step1EventDrivenActivity_Cancel";
            // 
            // step1EventDrivenActivity_Next
            // 
            this.step1EventDrivenActivity_Next.Activities.Add(this.nextHandleExternalEventActivity1);
            this.step1EventDrivenActivity_Next.Activities.Add(this.setStateActivity4);
            this.step1EventDrivenActivity_Next.Name = "step1EventDrivenActivity_Next";
            // 
            // step1StateInitializationActivity
            // 
            this.step1StateInitializationActivity.Activities.Add(this.step1WizardFormActivity);
            this.step1StateInitializationActivity.Name = "step1StateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.initializeStateCodeActivity_Initialize);
            this.initializeStateInitializationActivity.Activities.Add(this.initializeIfElseActivity_DidValidate);
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
            this.cancelHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity1.Name = "cancelHandleExternalEventActivity1";
            // 
            // cleanupStateActivity
            // 
            this.cleanupStateActivity.Activities.Add(this.cleanupStateInitializationActivity);
            this.cleanupStateActivity.Name = "cleanupStateActivity";
            // 
            // step5StateActivity
            // 
            this.step5StateActivity.Activities.Add(this.step5StateInitializationActivity);
            this.step5StateActivity.Activities.Add(this.step5EventDrivenActivity_Finish);
            this.step5StateActivity.Name = "step5StateActivity";
            // 
            // step4StateActivity
            // 
            this.step4StateActivity.Activities.Add(this.step4StateInitializationActivity);
            this.step4StateActivity.Activities.Add(this.step4EventDrivenActivity_Next);
            this.step4StateActivity.Activities.Add(this.step4EventDrivenActivity_Cancel);
            this.step4StateActivity.Name = "step4StateActivity";
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
            this.step3StateActivity.Activities.Add(this.step3EventDrivenActivity_Next);
            this.step3StateActivity.Activities.Add(this.step3EventDrivenActivity_Cancel);
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
            // InstallRemotePackageWorkflow
            // 
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.step1StateActivity);
            this.Activities.Add(this.step2StateActivity);
            this.Activities.Add(this.step3StateActivity);
            this.Activities.Add(this.showErrorStateActivity);
            this.Activities.Add(this.step4StateActivity);
            this.Activities.Add(this.step5StateActivity);
            this.Activities.Add(this.cleanupStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "InstallRemotePackageWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateInitializationActivity initializeStateInitializationActivity;
        private SetStateActivity setStateActivity1;
        private StateActivity finalStateActivity;
        private StateActivity initializeStateActivity;
        private CodeActivity initializeStateCodeActivity_Initialize;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private IfElseActivity initializeIfElseActivity_IsAddOnFree;
        private SetStateActivity setStateActivity3;
        private SetStateActivity setStateActivity2;
        private Composite.Workflow.Activities.WizardFormActivity step1WizardFormActivity;
        private StateInitializationActivity step2StateInitializationActivity;
        private StateInitializationActivity step1StateInitializationActivity;
        private StateActivity step2StateActivity;
        private StateActivity step1StateActivity;
        private Composite.Workflow.Activities.NextHandleExternalEventActivity nextHandleExternalEventActivity2;
        private Composite.Workflow.Activities.WizardFormActivity step2WizardFormActivity;
        private SetStateActivity setStateActivity4;
        private Composite.Workflow.Activities.NextHandleExternalEventActivity nextHandleExternalEventActivity1;
        private EventDrivenActivity step2EventDrivenActivity_Next;
        private EventDrivenActivity step1EventDrivenActivity_Next;
        private CodeActivity step2StateStepcodeActivity_Initialize;
        private StateActivity showErrorStateActivity;
        private StateActivity step3StateActivity;
        private Composite.Workflow.Activities.NextHandleExternalEventActivity nextHandleExternalEventActivity3;
        private Composite.Workflow.Activities.WizardFormActivity step3WizardFormActivity;
        private SetStateActivity setStateActivity5;
        private EventDrivenActivity step3EventDrivenActivity_Next;
        private StateInitializationActivity step3StateInitializationActivity;
        private CodeActivity step3CodeActivity_DownloadAndValidate;
        private SetStateActivity setStateActivity7;
        private SetStateActivity setStateActivity6;
        private IfElseBranchActivity ifElseBranchActivity4;
        private IfElseBranchActivity ifElseBranchActivity3;
        private IfElseActivity step3IfElseActivity_DidValidate;
        private StateActivity step4StateActivity;
        private Composite.Workflow.Activities.WizardFormActivity step4WizardFormActivity;
        private StateInitializationActivity step4StateInitializationActivity;
        private Composite.Workflow.Activities.NextHandleExternalEventActivity nextHandleExternalEventActivity4;
        private EventDrivenActivity step4EventDrivenActivity_Next;
        private Composite.Workflow.Activities.WizardFormActivity showErrorWizardFormActivity;
        private StateInitializationActivity showErrorStateInitializationActivity;
        private CodeActivity showErrorCodeActivity_Initialize;
        private CodeActivity step4CodeActivity_Install;
        private SetStateActivity setStateActivity10;
        private SetStateActivity setStateActivity9;
        private IfElseBranchActivity ifElseBranchActivity6;
        private IfElseBranchActivity ifElseBranchActivity5;
        private SetStateActivity setStateActivity11;
        private Composite.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity2;
        private IfElseActivity step4IfElseActivity_DidValidate;
        private SetStateActivity setStateActivity8;
        private Composite.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;
        private EventDrivenActivity step5EventDrivenActivity_Finish;
        private StateInitializationActivity step5StateInitializationActivity;
        private EventDrivenActivity showErrorEventDrivenActivity_Finish;
        private StateActivity step5StateActivity;
        private Composite.Workflow.Activities.WizardFormActivity step5WizardFormActivity;
        private CodeActivity step5CodeActivity_RefreshTree;
        private SetStateActivity setStateActivity12;
        private CodeActivity cleanupCodeActivity_Cleanup;
        private StateInitializationActivity cleanupStateInitializationActivity;
        private StateActivity cleanupStateActivity;
        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;
        private EventDrivenActivity step1EventDrivenActivity_Cancel;
        private SetStateActivity setStateActivity14;
        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity3;
        private SetStateActivity setStateActivity13;
        private EventDrivenActivity step3EventDrivenActivity_Cancel;
        private EventDrivenActivity step2EventDrivenActivity_Cancel;
        private SetStateActivity setStateActivity16;
        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity5;
        private SetStateActivity setStateActivity15;
        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity4;
        private EventDrivenActivity step4EventDrivenActivity_Cancel;
        private SetStateActivity setStateActivity17;
        private IfElseBranchActivity ifElseBranchActivity8;
        private IfElseBranchActivity ifElseBranchActivity7;
        private IfElseActivity ifElseActivity1;
        private SetStateActivity setStateActivity18;
        private IfElseBranchActivity ifElseBranchActivity10;
        private IfElseBranchActivity ifElseBranchActivity9;
        private IfElseActivity initializeIfElseActivity_DidValidate;
        private Composite.Workflow.Activities.CloseCurrentViewActivity closeCurrentViewActivity1;
        private IfElseBranchActivity ifElseBranchActivity12;
        private IfElseBranchActivity ifElseBranchActivity11;
        private IfElseActivity ifElseActivity2;
        private SetStateActivity setStateActivity19;
        private Composite.Workflow.Activities.ShowFieldMessageActivity showFieldMessageActivity1;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;




















































































































































    }
}
