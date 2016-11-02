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

namespace Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider
{
    partial class UploadAndExtractZipFileWorkflow
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
            System.Workflow.Activities.CodeCondition codecondition2 = new System.Workflow.Activities.CodeCondition();
            this.setStateActivity7 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.closeCurrentViewActivity1 = new Composite.C1Console.Workflow.Activities.CloseCurrentViewActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.codeActivity3 = new System.Workflow.Activities.CodeActivity();
            this.ifElseBranchActivity4 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity3 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseActivity2 = new System.Workflow.Activities.IfElseActivity();
            this.codeActivity2 = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.ifElseActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.finishHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.wizzardFormActivity1 = new Composite.C1Console.Workflow.Activities.DataDialogFormActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.codeActivity1 = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.cancelEventDrivenActivity = new System.Workflow.Activities.EventDrivenActivity();
            this.finishEventDrivenActivity = new System.Workflow.Activities.EventDrivenActivity();
            this.selectZipStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initialStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity1 = new System.Workflow.Activities.EventDrivenActivity();
            this.finalizeStateActivity = new System.Workflow.Activities.StateActivity();
            this.selectZipFileStateActivity = new System.Workflow.Activities.StateActivity();
            this.initialState = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity7
            // 
            this.setStateActivity7.Name = "setStateActivity7";
            this.setStateActivity7.TargetStateName = "selectZipFileStateActivity";
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "finalStateActivity";
            // 
            // closeCurrentViewActivity1
            // 
            this.closeCurrentViewActivity1.Name = "closeCurrentViewActivity1";
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "selectZipFileStateActivity";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "finalizeStateActivity";
            // 
            // codeActivity3
            // 
            this.codeActivity3.Name = "codeActivity3";
            this.codeActivity3.ExecuteCode += new System.EventHandler(this.HandleFinish_ExecuteCode);
            // 
            // ifElseBranchActivity4
            // 
            this.ifElseBranchActivity4.Activities.Add(this.setStateActivity7);
            this.ifElseBranchActivity4.Name = "ifElseBranchActivity4";
            // 
            // ifElseBranchActivity3
            // 
            this.ifElseBranchActivity3.Activities.Add(this.closeCurrentViewActivity1);
            this.ifElseBranchActivity3.Activities.Add(this.setStateActivity4);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.ZipWasUploaded);
            this.ifElseBranchActivity3.Condition = codecondition1;
            this.ifElseBranchActivity3.Name = "ifElseBranchActivity3";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity5);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.codeActivity3);
            this.ifElseBranchActivity1.Activities.Add(this.setStateActivity3);
            codecondition2.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.HasUserUploaded);
            this.ifElseBranchActivity1.Condition = codecondition2;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // ifElseActivity2
            // 
            this.ifElseActivity2.Activities.Add(this.ifElseBranchActivity3);
            this.ifElseActivity2.Activities.Add(this.ifElseBranchActivity4);
            this.ifElseActivity2.Name = "ifElseActivity2";
            // 
            // codeActivity2
            // 
            this.codeActivity2.Name = "codeActivity2";
            this.codeActivity2.ExecuteCode += new System.EventHandler(this.FinalizeCodeActivity_ExecuteCode);
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity2
            // 
            this.cancelHandleExternalEventActivity2.EventName = "Cancel";
            this.cancelHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity2.Name = "cancelHandleExternalEventActivity2";
            // 
            // ifElseActivity1
            // 
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity1);
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity2);
            this.ifElseActivity1.Name = "ifElseActivity1";
            // 
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // wizzardFormActivity1
            // 
            this.wizzardFormActivity1.ContainerLabel = null;
            this.wizzardFormActivity1.FormDefinitionFileName = "/Administrative/WebsiteFileElementProviderUploadAndExtractZipFile.xml";
            this.wizzardFormActivity1.Name = "wizzardFormActivity1";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "selectZipFileStateActivity";
            // 
            // codeActivity1
            // 
            this.codeActivity1.Name = "codeActivity1";
            this.codeActivity1.ExecuteCode += new System.EventHandler(this.InitializeCodeActivity_ExecuteCode);
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
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.codeActivity2);
            this.finalizeStateInitializationActivity.Activities.Add(this.ifElseActivity2);
            this.finalizeStateInitializationActivity.Name = "finalizeStateInitializationActivity";
            // 
            // cancelEventDrivenActivity
            // 
            this.cancelEventDrivenActivity.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.cancelEventDrivenActivity.Activities.Add(this.setStateActivity6);
            this.cancelEventDrivenActivity.Name = "cancelEventDrivenActivity";
            // 
            // finishEventDrivenActivity
            // 
            this.finishEventDrivenActivity.Activities.Add(this.finishHandleExternalEventActivity1);
            this.finishEventDrivenActivity.Activities.Add(this.ifElseActivity1);
            this.finishEventDrivenActivity.Name = "finishEventDrivenActivity";
            // 
            // selectZipStateInitializationActivity
            // 
            this.selectZipStateInitializationActivity.Activities.Add(this.wizzardFormActivity1);
            this.selectZipStateInitializationActivity.Name = "selectZipStateInitializationActivity";
            // 
            // initialStateInitializationActivity
            // 
            this.initialStateInitializationActivity.Activities.Add(this.codeActivity1);
            this.initialStateInitializationActivity.Activities.Add(this.setStateActivity2);
            this.initialStateInitializationActivity.Name = "initialStateInitializationActivity";
            // 
            // finalStateActivity
            // 
            this.finalStateActivity.Name = "finalStateActivity";
            // 
            // eventDrivenActivity1
            // 
            this.eventDrivenActivity1.Activities.Add(this.cancelHandleExternalEventActivity1);
            this.eventDrivenActivity1.Activities.Add(this.setStateActivity1);
            this.eventDrivenActivity1.Name = "eventDrivenActivity1";
            // 
            // finalizeStateActivity
            // 
            this.finalizeStateActivity.Activities.Add(this.finalizeStateInitializationActivity);
            this.finalizeStateActivity.Name = "finalizeStateActivity";
            // 
            // selectZipFileStateActivity
            // 
            this.selectZipFileStateActivity.Activities.Add(this.selectZipStateInitializationActivity);
            this.selectZipFileStateActivity.Activities.Add(this.finishEventDrivenActivity);
            this.selectZipFileStateActivity.Activities.Add(this.cancelEventDrivenActivity);
            this.selectZipFileStateActivity.Name = "selectZipFileStateActivity";
            // 
            // initialState
            // 
            this.initialState.Activities.Add(this.initialStateInitializationActivity);
            this.initialState.Name = "initialState";
            // 
            // UploadAndExtractZipFileWorkflow
            // 
            this.Activities.Add(this.initialState);
            this.Activities.Add(this.selectZipFileStateActivity);
            this.Activities.Add(this.finalizeStateActivity);
            this.Activities.Add(this.eventDrivenActivity1);
            this.Activities.Add(this.finalStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initialState";
            this.Name = "UploadAndExtractZipFileWorkflow";
            this.CanModifyActivities = false;

        }




















        #endregion

        private StateActivity selectZipFileStateActivity;
        private StateActivity finalizeStateActivity;
        private EventDrivenActivity eventDrivenActivity1;
        private StateInitializationActivity initialStateInitializationActivity;
        private StateActivity finalStateActivity;
        private CodeActivity codeActivity1;
        private StateInitializationActivity finalizeStateInitializationActivity;
        private StateInitializationActivity selectZipStateInitializationActivity;
        private C1Console.Workflow.Activities.DataDialogFormActivity wizzardFormActivity1;
        private SetStateActivity setStateActivity2;
        private SetStateActivity setStateActivity1;
        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private SetStateActivity setStateActivity4;
        private CodeActivity codeActivity2;
        private SetStateActivity setStateActivity3;
        private CodeActivity codeActivity3;
        private C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;
        private EventDrivenActivity finishEventDrivenActivity;
        private SetStateActivity setStateActivity5;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private IfElseActivity ifElseActivity1;
        private C1Console.Workflow.Activities.CloseCurrentViewActivity closeCurrentViewActivity1;
        private SetStateActivity setStateActivity6;
        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;
        private EventDrivenActivity cancelEventDrivenActivity;
        private IfElseBranchActivity ifElseBranchActivity4;
        private IfElseBranchActivity ifElseBranchActivity3;
        private IfElseActivity ifElseActivity2;
        private SetStateActivity setStateActivity7;
        private StateActivity initialState;
    }
}
