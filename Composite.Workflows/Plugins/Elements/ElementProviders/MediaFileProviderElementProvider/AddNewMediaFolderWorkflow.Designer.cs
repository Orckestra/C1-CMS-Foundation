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
    partial class AddNewMediaFolderWorkflow
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
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.step1IfElseBranchActivity_DoesFolderExist = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.closeCurrentViewActivity1 = new Composite.C1Console.Workflow.Activities.CloseCurrentViewActivity();
            this.finalizeCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.ifElseActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.finishHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.wizzardFormActivity1 = new Composite.C1Console.Workflow.Activities.DataDialogFormActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.initializeAddNewfolderCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.stateInitializationActivity3 = new System.Workflow.Activities.StateInitializationActivity();
            this.step1EventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step1EventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.stateInitializationActivity2 = new System.Workflow.Activities.StateInitializationActivity();
            this.stateInitializationActivity1 = new System.Workflow.Activities.StateInitializationActivity();
            this.cancelActivity = new System.Workflow.Activities.EventDrivenActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalizeStateActivity = new System.Workflow.Activities.StateActivity();
            this.step1StateActivity = new System.Workflow.Activities.StateActivity();
            this.AddNewMediaFolderWorkflowInitialState = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "step1StateActivity";
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "finalizeStateActivity";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity3);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // step1IfElseBranchActivity_DoesFolderExist
            // 
            this.step1IfElseBranchActivity_DoesFolderExist.Activities.Add(this.setStateActivity6);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.ValidateInputs);
            this.step1IfElseBranchActivity_DoesFolderExist.Condition = codecondition1;
            this.step1IfElseBranchActivity_DoesFolderExist.Name = "step1IfElseBranchActivity_DoesFolderExist";
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
            // finalizeCodeActivity
            // 
            this.finalizeCodeActivity.Name = "finalizeCodeActivity";
            this.finalizeCodeActivity.ExecuteCode += new System.EventHandler(this.finalizeCodeActivity_ExecuteCode);
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
            this.ifElseActivity1.Activities.Add(this.step1IfElseBranchActivity_DoesFolderExist);
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
            this.wizzardFormActivity1.FormDefinitionFileName = "/Administrative/AddNewMediaFolder.xml";
            this.wizzardFormActivity1.Name = "wizzardFormActivity1";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "step1StateActivity";
            // 
            // initializeAddNewfolderCodeActivity
            // 
            this.initializeAddNewfolderCodeActivity.Name = "initializeAddNewfolderCodeActivity";
            this.initializeAddNewfolderCodeActivity.ExecuteCode += new System.EventHandler(this.initializeAddNewfolderCodeActivity_ExecuteCode);
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
            // stateInitializationActivity3
            // 
            this.stateInitializationActivity3.Activities.Add(this.finalizeCodeActivity);
            this.stateInitializationActivity3.Activities.Add(this.closeCurrentViewActivity1);
            this.stateInitializationActivity3.Activities.Add(this.setStateActivity4);
            this.stateInitializationActivity3.Name = "stateInitializationActivity3";
            // 
            // step1EventDrivenActivity_Cancel
            // 
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.setStateActivity5);
            this.step1EventDrivenActivity_Cancel.Name = "step1EventDrivenActivity_Cancel";
            // 
            // step1EventDrivenActivity_Finish
            // 
            this.step1EventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity1);
            this.step1EventDrivenActivity_Finish.Activities.Add(this.ifElseActivity1);
            this.step1EventDrivenActivity_Finish.Name = "step1EventDrivenActivity_Finish";
            // 
            // stateInitializationActivity2
            // 
            this.stateInitializationActivity2.Activities.Add(this.wizzardFormActivity1);
            this.stateInitializationActivity2.Name = "stateInitializationActivity2";
            // 
            // stateInitializationActivity1
            // 
            this.stateInitializationActivity1.Activities.Add(this.initializeAddNewfolderCodeActivity);
            this.stateInitializationActivity1.Activities.Add(this.setStateActivity2);
            this.stateInitializationActivity1.Name = "stateInitializationActivity1";
            // 
            // cancelActivity
            // 
            this.cancelActivity.Activities.Add(this.cancelHandleExternalEventActivity1);
            this.cancelActivity.Activities.Add(this.setStateActivity1);
            this.cancelActivity.Name = "cancelActivity";
            // 
            // finalStateActivity
            // 
            this.finalStateActivity.Name = "finalStateActivity";
            // 
            // finalizeStateActivity
            // 
            this.finalizeStateActivity.Activities.Add(this.stateInitializationActivity3);
            this.finalizeStateActivity.Name = "finalizeStateActivity";
            // 
            // step1StateActivity
            // 
            this.step1StateActivity.Activities.Add(this.stateInitializationActivity2);
            this.step1StateActivity.Activities.Add(this.step1EventDrivenActivity_Finish);
            this.step1StateActivity.Activities.Add(this.step1EventDrivenActivity_Cancel);
            this.step1StateActivity.Name = "step1StateActivity";
            // 
            // AddNewMediaFolderWorkflowInitialState
            // 
            this.AddNewMediaFolderWorkflowInitialState.Activities.Add(this.stateInitializationActivity1);
            this.AddNewMediaFolderWorkflowInitialState.Name = "AddNewMediaFolderWorkflowInitialState";
            // 
            // AddNewMediaFolderWorkflow
            // 
            this.Activities.Add(this.AddNewMediaFolderWorkflowInitialState);
            this.Activities.Add(this.step1StateActivity);
            this.Activities.Add(this.finalizeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.cancelActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "AddNewMediaFolderWorkflowInitialState";
            this.Name = "AddNewMediaFolderWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private CodeActivity initializeAddNewfolderCodeActivity;

        private StateInitializationActivity stateInitializationActivity1;

        private StateActivity finalStateActivity;

        private StateActivity finalizeStateActivity;

        private StateActivity step1StateActivity;

        private StateInitializationActivity stateInitializationActivity3;

        private StateInitializationActivity stateInitializationActivity2;

        private SetStateActivity setStateActivity3;

        private C1Console.Workflow.Activities.DataDialogFormActivity wizzardFormActivity1;

        private SetStateActivity setStateActivity2;

        private SetStateActivity setStateActivity1;

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;

        private EventDrivenActivity step1EventDrivenActivity_Finish;

        private EventDrivenActivity cancelActivity;

        private SetStateActivity setStateActivity4;

        private C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;

        private CodeActivity finalizeCodeActivity;

        private SetStateActivity setStateActivity5;

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;

        private EventDrivenActivity step1EventDrivenActivity_Cancel;

        private C1Console.Workflow.Activities.CloseCurrentViewActivity closeCurrentViewActivity1;

        private IfElseBranchActivity ifElseBranchActivity2;

        private IfElseBranchActivity step1IfElseBranchActivity_DoesFolderExist;

        private IfElseActivity ifElseActivity1;

        private SetStateActivity setStateActivity6;

        private StateActivity AddNewMediaFolderWorkflowInitialState;





















    }
}
