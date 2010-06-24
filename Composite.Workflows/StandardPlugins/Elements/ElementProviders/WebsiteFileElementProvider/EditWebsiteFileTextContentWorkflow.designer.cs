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

namespace Composite.StandardPlugins.Elements.ElementProviders.WebsiteFileElementProvider
{
    partial class EditWebsiteFileTextContentWorkflow
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
            this.saveCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.saveHandleExternalEventActivity1 = new Composite.Workflow.Activities.SaveHandleExternalEventActivity();
            this.documentFormActivity1 = new Composite.Workflow.Activities.DocumentFormActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.initializeCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.eventDrivenActivity_Save = new System.Workflow.Activities.EventDrivenActivity();
            this.editStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initialStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.cancelEventDrivenActivity = new System.Workflow.Activities.EventDrivenActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.saveStateActivity = new System.Workflow.Activities.StateActivity();
            this.editStateActivity = new System.Workflow.Activities.StateActivity();
            this.initialState = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "editStateActivity";
            // 
            // saveCodeActivity
            // 
            this.saveCodeActivity.Name = "saveCodeActivity";
            this.saveCodeActivity.ExecuteCode += new System.EventHandler(this.saveCodeActivity_ExecuteCode);
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "saveStateActivity";
            // 
            // saveHandleExternalEventActivity1
            // 
            this.saveHandleExternalEventActivity1.EventName = "Save";
            this.saveHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.saveHandleExternalEventActivity1.Name = "saveHandleExternalEventActivity1";
            // 
            // documentFormActivity1
            // 
            this.documentFormActivity1.ContainerLabel = null;
            this.documentFormActivity1.FormDefinitionFileName = "/Administrative/WebsiteFileElementProviderEditTextContentFile.xml";
            this.documentFormActivity1.Name = "documentFormActivity1";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "editStateActivity";
            // 
            // initializeCodeActivity
            // 
            this.initializeCodeActivity.Name = "initializeCodeActivity";
            this.initializeCodeActivity.ExecuteCode += new System.EventHandler(this.initializeCodeActivity_ExecuteCode);
            // 
            // setStateActivity1
            // 
            this.setStateActivity1.Name = "setStateActivity1";
            this.setStateActivity1.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity1
            // 
            this.cancelHandleExternalEventActivity1.EventName = "Cancel";
            this.cancelHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity1.Name = "cancelHandleExternalEventActivity1";
            // 
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.saveCodeActivity);
            this.finalizeStateInitializationActivity.Activities.Add(this.setStateActivity4);
            this.finalizeStateInitializationActivity.Name = "finalizeStateInitializationActivity";
            // 
            // eventDrivenActivity_Save
            // 
            this.eventDrivenActivity_Save.Activities.Add(this.saveHandleExternalEventActivity1);
            this.eventDrivenActivity_Save.Activities.Add(this.setStateActivity3);
            this.eventDrivenActivity_Save.Name = "eventDrivenActivity_Save";
            // 
            // editStateInitializationActivity
            // 
            this.editStateInitializationActivity.Activities.Add(this.documentFormActivity1);
            this.editStateInitializationActivity.Name = "editStateInitializationActivity";
            // 
            // initialStateInitializationActivity
            // 
            this.initialStateInitializationActivity.Activities.Add(this.initializeCodeActivity);
            this.initialStateInitializationActivity.Activities.Add(this.setStateActivity2);
            this.initialStateInitializationActivity.Name = "initialStateInitializationActivity";
            // 
            // cancelEventDrivenActivity
            // 
            this.cancelEventDrivenActivity.Activities.Add(this.cancelHandleExternalEventActivity1);
            this.cancelEventDrivenActivity.Activities.Add(this.setStateActivity1);
            this.cancelEventDrivenActivity.Name = "cancelEventDrivenActivity";
            // 
            // finalStateActivity
            // 
            this.finalStateActivity.Name = "finalStateActivity";
            // 
            // saveStateActivity
            // 
            this.saveStateActivity.Activities.Add(this.finalizeStateInitializationActivity);
            this.saveStateActivity.Name = "saveStateActivity";
            // 
            // editStateActivity
            // 
            this.editStateActivity.Activities.Add(this.editStateInitializationActivity);
            this.editStateActivity.Activities.Add(this.eventDrivenActivity_Save);
            this.editStateActivity.Name = "editStateActivity";
            // 
            // initialState
            // 
            this.initialState.Activities.Add(this.initialStateInitializationActivity);
            this.initialState.Name = "initialState";
            // 
            // EditWebsiteFileTextContentWorkflow
            // 
            this.Activities.Add(this.initialState);
            this.Activities.Add(this.editStateActivity);
            this.Activities.Add(this.saveStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.cancelEventDrivenActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initialState";
            this.Name = "EditWebsiteFileTextContentWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private CodeActivity initializeCodeActivity;
        private SetStateActivity setStateActivity1;
        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateInitializationActivity initialStateInitializationActivity;
        private EventDrivenActivity cancelEventDrivenActivity;
        private StateActivity finalStateActivity;
        private StateActivity saveStateActivity;
        private StateActivity editStateActivity;
        private Composite.Workflow.Activities.DocumentFormActivity documentFormActivity1;
        private StateInitializationActivity editStateInitializationActivity;
        private StateInitializationActivity finalizeStateInitializationActivity;
        private CodeActivity saveCodeActivity;
        private SetStateActivity setStateActivity3;
        private Composite.Workflow.Activities.SaveHandleExternalEventActivity saveHandleExternalEventActivity1;
        private SetStateActivity setStateActivity2;
        private EventDrivenActivity eventDrivenActivity_Save;
        private SetStateActivity setStateActivity4;
        private StateActivity initialState;





















    }
}
