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

namespace Composite.StandardPlugins.Elements.ElementProviders.MediaFileProviderElementProvider
{
    partial class DeleteMediaFileWorkflow
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
            this.confirmDialogFormActivity1 = new Composite.Workflow.Activities.ConfirmDialogFormActivity();
            this.branchHasNoRelatedData = new System.Workflow.Activities.IfElseBranchActivity();
            this.branchHasRelatedData = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity7 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity3 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity2 = new Composite.Workflow.Activities.FinishHandleExternalEventActivity();
            this.ifElseHasRelatedData = new System.Workflow.Activities.IfElseActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.closeCurrentViewActivity1 = new Composite.Workflow.Activities.CloseCurrentViewActivity();
            this.deleteCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.wizzardFormActivity1 = new Composite.Workflow.Activities.ConfirmDialogFormActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity1 = new Composite.Workflow.Activities.FinishHandleExternalEventActivity();
            this.eventDrivenActivity2 = new System.Workflow.Activities.EventDrivenActivity();
            this.eventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.stateInitializationActivity2 = new System.Workflow.Activities.StateInitializationActivity();
            this.stateInitializationActivity1 = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.deleteEventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.initializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.deleteEventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.checkRelatedDataStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalizeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity1 = new System.Workflow.Activities.EventDrivenActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.DeleteMediaFileWorkflowInitialState = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "DeleteMediaFileWorkflowInitialState";
            // 
            // confirmDialogFormActivity1
            // 
            this.confirmDialogFormActivity1.ContainerLabel = null;
            this.confirmDialogFormActivity1.FormDefinitionFileName = "/Administrative/DeleteMediaFileConfirmRemovingRelatedData.xml";
            this.confirmDialogFormActivity1.Name = "confirmDialogFormActivity1";
            // 
            // branchHasNoRelatedData
            // 
            this.branchHasNoRelatedData.Activities.Add(this.setStateActivity6);
            this.branchHasNoRelatedData.Name = "branchHasNoRelatedData";
            // 
            // branchHasRelatedData
            // 
            this.branchHasRelatedData.Activities.Add(this.confirmDialogFormActivity1);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.HasDataReferences);
            this.branchHasRelatedData.Condition = codecondition1;
            this.branchHasRelatedData.Name = "branchHasRelatedData";
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
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "finalizeStateActivity";
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
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "finalStateActivity";
            // 
            // closeCurrentViewActivity1
            // 
            this.closeCurrentViewActivity1.Name = "closeCurrentViewActivity1";
            // 
            // deleteCodeActivity
            // 
            this.deleteCodeActivity.Name = "deleteCodeActivity";
            this.deleteCodeActivity.ExecuteCode += new System.EventHandler(this.deleteCodeActivity_ExecuteCode);
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
            // wizzardFormActivity1
            // 
            this.wizzardFormActivity1.ContainerLabel = null;
            this.wizzardFormActivity1.FormDefinitionFileName = "\\Administrative\\DeleteMediaFile.xml";
            this.wizzardFormActivity1.Name = "wizzardFormActivity1";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "finalizeStateActivity";
            // 
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // eventDrivenActivity2
            // 
            this.eventDrivenActivity2.Activities.Add(this.cancelHandleExternalEventActivity3);
            this.eventDrivenActivity2.Activities.Add(this.setStateActivity7);
            this.eventDrivenActivity2.Name = "eventDrivenActivity2";
            // 
            // eventDrivenActivity_Finish
            // 
            this.eventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity2);
            this.eventDrivenActivity_Finish.Activities.Add(this.setStateActivity5);
            this.eventDrivenActivity_Finish.Name = "eventDrivenActivity_Finish";
            // 
            // stateInitializationActivity2
            // 
            this.stateInitializationActivity2.Activities.Add(this.ifElseHasRelatedData);
            this.stateInitializationActivity2.Name = "stateInitializationActivity2";
            // 
            // stateInitializationActivity1
            // 
            this.stateInitializationActivity1.Activities.Add(this.deleteCodeActivity);
            this.stateInitializationActivity1.Activities.Add(this.closeCurrentViewActivity1);
            this.stateInitializationActivity1.Activities.Add(this.setStateActivity2);
            this.stateInitializationActivity1.Name = "stateInitializationActivity1";
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
            // deleteEventDrivenActivity_Cancel
            // 
            this.deleteEventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.deleteEventDrivenActivity_Cancel.Activities.Add(this.setStateActivity4);
            this.deleteEventDrivenActivity_Cancel.Name = "deleteEventDrivenActivity_Cancel";
            // 
            // initializationActivity
            // 
            this.initializationActivity.Activities.Add(this.wizzardFormActivity1);
            this.initializationActivity.Name = "initializationActivity";
            // 
            // deleteEventDrivenActivity_Finish
            // 
            this.deleteEventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity1);
            this.deleteEventDrivenActivity_Finish.Activities.Add(this.setStateActivity3);
            this.deleteEventDrivenActivity_Finish.Name = "deleteEventDrivenActivity_Finish";
            // 
            // checkRelatedDataStateActivity
            // 
            this.checkRelatedDataStateActivity.Activities.Add(this.stateInitializationActivity2);
            this.checkRelatedDataStateActivity.Activities.Add(this.eventDrivenActivity_Finish);
            this.checkRelatedDataStateActivity.Activities.Add(this.eventDrivenActivity2);
            this.checkRelatedDataStateActivity.Name = "checkRelatedDataStateActivity";
            // 
            // finalizeStateActivity
            // 
            this.finalizeStateActivity.Activities.Add(this.stateInitializationActivity1);
            this.finalizeStateActivity.Name = "finalizeStateActivity";
            // 
            // eventDrivenActivity1
            // 
            this.eventDrivenActivity1.Activities.Add(this.cancelHandleExternalEventActivity1);
            this.eventDrivenActivity1.Activities.Add(this.setStateActivity1);
            this.eventDrivenActivity1.Name = "eventDrivenActivity1";
            // 
            // finalStateActivity
            // 
            this.finalStateActivity.Name = "finalStateActivity";
            // 
            // DeleteMediaFileWorkflowInitialState
            // 
            this.DeleteMediaFileWorkflowInitialState.Activities.Add(this.deleteEventDrivenActivity_Finish);
            this.DeleteMediaFileWorkflowInitialState.Activities.Add(this.initializationActivity);
            this.DeleteMediaFileWorkflowInitialState.Activities.Add(this.deleteEventDrivenActivity_Cancel);
            this.DeleteMediaFileWorkflowInitialState.Name = "DeleteMediaFileWorkflowInitialState";
            // 
            // DeleteMediaFileWorkflow
            // 
            this.Activities.Add(this.DeleteMediaFileWorkflowInitialState);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.eventDrivenActivity1);
            this.Activities.Add(this.finalizeStateActivity);
            this.Activities.Add(this.checkRelatedDataStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "checkRelatedDataStateActivity";
            this.Name = "DeleteMediaFileWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private EventDrivenActivity eventDrivenActivity1;
        private StateActivity finalStateActivity;
        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private CodeActivity deleteCodeActivity;
        private SetStateActivity setStateActivity1;
        private StateInitializationActivity stateInitializationActivity1;
        private SetStateActivity setStateActivity2;
        private EventDrivenActivity deleteEventDrivenActivity_Finish;
        private StateActivity finalizeStateActivity;
        private SetStateActivity setStateActivity3;
        private Composite.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;
        private Composite.Workflow.Activities.ConfirmDialogFormActivity wizzardFormActivity1;
        private StateInitializationActivity initializationActivity;
        private Composite.Workflow.Activities.CloseCurrentViewActivity closeCurrentViewActivity1;
        private SetStateActivity setStateActivity4;
        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;
        private EventDrivenActivity deleteEventDrivenActivity_Cancel;
        private SetStateActivity setStateActivity6;
        private IfElseBranchActivity branchHasNoRelatedData;
        private IfElseBranchActivity branchHasRelatedData;
        private IfElseActivity ifElseHasRelatedData;
        private StateInitializationActivity stateInitializationActivity2;
        private StateActivity checkRelatedDataStateActivity;
        private SetStateActivity setStateActivity5;
        private Composite.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity2;
        private EventDrivenActivity eventDrivenActivity_Finish;
        private SetStateActivity setStateActivity7;
        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity3;
        private EventDrivenActivity eventDrivenActivity2;
        private Composite.Workflow.Activities.ConfirmDialogFormActivity confirmDialogFormActivity1;
        private StateActivity DeleteMediaFileWorkflowInitialState;






















    }
}
