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

namespace Composite.Plugins.Elements.ElementProviders.SqlFunctionElementProvider
{
    partial class EditSqlFunctionProviderWorkflow
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
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.codeActivity3 = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.previewCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.previewHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.PreviewHandleExternalEventActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.saveHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.SaveHandleExternalEventActivity();
            this.documentFormActivity1 = new Composite.C1Console.Workflow.Activities.DocumentFormActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.codeActivity1 = new System.Workflow.Activities.CodeActivity();
            this.saveStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.editEventDrivenActivity_preview = new System.Workflow.Activities.EventDrivenActivity();
            this.editEventDrivenActivity_Save = new System.Workflow.Activities.EventDrivenActivity();
            this.editStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.initialStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.stateActivity1 = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.editStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity1 = new System.Workflow.Activities.EventDrivenActivity();
            this.initialState = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "editStateActivity";
            // 
            // codeActivity3
            // 
            this.codeActivity3.Name = "codeActivity3";
            this.codeActivity3.ExecuteCode += new System.EventHandler(this.saveCodeActivity_ExecuteCode);
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "editStateActivity";
            // 
            // previewCodeActivity
            // 
            this.previewCodeActivity.Name = "previewCodeActivity";
            this.previewCodeActivity.ExecuteCode += new System.EventHandler(this.previewCodeActivity_ExecuteCode);
            // 
            // previewHandleExternalEventActivity1
            // 
            this.previewHandleExternalEventActivity1.EventName = "Preview";
            this.previewHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.previewHandleExternalEventActivity1.Name = "previewHandleExternalEventActivity1";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "stateActivity1";
            // 
            // saveHandleExternalEventActivity1
            // 
            this.saveHandleExternalEventActivity1.EventName = "Save";
            this.saveHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.saveHandleExternalEventActivity1.Name = "saveHandleExternalEventActivity1";
            // 
            // documentFormActivity1
            // 
            this.documentFormActivity1.ContainerLabel = null;
            this.documentFormActivity1.FormDefinitionFileName = "/Administrative/EditSqlFunction.xml";
            this.documentFormActivity1.Name = "documentFormActivity1";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "editStateActivity";
            // 
            // codeActivity1
            // 
            this.codeActivity1.Name = "codeActivity1";
            this.codeActivity1.ExecuteCode += new System.EventHandler(this.initialize_ExecuteCode);
            // 
            // saveStateInitializationActivity
            // 
            this.saveStateInitializationActivity.Activities.Add(this.codeActivity3);
            this.saveStateInitializationActivity.Activities.Add(this.setStateActivity4);
            this.saveStateInitializationActivity.Name = "saveStateInitializationActivity";
            // 
            // editEventDrivenActivity_preview
            // 
            this.editEventDrivenActivity_preview.Activities.Add(this.previewHandleExternalEventActivity1);
            this.editEventDrivenActivity_preview.Activities.Add(this.previewCodeActivity);
            this.editEventDrivenActivity_preview.Activities.Add(this.setStateActivity5);
            this.editEventDrivenActivity_preview.Name = "editEventDrivenActivity_preview";
            // 
            // editEventDrivenActivity_Save
            // 
            this.editEventDrivenActivity_Save.Activities.Add(this.saveHandleExternalEventActivity1);
            this.editEventDrivenActivity_Save.Activities.Add(this.setStateActivity3);
            this.editEventDrivenActivity_Save.Name = "editEventDrivenActivity_Save";
            // 
            // editStateInitializationActivity
            // 
            this.editStateInitializationActivity.Activities.Add(this.documentFormActivity1);
            this.editStateInitializationActivity.Name = "editStateInitializationActivity";
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
            // initialStateInitializationActivity
            // 
            this.initialStateInitializationActivity.Activities.Add(this.codeActivity1);
            this.initialStateInitializationActivity.Activities.Add(this.setStateActivity2);
            this.initialStateInitializationActivity.Name = "initialStateInitializationActivity";
            // 
            // stateActivity1
            // 
            this.stateActivity1.Activities.Add(this.saveStateInitializationActivity);
            this.stateActivity1.Name = "stateActivity1";
            // 
            // finalStateActivity
            // 
            this.finalStateActivity.Name = "finalStateActivity";
            // 
            // editStateActivity
            // 
            this.editStateActivity.Activities.Add(this.editStateInitializationActivity);
            this.editStateActivity.Activities.Add(this.editEventDrivenActivity_Save);
            this.editStateActivity.Activities.Add(this.editEventDrivenActivity_preview);
            this.editStateActivity.Name = "editStateActivity";
            // 
            // eventDrivenActivity1
            // 
            this.eventDrivenActivity1.Activities.Add(this.cancelHandleExternalEventActivity1);
            this.eventDrivenActivity1.Activities.Add(this.setStateActivity1);
            this.eventDrivenActivity1.Name = "eventDrivenActivity1";
            // 
            // initialState
            // 
            this.initialState.Activities.Add(this.initialStateInitializationActivity);
            this.initialState.Name = "initialState";
            // 
            // EditSqlFunctionProviderWorkflow
            // 
            this.Activities.Add(this.initialState);
            this.Activities.Add(this.eventDrivenActivity1);
            this.Activities.Add(this.editStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.stateActivity1);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initialState";
            this.Name = "EditSqlFunctionProviderWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private StateActivity finalStateActivity;
        private StateActivity editStateActivity;
        private EventDrivenActivity eventDrivenActivity1;
        private CodeActivity codeActivity1;
        private EventDrivenActivity editEventDrivenActivity_Save;
        private StateInitializationActivity editStateInitializationActivity;
        private SetStateActivity setStateActivity1;
        private StateInitializationActivity initialStateInitializationActivity;
        private SetStateActivity setStateActivity2;
        private SetStateActivity setStateActivity3;
        private Composite.C1Console.Workflow.Activities.SaveHandleExternalEventActivity saveHandleExternalEventActivity1;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private Composite.C1Console.Workflow.Activities.DocumentFormActivity documentFormActivity1;
        private CodeActivity codeActivity3;
        private StateInitializationActivity saveStateInitializationActivity;
        private StateActivity stateActivity1;
        private SetStateActivity setStateActivity4;
        private EventDrivenActivity editEventDrivenActivity_preview;
        private CodeActivity previewCodeActivity;
        private Composite.C1Console.Workflow.Activities.PreviewHandleExternalEventActivity previewHandleExternalEventActivity1;
        private SetStateActivity setStateActivity5;
        private StateActivity initialState;
























    }
}
