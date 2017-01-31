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
    partial class AddNewInterfaceTypeWorkflow
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
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.finalizeStateCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.codeActivity_RefreshView = new System.Workflow.Activities.CodeActivity();
            this.customEvent01HandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CustomEvent01HandleExternalEventActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.saveHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.SaveHandleExternalEventActivity();
            this.documentFormActivity1 = new Composite.C1Console.Workflow.Activities.DocumentFormActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.initialStateCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.editType_IsSearchableChanged = new System.Workflow.Activities.EventDrivenActivity();
            this.saveStep1EventDrivenActivity = new System.Workflow.Activities.EventDrivenActivity();
            this.step1StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initialStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.cancelEventDrivenActivity = new System.Workflow.Activities.EventDrivenActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalizeStateActivity = new System.Workflow.Activities.StateActivity();
            this.editTypePropertiesStateActivity = new System.Workflow.Activities.StateActivity();
            this.initialStateActivity = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "editTypePropertiesStateActivity";
            // 
            // finalizeStateCodeActivity
            // 
            this.finalizeStateCodeActivity.Name = "finalizeStateCodeActivity";
            this.finalizeStateCodeActivity.ExecuteCode += new System.EventHandler(this.codeActivity1_ExecuteCode);
            // 
            // setStateActivity1
            // 
            this.setStateActivity1.Name = "setStateActivity1";
            this.setStateActivity1.TargetStateName = "editTypePropertiesStateActivity";
            // 
            // codeActivity_RefreshView
            // 
            this.codeActivity_RefreshView.Name = "codeActivity_RefreshView";
            this.codeActivity_RefreshView.ExecuteCode += new System.EventHandler(this.codeActivity_RefreshViewHandler);
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
            this.documentFormActivity1.FormDefinitionFileName = "/Administrative/AddNewInterfaceTypeStep1.xml";
            this.documentFormActivity1.Name = "documentFormActivity1";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "editTypePropertiesStateActivity";
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
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.finalizeStateCodeActivity);
            this.finalizeStateInitializationActivity.Activities.Add(this.setStateActivity5);
            this.finalizeStateInitializationActivity.Name = "finalizeStateInitializationActivity";
            // 
            // editType_IsSearchableChanged
            // 
            this.editType_IsSearchableChanged.Activities.Add(this.customEvent01HandleExternalEventActivity1);
            this.editType_IsSearchableChanged.Activities.Add(this.codeActivity_RefreshView);
            this.editType_IsSearchableChanged.Activities.Add(this.setStateActivity1);
            this.editType_IsSearchableChanged.Name = "editType_IsSearchableChanged";
            // 
            // saveStep1EventDrivenActivity
            // 
            this.saveStep1EventDrivenActivity.Activities.Add(this.saveHandleExternalEventActivity1);
            this.saveStep1EventDrivenActivity.Activities.Add(this.setStateActivity2);
            this.saveStep1EventDrivenActivity.Name = "saveStep1EventDrivenActivity";
            // 
            // step1StateInitializationActivity
            // 
            this.step1StateInitializationActivity.Activities.Add(this.documentFormActivity1);
            this.step1StateInitializationActivity.Name = "step1StateInitializationActivity";
            // 
            // initialStateInitializationActivity
            // 
            this.initialStateInitializationActivity.Activities.Add(this.initialStateCodeActivity);
            this.initialStateInitializationActivity.Activities.Add(this.setStateActivity3);
            this.initialStateInitializationActivity.Name = "initialStateInitializationActivity";
            // 
            // cancelEventDrivenActivity
            // 
            this.cancelEventDrivenActivity.Activities.Add(this.cancelHandleExternalEventActivity1);
            this.cancelEventDrivenActivity.Activities.Add(this.setStateActivity4);
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
            // editTypePropertiesStateActivity
            // 
            this.editTypePropertiesStateActivity.Activities.Add(this.step1StateInitializationActivity);
            this.editTypePropertiesStateActivity.Activities.Add(this.saveStep1EventDrivenActivity);
            this.editTypePropertiesStateActivity.Activities.Add(this.editType_IsSearchableChanged);
            this.editTypePropertiesStateActivity.Name = "editTypePropertiesStateActivity";
            // 
            // initialStateActivity
            // 
            this.initialStateActivity.Activities.Add(this.initialStateInitializationActivity);
            this.initialStateActivity.Name = "initialStateActivity";
            // 
            // AddNewInterfaceTypeWorkflow
            // 
            this.Activities.Add(this.initialStateActivity);
            this.Activities.Add(this.editTypePropertiesStateActivity);
            this.Activities.Add(this.finalizeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.cancelEventDrivenActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initialStateActivity";
            this.Name = "AddNewInterfaceTypeWorkflow";
            this.CanModifyActivities = false;

        }
































































        #endregion

        private SetStateActivity setStateActivity5;
        private SetStateActivity setStateActivity2;
        private StateInitializationActivity step1StateInitializationActivity;
        private StateActivity editTypePropertiesStateActivity;
        private StateActivity finalizeStateActivity;
        private StateInitializationActivity finalizeStateInitializationActivity;
        private StateActivity finalStateActivity;
        private SetStateActivity setStateActivity3;
        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateInitializationActivity initialStateInitializationActivity;
        private EventDrivenActivity cancelEventDrivenActivity;
        private SetStateActivity setStateActivity4;
        private CodeActivity initialStateCodeActivity;
        private C1Console.Workflow.Activities.SaveHandleExternalEventActivity saveHandleExternalEventActivity1;
        private C1Console.Workflow.Activities.DocumentFormActivity documentFormActivity1;
        private EventDrivenActivity saveStep1EventDrivenActivity;
        private CodeActivity finalizeStateCodeActivity;
        private SetStateActivity setStateActivity1;
        private CodeActivity codeActivity_RefreshView;
        private C1Console.Workflow.Activities.CustomEvent01HandleExternalEventActivity customEvent01HandleExternalEventActivity1;
        private EventDrivenActivity editType_IsSearchableChanged;
        private StateActivity initialStateActivity;
    }
}
