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

namespace Composite.Workflows.Plugins.Elements.ElementProviders.MethodBasedFunctionProviderElementProvider
{
    partial class EditInlineFunctionWorkflow
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
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.saveCodeActivity_Save = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.editCodeActivity_Preview = new System.Workflow.Activities.CodeActivity();
            this.previewHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.PreviewHandleExternalEventActivity();
            this.documentFormActivity1 = new Composite.C1Console.Workflow.Activities.DocumentFormActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.saveHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.SaveHandleExternalEventActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.initializeCodeActivity_InitBindings = new System.Workflow.Activities.CodeActivity();
            this.saveStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.editEventDrivenActivity_Preview = new System.Workflow.Activities.EventDrivenActivity();
            this.editStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.editEventDrivenActivity_Save = new System.Workflow.Activities.EventDrivenActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.saveStateActivity = new System.Workflow.Activities.StateActivity();
            this.editStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "editStateActivity";
            // 
            // saveCodeActivity_Save
            // 
            this.saveCodeActivity_Save.Name = "saveCodeActivity_Save";
            this.saveCodeActivity_Save.ExecuteCode += new System.EventHandler(this.saveCodeActivity_Save_ExecuteCode);
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "editStateActivity";
            // 
            // editCodeActivity_Preview
            // 
            this.editCodeActivity_Preview.Name = "editCodeActivity_Preview";
            this.editCodeActivity_Preview.ExecuteCode += new System.EventHandler(this.editCodeActivity_Preview_ExecuteCode);
            // 
            // previewHandleExternalEventActivity1
            // 
            this.previewHandleExternalEventActivity1.EventName = "Preview";
            this.previewHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.previewHandleExternalEventActivity1.Name = "previewHandleExternalEventActivity1";
            // 
            // documentFormActivity1
            // 
            this.documentFormActivity1.ContainerLabel = null;
            this.documentFormActivity1.CustomToolbarDefinitionFileName = null;
            this.documentFormActivity1.FormDefinitionFileName = "\\Administrative\\InlineFunctionEditFunction.xml";
            this.documentFormActivity1.Name = "documentFormActivity1";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "saveStateActivity";
            // 
            // saveHandleExternalEventActivity1
            // 
            this.saveHandleExternalEventActivity1.EventName = "Save";
            this.saveHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.saveHandleExternalEventActivity1.Name = "saveHandleExternalEventActivity1";
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "editStateActivity";
            // 
            // initializeCodeActivity_InitBindings
            // 
            this.initializeCodeActivity_InitBindings.Name = "initializeCodeActivity_InitBindings";
            this.initializeCodeActivity_InitBindings.ExecuteCode += new System.EventHandler(this.initializeCodeActivity_InitBindings_ExecuteCode);
            // 
            // saveStateInitializationActivity
            // 
            this.saveStateInitializationActivity.Activities.Add(this.saveCodeActivity_Save);
            this.saveStateInitializationActivity.Activities.Add(this.setStateActivity5);
            this.saveStateInitializationActivity.Name = "saveStateInitializationActivity";
            // 
            // editEventDrivenActivity_Preview
            // 
            this.editEventDrivenActivity_Preview.Activities.Add(this.previewHandleExternalEventActivity1);
            this.editEventDrivenActivity_Preview.Activities.Add(this.editCodeActivity_Preview);
            this.editEventDrivenActivity_Preview.Activities.Add(this.setStateActivity2);
            this.editEventDrivenActivity_Preview.Name = "editEventDrivenActivity_Preview";
            // 
            // editStateInitializationActivity
            // 
            this.editStateInitializationActivity.Activities.Add(this.documentFormActivity1);
            this.editStateInitializationActivity.Name = "editStateInitializationActivity";
            // 
            // editEventDrivenActivity_Save
            // 
            this.editEventDrivenActivity_Save.Activities.Add(this.saveHandleExternalEventActivity1);
            this.editEventDrivenActivity_Save.Activities.Add(this.setStateActivity3);
            this.editEventDrivenActivity_Save.Name = "editEventDrivenActivity_Save";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.initializeCodeActivity_InitBindings);
            this.initializeStateInitializationActivity.Activities.Add(this.setStateActivity4);
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
            // saveStateActivity
            // 
            this.saveStateActivity.Activities.Add(this.saveStateInitializationActivity);
            this.saveStateActivity.Name = "saveStateActivity";
            // 
            // editStateActivity
            // 
            this.editStateActivity.Activities.Add(this.editEventDrivenActivity_Save);
            this.editStateActivity.Activities.Add(this.editStateInitializationActivity);
            this.editStateActivity.Activities.Add(this.editEventDrivenActivity_Preview);
            this.editStateActivity.Name = "editStateActivity";
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
            // EditInlineFunctionWorkflow
            // 
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.editStateActivity);
            this.Activities.Add(this.saveStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "EditInlineFunctionWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;

        private StateInitializationActivity initializeStateInitializationActivity;

        private SetStateActivity setStateActivity1;

        private StateActivity finalStateActivity;

        private StateActivity initializeStateActivity;

        private SetStateActivity setStateActivity5;

        private C1Console.Workflow.Activities.DocumentFormActivity documentFormActivity1;

        private SetStateActivity setStateActivity3;

        private C1Console.Workflow.Activities.SaveHandleExternalEventActivity saveHandleExternalEventActivity1;

        private SetStateActivity setStateActivity4;

        private CodeActivity initializeCodeActivity_InitBindings;

        private StateInitializationActivity saveStateInitializationActivity;

        private StateInitializationActivity editStateInitializationActivity;

        private EventDrivenActivity editEventDrivenActivity_Save;

        private StateActivity saveStateActivity;

        private StateActivity editStateActivity;

        private CodeActivity saveCodeActivity_Save;

        private SetStateActivity setStateActivity2;

        private CodeActivity editCodeActivity_Preview;

        private C1Console.Workflow.Activities.PreviewHandleExternalEventActivity previewHandleExternalEventActivity1;

        private EventDrivenActivity editEventDrivenActivity_Preview;

        private EventDrivenActivity eventDrivenActivity_GlobalCancel;










































































































    }
}
