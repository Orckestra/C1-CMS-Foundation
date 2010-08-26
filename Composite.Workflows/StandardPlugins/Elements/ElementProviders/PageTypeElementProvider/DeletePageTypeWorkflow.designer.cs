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

namespace Composite.Plugins.Elements.ElementProviders.PageTypeElementProvider
{
    partial class DeletePageTypeWorkflow
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
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.finalizeCodeActivity_Finalize = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.confirmConfirmDialogFormActivity = new Composite.C1Console.Workflow.Activities.ConfirmDialogFormActivity();
            this.confirmCodeActivity_Initialize = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity7 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.showPageReferingConfirmDialogFormActivity = new Composite.C1Console.Workflow.Activities.ConfirmDialogFormActivity();
            this.showPageReferingCodeActivity_Initialize = new System.Workflow.Activities.CodeActivity();
            this.initializeIfElseActivity_IsPageReferingPageType = new System.Workflow.Activities.IfElseActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.confirmEventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.confirmEventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.confirmStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.showPageReferingEventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.showPageReferingStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.finalizeStateActivity = new System.Workflow.Activities.StateActivity();
            this.confirmStateActivity = new System.Workflow.Activities.StateActivity();
            this.showPageReferingStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "confirmStateActivity";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "showPageReferingStateActivity";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity3);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.setStateActivity2);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.IsPageReferingPageType);
            this.ifElseBranchActivity1.Condition = codecondition1;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "finalStateActivity";
            // 
            // finalizeCodeActivity_Finalize
            // 
            this.finalizeCodeActivity_Finalize.Name = "finalizeCodeActivity_Finalize";
            this.finalizeCodeActivity_Finalize.ExecuteCode += new System.EventHandler(this.finalizeCodeActivity_Finalize_ExecuteCode);
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity2
            // 
            this.cancelHandleExternalEventActivity2.EventName = "Cancel";
            this.cancelHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity2.Name = "cancelHandleExternalEventActivity2";
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "finalizeStateActivity";
            // 
            // finishHandleExternalEventActivity2
            // 
            this.finishHandleExternalEventActivity2.EventName = "Finish";
            this.finishHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity2.Name = "finishHandleExternalEventActivity2";
            // 
            // confirmConfirmDialogFormActivity
            // 
            this.confirmConfirmDialogFormActivity.ContainerLabel = null;
            this.confirmConfirmDialogFormActivity.FormDefinitionFileName = "\\Administrative\\PageTypeDeletePageTypeConfirm.xml";
            this.confirmConfirmDialogFormActivity.Name = "confirmConfirmDialogFormActivity";
            // 
            // confirmCodeActivity_Initialize
            // 
            this.confirmCodeActivity_Initialize.Name = "confirmCodeActivity_Initialize";
            this.confirmCodeActivity_Initialize.ExecuteCode += new System.EventHandler(this.confirmCodeActivity_Initialize_ExecuteCode);
            // 
            // setStateActivity7
            // 
            this.setStateActivity7.Name = "setStateActivity7";
            this.setStateActivity7.TargetStateName = "finalStateActivity";
            // 
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // showPageReferingConfirmDialogFormActivity
            // 
            this.showPageReferingConfirmDialogFormActivity.ContainerLabel = null;
            this.showPageReferingConfirmDialogFormActivity.FormDefinitionFileName = "/Administrative/PageTypeDeletePageTypePagesRefering.xml";
            this.showPageReferingConfirmDialogFormActivity.Name = "showPageReferingConfirmDialogFormActivity";
            // 
            // showPageReferingCodeActivity_Initialize
            // 
            this.showPageReferingCodeActivity_Initialize.Name = "showPageReferingCodeActivity_Initialize";
            this.showPageReferingCodeActivity_Initialize.ExecuteCode += new System.EventHandler(this.showPageReferingCodeActivity_Initialize_ExecuteCode);
            // 
            // initializeIfElseActivity_IsPageReferingPageType
            // 
            this.initializeIfElseActivity_IsPageReferingPageType.Activities.Add(this.ifElseBranchActivity1);
            this.initializeIfElseActivity_IsPageReferingPageType.Activities.Add(this.ifElseBranchActivity2);
            this.initializeIfElseActivity_IsPageReferingPageType.Name = "initializeIfElseActivity_IsPageReferingPageType";
            // 
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.finalizeCodeActivity_Finalize);
            this.finalizeStateInitializationActivity.Activities.Add(this.setStateActivity6);
            this.finalizeStateInitializationActivity.Name = "finalizeStateInitializationActivity";
            // 
            // confirmEventDrivenActivity_Cancel
            // 
            this.confirmEventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.confirmEventDrivenActivity_Cancel.Activities.Add(this.setStateActivity4);
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
            this.confirmStateInitializationActivity.Activities.Add(this.confirmCodeActivity_Initialize);
            this.confirmStateInitializationActivity.Activities.Add(this.confirmConfirmDialogFormActivity);
            this.confirmStateInitializationActivity.Name = "confirmStateInitializationActivity";
            // 
            // showPageReferingEventDrivenActivity_Finish
            // 
            this.showPageReferingEventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity1);
            this.showPageReferingEventDrivenActivity_Finish.Activities.Add(this.setStateActivity7);
            this.showPageReferingEventDrivenActivity_Finish.Name = "showPageReferingEventDrivenActivity_Finish";
            // 
            // showPageReferingStateInitializationActivity
            // 
            this.showPageReferingStateInitializationActivity.Activities.Add(this.showPageReferingCodeActivity_Initialize);
            this.showPageReferingStateInitializationActivity.Activities.Add(this.showPageReferingConfirmDialogFormActivity);
            this.showPageReferingStateInitializationActivity.Name = "showPageReferingStateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.initializeIfElseActivity_IsPageReferingPageType);
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
            // showPageReferingStateActivity
            // 
            this.showPageReferingStateActivity.Activities.Add(this.showPageReferingStateInitializationActivity);
            this.showPageReferingStateActivity.Activities.Add(this.showPageReferingEventDrivenActivity_Finish);
            this.showPageReferingStateActivity.Name = "showPageReferingStateActivity";
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
            // DeletePageTypeWorkflow
            // 
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.showPageReferingStateActivity);
            this.Activities.Add(this.confirmStateActivity);
            this.Activities.Add(this.finalizeStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "DeletePageTypeWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateInitializationActivity initializeStateInitializationActivity;
        private SetStateActivity setStateActivity1;
        private StateActivity finalStateActivity;
        private StateActivity initializeStateActivity;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private IfElseActivity initializeIfElseActivity_IsPageReferingPageType;
        private StateActivity confirmStateActivity;
        private StateActivity showPageReferingStateActivity;
        private SetStateActivity setStateActivity3;
        private SetStateActivity setStateActivity2;
        private SetStateActivity setStateActivity6;
        private SetStateActivity setStateActivity4;
        private SetStateActivity setStateActivity5;
        private SetStateActivity setStateActivity7;
        private StateInitializationActivity finalizeStateInitializationActivity;
        private EventDrivenActivity confirmEventDrivenActivity_Cancel;
        private EventDrivenActivity confirmEventDrivenActivity_Finish;
        private StateInitializationActivity confirmStateInitializationActivity;
        private EventDrivenActivity showPageReferingEventDrivenActivity_Finish;
        private StateInitializationActivity showPageReferingStateInitializationActivity;
        private StateActivity finalizeStateActivity;
        private C1Console.Workflow.Activities.ConfirmDialogFormActivity confirmConfirmDialogFormActivity;
        private CodeActivity confirmCodeActivity_Initialize;
        private C1Console.Workflow.Activities.ConfirmDialogFormActivity showPageReferingConfirmDialogFormActivity;
        private CodeActivity showPageReferingCodeActivity_Initialize;
        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;
        private C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity2;
        private C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;
        private CodeActivity finalizeCodeActivity_Finalize;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;
















































































































    }
}
