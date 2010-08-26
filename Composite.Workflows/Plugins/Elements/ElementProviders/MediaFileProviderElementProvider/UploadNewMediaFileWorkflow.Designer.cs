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

namespace Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider
{
    partial class UploadNewMediaFileWorkflow
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
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.showConsoleMessageBoxActivity1 = new Composite.C1Console.Workflow.Activities.ShowConsoleMessageBoxActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.closeCurrentViewActivity1 = new Composite.C1Console.Workflow.Activities.CloseCurrentViewActivity();
            this.codeActivity1 = new System.Workflow.Activities.CodeActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.ifElseActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.finishHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.wizzardFormActivity1 = new Composite.C1Console.Workflow.Activities.DataDialogFormActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.codeActivity2 = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.cancelEventDrivenActivity = new System.Workflow.Activities.EventDrivenActivity();
            this.finishEventDrivenActivity = new System.Workflow.Activities.EventDrivenActivity();
            this.stateInitializationActivity2 = new System.Workflow.Activities.StateInitializationActivity();
            this.stateInitializationActivity1 = new System.Workflow.Activities.StateInitializationActivity();
            this.eventDrivenActivity1 = new System.Workflow.Activities.EventDrivenActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.showUploadStateActivity = new System.Workflow.Activities.StateActivity();
            this.initialState = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "showUploadStateActivity";
            // 
            // showConsoleMessageBoxActivity1
            // 
            this.showConsoleMessageBoxActivity1.DialogType = Composite.C1Console.Events.DialogType.Error;
            this.showConsoleMessageBoxActivity1.Message = "${Composite.Management,Website.Forms.Administrative.UploadMediaFile.EmptyFileErro" +
                "rMessage}";
            this.showConsoleMessageBoxActivity1.Name = "showConsoleMessageBoxActivity1";
            this.showConsoleMessageBoxActivity1.Title = "${Composite.Management,Website.Forms.Administrative.UploadMediaFile.EmptyFileErro" +
                "rTitle}";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "finalStateActivity";
            // 
            // closeCurrentViewActivity1
            // 
            this.closeCurrentViewActivity1.Name = "closeCurrentViewActivity1";
            // 
            // codeActivity1
            // 
            this.codeActivity1.Name = "codeActivity1";
            this.codeActivity1.ExecuteCode += new System.EventHandler(this.uploadCodeActivity_ExecuteCode);
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.showConsoleMessageBoxActivity1);
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity4);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.codeActivity1);
            this.ifElseBranchActivity1.Activities.Add(this.closeCurrentViewActivity1);
            this.ifElseBranchActivity1.Activities.Add(this.setStateActivity3);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.HasUserUploaded);
            this.ifElseBranchActivity1.Condition = codecondition1;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "finalStateActivity";
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
            this.wizzardFormActivity1.FormDefinitionFileName = "/Administrative/UploadNewMediaFile.xml";
            this.wizzardFormActivity1.Name = "wizzardFormActivity1";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "showUploadStateActivity";
            // 
            // codeActivity2
            // 
            this.codeActivity2.Name = "codeActivity2";
            this.codeActivity2.ExecuteCode += new System.EventHandler(this.initializeCodeActivity_ExecuteCode);
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
            // cancelEventDrivenActivity
            // 
            this.cancelEventDrivenActivity.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.cancelEventDrivenActivity.Activities.Add(this.setStateActivity5);
            this.cancelEventDrivenActivity.Name = "cancelEventDrivenActivity";
            // 
            // finishEventDrivenActivity
            // 
            this.finishEventDrivenActivity.Activities.Add(this.finishHandleExternalEventActivity1);
            this.finishEventDrivenActivity.Activities.Add(this.ifElseActivity1);
            this.finishEventDrivenActivity.Name = "finishEventDrivenActivity";
            // 
            // stateInitializationActivity2
            // 
            this.stateInitializationActivity2.Activities.Add(this.wizzardFormActivity1);
            this.stateInitializationActivity2.Name = "stateInitializationActivity2";
            // 
            // stateInitializationActivity1
            // 
            this.stateInitializationActivity1.Activities.Add(this.codeActivity2);
            this.stateInitializationActivity1.Activities.Add(this.setStateActivity2);
            this.stateInitializationActivity1.Name = "stateInitializationActivity1";
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
            // showUploadStateActivity
            // 
            this.showUploadStateActivity.Activities.Add(this.stateInitializationActivity2);
            this.showUploadStateActivity.Activities.Add(this.finishEventDrivenActivity);
            this.showUploadStateActivity.Activities.Add(this.cancelEventDrivenActivity);
            this.showUploadStateActivity.Name = "showUploadStateActivity";
            // 
            // initialState
            // 
            this.initialState.Activities.Add(this.stateInitializationActivity1);
            this.initialState.Name = "initialState";
            // 
            // UploadNewMediaFileWorkflow
            // 
            this.Activities.Add(this.initialState);
            this.Activities.Add(this.showUploadStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.eventDrivenActivity1);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initialState";
            this.Name = "UploadNewMediaFileWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private StateActivity finalStateActivity;
        private StateActivity showUploadStateActivity;
        private StateInitializationActivity stateInitializationActivity1;
        private CodeActivity codeActivity1;
        private Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;
        private Composite.C1Console.Workflow.Activities.DataDialogFormActivity wizzardFormActivity1;
        private SetStateActivity setStateActivity2;
        private CodeActivity codeActivity2;
        private SetStateActivity setStateActivity1;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private EventDrivenActivity finishEventDrivenActivity;
        private StateInitializationActivity stateInitializationActivity2;
        private EventDrivenActivity eventDrivenActivity1;
        private SetStateActivity setStateActivity3;
        private SetStateActivity setStateActivity4;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private IfElseActivity ifElseActivity1;
        private SetStateActivity setStateActivity5;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;
        private EventDrivenActivity cancelEventDrivenActivity;
        private Composite.C1Console.Workflow.Activities.CloseCurrentViewActivity closeCurrentViewActivity1;
        private Composite.C1Console.Workflow.Activities.ShowConsoleMessageBoxActivity showConsoleMessageBoxActivity1;
        private StateActivity initialState;















    }
}
