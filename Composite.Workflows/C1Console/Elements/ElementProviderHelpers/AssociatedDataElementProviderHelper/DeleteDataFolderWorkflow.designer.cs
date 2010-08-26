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
    partial class DeleteDataFolderWorkflow
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
            this.setStateActivity10 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity4 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity3 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.confirmIfElseActivity_RelatedDataExists = new System.Workflow.Activities.IfElseActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity7 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.setStateActivity8 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity3 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.confirmDialogFormActivity2 = new Composite.C1Console.Workflow.Activities.DataDialogFormActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.deleteCodeActivity_Delete = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.confirmIfElseActivity_DeleteData = new System.Workflow.Activities.IfElseActivity();
            this.finishHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.confirmDialogFormActivity1 = new Composite.C1Console.Workflow.Activities.DataDialogFormActivity();
            this.confirmCodeActivity_Initialize = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.eventDrivenActivity_Ok = new System.Workflow.Activities.EventDrivenActivity();
            this.eventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.stateInitializationActivity1 = new System.Workflow.Activities.StateInitializationActivity();
            this.deleteStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.confirmEventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.confirmEventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.confirmStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.checkRelatedDataStateActivity = new System.Workflow.Activities.StateActivity();
            this.deleteStateActivity = new System.Workflow.Activities.StateActivity();
            this.confirmStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // setStateActivity9
            // 
            this.setStateActivity9.Name = "setStateActivity9";
            this.setStateActivity9.TargetStateName = "deleteStateActivity";
            // 
            // setStateActivity10
            // 
            this.setStateActivity10.Name = "setStateActivity10";
            this.setStateActivity10.TargetStateName = "checkRelatedDataStateActivity";
            // 
            // ifElseBranchActivity4
            // 
            this.ifElseBranchActivity4.Activities.Add(this.setStateActivity9);
            this.ifElseBranchActivity4.Name = "ifElseBranchActivity4";
            // 
            // ifElseBranchActivity3
            // 
            this.ifElseBranchActivity3.Activities.Add(this.setStateActivity10);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.HasDataReferences);
            this.ifElseBranchActivity3.Condition = codecondition1;
            this.ifElseBranchActivity3.Name = "ifElseBranchActivity3";
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "deleteStateActivity";
            // 
            // confirmIfElseActivity_RelatedDataExists
            // 
            this.confirmIfElseActivity_RelatedDataExists.Activities.Add(this.ifElseBranchActivity3);
            this.confirmIfElseActivity_RelatedDataExists.Activities.Add(this.ifElseBranchActivity4);
            this.confirmIfElseActivity_RelatedDataExists.Name = "confirmIfElseActivity_RelatedDataExists";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity4);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.confirmIfElseActivity_RelatedDataExists);
            codecondition2.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.ShouldDeleteData);
            this.ifElseBranchActivity1.Condition = codecondition2;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // setStateActivity7
            // 
            this.setStateActivity7.Name = "setStateActivity7";
            this.setStateActivity7.TargetStateName = "deleteStateActivity";
            // 
            // finishHandleExternalEventActivity2
            // 
            this.finishHandleExternalEventActivity2.EventName = "Finish";
            this.finishHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity2.Name = "finishHandleExternalEventActivity2";
            // 
            // setStateActivity8
            // 
            this.setStateActivity8.Name = "setStateActivity8";
            this.setStateActivity8.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity3
            // 
            this.cancelHandleExternalEventActivity3.EventName = "Cancel";
            this.cancelHandleExternalEventActivity3.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity3.Name = "cancelHandleExternalEventActivity3";
            // 
            // confirmDialogFormActivity2
            // 
            this.confirmDialogFormActivity2.ContainerLabel = null;
            this.confirmDialogFormActivity2.FormDefinitionFileName = "/Administrative/DeleteDataFolderConfirmDeletingRelatedData.xml";
            this.confirmDialogFormActivity2.Name = "confirmDialogFormActivity2";
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "finalStateActivity";
            // 
            // deleteCodeActivity_Delete
            // 
            this.deleteCodeActivity_Delete.Name = "deleteCodeActivity_Delete";
            this.deleteCodeActivity_Delete.ExecuteCode += new System.EventHandler(this.deleteCodeActivity_Delete_ExecuteCode);
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity2
            // 
            this.cancelHandleExternalEventActivity2.EventName = "Cancel";
            this.cancelHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity2.Name = "cancelHandleExternalEventActivity2";
            // 
            // confirmIfElseActivity_DeleteData
            // 
            this.confirmIfElseActivity_DeleteData.Activities.Add(this.ifElseBranchActivity1);
            this.confirmIfElseActivity_DeleteData.Activities.Add(this.ifElseBranchActivity2);
            this.confirmIfElseActivity_DeleteData.Name = "confirmIfElseActivity_DeleteData";
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
            this.confirmDialogFormActivity1.FormDefinitionFileName = "\\Administrative\\DeleteDataFolderConfirm.xml";
            this.confirmDialogFormActivity1.Name = "confirmDialogFormActivity1";
            // 
            // confirmCodeActivity_Initialize
            // 
            this.confirmCodeActivity_Initialize.Name = "confirmCodeActivity_Initialize";
            this.confirmCodeActivity_Initialize.ExecuteCode += new System.EventHandler(this.confirmCodeActivity_Initialize_ExecuteCode);
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "confirmStateActivity";
            // 
            // eventDrivenActivity_Ok
            // 
            this.eventDrivenActivity_Ok.Activities.Add(this.finishHandleExternalEventActivity2);
            this.eventDrivenActivity_Ok.Activities.Add(this.setStateActivity7);
            this.eventDrivenActivity_Ok.Name = "eventDrivenActivity_Ok";
            // 
            // eventDrivenActivity_Cancel
            // 
            this.eventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity3);
            this.eventDrivenActivity_Cancel.Activities.Add(this.setStateActivity8);
            this.eventDrivenActivity_Cancel.Name = "eventDrivenActivity_Cancel";
            // 
            // stateInitializationActivity1
            // 
            this.stateInitializationActivity1.Activities.Add(this.confirmDialogFormActivity2);
            this.stateInitializationActivity1.Name = "stateInitializationActivity1";
            // 
            // deleteStateInitializationActivity
            // 
            this.deleteStateInitializationActivity.Activities.Add(this.deleteCodeActivity_Delete);
            this.deleteStateInitializationActivity.Activities.Add(this.setStateActivity5);
            this.deleteStateInitializationActivity.Name = "deleteStateInitializationActivity";
            // 
            // confirmEventDrivenActivity_Cancel
            // 
            this.confirmEventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.confirmEventDrivenActivity_Cancel.Activities.Add(this.setStateActivity2);
            this.confirmEventDrivenActivity_Cancel.Name = "confirmEventDrivenActivity_Cancel";
            // 
            // confirmEventDrivenActivity_Finish
            // 
            this.confirmEventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity1);
            this.confirmEventDrivenActivity_Finish.Activities.Add(this.confirmIfElseActivity_DeleteData);
            this.confirmEventDrivenActivity_Finish.Name = "confirmEventDrivenActivity_Finish";
            // 
            // confirmStateInitializationActivity
            // 
            this.confirmStateInitializationActivity.Activities.Add(this.confirmCodeActivity_Initialize);
            this.confirmStateInitializationActivity.Activities.Add(this.confirmDialogFormActivity1);
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
            this.cancelHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity1.Name = "cancelHandleExternalEventActivity1";
            // 
            // checkRelatedDataStateActivity
            // 
            this.checkRelatedDataStateActivity.Activities.Add(this.stateInitializationActivity1);
            this.checkRelatedDataStateActivity.Activities.Add(this.eventDrivenActivity_Cancel);
            this.checkRelatedDataStateActivity.Activities.Add(this.eventDrivenActivity_Ok);
            this.checkRelatedDataStateActivity.Name = "checkRelatedDataStateActivity";
            // 
            // deleteStateActivity
            // 
            this.deleteStateActivity.Activities.Add(this.deleteStateInitializationActivity);
            this.deleteStateActivity.Name = "deleteStateActivity";
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
            // DeleteDataFolderWorkflow
            // 
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.confirmStateActivity);
            this.Activities.Add(this.deleteStateActivity);
            this.Activities.Add(this.checkRelatedDataStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "DeleteDataFolderWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;

        private StateInitializationActivity initializeStateInitializationActivity;

        private SetStateActivity setStateActivity1;

        private StateActivity finalStateActivity;

        private StateActivity initializeStateActivity;

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;

        private C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;

        private EventDrivenActivity confirmEventDrivenActivity_Cancel;

        private EventDrivenActivity confirmEventDrivenActivity_Finish;

        private StateInitializationActivity confirmStateInitializationActivity;

        private StateActivity confirmStateActivity;

        private SetStateActivity setStateActivity5;

        private CodeActivity deleteCodeActivity_Delete;

        private SetStateActivity setStateActivity2;

        private SetStateActivity setStateActivity4;

        private SetStateActivity setStateActivity3;

        private StateInitializationActivity deleteStateInitializationActivity;

        private StateActivity deleteStateActivity;

        private C1Console.Workflow.Activities.DataDialogFormActivity confirmDialogFormActivity1;

        private CodeActivity confirmCodeActivity_Initialize;

        private StateInitializationActivity stateInitializationActivity1;

        private StateActivity checkRelatedDataStateActivity;

        private C1Console.Workflow.Activities.DataDialogFormActivity confirmDialogFormActivity2;

        private SetStateActivity setStateActivity7;

        private C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity2;

        private SetStateActivity setStateActivity8;

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity3;

        private EventDrivenActivity eventDrivenActivity_Ok;

        private EventDrivenActivity eventDrivenActivity_Cancel;

        private SetStateActivity setStateActivity9;

        private SetStateActivity setStateActivity10;

        private IfElseBranchActivity ifElseBranchActivity4;

        private IfElseBranchActivity ifElseBranchActivity3;

        private IfElseActivity confirmIfElseActivity_RelatedDataExists;

        private IfElseBranchActivity ifElseBranchActivity2;

        private IfElseBranchActivity ifElseBranchActivity1;

        private IfElseActivity confirmIfElseActivity_DeleteData;

        private EventDrivenActivity eventDrivenActivity_GlobalCancel;






















































































































    }
}
