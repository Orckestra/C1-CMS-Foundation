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

namespace Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper
{
    partial class DeleteAssociatedDataWorkflow
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
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.confirmDialogFormActivity2 = new Composite.C1Console.Workflow.Activities.ConfirmDialogFormActivity();
            this.branchHasNoRelatedData = new System.Workflow.Activities.IfElseBranchActivity();
            this.branchHasRelatedData = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity8 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.setStateActivity7 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity3 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.ifElseHasRelatedData = new System.Workflow.Activities.IfElseActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.confirmDialogFormActivity1 = new Composite.C1Console.Workflow.Activities.ConfirmDialogFormActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.closeCurrentViewActivity1 = new Composite.C1Console.Workflow.Activities.CloseCurrentViewActivity();
            this.finalizeCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.eventDrivenActivity_OK = new System.Workflow.Activities.EventDrivenActivity();
            this.eventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.stateInitializationActivity1 = new System.Workflow.Activities.StateInitializationActivity();
            this.step1EventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step1EventDrivenActivity_OK = new System.Workflow.Activities.EventDrivenActivity();
            this.step1StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initialStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.checkRelatedDataStateActivity = new System.Workflow.Activities.StateActivity();
            this.step1StateActivity = new System.Workflow.Activities.StateActivity();
            this.finalizeStateActivity = new System.Workflow.Activities.StateActivity();
            this.initialStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            this.finishState = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "step1StateActivity";
            // 
            // confirmDialogFormActivity2
            // 
            this.confirmDialogFormActivity2.ContainerLabel = null;
            this.confirmDialogFormActivity2.FormDefinitionFileName = "/Administrative/DeleteGeneratedDataStep2.xml";
            this.confirmDialogFormActivity2.Name = "confirmDialogFormActivity2";
            // 
            // branchHasNoRelatedData
            // 
            this.branchHasNoRelatedData.Activities.Add(this.setStateActivity6);
            this.branchHasNoRelatedData.Name = "branchHasNoRelatedData";
            // 
            // branchHasRelatedData
            // 
            this.branchHasRelatedData.Activities.Add(this.confirmDialogFormActivity2);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.HasDataReferences);
            this.branchHasRelatedData.Condition = codecondition1;
            this.branchHasRelatedData.Name = "branchHasRelatedData";
            // 
            // setStateActivity8
            // 
            this.setStateActivity8.Name = "setStateActivity8";
            this.setStateActivity8.TargetStateName = "finalizeStateActivity";
            // 
            // finishHandleExternalEventActivity2
            // 
            this.finishHandleExternalEventActivity2.EventName = "Finish";
            this.finishHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity2.Name = "finishHandleExternalEventActivity2";
            // 
            // setStateActivity7
            // 
            this.setStateActivity7.Name = "setStateActivity7";
            this.setStateActivity7.TargetStateName = "finishState";
            // 
            // cancelHandleExternalEventActivity3
            // 
            this.cancelHandleExternalEventActivity3.EventName = "Cancel";
            this.cancelHandleExternalEventActivity3.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity3.Name = "cancelHandleExternalEventActivity3";
            // 
            // ifElseHasRelatedData
            // 
            this.ifElseHasRelatedData.Activities.Add(this.branchHasRelatedData);
            this.ifElseHasRelatedData.Activities.Add(this.branchHasNoRelatedData);
            this.ifElseHasRelatedData.Name = "ifElseHasRelatedData";
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "finishState";
            // 
            // cancelHandleExternalEventActivity2
            // 
            this.cancelHandleExternalEventActivity2.EventName = "Cancel";
            this.cancelHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity2.Name = "cancelHandleExternalEventActivity2";
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "finalizeStateActivity";
            // 
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // confirmDialogFormActivity1
            // 
            this.confirmDialogFormActivity1.ContainerLabel = null;
            this.confirmDialogFormActivity1.FormDefinitionFileName = "/Administrative/DeleteAssociatedTypeDataStep1.xml";
            this.confirmDialogFormActivity1.Name = "confirmDialogFormActivity1";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "finishState";
            // 
            // closeCurrentViewActivity1
            // 
            this.closeCurrentViewActivity1.Name = "closeCurrentViewActivity1";
            // 
            // finalizeCodeActivity
            // 
            this.finalizeCodeActivity.Name = "finalizeCodeActivity";
            this.finalizeCodeActivity.ExecuteCode += new System.EventHandler(this.finalizeCodeActivity_ExecuteCode);
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "checkRelatedDataStateActivity";
            // 
            // eventDrivenActivity_OK
            // 
            this.eventDrivenActivity_OK.Activities.Add(this.finishHandleExternalEventActivity2);
            this.eventDrivenActivity_OK.Activities.Add(this.setStateActivity8);
            this.eventDrivenActivity_OK.Name = "eventDrivenActivity_OK";
            // 
            // eventDrivenActivity_Cancel
            // 
            this.eventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity3);
            this.eventDrivenActivity_Cancel.Activities.Add(this.setStateActivity7);
            this.eventDrivenActivity_Cancel.Name = "eventDrivenActivity_Cancel";
            // 
            // stateInitializationActivity1
            // 
            this.stateInitializationActivity1.Activities.Add(this.ifElseHasRelatedData);
            this.stateInitializationActivity1.Name = "stateInitializationActivity1";
            // 
            // step1EventDrivenActivity_Cancel
            // 
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.setStateActivity5);
            this.step1EventDrivenActivity_Cancel.Name = "step1EventDrivenActivity_Cancel";
            // 
            // step1EventDrivenActivity_OK
            // 
            this.step1EventDrivenActivity_OK.Activities.Add(this.finishHandleExternalEventActivity1);
            this.step1EventDrivenActivity_OK.Activities.Add(this.setStateActivity4);
            this.step1EventDrivenActivity_OK.Name = "step1EventDrivenActivity_OK";
            // 
            // step1StateInitializationActivity
            // 
            this.step1StateInitializationActivity.Activities.Add(this.confirmDialogFormActivity1);
            this.step1StateInitializationActivity.Name = "step1StateInitializationActivity";
            // 
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.finalizeCodeActivity);
            this.finalizeStateInitializationActivity.Activities.Add(this.closeCurrentViewActivity1);
            this.finalizeStateInitializationActivity.Activities.Add(this.setStateActivity3);
            this.finalizeStateInitializationActivity.Name = "finalizeStateInitializationActivity";
            // 
            // initialStateInitializationActivity
            // 
            this.initialStateInitializationActivity.Activities.Add(this.setStateActivity2);
            this.initialStateInitializationActivity.Name = "initialStateInitializationActivity";
            // 
            // setStateActivity1
            // 
            this.setStateActivity1.Name = "setStateActivity1";
            this.setStateActivity1.TargetStateName = "finishState";
            // 
            // cancelHandleExternalEventActivity1
            // 
            this.cancelHandleExternalEventActivity1.EventName = "Cancel";
            this.cancelHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity1.Name = "cancelHandleExternalEventActivity1";
            // 
            // checkRelatedDataStateActivity
            // 
            this.checkRelatedDataStateActivity.Activities.Add(this.stateInitializationActivity1);
            this.checkRelatedDataStateActivity.Activities.Add(this.eventDrivenActivity_Cancel);
            this.checkRelatedDataStateActivity.Activities.Add(this.eventDrivenActivity_OK);
            this.checkRelatedDataStateActivity.Name = "checkRelatedDataStateActivity";
            // 
            // step1StateActivity
            // 
            this.step1StateActivity.Activities.Add(this.step1StateInitializationActivity);
            this.step1StateActivity.Activities.Add(this.step1EventDrivenActivity_OK);
            this.step1StateActivity.Activities.Add(this.step1EventDrivenActivity_Cancel);
            this.step1StateActivity.Name = "step1StateActivity";
            // 
            // finalizeStateActivity
            // 
            this.finalizeStateActivity.Activities.Add(this.finalizeStateInitializationActivity);
            this.finalizeStateActivity.Name = "finalizeStateActivity";
            // 
            // initialStateActivity
            // 
            this.initialStateActivity.Activities.Add(this.initialStateInitializationActivity);
            this.initialStateActivity.Name = "initialStateActivity";
            // 
            // eventDrivenActivity_GlobalCancel
            // 
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.cancelHandleExternalEventActivity1);
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.setStateActivity1);
            this.eventDrivenActivity_GlobalCancel.Name = "eventDrivenActivity_GlobalCancel";
            // 
            // finishState
            // 
            this.finishState.Name = "finishState";
            // 
            // DeleteAssociatedDataWorkflow
            // 
            this.Activities.Add(this.finishState);
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initialStateActivity);
            this.Activities.Add(this.finalizeStateActivity);
            this.Activities.Add(this.step1StateActivity);
            this.Activities.Add(this.checkRelatedDataStateActivity);
            this.CompletedStateName = "finishState";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initialStateActivity";
            this.Name = "DeleteAssociatedDataWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private StateActivity finishState;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private SetStateActivity setStateActivity1;
        private StateActivity initialStateActivity;
        private CodeActivity finalizeCodeActivity;
        private StateInitializationActivity finalizeStateInitializationActivity;
        private StateInitializationActivity initialStateInitializationActivity;
        private StateActivity finalizeStateActivity;
        private SetStateActivity setStateActivity3;
        private SetStateActivity setStateActivity4;
        private SetStateActivity setStateActivity2;
        private EventDrivenActivity step1EventDrivenActivity_Cancel;
        private EventDrivenActivity step1EventDrivenActivity_OK;
        private StateInitializationActivity step1StateInitializationActivity;
        private StateActivity step1StateActivity;
        private SetStateActivity setStateActivity5;
        private Composite.C1Console.Workflow.Activities.ConfirmDialogFormActivity confirmDialogFormActivity1;
        private Composite.C1Console.Workflow.Activities.CloseCurrentViewActivity closeCurrentViewActivity1;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;
        private Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;
        private SetStateActivity setStateActivity6;
        private IfElseBranchActivity branchHasNoRelatedData;
        private IfElseBranchActivity branchHasRelatedData;
        private SetStateActivity setStateActivity7;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity3;
        private IfElseActivity ifElseHasRelatedData;
        private EventDrivenActivity eventDrivenActivity_Cancel;
        private StateInitializationActivity stateInitializationActivity1;
        private StateActivity checkRelatedDataStateActivity;
        private Composite.C1Console.Workflow.Activities.ConfirmDialogFormActivity confirmDialogFormActivity2;
        private SetStateActivity setStateActivity8;
        private Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity2;
        private EventDrivenActivity eventDrivenActivity_OK;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;
















































































































    }
}
