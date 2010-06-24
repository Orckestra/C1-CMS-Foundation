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

namespace Composite.StandardPlugins.Elements.ElementProviders.PageElementProvider
{
    partial class EditPageWorkflow
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
            this.showConsoleMessageBoxActivity1 = new Composite.Workflow.Activities.ShowConsoleMessageBoxActivity();
            this.saveCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity8 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity4 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity3 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity7 = new System.Workflow.Activities.SetStateActivity();
            this.newPageTypeSelectedCodeActivity_UpdateView = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.customEvent01HandleExternalEventActivity1 = new Composite.Workflow.Activities.CustomEvent01HandleExternalEventActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.editPreviewCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.previewHandleExternalEventActivity1 = new Composite.Workflow.Activities.PreviewHandleExternalEventActivity();
            this.ifElseActivity2_PageStillExists = new System.Workflow.Activities.IfElseActivity();
            this.saveHandleExternalEventActivity1 = new Composite.Workflow.Activities.SaveHandleExternalEventActivity();
            this.editStateCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.newPageTypeSelectedStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.saveStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.editEventDrivenActivity_PageTypeChanged = new System.Workflow.Activities.EventDrivenActivity();
            this.editEventDrivenActivity_Preview = new System.Workflow.Activities.EventDrivenActivity();
            this.editEventDrivenActivity_Save = new System.Workflow.Activities.EventDrivenActivity();
            this.editStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.newPageTypeSelectedStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            this.saveStateActivity = new System.Workflow.Activities.StateActivity();
            this.editStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            // 
            // showConsoleMessageBoxActivity1
            // 
            this.showConsoleMessageBoxActivity1.DialogType = Composite.ConsoleEventSystem.DialogType.Message;
            this.showConsoleMessageBoxActivity1.Message = "${Composite.StandardPlugins.PageElementProvider, PageSaveValidationFailedMessage}" +
                "";
            this.showConsoleMessageBoxActivity1.Name = "showConsoleMessageBoxActivity1";
            this.showConsoleMessageBoxActivity1.Title = "${Composite.StandardPlugins.PageElementProvider, PageSaveValidationFailedTitle}";
            // 
            // saveCodeActivity
            // 
            this.saveCodeActivity.Name = "saveCodeActivity";
            this.saveCodeActivity.ExecuteCode += new System.EventHandler(this.saveCodeActivity_ExecuteCode);
            // 
            // setStateActivity8
            // 
            this.setStateActivity8.Name = "setStateActivity8";
            this.setStateActivity8.TargetStateName = "finalStateActivity";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "saveStateActivity";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.showConsoleMessageBoxActivity1);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.saveCodeActivity);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.ValidateSave);
            this.ifElseBranchActivity1.Condition = codecondition1;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // ifElseBranchActivity4
            // 
            this.ifElseBranchActivity4.Activities.Add(this.setStateActivity8);
            this.ifElseBranchActivity4.Name = "ifElseBranchActivity4";
            // 
            // ifElseBranchActivity3
            // 
            this.ifElseBranchActivity3.Activities.Add(this.setStateActivity2);
            codecondition2.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.PageStillExists);
            this.ifElseBranchActivity3.Condition = codecondition2;
            this.ifElseBranchActivity3.Name = "ifElseBranchActivity3";
            // 
            // setStateActivity7
            // 
            this.setStateActivity7.Name = "setStateActivity7";
            this.setStateActivity7.TargetStateName = "editStateActivity";
            // 
            // newPageTypeSelectedCodeActivity_UpdateView
            // 
            this.newPageTypeSelectedCodeActivity_UpdateView.Name = "newPageTypeSelectedCodeActivity_UpdateView";
            this.newPageTypeSelectedCodeActivity_UpdateView.ExecuteCode += new System.EventHandler(this.newPageTypeSelectedCodeActivity_UpdateView_ExecuteCode);
            // 
            // setStateActivity1
            // 
            this.setStateActivity1.Name = "setStateActivity1";
            this.setStateActivity1.TargetStateName = "editStateActivity";
            // 
            // ifElseActivity1
            // 
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity1);
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity2);
            this.ifElseActivity1.Name = "ifElseActivity1";
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "newPageTypeSelectedStateActivity";
            // 
            // customEvent01HandleExternalEventActivity1
            // 
            this.customEvent01HandleExternalEventActivity1.EventName = "CustomEvent01";
            this.customEvent01HandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.customEvent01HandleExternalEventActivity1.Name = "customEvent01HandleExternalEventActivity1";
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "editStateActivity";
            // 
            // editPreviewCodeActivity
            // 
            this.editPreviewCodeActivity.Name = "editPreviewCodeActivity";
            this.editPreviewCodeActivity.ExecuteCode += new System.EventHandler(this.editPreviewCodeActivity_ExecuteCode);
            // 
            // previewHandleExternalEventActivity1
            // 
            this.previewHandleExternalEventActivity1.EventName = "Preview";
            this.previewHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.previewHandleExternalEventActivity1.Name = "previewHandleExternalEventActivity1";
            // 
            // ifElseActivity2_PageStillExists
            // 
            this.ifElseActivity2_PageStillExists.Activities.Add(this.ifElseBranchActivity3);
            this.ifElseActivity2_PageStillExists.Activities.Add(this.ifElseBranchActivity4);
            this.ifElseActivity2_PageStillExists.Name = "ifElseActivity2_PageStillExists";
            // 
            // saveHandleExternalEventActivity1
            // 
            this.saveHandleExternalEventActivity1.EventName = "Save";
            this.saveHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.saveHandleExternalEventActivity1.Name = "saveHandleExternalEventActivity1";
            // 
            // editStateCodeActivity
            // 
            this.editStateCodeActivity.Name = "editStateCodeActivity";
            this.editStateCodeActivity.ExecuteCode += new System.EventHandler(this.editStateCodeActivity_ExecuteCode);
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "editStateActivity";
            // 
            // newPageTypeSelectedStateInitializationActivity
            // 
            this.newPageTypeSelectedStateInitializationActivity.Activities.Add(this.newPageTypeSelectedCodeActivity_UpdateView);
            this.newPageTypeSelectedStateInitializationActivity.Activities.Add(this.setStateActivity7);
            this.newPageTypeSelectedStateInitializationActivity.Name = "newPageTypeSelectedStateInitializationActivity";
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity1
            // 
            this.cancelHandleExternalEventActivity1.EventName = "Cancel";
            this.cancelHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity1.Name = "cancelHandleExternalEventActivity1";
            // 
            // saveStateInitializationActivity
            // 
            this.saveStateInitializationActivity.Activities.Add(this.ifElseActivity1);
            this.saveStateInitializationActivity.Activities.Add(this.setStateActivity1);
            this.saveStateInitializationActivity.Name = "saveStateInitializationActivity";
            // 
            // editEventDrivenActivity_PageTypeChanged
            // 
            this.editEventDrivenActivity_PageTypeChanged.Activities.Add(this.customEvent01HandleExternalEventActivity1);
            this.editEventDrivenActivity_PageTypeChanged.Activities.Add(this.setStateActivity6);
            this.editEventDrivenActivity_PageTypeChanged.Name = "editEventDrivenActivity_PageTypeChanged";
            // 
            // editEventDrivenActivity_Preview
            // 
            this.editEventDrivenActivity_Preview.Activities.Add(this.previewHandleExternalEventActivity1);
            this.editEventDrivenActivity_Preview.Activities.Add(this.editPreviewCodeActivity);
            this.editEventDrivenActivity_Preview.Activities.Add(this.setStateActivity4);
            this.editEventDrivenActivity_Preview.Name = "editEventDrivenActivity_Preview";
            // 
            // editEventDrivenActivity_Save
            // 
            this.editEventDrivenActivity_Save.Activities.Add(this.saveHandleExternalEventActivity1);
            this.editEventDrivenActivity_Save.Activities.Add(this.ifElseActivity2_PageStillExists);
            this.editEventDrivenActivity_Save.Name = "editEventDrivenActivity_Save";
            // 
            // editStateInitializationActivity
            // 
            this.editStateInitializationActivity.Activities.Add(this.editStateCodeActivity);
            this.editStateInitializationActivity.Name = "editStateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.setStateActivity3);
            this.initializeStateInitializationActivity.Name = "initializeStateInitializationActivity";
            // 
            // newPageTypeSelectedStateActivity
            // 
            this.newPageTypeSelectedStateActivity.Activities.Add(this.newPageTypeSelectedStateInitializationActivity);
            this.newPageTypeSelectedStateActivity.Name = "newPageTypeSelectedStateActivity";
            // 
            // finalStateActivity
            // 
            this.finalStateActivity.Name = "finalStateActivity";
            // 
            // eventDrivenActivity_GlobalCancel
            // 
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.cancelHandleExternalEventActivity1);
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.setStateActivity5);
            this.eventDrivenActivity_GlobalCancel.Name = "eventDrivenActivity_GlobalCancel";
            // 
            // saveStateActivity
            // 
            this.saveStateActivity.Activities.Add(this.saveStateInitializationActivity);
            this.saveStateActivity.Name = "saveStateActivity";
            // 
            // editStateActivity
            // 
            this.editStateActivity.Activities.Add(this.editStateInitializationActivity);
            this.editStateActivity.Activities.Add(this.editEventDrivenActivity_Save);
            this.editStateActivity.Activities.Add(this.editEventDrivenActivity_Preview);
            this.editStateActivity.Activities.Add(this.editEventDrivenActivity_PageTypeChanged);
            this.editStateActivity.Name = "editStateActivity";
            // 
            // initializeStateActivity
            // 
            this.initializeStateActivity.Activities.Add(this.initializeStateInitializationActivity);
            this.initializeStateActivity.Name = "initializeStateActivity";
            // 
            // EditPageWorkflow
            // 
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.editStateActivity);
            this.Activities.Add(this.saveStateActivity);
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.newPageTypeSelectedStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "EditPageWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private StateInitializationActivity saveStateInitializationActivity;

        private EventDrivenActivity editEventDrivenActivity_Save;

        private StateInitializationActivity editStateInitializationActivity;

        private StateInitializationActivity initializeStateInitializationActivity;

        private StateActivity saveStateActivity;

        private StateActivity editStateActivity;

        private SetStateActivity setStateActivity1;

        private CodeActivity saveCodeActivity;

        private SetStateActivity setStateActivity2;

        private Composite.Workflow.Activities.SaveHandleExternalEventActivity saveHandleExternalEventActivity1;

        private SetStateActivity setStateActivity3;

        private SetStateActivity setStateActivity4;

        private EventDrivenActivity editEventDrivenActivity_Preview;

        private Composite.Workflow.Activities.PreviewHandleExternalEventActivity previewHandleExternalEventActivity1;

        private CodeActivity editPreviewCodeActivity;

        private SetStateActivity setStateActivity5;

        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;

        private StateActivity finalStateActivity;

        private EventDrivenActivity eventDrivenActivity_GlobalCancel;

        private CodeActivity editStateCodeActivity;

        private IfElseBranchActivity ifElseBranchActivity2;

        private IfElseBranchActivity ifElseBranchActivity1;

        private IfElseActivity ifElseActivity1;

        private Composite.Workflow.Activities.ShowConsoleMessageBoxActivity showConsoleMessageBoxActivity1;

        private SetStateActivity setStateActivity7;

        private CodeActivity newPageTypeSelectedCodeActivity_UpdateView;

        private SetStateActivity setStateActivity6;

        private Composite.Workflow.Activities.CustomEvent01HandleExternalEventActivity customEvent01HandleExternalEventActivity1;

        private StateInitializationActivity newPageTypeSelectedStateInitializationActivity;

        private EventDrivenActivity editEventDrivenActivity_PageTypeChanged;

        private StateActivity newPageTypeSelectedStateActivity;

        private IfElseBranchActivity ifElseBranchActivity4;

        private IfElseBranchActivity ifElseBranchActivity3;

        private IfElseActivity ifElseActivity2_PageStillExists;

        private SetStateActivity setStateActivity8;

        private StateActivity initializeStateActivity;




























    }
}
