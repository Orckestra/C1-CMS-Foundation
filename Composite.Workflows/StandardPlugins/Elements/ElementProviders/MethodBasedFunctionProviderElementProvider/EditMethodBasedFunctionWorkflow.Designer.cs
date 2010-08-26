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

namespace Composite.Plugins.Elements.ElementProviders.MethodBasedFunctionProviderElementProvider
{
    partial class EditMethodBasedFunctionWorkflow
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
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.saveCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.saveHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.SaveHandleExternalEventActivity();
            this.documentFormActivity1 = new Composite.C1Console.Workflow.Activities.DocumentFormActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.initializeCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.validateStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.saveStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.editEventDrivenActivity_Save = new System.Workflow.Activities.EventDrivenActivity();
            this.editStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.validateStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            this.saveStateActivity = new System.Workflow.Activities.StateActivity();
            this.editStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "editStateActivity";
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "saveStateActivity";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity5);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.setStateActivity6);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.IsValidData);
            this.ifElseBranchActivity1.Condition = codecondition1;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // ifElseActivity1
            // 
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity1);
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity2);
            this.ifElseActivity1.Name = "ifElseActivity1";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "editStateActivity";
            // 
            // saveCodeActivity
            // 
            this.saveCodeActivity.Name = "saveCodeActivity";
            this.saveCodeActivity.ExecuteCode += new System.EventHandler(this.saveCodeActivity_ExecuteCode);
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "validateStateActivity";
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
            this.documentFormActivity1.FormDefinitionFileName = "\\Administrative\\EditMethodBasedFunction.xml";
            this.documentFormActivity1.Name = "documentFormActivity1";
            // 
            // setStateActivity1
            // 
            this.setStateActivity1.Name = "setStateActivity1";
            this.setStateActivity1.TargetStateName = "editStateActivity";
            // 
            // initializeCodeActivity
            // 
            this.initializeCodeActivity.Name = "initializeCodeActivity";
            this.initializeCodeActivity.ExecuteCode += new System.EventHandler(this.initializeCodeActivity_ExecuteCode);
            // 
            // validateStateInitializationActivity
            // 
            this.validateStateInitializationActivity.Activities.Add(this.ifElseActivity1);
            this.validateStateInitializationActivity.Name = "validateStateInitializationActivity";
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
            this.saveStateInitializationActivity.Activities.Add(this.saveCodeActivity);
            this.saveStateInitializationActivity.Activities.Add(this.setStateActivity2);
            this.saveStateInitializationActivity.Name = "saveStateInitializationActivity";
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
            // initalizeStateInitializationActivity
            // 
            this.initalizeStateInitializationActivity.Activities.Add(this.initializeCodeActivity);
            this.initalizeStateInitializationActivity.Activities.Add(this.setStateActivity1);
            this.initalizeStateInitializationActivity.Name = "initalizeStateInitializationActivity";
            // 
            // validateStateActivity
            // 
            this.validateStateActivity.Activities.Add(this.validateStateInitializationActivity);
            this.validateStateActivity.Name = "validateStateActivity";
            // 
            // finalStateActivity
            // 
            this.finalStateActivity.Name = "finalStateActivity";
            // 
            // eventDrivenActivity_GlobalCancel
            // 
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.cancelHandleExternalEventActivity1);
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.setStateActivity4);
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
            this.editStateActivity.Name = "editStateActivity";
            // 
            // initializeStateActivity
            // 
            this.initializeStateActivity.Activities.Add(this.initalizeStateInitializationActivity);
            this.initializeStateActivity.Name = "initializeStateActivity";
            // 
            // EditMethodBasedFunctionWorkflow
            // 
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.editStateActivity);
            this.Activities.Add(this.saveStateActivity);
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.validateStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "EditMethodBasedFunctionWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private SetStateActivity setStateActivity2;
        private SetStateActivity setStateActivity3;
        private Composite.C1Console.Workflow.Activities.SaveHandleExternalEventActivity saveHandleExternalEventActivity1;
        private SetStateActivity setStateActivity1;
        private CodeActivity initializeCodeActivity;
        private StateInitializationActivity saveStateInitializationActivity;
        private EventDrivenActivity editEventDrivenActivity_Save;
        private StateInitializationActivity editStateInitializationActivity;
        private StateInitializationActivity initalizeStateInitializationActivity;
        private StateActivity saveStateActivity;
        private StateActivity editStateActivity;
        private CodeActivity saveCodeActivity;
        private Composite.C1Console.Workflow.Activities.DocumentFormActivity documentFormActivity1;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;
        private SetStateActivity setStateActivity4;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateActivity finalStateActivity;
        private SetStateActivity setStateActivity5;
        private SetStateActivity setStateActivity6;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private IfElseActivity ifElseActivity1;
        private StateInitializationActivity validateStateInitializationActivity;
        private StateActivity validateStateActivity;
        private StateActivity initializeStateActivity;














    }
}
