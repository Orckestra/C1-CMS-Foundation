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

namespace Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    partial class AddNewDataWorkflow
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
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.finalizeCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.setEnablePublishCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.saveAndPublishHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.SaveAndPublishHandleExternalEventActivity();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.saveHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.SaveHandleExternalEventActivity();
            this.step1CodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.initialCodeActivity_Initialize = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.finializeDtateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.saveAndPublishEventDrivenActivity = new System.Workflow.Activities.EventDrivenActivity();
            this.saveStep1EventDrivenActivity = new System.Workflow.Activities.EventDrivenActivity();
            this.step1StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initialStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.cancelEventDrivenActivity = new System.Workflow.Activities.EventDrivenActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.saveStateActivity = new System.Workflow.Activities.StateActivity();
            this.step1StateActivity = new System.Workflow.Activities.StateActivity();
            this.initialStateActivity = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "step1StateActivity";
            // 
            // finalizeCodeActivity
            // 
            this.finalizeCodeActivity.Name = "finalizeCodeActivity";
            this.finalizeCodeActivity.ExecuteCode += new System.EventHandler(this.finalizeCodeActivity_ExecuteCode);
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "saveStateActivity";
            // 
            // setEnablePublishCodeActivity
            // 
            this.setEnablePublishCodeActivity.Name = "setEnablePublishCodeActivity";
            this.setEnablePublishCodeActivity.ExecuteCode += new System.EventHandler(this.setEnablePublishCodeActivity_ExecuteCode);
            // 
            // saveAndPublishHandleExternalEventActivity1
            // 
            this.saveAndPublishHandleExternalEventActivity1.EventName = "SaveAndPublish";
            this.saveAndPublishHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.saveAndPublishHandleExternalEventActivity1.Name = "saveAndPublishHandleExternalEventActivity1";
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "saveStateActivity";
            // 
            // saveHandleExternalEventActivity1
            // 
            this.saveHandleExternalEventActivity1.EventName = "Save";
            this.saveHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.saveHandleExternalEventActivity1.Name = "saveHandleExternalEventActivity1";
            // 
            // step1CodeActivity
            // 
            this.step1CodeActivity.Name = "step1CodeActivity";
            this.step1CodeActivity.ExecuteCode += new System.EventHandler(this.step1CodeActivity_ExecuteCode);
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "step1StateActivity";
            // 
            // initialCodeActivity_Initialize
            // 
            this.initialCodeActivity_Initialize.Name = "initialCodeActivity_Initialize";
            this.initialCodeActivity_Initialize.ExecuteCode += new System.EventHandler(this.initialCodeActivity_Initialize_ExecuteCode);
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
            // finializeDtateInitializationActivity
            // 
            this.finializeDtateInitializationActivity.Activities.Add(this.finalizeCodeActivity);
            this.finializeDtateInitializationActivity.Activities.Add(this.setStateActivity2);
            this.finializeDtateInitializationActivity.Name = "finializeDtateInitializationActivity";
            // 
            // saveAndPublishEventDrivenActivity
            // 
            this.saveAndPublishEventDrivenActivity.Activities.Add(this.saveAndPublishHandleExternalEventActivity1);
            this.saveAndPublishEventDrivenActivity.Activities.Add(this.setEnablePublishCodeActivity);
            this.saveAndPublishEventDrivenActivity.Activities.Add(this.setStateActivity3);
            this.saveAndPublishEventDrivenActivity.Name = "saveAndPublishEventDrivenActivity";
            // 
            // saveStep1EventDrivenActivity
            // 
            this.saveStep1EventDrivenActivity.Activities.Add(this.saveHandleExternalEventActivity1);
            this.saveStep1EventDrivenActivity.Activities.Add(this.setStateActivity6);
            this.saveStep1EventDrivenActivity.Name = "saveStep1EventDrivenActivity";
            // 
            // step1StateInitializationActivity
            // 
            this.step1StateInitializationActivity.Activities.Add(this.step1CodeActivity);
            this.step1StateInitializationActivity.Name = "step1StateInitializationActivity";
            // 
            // initialStateInitializationActivity
            // 
            this.initialStateInitializationActivity.Activities.Add(this.initialCodeActivity_Initialize);
            this.initialStateInitializationActivity.Activities.Add(this.setStateActivity4);
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
            this.saveStateActivity.Activities.Add(this.finializeDtateInitializationActivity);
            this.saveStateActivity.Name = "saveStateActivity";
            // 
            // step1StateActivity
            // 
            this.step1StateActivity.Activities.Add(this.step1StateInitializationActivity);
            this.step1StateActivity.Activities.Add(this.saveStep1EventDrivenActivity);
            this.step1StateActivity.Activities.Add(this.saveAndPublishEventDrivenActivity);
            this.step1StateActivity.Name = "step1StateActivity";
            // 
            // initialStateActivity
            // 
            this.initialStateActivity.Activities.Add(this.initialStateInitializationActivity);
            this.initialStateActivity.Name = "initialStateActivity";
            // 
            // AddNewDataWorkflow
            // 
            this.Activities.Add(this.initialStateActivity);
            this.Activities.Add(this.step1StateActivity);
            this.Activities.Add(this.saveStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.cancelEventDrivenActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initialStateActivity";
            this.Name = "AddNewDataWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private SetStateActivity setStateActivity3;

        private CodeActivity setEnablePublishCodeActivity;

        private C1Console.Workflow.Activities.SaveAndPublishHandleExternalEventActivity saveAndPublishHandleExternalEventActivity1;

        private EventDrivenActivity saveAndPublishEventDrivenActivity;

        private SetStateActivity setStateActivity1;

        private StateInitializationActivity finializeDtateInitializationActivity;

        private EventDrivenActivity saveStep1EventDrivenActivity;

        private StateInitializationActivity step1StateInitializationActivity;

        private StateInitializationActivity initialStateInitializationActivity;

        private EventDrivenActivity cancelEventDrivenActivity;

        private StateActivity finalStateActivity;

        private StateActivity saveStateActivity;

        private StateActivity step1StateActivity;

        private SetStateActivity setStateActivity4;

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;

        private CodeActivity step1CodeActivity;

        private CodeActivity finalizeCodeActivity;

        private C1Console.Workflow.Activities.SaveHandleExternalEventActivity saveHandleExternalEventActivity1;

        private SetStateActivity setStateActivity2;

        private SetStateActivity setStateActivity6;

        private CodeActivity initialCodeActivity_Initialize;

        private StateActivity initialStateActivity;


























    }
}
