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
    partial class EditInterfaceTypeWorkflow
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
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.finalizeStateCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.codeActivity_refreshView = new System.Workflow.Activities.CodeActivity();
            this.customEvent01HandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CustomEvent01HandleExternalEventActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.saveHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.SaveHandleExternalEventActivity();
            this.documentFormActivity1 = new Composite.C1Console.Workflow.Activities.DocumentFormActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.initialStateCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.editState_IsSearchableChanged = new System.Workflow.Activities.EventDrivenActivity();
            this.saveStep1StateEventDrivenActivity = new System.Workflow.Activities.EventDrivenActivity();
            this.step1StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initialStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.cancelEventDrivenActivity = new System.Workflow.Activities.EventDrivenActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalizeStateActivity = new System.Workflow.Activities.StateActivity();
            this.step1StateActivity = new System.Workflow.Activities.StateActivity();
            this.initialStateActivity1 = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "step1StateActivity";
            // 
            // finalizeStateCodeActivity
            // 
            this.finalizeStateCodeActivity.Name = "finalizeStateCodeActivity";
            this.finalizeStateCodeActivity.ExecuteCode += new System.EventHandler(this.finalizeStateCodeActivity_ExecuteCode);
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "step1StateActivity";
            // 
            // codeActivity_refreshView
            // 
            this.codeActivity_refreshView.Name = "codeActivity_refreshView";
            this.codeActivity_refreshView.ExecuteCode += new System.EventHandler(this.codeActivity_refreshViewHandler);
            // 
            // customEvent01HandleExternalEventActivity1
            // 
            this.customEvent01HandleExternalEventActivity1.EventName = "CustomEvent01";
            this.customEvent01HandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.customEvent01HandleExternalEventActivity1.Name = "customEvent01HandleExternalEventActivity1";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "finalizeStateActivity";
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
            this.documentFormActivity1.CustomToolbarDefinitionFileName = null;
            this.documentFormActivity1.FormDefinitionFileName = "/Administrative/EditInterfaceTypeStep1.xml";
            this.documentFormActivity1.Name = "documentFormActivity1";
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "step1StateActivity";
            // 
            // initialStateCodeActivity
            // 
            this.initialStateCodeActivity.Name = "initialStateCodeActivity";
            this.initialStateCodeActivity.ExecuteCode += new System.EventHandler(this.initialStateCodeActivity_ExecuteCode);
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
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.finalizeStateCodeActivity);
            this.finalizeStateInitializationActivity.Activities.Add(this.setStateActivity3);
            this.finalizeStateInitializationActivity.Name = "finalizeStateInitializationActivity";
            // 
            // editState_IsSearchableChanged
            // 
            this.editState_IsSearchableChanged.Activities.Add(this.customEvent01HandleExternalEventActivity1);
            this.editState_IsSearchableChanged.Activities.Add(this.codeActivity_refreshView);
            this.editState_IsSearchableChanged.Activities.Add(this.setStateActivity5);
            this.editState_IsSearchableChanged.Name = "editState_IsSearchableChanged";
            // 
            // saveStep1StateEventDrivenActivity
            // 
            this.saveStep1StateEventDrivenActivity.Activities.Add(this.saveHandleExternalEventActivity1);
            this.saveStep1StateEventDrivenActivity.Activities.Add(this.setStateActivity2);
            this.saveStep1StateEventDrivenActivity.Name = "saveStep1StateEventDrivenActivity";
            // 
            // step1StateInitializationActivity
            // 
            this.step1StateInitializationActivity.Activities.Add(this.documentFormActivity1);
            this.step1StateInitializationActivity.Name = "step1StateInitializationActivity";
            // 
            // initialStateInitializationActivity
            // 
            this.initialStateInitializationActivity.Activities.Add(this.initialStateCodeActivity);
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
            // finalizeStateActivity
            // 
            this.finalizeStateActivity.Activities.Add(this.finalizeStateInitializationActivity);
            this.finalizeStateActivity.Name = "finalizeStateActivity";
            // 
            // step1StateActivity
            // 
            this.step1StateActivity.Activities.Add(this.step1StateInitializationActivity);
            this.step1StateActivity.Activities.Add(this.saveStep1StateEventDrivenActivity);
            this.step1StateActivity.Activities.Add(this.editState_IsSearchableChanged);
            this.step1StateActivity.Name = "step1StateActivity";
            // 
            // initialStateActivity1
            // 
            this.initialStateActivity1.Activities.Add(this.initialStateInitializationActivity);
            this.initialStateActivity1.Name = "initialStateActivity1";
            // 
            // EditInterfaceTypeWorkflow
            // 
            this.Activities.Add(this.initialStateActivity1);
            this.Activities.Add(this.step1StateActivity);
            this.Activities.Add(this.finalizeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.cancelEventDrivenActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initialStateActivity1";
            this.Name = "EditInterfaceTypeWorkflow";
            this.CanModifyActivities = false;

        }



















































        #endregion

        private SetStateActivity setStateActivity1;
        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private EventDrivenActivity cancelEventDrivenActivity;
        private StateActivity finalStateActivity;
        private StateActivity finalizeStateActivity;
        private StateActivity step1StateActivity;
        private SetStateActivity setStateActivity4;
        private StateInitializationActivity finalizeStateInitializationActivity;
        private StateInitializationActivity step1StateInitializationActivity;
        private StateInitializationActivity initialStateInitializationActivity;
        private C1Console.Workflow.Activities.DocumentFormActivity documentFormActivity1;
        private CodeActivity initialStateCodeActivity;
        private SetStateActivity setStateActivity2;
        private C1Console.Workflow.Activities.SaveHandleExternalEventActivity saveHandleExternalEventActivity1;
        private EventDrivenActivity saveStep1StateEventDrivenActivity;
        private CodeActivity finalizeStateCodeActivity;
        private SetStateActivity setStateActivity3;
        private SetStateActivity setStateActivity5;
        private CodeActivity codeActivity_refreshView;
        private C1Console.Workflow.Activities.CustomEvent01HandleExternalEventActivity customEvent01HandleExternalEventActivity1;
        private EventDrivenActivity editState_IsSearchableChanged;
        private StateActivity initialStateActivity1;
    }
}
