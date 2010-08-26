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

namespace Composite.Plugins.Elements.ElementProviders.PageTypeElementProvider
{
    partial class EditPageTypeWorkflow
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
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.saveCodeActivity_Save = new System.Workflow.Activities.CodeActivity();
            this.editIfElseActivity_ValidateBindings = new System.Workflow.Activities.IfElseActivity();
            this.saveHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.SaveHandleExternalEventActivity();
            this.initializeDocumentFormActivity = new Composite.C1Console.Workflow.Activities.DocumentFormActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.initializeCodeActivity_UpdateBindings = new System.Workflow.Activities.CodeActivity();
            this.saveStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.editEventDrivenActivity_Save = new System.Workflow.Activities.EventDrivenActivity();
            this.editStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.saveStateActivity = new System.Workflow.Activities.StateActivity();
            this.editStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "editStateActivity";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "saveStateActivity";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity4);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.setStateActivity3);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.editCodeActivity_ValidateBindings);
            this.ifElseBranchActivity1.Condition = codecondition1;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
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
            // editIfElseActivity_ValidateBindings
            // 
            this.editIfElseActivity_ValidateBindings.Activities.Add(this.ifElseBranchActivity1);
            this.editIfElseActivity_ValidateBindings.Activities.Add(this.ifElseBranchActivity2);
            this.editIfElseActivity_ValidateBindings.Name = "editIfElseActivity_ValidateBindings";
            // 
            // saveHandleExternalEventActivity1
            // 
            this.saveHandleExternalEventActivity1.EventName = "Save";
            this.saveHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.saveHandleExternalEventActivity1.Name = "saveHandleExternalEventActivity1";
            // 
            // initializeDocumentFormActivity
            // 
            this.initializeDocumentFormActivity.ContainerLabel = null;
            this.initializeDocumentFormActivity.CustomToolbarDefinitionFileName = null;
            this.initializeDocumentFormActivity.FormDefinitionFileName = "\\Administrative\\PageTypeEditPageType.xml";
            this.initializeDocumentFormActivity.Name = "initializeDocumentFormActivity";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "editStateActivity";
            // 
            // initializeCodeActivity_UpdateBindings
            // 
            this.initializeCodeActivity_UpdateBindings.Name = "initializeCodeActivity_UpdateBindings";
            this.initializeCodeActivity_UpdateBindings.ExecuteCode += new System.EventHandler(this.initializeCodeActivity_UpdateBindings_ExecuteCode);
            // 
            // saveStateInitializationActivity
            // 
            this.saveStateInitializationActivity.Activities.Add(this.saveCodeActivity_Save);
            this.saveStateInitializationActivity.Activities.Add(this.setStateActivity5);
            this.saveStateInitializationActivity.Name = "saveStateInitializationActivity";
            // 
            // editEventDrivenActivity_Save
            // 
            this.editEventDrivenActivity_Save.Activities.Add(this.saveHandleExternalEventActivity1);
            this.editEventDrivenActivity_Save.Activities.Add(this.editIfElseActivity_ValidateBindings);
            this.editEventDrivenActivity_Save.Name = "editEventDrivenActivity_Save";
            // 
            // editStateInitializationActivity
            // 
            this.editStateInitializationActivity.Activities.Add(this.initializeDocumentFormActivity);
            this.editStateInitializationActivity.Name = "editStateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.initializeCodeActivity_UpdateBindings);
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
            // saveStateActivity
            // 
            this.saveStateActivity.Activities.Add(this.saveStateInitializationActivity);
            this.saveStateActivity.Name = "saveStateActivity";
            // 
            // editStateActivity
            // 
            this.editStateActivity.Activities.Add(this.editStateInitializationActivity);
            this.editStateActivity.Activities.Add(this.editEventDrivenActivity_Save);
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
            // EditPageTypeWorkflow
            // 
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.editStateActivity);
            this.Activities.Add(this.saveStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "EditPageTypeWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateInitializationActivity initializeStateInitializationActivity;
        private SetStateActivity setStateActivity1;
        private StateActivity finalStateActivity;
        private StateActivity initializeStateActivity;
        private SetStateActivity setStateActivity2;
        private StateActivity editStateActivity;
        private C1Console.Workflow.Activities.DocumentFormActivity initializeDocumentFormActivity;
        private CodeActivity initializeCodeActivity_UpdateBindings;
        private StateInitializationActivity editStateInitializationActivity;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private IfElseActivity editIfElseActivity_ValidateBindings;
        private C1Console.Workflow.Activities.SaveHandleExternalEventActivity saveHandleExternalEventActivity1;
        private EventDrivenActivity editEventDrivenActivity_Save;
        private SetStateActivity setStateActivity4;
        private SetStateActivity setStateActivity3;
        private SetStateActivity setStateActivity5;
        private CodeActivity saveCodeActivity_Save;
        private StateInitializationActivity saveStateInitializationActivity;
        private StateActivity saveStateActivity;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;












































































































    }
}
