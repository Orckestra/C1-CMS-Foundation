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

namespace Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    partial class DeleteDataWorkflow
    {
        #region Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCode]
        private void InitializeComponent()
        {
            this.CanModifyActivities = true;
            System.Workflow.Activities.CodeCondition codecondition1 = new System.Workflow.Activities.CodeCondition();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.confirmDialogFormActivity2 = new Composite.Workflow.Activities.ConfirmDialogFormActivity();
            this.branchHasNoRelatedData = new System.Workflow.Activities.IfElseBranchActivity();
            this.branchHasRelatedData = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity8 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity3 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity7 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity2 = new Composite.Workflow.Activities.FinishHandleExternalEventActivity();
            this.ifElseHasRelatedData = new System.Workflow.Activities.IfElseActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity1 = new Composite.Workflow.Activities.FinishHandleExternalEventActivity();
            this.confirmDialogFormActivity1 = new Composite.Workflow.Activities.ConfirmDialogFormActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.finalizeCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.closeCurrentViewActivity1 = new Composite.Workflow.Activities.CloseCurrentViewActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.eventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.eventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.stateInitializationActivity1 = new System.Workflow.Activities.StateInitializationActivity();
            this.step1EventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step1SventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.step1StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initialStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.checkRelatedDataStateActivity = new System.Workflow.Activities.StateActivity();
            this.step1StateActivity = new System.Workflow.Activities.StateActivity();
            this.cancelEventDrivenActivity = new System.Workflow.Activities.EventDrivenActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.finializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.initialstateActivity = new System.Workflow.Activities.StateActivity();
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
            this.setStateActivity8.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity3
            // 
            this.cancelHandleExternalEventActivity3.EventName = "Cancel";
            this.cancelHandleExternalEventActivity3.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity3.Name = "cancelHandleExternalEventActivity3";
            // 
            // setStateActivity7
            // 
            this.setStateActivity7.Name = "setStateActivity7";
            this.setStateActivity7.TargetStateName = "finializeStateActivity";
            // 
            // finishHandleExternalEventActivity2
            // 
            this.finishHandleExternalEventActivity2.EventName = "Finish";
            this.finishHandleExternalEventActivity2.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity2.Name = "finishHandleExternalEventActivity2";
            // 
            // ifElseHasRelatedData
            // 
            this.ifElseHasRelatedData.Activities.Add(this.branchHasRelatedData);
            this.ifElseHasRelatedData.Activities.Add(this.branchHasNoRelatedData);
            this.ifElseHasRelatedData.Name = "ifElseHasRelatedData";
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
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "finializeStateActivity";
            // 
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // confirmDialogFormActivity1
            // 
            this.confirmDialogFormActivity1.ContainerLabel = null;
            this.confirmDialogFormActivity1.FormDefinitionFileName = "/Administrative/DeleteGeneratedDataStep1.xml";
            this.confirmDialogFormActivity1.Name = "confirmDialogFormActivity1";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "finalStateActivity";
            // 
            // finalizeCodeActivity
            // 
            this.finalizeCodeActivity.Name = "finalizeCodeActivity";
            this.finalizeCodeActivity.ExecuteCode += new System.EventHandler(this.finalizeCodeActivity_ExecuteCode);
            // 
            // closeCurrentViewActivity1
            // 
            this.closeCurrentViewActivity1.Name = "closeCurrentViewActivity1";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "checkRelatedDataStateActivity";
            // 
            // eventDrivenActivity_Finish
            // 
            this.eventDrivenActivity_Finish.Activities.Add(this.cancelHandleExternalEventActivity3);
            this.eventDrivenActivity_Finish.Activities.Add(this.setStateActivity8);
            this.eventDrivenActivity_Finish.Name = "eventDrivenActivity_Finish";
            // 
            // eventDrivenActivity_Cancel
            // 
            this.eventDrivenActivity_Cancel.Activities.Add(this.finishHandleExternalEventActivity2);
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
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.setStateActivity4);
            this.step1EventDrivenActivity_Cancel.Name = "step1EventDrivenActivity_Cancel";
            // 
            // step1SventDrivenActivity_Finish
            // 
            this.step1SventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity1);
            this.step1SventDrivenActivity_Finish.Activities.Add(this.setStateActivity5);
            this.step1SventDrivenActivity_Finish.Name = "step1SventDrivenActivity_Finish";
            // 
            // step1StateInitializationActivity
            // 
            this.step1StateInitializationActivity.Activities.Add(this.confirmDialogFormActivity1);
            this.step1StateInitializationActivity.Name = "step1StateInitializationActivity";
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
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.closeCurrentViewActivity1);
            this.finalizeStateInitializationActivity.Activities.Add(this.finalizeCodeActivity);
            this.finalizeStateInitializationActivity.Activities.Add(this.setStateActivity2);
            this.finalizeStateInitializationActivity.Name = "finalizeStateInitializationActivity";
            // 
            // initialStateInitializationActivity
            // 
            this.initialStateInitializationActivity.Activities.Add(this.setStateActivity3);
            this.initialStateInitializationActivity.Name = "initialStateInitializationActivity";
            // 
            // checkRelatedDataStateActivity
            // 
            this.checkRelatedDataStateActivity.Activities.Add(this.stateInitializationActivity1);
            this.checkRelatedDataStateActivity.Activities.Add(this.eventDrivenActivity_Cancel);
            this.checkRelatedDataStateActivity.Activities.Add(this.eventDrivenActivity_Finish);
            this.checkRelatedDataStateActivity.Name = "checkRelatedDataStateActivity";
            // 
            // step1StateActivity
            // 
            this.step1StateActivity.Activities.Add(this.step1StateInitializationActivity);
            this.step1StateActivity.Activities.Add(this.step1SventDrivenActivity_Finish);
            this.step1StateActivity.Activities.Add(this.step1EventDrivenActivity_Cancel);
            this.step1StateActivity.Name = "step1StateActivity";
            // 
            // cancelEventDrivenActivity
            // 
            this.cancelEventDrivenActivity.Activities.Add(this.cancelHandleExternalEventActivity1);
            this.cancelEventDrivenActivity.Activities.Add(this.setStateActivity1);
            this.cancelEventDrivenActivity.Name = "cancelEventDrivenActivity";
            // 
            // finalStateActivity
            // 
            this.finalStateActivity.Name = "finalStateActivity";
            // 
            // finializeStateActivity
            // 
            this.finializeStateActivity.Activities.Add(this.finalizeStateInitializationActivity);
            this.finializeStateActivity.Name = "finializeStateActivity";
            // 
            // initialstateActivity
            // 
            this.initialstateActivity.Activities.Add(this.initialStateInitializationActivity);
            this.initialstateActivity.Name = "initialstateActivity";
            // 
            // DeleteDataWorkflow
            // 
            this.Activities.Add(this.initialstateActivity);
            this.Activities.Add(this.finializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.cancelEventDrivenActivity);
            this.Activities.Add(this.step1StateActivity);
            this.Activities.Add(this.checkRelatedDataStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initialstateActivity";
            this.Name = "DeleteDataWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateInitializationActivity initialStateInitializationActivity;
        private EventDrivenActivity cancelEventDrivenActivity;
        private StateActivity finalStateActivity;
        private StateActivity finializeStateActivity;
        private SetStateActivity setStateActivity2;
        private SetStateActivity setStateActivity1;
        private StateInitializationActivity finalizeStateInitializationActivity;
        private CodeActivity finalizeCodeActivity;
        private Composite.Workflow.Activities.ConfirmDialogFormActivity confirmDialogFormActivity1;
        private StateInitializationActivity step1StateInitializationActivity;
        private StateActivity step1StateActivity;
        private SetStateActivity setStateActivity4;
        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;
        private SetStateActivity setStateActivity5;
        private Composite.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;
        private SetStateActivity setStateActivity3;
        private EventDrivenActivity step1EventDrivenActivity_Cancel;
        private EventDrivenActivity step1SventDrivenActivity_Finish;
        private Composite.Workflow.Activities.CloseCurrentViewActivity closeCurrentViewActivity1;
        private SetStateActivity setStateActivity6;
        private IfElseBranchActivity branchHasNoRelatedData;
        private IfElseBranchActivity branchHasRelatedData;
        private IfElseActivity ifElseHasRelatedData;
        private StateInitializationActivity stateInitializationActivity1;
        private StateActivity checkRelatedDataStateActivity;
        private Composite.Workflow.Activities.ConfirmDialogFormActivity confirmDialogFormActivity2;
        private SetStateActivity setStateActivity8;
        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity3;
        private SetStateActivity setStateActivity7;
        private Composite.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity2;
        private EventDrivenActivity eventDrivenActivity_Finish;
        private EventDrivenActivity eventDrivenActivity_Cancel;
        private StateActivity initialstateActivity;

































    }
}
