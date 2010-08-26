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

namespace Composite.Plugins.Elements.ElementProviders.LocalizationElementProvider
{
    partial class AddSystemLocaleWorkflow
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
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.codeActivity_ShowBalloon = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity8 = new System.Workflow.Activities.SetStateActivity();
            this.showConsoleMessageBoxActivity1 = new Composite.C1Console.Workflow.Activities.ShowConsoleMessageBoxActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.initializeCodeActivity_Initialize = new System.Workflow.Activities.CodeActivity();
            this.ifElseBranchActivity4 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity3 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity7 = new System.Workflow.Activities.SetStateActivity();
            this.rerenderViewActivity1 = new Composite.C1Console.Workflow.Activities.RerenderViewActivity();
            this.updateRulMappingNameCodeActivity_Update = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.finalizeCodeActivity_Finalize = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.customEvent01HandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CustomEvent01HandleExternalEventActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.ifElse_UrlMappingNameInUse = new System.Workflow.Activities.IfElseActivity();
            this.finishHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.step1DataDialogFormActivity = new Composite.C1Console.Workflow.Activities.DataDialogFormActivity();
            this.ifElseActivity_HasAnyWhiteListedLocales = new System.Workflow.Activities.IfElseActivity();
            this.updateUrlMappingNameStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step1EventDrivenActivity_SelectionChange = new System.Workflow.Activities.EventDrivenActivity();
            this.step1EventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step1EventDrivenActivity_Ok = new System.Workflow.Activities.EventDrivenActivity();
            this.step1StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.updateUrlMappingNameStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalizeStateActivity = new System.Workflow.Activities.StateActivity();
            this.step1StateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "finalizeStateActivity";
            // 
            // codeActivity_ShowBalloon
            // 
            this.codeActivity_ShowBalloon.Name = "codeActivity_ShowBalloon";
            this.codeActivity_ShowBalloon.ExecuteCode += new System.EventHandler(this.codeActivity_ShowBalloon_ExecuteCode);
            // 
            // setStateActivity8
            // 
            this.setStateActivity8.Name = "setStateActivity8";
            this.setStateActivity8.TargetStateName = "finalStateActivity";
            // 
            // showConsoleMessageBoxActivity1
            // 
            this.showConsoleMessageBoxActivity1.DialogType = Composite.C1Console.Events.DialogType.Warning;
            this.showConsoleMessageBoxActivity1.Message = "${Composite.Plugins.LocalizationElementProvider, AddSystemLocaleWorkflow." +
                "NoMoreLocalesMessage}";
            this.showConsoleMessageBoxActivity1.Name = "showConsoleMessageBoxActivity1";
            this.showConsoleMessageBoxActivity1.Title = "${Composite.Plugins.LocalizationElementProvider, AddSystemLocaleWorkflow." +
                "NoMoreLocalesTitle}";
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
            // ifElseBranchActivity4
            // 
            this.ifElseBranchActivity4.Activities.Add(this.setStateActivity3);
            this.ifElseBranchActivity4.Name = "ifElseBranchActivity4";
            // 
            // ifElseBranchActivity3
            // 
            this.ifElseBranchActivity3.Activities.Add(this.codeActivity_ShowBalloon);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.UrlMappingNameInUse);
            this.ifElseBranchActivity3.Condition = codecondition1;
            this.ifElseBranchActivity3.Name = "ifElseBranchActivity3";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.showConsoleMessageBoxActivity1);
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity8);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.initializeCodeActivity_Initialize);
            this.ifElseBranchActivity1.Activities.Add(this.setStateActivity2);
            codecondition2.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.HasAnyWhiteListedLocales);
            this.ifElseBranchActivity1.Condition = codecondition2;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // setStateActivity7
            // 
            this.setStateActivity7.Name = "setStateActivity7";
            this.setStateActivity7.TargetStateName = "step1StateActivity";
            // 
            // rerenderViewActivity1
            // 
            this.rerenderViewActivity1.Name = "rerenderViewActivity1";
            // 
            // updateRulMappingNameCodeActivity_Update
            // 
            this.updateRulMappingNameCodeActivity_Update.Name = "updateRulMappingNameCodeActivity_Update";
            this.updateRulMappingNameCodeActivity_Update.ExecuteCode += new System.EventHandler(this.updateRulMappingNameCodeActivity_Update_ExecuteCode);
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "finalStateActivity";
            // 
            // finalizeCodeActivity_Finalize
            // 
            this.finalizeCodeActivity_Finalize.Name = "finalizeCodeActivity_Finalize";
            this.finalizeCodeActivity_Finalize.ExecuteCode += new System.EventHandler(this.finalizeCodeActivity_Finalize_ExecuteCode);
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "updateUrlMappingNameStateActivity";
            // 
            // customEvent01HandleExternalEventActivity1
            // 
            this.customEvent01HandleExternalEventActivity1.EventName = "CustomEvent01";
            this.customEvent01HandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.customEvent01HandleExternalEventActivity1.Name = "customEvent01HandleExternalEventActivity1";
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
            // ifElse_UrlMappingNameInUse
            // 
            this.ifElse_UrlMappingNameInUse.Activities.Add(this.ifElseBranchActivity3);
            this.ifElse_UrlMappingNameInUse.Activities.Add(this.ifElseBranchActivity4);
            this.ifElse_UrlMappingNameInUse.Name = "ifElse_UrlMappingNameInUse";
            // 
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // step1DataDialogFormActivity
            // 
            this.step1DataDialogFormActivity.ContainerLabel = null;
            this.step1DataDialogFormActivity.FormDefinitionFileName = "\\Administrative\\AddSystemLocaleStep1.xml";
            this.step1DataDialogFormActivity.Name = "step1DataDialogFormActivity";
            // 
            // ifElseActivity_HasAnyWhiteListedLocales
            // 
            this.ifElseActivity_HasAnyWhiteListedLocales.Activities.Add(this.ifElseBranchActivity1);
            this.ifElseActivity_HasAnyWhiteListedLocales.Activities.Add(this.ifElseBranchActivity2);
            this.ifElseActivity_HasAnyWhiteListedLocales.Name = "ifElseActivity_HasAnyWhiteListedLocales";
            // 
            // updateUrlMappingNameStateInitializationActivity
            // 
            this.updateUrlMappingNameStateInitializationActivity.Activities.Add(this.updateRulMappingNameCodeActivity_Update);
            this.updateUrlMappingNameStateInitializationActivity.Activities.Add(this.rerenderViewActivity1);
            this.updateUrlMappingNameStateInitializationActivity.Activities.Add(this.setStateActivity7);
            this.updateUrlMappingNameStateInitializationActivity.Name = "updateUrlMappingNameStateInitializationActivity";
            // 
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.finalizeCodeActivity_Finalize);
            this.finalizeStateInitializationActivity.Activities.Add(this.setStateActivity4);
            this.finalizeStateInitializationActivity.Name = "finalizeStateInitializationActivity";
            // 
            // step1EventDrivenActivity_SelectionChange
            // 
            this.step1EventDrivenActivity_SelectionChange.Activities.Add(this.customEvent01HandleExternalEventActivity1);
            this.step1EventDrivenActivity_SelectionChange.Activities.Add(this.setStateActivity6);
            this.step1EventDrivenActivity_SelectionChange.Name = "step1EventDrivenActivity_SelectionChange";
            // 
            // step1EventDrivenActivity_Cancel
            // 
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.setStateActivity5);
            this.step1EventDrivenActivity_Cancel.Name = "step1EventDrivenActivity_Cancel";
            // 
            // step1EventDrivenActivity_Ok
            // 
            this.step1EventDrivenActivity_Ok.Activities.Add(this.finishHandleExternalEventActivity1);
            this.step1EventDrivenActivity_Ok.Activities.Add(this.ifElse_UrlMappingNameInUse);
            this.step1EventDrivenActivity_Ok.Name = "step1EventDrivenActivity_Ok";
            // 
            // step1StateInitializationActivity
            // 
            this.step1StateInitializationActivity.Activities.Add(this.step1DataDialogFormActivity);
            this.step1StateInitializationActivity.Name = "step1StateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.ifElseActivity_HasAnyWhiteListedLocales);
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
            // updateUrlMappingNameStateActivity
            // 
            this.updateUrlMappingNameStateActivity.Activities.Add(this.updateUrlMappingNameStateInitializationActivity);
            this.updateUrlMappingNameStateActivity.Name = "updateUrlMappingNameStateActivity";
            // 
            // finalizeStateActivity
            // 
            this.finalizeStateActivity.Activities.Add(this.finalizeStateInitializationActivity);
            this.finalizeStateActivity.Name = "finalizeStateActivity";
            // 
            // step1StateActivity
            // 
            this.step1StateActivity.Activities.Add(this.step1StateInitializationActivity);
            this.step1StateActivity.Activities.Add(this.step1EventDrivenActivity_Ok);
            this.step1StateActivity.Activities.Add(this.step1EventDrivenActivity_Cancel);
            this.step1StateActivity.Activities.Add(this.step1EventDrivenActivity_SelectionChange);
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
            // AddSystemLocaleWorkflow
            // 
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.step1StateActivity);
            this.Activities.Add(this.finalizeStateActivity);
            this.Activities.Add(this.updateUrlMappingNameStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "AddSystemLocaleWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateInitializationActivity initializeStateInitializationActivity;
        private SetStateActivity setStateActivity1;
        private StateActivity finalStateActivity;
        private StateActivity initializeStateActivity;
        private CodeActivity finalizeCodeActivity_Finalize;
        private SetStateActivity setStateActivity3;
        private Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;
        private Composite.C1Console.Workflow.Activities.DataDialogFormActivity step1DataDialogFormActivity;
        private SetStateActivity setStateActivity2;
        private StateInitializationActivity finalizeStateInitializationActivity;
        private EventDrivenActivity step1EventDrivenActivity_Ok;
        private StateInitializationActivity step1StateInitializationActivity;
        private StateActivity finalizeStateActivity;
        private StateActivity step1StateActivity;
        private SetStateActivity setStateActivity4;
        private CodeActivity initializeCodeActivity_Initialize;
        private SetStateActivity setStateActivity5;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;
        private EventDrivenActivity step1EventDrivenActivity_Cancel;
        private SetStateActivity setStateActivity7;
        private CodeActivity updateRulMappingNameCodeActivity_Update;
        private SetStateActivity setStateActivity6;
        private Composite.C1Console.Workflow.Activities.CustomEvent01HandleExternalEventActivity customEvent01HandleExternalEventActivity1;
        private StateInitializationActivity updateUrlMappingNameStateInitializationActivity;
        private EventDrivenActivity step1EventDrivenActivity_SelectionChange;
        private StateActivity updateUrlMappingNameStateActivity;
        private Composite.C1Console.Workflow.Activities.RerenderViewActivity rerenderViewActivity1;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private IfElseActivity ifElseActivity_HasAnyWhiteListedLocales;
        private SetStateActivity setStateActivity8;
        private Composite.C1Console.Workflow.Activities.ShowConsoleMessageBoxActivity showConsoleMessageBoxActivity1;
        private IfElseBranchActivity ifElseBranchActivity4;
        private IfElseBranchActivity ifElseBranchActivity3;
        private IfElseActivity ifElse_UrlMappingNameInUse;
        private CodeActivity codeActivity_ShowBalloon;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;



























































































































    }
}
