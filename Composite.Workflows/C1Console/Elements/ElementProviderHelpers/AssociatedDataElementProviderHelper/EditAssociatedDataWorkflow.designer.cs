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

namespace Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper
{
    partial class EditAssociatedDataWorkflow
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
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.saveDataCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.saveHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.SaveHandleExternalEventActivity();
            this.editDataCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.saveDataStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.editDataEventDrivenActivity_Save = new System.Workflow.Activities.EventDrivenActivity();
            this.editDataStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initialStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.saveDataStateActivity = new System.Workflow.Activities.StateActivity();
            this.editDataStateActivity = new System.Workflow.Activities.StateActivity();
            this.initialStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            this.finishState = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "editDataStateActivity";
            // 
            // saveDataCodeActivity
            // 
            this.saveDataCodeActivity.Name = "saveDataCodeActivity";
            this.saveDataCodeActivity.ExecuteCode += new System.EventHandler(this.saveDataCodeActivity_ExecuteCode);
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "saveDataStateActivity";
            // 
            // saveHandleExternalEventActivity1
            // 
            this.saveHandleExternalEventActivity1.EventName = "Save";
            this.saveHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.saveHandleExternalEventActivity1.Name = "saveHandleExternalEventActivity1";
            // 
            // editDataCodeActivity
            // 
            this.editDataCodeActivity.Name = "editDataCodeActivity";
            this.editDataCodeActivity.ExecuteCode += new System.EventHandler(this.editDataCodeActivity_ExecuteCode);
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "editDataStateActivity";
            // 
            // saveDataStateInitializationActivity
            // 
            this.saveDataStateInitializationActivity.Activities.Add(this.saveDataCodeActivity);
            this.saveDataStateInitializationActivity.Activities.Add(this.setStateActivity4);
            this.saveDataStateInitializationActivity.Name = "saveDataStateInitializationActivity";
            // 
            // editDataEventDrivenActivity_Save
            // 
            this.editDataEventDrivenActivity_Save.Activities.Add(this.saveHandleExternalEventActivity1);
            this.editDataEventDrivenActivity_Save.Activities.Add(this.setStateActivity3);
            this.editDataEventDrivenActivity_Save.Name = "editDataEventDrivenActivity_Save";
            // 
            // editDataStateInitializationActivity
            // 
            this.editDataStateInitializationActivity.Activities.Add(this.editDataCodeActivity);
            this.editDataStateInitializationActivity.Name = "editDataStateInitializationActivity";
            // 
            // initialStateInitializationActivity
            // 
            this.initialStateInitializationActivity.Activities.Add(this.setStateActivity2);
            this.initialStateInitializationActivity.Name = "initialStateInitializationActivity";
            // 
            // setStateActivity1
            // 
            this.setStateActivity1.Name = "setStateActivity1";
            this.setStateActivity1.TargetStateName = "finishState";
            // 
            // cancelHandleExternalEventActivity1
            // 
            this.cancelHandleExternalEventActivity1.EventName = "Cancel";
            this.cancelHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity1.Name = "cancelHandleExternalEventActivity1";
            // 
            // saveDataStateActivity
            // 
            this.saveDataStateActivity.Activities.Add(this.saveDataStateInitializationActivity);
            this.saveDataStateActivity.Name = "saveDataStateActivity";
            // 
            // editDataStateActivity
            // 
            this.editDataStateActivity.Activities.Add(this.editDataStateInitializationActivity);
            this.editDataStateActivity.Activities.Add(this.editDataEventDrivenActivity_Save);
            this.editDataStateActivity.Name = "editDataStateActivity";
            // 
            // initialStateActivity
            // 
            this.initialStateActivity.Activities.Add(this.initialStateInitializationActivity);
            this.initialStateActivity.Name = "initialStateActivity";
            // 
            // eventDrivenActivity_GlobalCancel
            // 
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.cancelHandleExternalEventActivity1);
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.setStateActivity1);
            this.eventDrivenActivity_GlobalCancel.Name = "eventDrivenActivity_GlobalCancel";
            // 
            // finishState
            // 
            this.finishState.Name = "finishState";
            // 
            // EditAssociatedDataWorkflow
            // 
            this.Activities.Add(this.finishState);
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initialStateActivity);
            this.Activities.Add(this.editDataStateActivity);
            this.Activities.Add(this.saveDataStateActivity);
            this.CompletedStateName = "finishState";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initialStateActivity";
            this.Name = "EditAssociatedDataWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private StateActivity finishState;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private SetStateActivity setStateActivity1;
        private StateActivity initialStateActivity;
        private SetStateActivity setStateActivity2;
        private StateInitializationActivity saveDataStateInitializationActivity;
        private EventDrivenActivity editDataEventDrivenActivity_Save;
        private StateInitializationActivity editDataStateInitializationActivity;
        private StateInitializationActivity initialStateInitializationActivity;
        private StateActivity saveDataStateActivity;
        private StateActivity editDataStateActivity;
        private Composite.C1Console.Workflow.Activities.SaveHandleExternalEventActivity saveHandleExternalEventActivity1;
        private CodeActivity editDataCodeActivity;
        private CodeActivity saveDataCodeActivity;
        private SetStateActivity setStateActivity4;
        private SetStateActivity setStateActivity3;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;









































































































    }
}
