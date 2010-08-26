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

namespace Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider
{
    partial class UploadWebsiteFileWorkflow
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
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.finalizeCodeActivity_ShowErrorMessage = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.closeCurrentViewActivity1 = new Composite.C1Console.Workflow.Activities.CloseCurrentViewActivity();
            this.finalizeCodeActivity_SaveFile = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity8 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity6 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity5 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity9 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity3 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity10 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.confirmDialogFormActivity1 = new Composite.C1Console.Workflow.Activities.ConfirmDialogFormActivity();
            this.ifElse_IsUploadTypeOk = new System.Workflow.Activities.IfElseActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.ifElseActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.finishHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.dataDialogFormActivity1 = new Composite.C1Console.Workflow.Activities.DataDialogFormActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.initializeCodeActivity_Initialize = new System.Workflow.Activities.CodeActivity();
            this.confirmOverwriteEventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.confirmOverwriteEventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.confirmOverwriteStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step1EventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step1EventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.stateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.confirmOverwriteStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalizeStateActivity = new System.Workflow.Activities.StateActivity();
            this.step1StateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "step1StateActivity";
            // 
            // finalizeCodeActivity_ShowErrorMessage
            // 
            this.finalizeCodeActivity_ShowErrorMessage.Name = "finalizeCodeActivity_ShowErrorMessage";
            this.finalizeCodeActivity_ShowErrorMessage.ExecuteCode += new System.EventHandler(this.finalizeCodeActivity_ShowErrorMessage_ExecuteCode);
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "finalStateActivity";
            // 
            // closeCurrentViewActivity1
            // 
            this.closeCurrentViewActivity1.Name = "closeCurrentViewActivity1";
            // 
            // finalizeCodeActivity_SaveFile
            // 
            this.finalizeCodeActivity_SaveFile.Name = "finalizeCodeActivity_SaveFile";
            this.finalizeCodeActivity_SaveFile.ExecuteCode += new System.EventHandler(this.finalizeCodeActivity_SaveFile_ExecuteCode);
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "finalizeStateActivity";
            // 
            // setStateActivity8
            // 
            this.setStateActivity8.Name = "setStateActivity8";
            this.setStateActivity8.TargetStateName = "confirmOverwriteStateActivity";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.finalizeCodeActivity_ShowErrorMessage);
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity6);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.finalizeCodeActivity_SaveFile);
            this.ifElseBranchActivity1.Activities.Add(this.closeCurrentViewActivity1);
            this.ifElseBranchActivity1.Activities.Add(this.setStateActivity5);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.IsUploadTypeOk);
            this.ifElseBranchActivity1.Condition = codecondition1;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // ifElseBranchActivity6
            // 
            this.ifElseBranchActivity6.Activities.Add(this.setStateActivity3);
            this.ifElseBranchActivity6.Name = "ifElseBranchActivity6";
            // 
            // ifElseBranchActivity5
            // 
            this.ifElseBranchActivity5.Activities.Add(this.setStateActivity8);
            codecondition2.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.FileExist);
            this.ifElseBranchActivity5.Condition = codecondition2;
            this.ifElseBranchActivity5.Name = "ifElseBranchActivity5";
            // 
            // setStateActivity9
            // 
            this.setStateActivity9.Name = "setStateActivity9";
            this.setStateActivity9.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity3
            // 
            this.cancelHandleExternalEventActivity3.EventName = "Cancel";
            this.cancelHandleExternalEventActivity3.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity3.Name = "cancelHandleExternalEventActivity3";
            // 
            // setStateActivity10
            // 
            this.setStateActivity10.Name = "setStateActivity10";
            this.setStateActivity10.TargetStateName = "finalizeStateActivity";
            // 
            // finishHandleExternalEventActivity2
            // 
            this.finishHandleExternalEventActivity2.EventName = "Finish";
            this.finishHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity2.Name = "finishHandleExternalEventActivity2";
            // 
            // confirmDialogFormActivity1
            // 
            this.confirmDialogFormActivity1.ContainerLabel = null;
            this.confirmDialogFormActivity1.FormDefinitionFileName = "/Administrative/WebsiteFileElementProviderUploadNewWebsiteFileConfirm.xml";
            this.confirmDialogFormActivity1.Name = "confirmDialogFormActivity1";
            // 
            // ifElse_IsUploadTypeOk
            // 
            this.ifElse_IsUploadTypeOk.Activities.Add(this.ifElseBranchActivity1);
            this.ifElse_IsUploadTypeOk.Activities.Add(this.ifElseBranchActivity2);
            this.ifElse_IsUploadTypeOk.Name = "ifElse_IsUploadTypeOk";
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
            // ifElseActivity1
            // 
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity5);
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity6);
            this.ifElseActivity1.Name = "ifElseActivity1";
            // 
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // dataDialogFormActivity1
            // 
            this.dataDialogFormActivity1.ContainerLabel = null;
            this.dataDialogFormActivity1.FormDefinitionFileName = "/Administrative/WebsiteFileElementProviderUploadNewWebsiteFile.xml";
            this.dataDialogFormActivity1.Name = "dataDialogFormActivity1";
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
            // confirmOverwriteEventDrivenActivity_Cancel
            // 
            this.confirmOverwriteEventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity3);
            this.confirmOverwriteEventDrivenActivity_Cancel.Activities.Add(this.setStateActivity9);
            this.confirmOverwriteEventDrivenActivity_Cancel.Name = "confirmOverwriteEventDrivenActivity_Cancel";
            // 
            // confirmOverwriteEventDrivenActivity_Finish
            // 
            this.confirmOverwriteEventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity2);
            this.confirmOverwriteEventDrivenActivity_Finish.Activities.Add(this.setStateActivity10);
            this.confirmOverwriteEventDrivenActivity_Finish.Name = "confirmOverwriteEventDrivenActivity_Finish";
            // 
            // confirmOverwriteStateInitializationActivity
            // 
            this.confirmOverwriteStateInitializationActivity.Activities.Add(this.confirmDialogFormActivity1);
            this.confirmOverwriteStateInitializationActivity.Name = "confirmOverwriteStateInitializationActivity";
            // 
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.ifElse_IsUploadTypeOk);
            this.finalizeStateInitializationActivity.Name = "finalizeStateInitializationActivity";
            // 
            // step1EventDrivenActivity_Cancel
            // 
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.setStateActivity4);
            this.step1EventDrivenActivity_Cancel.Name = "step1EventDrivenActivity_Cancel";
            // 
            // step1EventDrivenActivity_Finish
            // 
            this.step1EventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity1);
            this.step1EventDrivenActivity_Finish.Activities.Add(this.ifElseActivity1);
            this.step1EventDrivenActivity_Finish.Name = "step1EventDrivenActivity_Finish";
            // 
            // stateInitializationActivity
            // 
            this.stateInitializationActivity.Activities.Add(this.dataDialogFormActivity1);
            this.stateInitializationActivity.Name = "stateInitializationActivity";
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
            this.setStateActivity1.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity1
            // 
            this.cancelHandleExternalEventActivity1.EventName = "Cancel";
            this.cancelHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity1.Name = "cancelHandleExternalEventActivity1";
            // 
            // confirmOverwriteStateActivity
            // 
            this.confirmOverwriteStateActivity.Activities.Add(this.confirmOverwriteStateInitializationActivity);
            this.confirmOverwriteStateActivity.Activities.Add(this.confirmOverwriteEventDrivenActivity_Finish);
            this.confirmOverwriteStateActivity.Activities.Add(this.confirmOverwriteEventDrivenActivity_Cancel);
            this.confirmOverwriteStateActivity.Name = "confirmOverwriteStateActivity";
            // 
            // finalizeStateActivity
            // 
            this.finalizeStateActivity.Activities.Add(this.finalizeStateInitializationActivity);
            this.finalizeStateActivity.Name = "finalizeStateActivity";
            // 
            // step1StateActivity
            // 
            this.step1StateActivity.Activities.Add(this.stateInitializationActivity);
            this.step1StateActivity.Activities.Add(this.step1EventDrivenActivity_Finish);
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
            // UploadWebsiteFileWorkflow
            // 
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.step1StateActivity);
            this.Activities.Add(this.finalizeStateActivity);
            this.Activities.Add(this.confirmOverwriteStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "UploadWebsiteFileWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateInitializationActivity initializeStateInitializationActivity;
        private SetStateActivity setStateActivity1;
        private StateActivity finalStateActivity;
        private StateActivity initializeStateActivity;
        private SetStateActivity setStateActivity5;
        private SetStateActivity setStateActivity4;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;
        private SetStateActivity setStateActivity3;
        private Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;
        private Composite.C1Console.Workflow.Activities.DataDialogFormActivity dataDialogFormActivity1;
        private SetStateActivity setStateActivity2;
        private StateInitializationActivity finalizeStateInitializationActivity;
        private EventDrivenActivity step1EventDrivenActivity_Cancel;
        private EventDrivenActivity step1EventDrivenActivity_Finish;
        private StateInitializationActivity stateInitializationActivity;
        private StateActivity finalizeStateActivity;
        private StateActivity step1StateActivity;
        private CodeActivity initializeCodeActivity_Initialize;
        private CodeActivity finalizeCodeActivity_SaveFile;
        private SetStateActivity setStateActivity6;
        private CodeActivity finalizeCodeActivity_ShowErrorMessage;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private IfElseActivity ifElse_IsUploadTypeOk;
        private Composite.C1Console.Workflow.Activities.CloseCurrentViewActivity closeCurrentViewActivity1;
        private StateInitializationActivity confirmOverwriteStateInitializationActivity;
        private StateActivity confirmOverwriteStateActivity;
        private Composite.C1Console.Workflow.Activities.ConfirmDialogFormActivity confirmDialogFormActivity1;
        private IfElseBranchActivity ifElseBranchActivity6;
        private IfElseBranchActivity ifElseBranchActivity5;
        private IfElseActivity ifElseActivity1;
        private SetStateActivity setStateActivity8;
        private SetStateActivity setStateActivity9;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity3;
        private SetStateActivity setStateActivity10;
        private Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity2;
        private EventDrivenActivity confirmOverwriteEventDrivenActivity_Cancel;
        private EventDrivenActivity confirmOverwriteEventDrivenActivity_Finish;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;























































































































    }
}
