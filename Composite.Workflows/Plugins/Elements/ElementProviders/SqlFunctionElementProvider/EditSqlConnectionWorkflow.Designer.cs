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
    partial class EditSqlConnectionWorkflow
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
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.codeActivity1 = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.saveHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.SaveHandleExternalEventActivity();
            this.documentFormActivity1 = new Composite.C1Console.Workflow.Activities.DocumentFormActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.initialStateCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.saveStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.saveEditEventDrivenActivity = new System.Workflow.Activities.EventDrivenActivity();
            this.editStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.stateInitializationActivity1 = new System.Workflow.Activities.StateInitializationActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.savestateActivity = new System.Workflow.Activities.StateActivity();
            this.saveEditStateActivity = new System.Workflow.Activities.StateActivity();
            this.initialState = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity1
            // 
            this.setStateActivity1.Name = "setStateActivity1";
            this.setStateActivity1.TargetStateName = "saveEditStateActivity";
            // 
            // codeActivity1
            // 
            this.codeActivity1.Name = "codeActivity1";
            this.codeActivity1.ExecuteCode += new System.EventHandler(this.saveEditStateCodeActivity_ExecuteCode);
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "savestateActivity";
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
            this.documentFormActivity1.FormDefinitionFileName = "/Administrative/EditSqlFunctionConnection.xml";
            this.documentFormActivity1.Name = "documentFormActivity1";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "saveEditStateActivity";
            // 
            // initialStateCodeActivity
            // 
            this.initialStateCodeActivity.Name = "initialStateCodeActivity";
            this.initialStateCodeActivity.ExecuteCode += new System.EventHandler(this.initialStateCodeActivity_ExecuteCode);
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity1
            // 
            this.cancelHandleExternalEventActivity1.EventName = "Cancel";
            this.cancelHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity1.Name = "cancelHandleExternalEventActivity1";
            // 
            // saveStateInitializationActivity
            // 
            this.saveStateInitializationActivity.Activities.Add(this.codeActivity1);
            this.saveStateInitializationActivity.Activities.Add(this.setStateActivity1);
            this.saveStateInitializationActivity.Name = "saveStateInitializationActivity";
            // 
            // saveEditEventDrivenActivity
            // 
            this.saveEditEventDrivenActivity.Activities.Add(this.saveHandleExternalEventActivity1);
            this.saveEditEventDrivenActivity.Activities.Add(this.setStateActivity3);
            this.saveEditEventDrivenActivity.Name = "saveEditEventDrivenActivity";
            // 
            // editStateInitializationActivity
            // 
            this.editStateInitializationActivity.Activities.Add(this.documentFormActivity1);
            this.editStateInitializationActivity.Name = "editStateInitializationActivity";
            // 
            // stateInitializationActivity1
            // 
            this.stateInitializationActivity1.Activities.Add(this.initialStateCodeActivity);
            this.stateInitializationActivity1.Activities.Add(this.setStateActivity2);
            this.stateInitializationActivity1.Name = "stateInitializationActivity1";
            // 
            // eventDrivenActivity_GlobalCancel
            // 
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.cancelHandleExternalEventActivity1);
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.setStateActivity4);
            this.eventDrivenActivity_GlobalCancel.Name = "eventDrivenActivity_GlobalCancel";
            // 
            // finalStateActivity
            // 
            this.finalStateActivity.Name = "finalStateActivity";
            // 
            // savestateActivity
            // 
            this.savestateActivity.Activities.Add(this.saveStateInitializationActivity);
            this.savestateActivity.Name = "savestateActivity";
            // 
            // saveEditStateActivity
            // 
            this.saveEditStateActivity.Activities.Add(this.editStateInitializationActivity);
            this.saveEditStateActivity.Activities.Add(this.saveEditEventDrivenActivity);
            this.saveEditStateActivity.Name = "saveEditStateActivity";
            // 
            // initialState
            // 
            this.initialState.Activities.Add(this.stateInitializationActivity1);
            this.initialState.Name = "initialState";
            // 
            // EditSqlConnectionWorkflow
            // 
            this.Activities.Add(this.initialState);
            this.Activities.Add(this.saveEditStateActivity);
            this.Activities.Add(this.savestateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initialState";
            this.Name = "EditSqlConnectionWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private StateActivity finalStateActivity;
        private StateActivity savestateActivity;
        private StateActivity saveEditStateActivity;
        private SetStateActivity setStateActivity3;
        private SetStateActivity setStateActivity4;
        private StateInitializationActivity saveStateInitializationActivity;
        private EventDrivenActivity saveEditEventDrivenActivity;
        private StateInitializationActivity editStateInitializationActivity;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private Composite.C1Console.Workflow.Activities.DocumentFormActivity documentFormActivity1;
        private CodeActivity initialStateCodeActivity;
        private StateInitializationActivity stateInitializationActivity1;
        private CodeActivity codeActivity1;
        private Composite.C1Console.Workflow.Activities.SaveHandleExternalEventActivity saveHandleExternalEventActivity1;
        private SetStateActivity setStateActivity2;
        private SetStateActivity setStateActivity1;
        private StateActivity initialState;
























    }
}
