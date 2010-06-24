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

namespace Composite.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper
{
    partial class AddMetaDataWorkflow
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
            this.setStateActivity9 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity4 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity3 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity21 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity14 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity15 = new System.Workflow.Activities.SetStateActivity();
            this.if_DoesPagesExists = new System.Workflow.Activities.IfElseActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity10 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity9 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity6 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity5 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity18 = new System.Workflow.Activities.SetStateActivity();
            this.previousHandleExternalEventActivity3 = new Composite.Workflow.Activities.PreviousHandleExternalEventActivity();
            this.setStateActivity12 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity4 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity13 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity2 = new Composite.Workflow.Activities.FinishHandleExternalEventActivity();
            this.wizardFormActivity4 = new Composite.Workflow.Activities.WizardFormActivity();
            this.setStateActivity17 = new System.Workflow.Activities.SetStateActivity();
            this.previousHandleExternalEventActivity2 = new Composite.Workflow.Activities.PreviousHandleExternalEventActivity();
            this.setStateActivity11 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity3 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.ifElseActivity3 = new System.Workflow.Activities.IfElseActivity();
            this.finishHandleExternalEventActivity1 = new Composite.Workflow.Activities.FinishHandleExternalEventActivity();
            this.enterDefaultValuesCodeActivity_Initialize = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity16 = new System.Workflow.Activities.SetStateActivity();
            this.previousHandleExternalEventActivity1 = new Composite.Workflow.Activities.PreviousHandleExternalEventActivity();
            this.setStateActivity8 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity5 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.if_DidFieldNameValidate = new System.Workflow.Activities.IfElseActivity();
            this.createFieldGroupCodeActivity_CreateVisabilatiyRule = new System.Workflow.Activities.CodeActivity();
            this.nextHandleExternalEventActivity2 = new Composite.Workflow.Activities.NextHandleExternalEventActivity();
            this.wizardFormActivity1 = new Composite.Workflow.Activities.WizardFormActivity();
            this.createFieldGroupCodeActivity_Initialize = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity20 = new System.Workflow.Activities.SetStateActivity();
            this.closeCurrentViewActivity2 = new Composite.Workflow.Activities.CloseCurrentViewActivity();
            this.codeActivity1 = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.noTypesToAddCodeActivity_ShowMessage = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.nextHandleExternalEventActivity1 = new Composite.Workflow.Activities.NextHandleExternalEventActivity();
            this.wizardFormActivity2 = new Composite.Workflow.Activities.WizardFormActivity();
            this.selectTypeCodeActivity_Initialize = new System.Workflow.Activities.CodeActivity();
            this.ifElseActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.noTargetDataEventDrivenActivity_Previous = new System.Workflow.Activities.EventDrivenActivity();
            this.noTargetDataEventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.noTargetDataEventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.noTargetDataStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.enterDefaultValuesEventDrivenActivity_Previous = new System.Workflow.Activities.EventDrivenActivity();
            this.enterDefaultValuesEventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.enterDefaultValuesEventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.enterDefaultValuesSateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.createFieldGroupEventDrivenActivity_Previous = new System.Workflow.Activities.EventDrivenActivity();
            this.createFieldGroupEventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.createFieldGroupEventDrivenActivity_Next = new System.Workflow.Activities.EventDrivenActivity();
            this.createFieldGroupStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.noTypesToAddStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.selectTypeEventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.selectTypeEventDrivenActivity_Next = new System.Workflow.Activities.EventDrivenActivity();
            this.selectTypeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.noTargetDataWarningStateActivity = new System.Workflow.Activities.StateActivity();
            this.enterDefaultValuesStateActivity = new System.Workflow.Activities.StateActivity();
            this.createFieldGroupStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalizeStateActivity = new System.Workflow.Activities.StateActivity();
            this.noTypesToAddStateActivity = new System.Workflow.Activities.StateActivity();
            this.selectTypeToAddStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // setStateActivity10
            // 
            this.setStateActivity10.Name = "setStateActivity10";
            this.setStateActivity10.TargetStateName = "noTargetDataWarningStateActivity";
            // 
            // setStateActivity9
            // 
            this.setStateActivity9.Name = "setStateActivity9";
            this.setStateActivity9.TargetStateName = "enterDefaultValuesStateActivity";
            // 
            // ifElseBranchActivity4
            // 
            this.ifElseBranchActivity4.Activities.Add(this.setStateActivity10);
            this.ifElseBranchActivity4.Name = "ifElseBranchActivity4";
            // 
            // ifElseBranchActivity3
            // 
            this.ifElseBranchActivity3.Activities.Add(this.setStateActivity9);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.DoesTargetDataExists);
            this.ifElseBranchActivity3.Condition = codecondition1;
            this.ifElseBranchActivity3.Name = "ifElseBranchActivity3";
            // 
            // setStateActivity21
            // 
            this.setStateActivity21.Name = "setStateActivity21";
            this.setStateActivity21.TargetStateName = "enterDefaultValuesStateActivity";
            // 
            // setStateActivity14
            // 
            this.setStateActivity14.Name = "setStateActivity14";
            this.setStateActivity14.TargetStateName = "finalizeStateActivity";
            // 
            // setStateActivity15
            // 
            this.setStateActivity15.Name = "setStateActivity15";
            this.setStateActivity15.TargetStateName = "createFieldGroupStateActivity";
            // 
            // if_DoesPagesExists
            // 
            this.if_DoesPagesExists.Activities.Add(this.ifElseBranchActivity3);
            this.if_DoesPagesExists.Activities.Add(this.ifElseBranchActivity4);
            this.if_DoesPagesExists.Name = "if_DoesPagesExists";
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "noTypesToAddStateActivity";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "selectTypeToAddStateActivity";
            // 
            // ifElseBranchActivity10
            // 
            this.ifElseBranchActivity10.Activities.Add(this.setStateActivity21);
            this.ifElseBranchActivity10.Name = "ifElseBranchActivity10";
            // 
            // ifElseBranchActivity9
            // 
            this.ifElseBranchActivity9.Activities.Add(this.setStateActivity14);
            codecondition2.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.MetaDataValid);
            this.ifElseBranchActivity9.Condition = codecondition2;
            this.ifElseBranchActivity9.Name = "ifElseBranchActivity9";
            // 
            // ifElseBranchActivity6
            // 
            this.ifElseBranchActivity6.Activities.Add(this.setStateActivity15);
            this.ifElseBranchActivity6.Name = "ifElseBranchActivity6";
            // 
            // ifElseBranchActivity5
            // 
            this.ifElseBranchActivity5.Activities.Add(this.if_DoesPagesExists);
            codecondition3.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.DidFieldNameValidate);
            this.ifElseBranchActivity5.Condition = codecondition3;
            this.ifElseBranchActivity5.Name = "ifElseBranchActivity5";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity5);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.setStateActivity3);
            codecondition4.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.DoesTypesToAddExists);
            this.ifElseBranchActivity1.Condition = codecondition4;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // setStateActivity18
            // 
            this.setStateActivity18.Name = "setStateActivity18";
            this.setStateActivity18.TargetStateName = "createFieldGroupStateActivity";
            // 
            // previousHandleExternalEventActivity3
            // 
            this.previousHandleExternalEventActivity3.EventName = "Previous";
            this.previousHandleExternalEventActivity3.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.previousHandleExternalEventActivity3.Name = "previousHandleExternalEventActivity3";
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
            // setStateActivity13
            // 
            this.setStateActivity13.Name = "setStateActivity13";
            this.setStateActivity13.TargetStateName = "finalizeStateActivity";
            // 
            // finishHandleExternalEventActivity2
            // 
            this.finishHandleExternalEventActivity2.EventName = "Finish";
            this.finishHandleExternalEventActivity2.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity2.Name = "finishHandleExternalEventActivity2";
            // 
            // wizardFormActivity4
            // 
            this.wizardFormActivity4.ContainerLabel = null;
            this.wizardFormActivity4.FormDefinitionFileName = "\\Administrative\\AddMetaDataNoTargetDataWarning.xml";
            this.wizardFormActivity4.Name = "wizardFormActivity4";
            // 
            // setStateActivity17
            // 
            this.setStateActivity17.Name = "setStateActivity17";
            this.setStateActivity17.TargetStateName = "createFieldGroupStateActivity";
            // 
            // previousHandleExternalEventActivity2
            // 
            this.previousHandleExternalEventActivity2.EventName = "Previous";
            this.previousHandleExternalEventActivity2.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.previousHandleExternalEventActivity2.Name = "previousHandleExternalEventActivity2";
            // 
            // setStateActivity11
            // 
            this.setStateActivity11.Name = "setStateActivity11";
            this.setStateActivity11.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity3
            // 
            this.cancelHandleExternalEventActivity3.EventName = "Cancel";
            this.cancelHandleExternalEventActivity3.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity3.Name = "cancelHandleExternalEventActivity3";
            // 
            // ifElseActivity3
            // 
            this.ifElseActivity3.Activities.Add(this.ifElseBranchActivity9);
            this.ifElseActivity3.Activities.Add(this.ifElseBranchActivity10);
            this.ifElseActivity3.Name = "ifElseActivity3";
            // 
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // enterDefaultValuesCodeActivity_Initialize
            // 
            this.enterDefaultValuesCodeActivity_Initialize.Name = "enterDefaultValuesCodeActivity_Initialize";
            this.enterDefaultValuesCodeActivity_Initialize.ExecuteCode += new System.EventHandler(this.enterDefaultValuesCodeActivity_Initialize_ExecuteCode);
            // 
            // setStateActivity16
            // 
            this.setStateActivity16.Name = "setStateActivity16";
            this.setStateActivity16.TargetStateName = "selectTypeToAddStateActivity";
            // 
            // previousHandleExternalEventActivity1
            // 
            this.previousHandleExternalEventActivity1.EventName = "Previous";
            this.previousHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.previousHandleExternalEventActivity1.Name = "previousHandleExternalEventActivity1";
            // 
            // setStateActivity8
            // 
            this.setStateActivity8.Name = "setStateActivity8";
            this.setStateActivity8.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity5
            // 
            this.cancelHandleExternalEventActivity5.EventName = "Cancel";
            this.cancelHandleExternalEventActivity5.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity5.Name = "cancelHandleExternalEventActivity5";
            // 
            // if_DidFieldNameValidate
            // 
            this.if_DidFieldNameValidate.Activities.Add(this.ifElseBranchActivity5);
            this.if_DidFieldNameValidate.Activities.Add(this.ifElseBranchActivity6);
            this.if_DidFieldNameValidate.Name = "if_DidFieldNameValidate";
            // 
            // createFieldGroupCodeActivity_CreateVisabilatiyRule
            // 
            this.createFieldGroupCodeActivity_CreateVisabilatiyRule.Name = "createFieldGroupCodeActivity_CreateVisabilatiyRule";
            this.createFieldGroupCodeActivity_CreateVisabilatiyRule.ExecuteCode += new System.EventHandler(this.createFieldGroupCodeActivity_CreateVisabilatiyRule_ExecuteCode);
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
            this.wizardFormActivity1.FormDefinitionFileName = "\\Administrative\\AddMetaDataCreateFieldGroup.xml";
            this.wizardFormActivity1.Name = "wizardFormActivity1";
            // 
            // createFieldGroupCodeActivity_Initialize
            // 
            this.createFieldGroupCodeActivity_Initialize.Name = "createFieldGroupCodeActivity_Initialize";
            this.createFieldGroupCodeActivity_Initialize.ExecuteCode += new System.EventHandler(this.createFieldGroupCodeActivity_Initialize_ExecuteCode);
            // 
            // setStateActivity20
            // 
            this.setStateActivity20.Name = "setStateActivity20";
            this.setStateActivity20.TargetStateName = "finalStateActivity";
            // 
            // closeCurrentViewActivity2
            // 
            this.closeCurrentViewActivity2.Name = "closeCurrentViewActivity2";
            // 
            // codeActivity1
            // 
            this.codeActivity1.Name = "codeActivity1";
            this.codeActivity1.ExecuteCode += new System.EventHandler(this.finalizeCodeActivity_Finalize_ExecuteCode);
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "finalStateActivity";
            // 
            // noTypesToAddCodeActivity_ShowMessage
            // 
            this.noTypesToAddCodeActivity_ShowMessage.Name = "noTypesToAddCodeActivity_ShowMessage";
            this.noTypesToAddCodeActivity_ShowMessage.ExecuteCode += new System.EventHandler(this.noTypesToAddCodeActivity_ShowMessage_ExecuteCode);
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "finalStateActivity";
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
            this.setStateActivity6.TargetStateName = "createFieldGroupStateActivity";
            // 
            // nextHandleExternalEventActivity1
            // 
            this.nextHandleExternalEventActivity1.EventName = "Next";
            this.nextHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.nextHandleExternalEventActivity1.Name = "nextHandleExternalEventActivity1";
            // 
            // wizardFormActivity2
            // 
            this.wizardFormActivity2.ContainerLabel = null;
            this.wizardFormActivity2.FormDefinitionFileName = "\\Administrative\\AddMetaDataSelectType.xml";
            this.wizardFormActivity2.Name = "wizardFormActivity2";
            // 
            // selectTypeCodeActivity_Initialize
            // 
            this.selectTypeCodeActivity_Initialize.Name = "selectTypeCodeActivity_Initialize";
            this.selectTypeCodeActivity_Initialize.ExecuteCode += new System.EventHandler(this.selectTypeCodeActivity_Initialize_ExecuteCode);
            // 
            // ifElseActivity1
            // 
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity1);
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity2);
            this.ifElseActivity1.Name = "ifElseActivity1";
            // 
            // noTargetDataEventDrivenActivity_Previous
            // 
            this.noTargetDataEventDrivenActivity_Previous.Activities.Add(this.previousHandleExternalEventActivity3);
            this.noTargetDataEventDrivenActivity_Previous.Activities.Add(this.setStateActivity18);
            this.noTargetDataEventDrivenActivity_Previous.Name = "noTargetDataEventDrivenActivity_Previous";
            // 
            // noTargetDataEventDrivenActivity_Cancel
            // 
            this.noTargetDataEventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity4);
            this.noTargetDataEventDrivenActivity_Cancel.Activities.Add(this.setStateActivity12);
            this.noTargetDataEventDrivenActivity_Cancel.Name = "noTargetDataEventDrivenActivity_Cancel";
            // 
            // noTargetDataEventDrivenActivity_Finish
            // 
            this.noTargetDataEventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity2);
            this.noTargetDataEventDrivenActivity_Finish.Activities.Add(this.setStateActivity13);
            this.noTargetDataEventDrivenActivity_Finish.Name = "noTargetDataEventDrivenActivity_Finish";
            // 
            // noTargetDataStateInitializationActivity
            // 
            this.noTargetDataStateInitializationActivity.Activities.Add(this.wizardFormActivity4);
            this.noTargetDataStateInitializationActivity.Name = "noTargetDataStateInitializationActivity";
            // 
            // enterDefaultValuesEventDrivenActivity_Previous
            // 
            this.enterDefaultValuesEventDrivenActivity_Previous.Activities.Add(this.previousHandleExternalEventActivity2);
            this.enterDefaultValuesEventDrivenActivity_Previous.Activities.Add(this.setStateActivity17);
            this.enterDefaultValuesEventDrivenActivity_Previous.Name = "enterDefaultValuesEventDrivenActivity_Previous";
            // 
            // enterDefaultValuesEventDrivenActivity_Cancel
            // 
            this.enterDefaultValuesEventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity3);
            this.enterDefaultValuesEventDrivenActivity_Cancel.Activities.Add(this.setStateActivity11);
            this.enterDefaultValuesEventDrivenActivity_Cancel.Name = "enterDefaultValuesEventDrivenActivity_Cancel";
            // 
            // enterDefaultValuesEventDrivenActivity_Finish
            // 
            this.enterDefaultValuesEventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity1);
            this.enterDefaultValuesEventDrivenActivity_Finish.Activities.Add(this.ifElseActivity3);
            this.enterDefaultValuesEventDrivenActivity_Finish.Name = "enterDefaultValuesEventDrivenActivity_Finish";
            // 
            // enterDefaultValuesSateInitializationActivity
            // 
            this.enterDefaultValuesSateInitializationActivity.Activities.Add(this.enterDefaultValuesCodeActivity_Initialize);
            this.enterDefaultValuesSateInitializationActivity.Name = "enterDefaultValuesSateInitializationActivity";
            // 
            // createFieldGroupEventDrivenActivity_Previous
            // 
            this.createFieldGroupEventDrivenActivity_Previous.Activities.Add(this.previousHandleExternalEventActivity1);
            this.createFieldGroupEventDrivenActivity_Previous.Activities.Add(this.setStateActivity16);
            this.createFieldGroupEventDrivenActivity_Previous.Name = "createFieldGroupEventDrivenActivity_Previous";
            // 
            // createFieldGroupEventDrivenActivity_Cancel
            // 
            this.createFieldGroupEventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity5);
            this.createFieldGroupEventDrivenActivity_Cancel.Activities.Add(this.setStateActivity8);
            this.createFieldGroupEventDrivenActivity_Cancel.Name = "createFieldGroupEventDrivenActivity_Cancel";
            // 
            // createFieldGroupEventDrivenActivity_Next
            // 
            this.createFieldGroupEventDrivenActivity_Next.Activities.Add(this.nextHandleExternalEventActivity2);
            this.createFieldGroupEventDrivenActivity_Next.Activities.Add(this.createFieldGroupCodeActivity_CreateVisabilatiyRule);
            this.createFieldGroupEventDrivenActivity_Next.Activities.Add(this.if_DidFieldNameValidate);
            this.createFieldGroupEventDrivenActivity_Next.Name = "createFieldGroupEventDrivenActivity_Next";
            // 
            // createFieldGroupStateInitializationActivity
            // 
            this.createFieldGroupStateInitializationActivity.Activities.Add(this.createFieldGroupCodeActivity_Initialize);
            this.createFieldGroupStateInitializationActivity.Activities.Add(this.wizardFormActivity1);
            this.createFieldGroupStateInitializationActivity.Name = "createFieldGroupStateInitializationActivity";
            // 
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.codeActivity1);
            this.finalizeStateInitializationActivity.Activities.Add(this.closeCurrentViewActivity2);
            this.finalizeStateInitializationActivity.Activities.Add(this.setStateActivity20);
            this.finalizeStateInitializationActivity.Name = "finalizeStateInitializationActivity";
            // 
            // noTypesToAddStateInitializationActivity
            // 
            this.noTypesToAddStateInitializationActivity.Activities.Add(this.noTypesToAddCodeActivity_ShowMessage);
            this.noTypesToAddStateInitializationActivity.Activities.Add(this.setStateActivity4);
            this.noTypesToAddStateInitializationActivity.Name = "noTypesToAddStateInitializationActivity";
            // 
            // selectTypeEventDrivenActivity_Cancel
            // 
            this.selectTypeEventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.selectTypeEventDrivenActivity_Cancel.Activities.Add(this.setStateActivity2);
            this.selectTypeEventDrivenActivity_Cancel.Name = "selectTypeEventDrivenActivity_Cancel";
            // 
            // selectTypeEventDrivenActivity_Next
            // 
            this.selectTypeEventDrivenActivity_Next.Activities.Add(this.nextHandleExternalEventActivity1);
            this.selectTypeEventDrivenActivity_Next.Activities.Add(this.setStateActivity6);
            this.selectTypeEventDrivenActivity_Next.Name = "selectTypeEventDrivenActivity_Next";
            // 
            // selectTypeStateInitializationActivity
            // 
            this.selectTypeStateInitializationActivity.Activities.Add(this.selectTypeCodeActivity_Initialize);
            this.selectTypeStateInitializationActivity.Activities.Add(this.wizardFormActivity2);
            this.selectTypeStateInitializationActivity.Name = "selectTypeStateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.ifElseActivity1);
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
            // noTargetDataWarningStateActivity
            // 
            this.noTargetDataWarningStateActivity.Activities.Add(this.noTargetDataStateInitializationActivity);
            this.noTargetDataWarningStateActivity.Activities.Add(this.noTargetDataEventDrivenActivity_Finish);
            this.noTargetDataWarningStateActivity.Activities.Add(this.noTargetDataEventDrivenActivity_Cancel);
            this.noTargetDataWarningStateActivity.Activities.Add(this.noTargetDataEventDrivenActivity_Previous);
            this.noTargetDataWarningStateActivity.Name = "noTargetDataWarningStateActivity";
            // 
            // enterDefaultValuesStateActivity
            // 
            this.enterDefaultValuesStateActivity.Activities.Add(this.enterDefaultValuesSateInitializationActivity);
            this.enterDefaultValuesStateActivity.Activities.Add(this.enterDefaultValuesEventDrivenActivity_Finish);
            this.enterDefaultValuesStateActivity.Activities.Add(this.enterDefaultValuesEventDrivenActivity_Cancel);
            this.enterDefaultValuesStateActivity.Activities.Add(this.enterDefaultValuesEventDrivenActivity_Previous);
            this.enterDefaultValuesStateActivity.Name = "enterDefaultValuesStateActivity";
            // 
            // createFieldGroupStateActivity
            // 
            this.createFieldGroupStateActivity.Activities.Add(this.createFieldGroupStateInitializationActivity);
            this.createFieldGroupStateActivity.Activities.Add(this.createFieldGroupEventDrivenActivity_Next);
            this.createFieldGroupStateActivity.Activities.Add(this.createFieldGroupEventDrivenActivity_Cancel);
            this.createFieldGroupStateActivity.Activities.Add(this.createFieldGroupEventDrivenActivity_Previous);
            this.createFieldGroupStateActivity.Name = "createFieldGroupStateActivity";
            // 
            // finalizeStateActivity
            // 
            this.finalizeStateActivity.Activities.Add(this.finalizeStateInitializationActivity);
            this.finalizeStateActivity.Name = "finalizeStateActivity";
            // 
            // noTypesToAddStateActivity
            // 
            this.noTypesToAddStateActivity.Activities.Add(this.noTypesToAddStateInitializationActivity);
            this.noTypesToAddStateActivity.Name = "noTypesToAddStateActivity";
            // 
            // selectTypeToAddStateActivity
            // 
            this.selectTypeToAddStateActivity.Activities.Add(this.selectTypeStateInitializationActivity);
            this.selectTypeToAddStateActivity.Activities.Add(this.selectTypeEventDrivenActivity_Next);
            this.selectTypeToAddStateActivity.Activities.Add(this.selectTypeEventDrivenActivity_Cancel);
            this.selectTypeToAddStateActivity.Name = "selectTypeToAddStateActivity";
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
            // AddMetaDataWorkflow
            // 
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.selectTypeToAddStateActivity);
            this.Activities.Add(this.noTypesToAddStateActivity);
            this.Activities.Add(this.finalizeStateActivity);
            this.Activities.Add(this.createFieldGroupStateActivity);
            this.Activities.Add(this.enterDefaultValuesStateActivity);
            this.Activities.Add(this.noTargetDataWarningStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "AddMetaDataWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private StateActivity selectTypeToAddStateActivity;

        private SetStateActivity setStateActivity2;

        private Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;

        private SetStateActivity setStateActivity3;

        private EventDrivenActivity selectTypeEventDrivenActivity_Cancel;

        private EventDrivenActivity selectTypeEventDrivenActivity_Next;

        private StateInitializationActivity selectTypeStateInitializationActivity;

        private CodeActivity selectTypeCodeActivity_Initialize;

        private Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;

        private StateInitializationActivity initializeStateInitializationActivity;

        private SetStateActivity setStateActivity1;

        private StateActivity finalStateActivity;

        private StateActivity initializeStateActivity;

        private IfElseBranchActivity ifElseBranchActivity2;

        private IfElseBranchActivity ifElseBranchActivity1;

        private IfElseActivity ifElseActivity1;

        private SetStateActivity setStateActivity5;

        private SetStateActivity setStateActivity4;

        private CodeActivity noTypesToAddCodeActivity_ShowMessage;

        private StateInitializationActivity noTypesToAddStateInitializationActivity;

        private StateActivity noTypesToAddStateActivity;

        private StateInitializationActivity finalizeStateInitializationActivity;

        private StateActivity finalizeStateActivity;

        private StateActivity createFieldGroupStateActivity;

        private Workflow.Activities.WizardFormActivity wizardFormActivity1;

        private SetStateActivity setStateActivity6;

        private StateInitializationActivity createFieldGroupStateInitializationActivity;

        private Workflow.Activities.WizardFormActivity wizardFormActivity2;

        private Workflow.Activities.NextHandleExternalEventActivity nextHandleExternalEventActivity1;

        private EventDrivenActivity createFieldGroupEventDrivenActivity_Cancel;

        private EventDrivenActivity createFieldGroupEventDrivenActivity_Next;

        private SetStateActivity setStateActivity8;

        private StateActivity noTargetDataWarningStateActivity;

        private StateActivity enterDefaultValuesStateActivity;

        private IfElseBranchActivity ifElseBranchActivity4;

        private IfElseBranchActivity ifElseBranchActivity3;

        private IfElseActivity if_DoesPagesExists;

        private Workflow.Activities.NextHandleExternalEventActivity nextHandleExternalEventActivity2;

        private SetStateActivity setStateActivity10;

        private SetStateActivity setStateActivity9;

        private Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity2;

        private Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity3;

        private Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;

        private EventDrivenActivity noTargetDataEventDrivenActivity_Cancel;

        private EventDrivenActivity noTargetDataEventDrivenActivity_Finish;

        private StateInitializationActivity noTargetDataStateInitializationActivity;

        private EventDrivenActivity enterDefaultValuesEventDrivenActivity_Cancel;

        private EventDrivenActivity enterDefaultValuesEventDrivenActivity_Finish;

        private StateInitializationActivity enterDefaultValuesSateInitializationActivity;

        private SetStateActivity setStateActivity12;

        private Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity4;

        private SetStateActivity setStateActivity13;

        private SetStateActivity setStateActivity11;

        private Workflow.Activities.WizardFormActivity wizardFormActivity4;

        private Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity5;

        private CodeActivity createFieldGroupCodeActivity_Initialize;

        private CodeActivity createFieldGroupCodeActivity_CreateVisabilatiyRule;

        private CodeActivity enterDefaultValuesCodeActivity_Initialize;

        private IfElseBranchActivity ifElseBranchActivity6;

        private IfElseBranchActivity ifElseBranchActivity5;

        private IfElseActivity if_DidFieldNameValidate;

        private SetStateActivity setStateActivity15;

        private EventDrivenActivity createFieldGroupEventDrivenActivity_Previous;

        private SetStateActivity setStateActivity18;

        private Workflow.Activities.PreviousHandleExternalEventActivity previousHandleExternalEventActivity3;

        private SetStateActivity setStateActivity17;

        private Workflow.Activities.PreviousHandleExternalEventActivity previousHandleExternalEventActivity2;

        private SetStateActivity setStateActivity16;

        private Workflow.Activities.PreviousHandleExternalEventActivity previousHandleExternalEventActivity1;

        private EventDrivenActivity noTargetDataEventDrivenActivity_Previous;

        private EventDrivenActivity enterDefaultValuesEventDrivenActivity_Previous;

        private SetStateActivity setStateActivity20;

        private SetStateActivity setStateActivity21;

        private SetStateActivity setStateActivity14;

        private IfElseBranchActivity ifElseBranchActivity10;

        private IfElseBranchActivity ifElseBranchActivity9;

        private IfElseActivity ifElseActivity3;

        private Workflow.Activities.CloseCurrentViewActivity closeCurrentViewActivity2;

        private CodeActivity codeActivity1;

        private EventDrivenActivity eventDrivenActivity_GlobalCancel;























































































































































































    }
}
