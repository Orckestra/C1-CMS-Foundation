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

namespace Composite.Workflows.Trees.Workflows
{
    partial class GenericDeleteDataWorkflow
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
            this.confirmConfirmDialogFormActivity_ShowConfirmDialog = new Composite.Workflow.Activities.ConfirmDialogFormActivity();
            this.confirmConfirmDialogFormActivity_ShowDataReferenceDialog = new Composite.Workflow.Activities.ConfirmDialogFormActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.finalizeCodeActivity_DeteleData = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity3 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity2 = new Composite.Workflow.Activities.FinishHandleExternalEventActivity();
            this.confirmIfElseActivity_HasDataReferences = new System.Workflow.Activities.IfElseActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.confirmEventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.confirmEventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.confirmStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.finalizeStateActivity = new System.Workflow.Activities.StateActivity();
            this.confirmStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // confirmConfirmDialogFormActivity_ShowConfirmDialog
            // 
            this.confirmConfirmDialogFormActivity_ShowConfirmDialog.ContainerLabel = null;
            this.confirmConfirmDialogFormActivity_ShowConfirmDialog.FormDefinitionFileName = "/Administrative/TreeGenericDeleteConfirm.xml";
            this.confirmConfirmDialogFormActivity_ShowConfirmDialog.Name = "confirmConfirmDialogFormActivity_ShowConfirmDialog";
            // 
            // confirmConfirmDialogFormActivity_ShowDataReferenceDialog
            // 
            this.confirmConfirmDialogFormActivity_ShowDataReferenceDialog.ContainerLabel = null;
            this.confirmConfirmDialogFormActivity_ShowDataReferenceDialog.FormDefinitionFileName = "/Administrative/TreeGenericDeleteConfirmDeletingRelatedData.xml";
            this.confirmConfirmDialogFormActivity_ShowDataReferenceDialog.Name = "confirmConfirmDialogFormActivity_ShowDataReferenceDialog";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.confirmConfirmDialogFormActivity_ShowConfirmDialog);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.confirmConfirmDialogFormActivity_ShowDataReferenceDialog);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.HasDataReferences);
            this.ifElseBranchActivity1.Condition = codecondition1;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "finalStateActivity";
            // 
            // finalizeCodeActivity_DeteleData
            // 
            this.finalizeCodeActivity_DeteleData.Name = "finalizeCodeActivity_DeteleData";
            this.finalizeCodeActivity_DeteleData.ExecuteCode += new System.EventHandler(this.finalizeCodeActivity_DeteleData_ExecuteCode);
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "finalStateActivity";
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
            // confirmIfElseActivity_HasDataReferences
            // 
            this.confirmIfElseActivity_HasDataReferences.Activities.Add(this.ifElseBranchActivity1);
            this.confirmIfElseActivity_HasDataReferences.Activities.Add(this.ifElseBranchActivity2);
            this.confirmIfElseActivity_HasDataReferences.Name = "confirmIfElseActivity_HasDataReferences";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "confirmStateActivity";
            // 
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.finalizeCodeActivity_DeteleData);
            this.finalizeStateInitializationActivity.Activities.Add(this.setStateActivity6);
            this.finalizeStateInitializationActivity.Name = "finalizeStateInitializationActivity";
            // 
            // confirmEventDrivenActivity_Cancel
            // 
            this.confirmEventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity3);
            this.confirmEventDrivenActivity_Cancel.Activities.Add(this.setStateActivity2);
            this.confirmEventDrivenActivity_Cancel.Name = "confirmEventDrivenActivity_Cancel";
            // 
            // confirmEventDrivenActivity_Finish
            // 
            this.confirmEventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity2);
            this.confirmEventDrivenActivity_Finish.Activities.Add(this.setStateActivity5);
            this.confirmEventDrivenActivity_Finish.Name = "confirmEventDrivenActivity_Finish";
            // 
            // confirmStateInitializationActivity
            // 
            this.confirmStateInitializationActivity.Activities.Add(this.confirmIfElseActivity_HasDataReferences);
            this.confirmStateInitializationActivity.Name = "confirmStateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.setStateActivity3);
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
            // confirmStateActivity
            // 
            this.confirmStateActivity.Activities.Add(this.confirmStateInitializationActivity);
            this.confirmStateActivity.Activities.Add(this.confirmEventDrivenActivity_Finish);
            this.confirmStateActivity.Activities.Add(this.confirmEventDrivenActivity_Cancel);
            this.confirmStateActivity.Name = "confirmStateActivity";
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
            // GenericDeleteDataWorkflow
            // 
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.confirmStateActivity);
            this.Activities.Add(this.finalizeStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "GenericDeleteDataWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateInitializationActivity initializeStateInitializationActivity;
        private SetStateActivity setStateActivity1;
        private StateActivity finalStateActivity;
        private StateActivity initializeStateActivity;
        private StateActivity finalizeStateActivity;
        private StateActivity confirmStateActivity;
        private StateInitializationActivity finalizeStateInitializationActivity;
        private EventDrivenActivity confirmEventDrivenActivity_Cancel;
        private EventDrivenActivity confirmEventDrivenActivity_Finish;
        private StateInitializationActivity confirmStateInitializationActivity;
        private SetStateActivity setStateActivity2;
        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity3;
        private SetStateActivity setStateActivity5;
        private Composite.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity2;
        private SetStateActivity setStateActivity6;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private IfElseActivity confirmIfElseActivity_HasDataReferences;
        private Composite.Workflow.Activities.ConfirmDialogFormActivity confirmConfirmDialogFormActivity_ShowConfirmDialog;
        private Composite.Workflow.Activities.ConfirmDialogFormActivity confirmConfirmDialogFormActivity_ShowDataReferenceDialog;
        private SetStateActivity setStateActivity3;
        private CodeActivity finalizeCodeActivity_DeteleData;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;




















































































































    }
}
