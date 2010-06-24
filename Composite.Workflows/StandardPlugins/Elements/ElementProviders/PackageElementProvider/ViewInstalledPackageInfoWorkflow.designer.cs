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
using Composite.Workflow;

namespace Composite.StandardPlugins.Elements.ElementProviders.PackageElementProvider
{
    partial class ViewInstalledPackageInfoWorkflow
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
            this.uninstallCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.customEvent01HandleExternalEventActivity1 = new Composite.Workflow.Activities.CustomEvent01HandleExternalEventActivity();
            this.viewDocumentFormActivity = new Composite.Workflow.Activities.DocumentFormActivity();
            this.viewStateCodeActivity_Initialize = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.uninstallStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.eventDrivenActivity_Uninstall = new System.Workflow.Activities.EventDrivenActivity();
            this.viewStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.uninstallStateActivity = new System.Workflow.Activities.StateActivity();
            this.viewStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "viewStateActivity";
            // 
            // uninstallCodeActivity
            // 
            this.uninstallCodeActivity.Name = "uninstallCodeActivity";
            this.uninstallCodeActivity.ExecuteCode += new System.EventHandler(this.uninstallCodeActivity_ExecuteCode);
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "uninstallStateActivity";
            // 
            // customEvent01HandleExternalEventActivity1
            // 
            this.customEvent01HandleExternalEventActivity1.EventName = "CustomEvent01";
            this.customEvent01HandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.customEvent01HandleExternalEventActivity1.Name = "customEvent01HandleExternalEventActivity1";
            // 
            // viewDocumentFormActivity
            // 
            this.viewDocumentFormActivity.ContainerLabel = null;
            this.viewDocumentFormActivity.CustomToolbarDefinitionFileName = null;
            this.viewDocumentFormActivity.FormDefinitionFileName = "\\Administrative\\PackageElementProviderViewInstalledPackageInformation.xml";
            this.viewDocumentFormActivity.Name = "viewDocumentFormActivity";
            // 
            // viewStateCodeActivity_Initialize
            // 
            this.viewStateCodeActivity_Initialize.Name = "viewStateCodeActivity_Initialize";
            this.viewStateCodeActivity_Initialize.ExecuteCode += new System.EventHandler(this.viewStateCodeActivity_Initialize_ExecuteCode);
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "viewStateActivity";
            // 
            // uninstallStateInitializationActivity
            // 
            this.uninstallStateInitializationActivity.Activities.Add(this.uninstallCodeActivity);
            this.uninstallStateInitializationActivity.Activities.Add(this.setStateActivity4);
            this.uninstallStateInitializationActivity.Name = "uninstallStateInitializationActivity";
            // 
            // eventDrivenActivity_Uninstall
            // 
            this.eventDrivenActivity_Uninstall.Activities.Add(this.customEvent01HandleExternalEventActivity1);
            this.eventDrivenActivity_Uninstall.Activities.Add(this.setStateActivity3);
            this.eventDrivenActivity_Uninstall.Name = "eventDrivenActivity_Uninstall";
            // 
            // viewStateInitializationActivity
            // 
            this.viewStateInitializationActivity.Activities.Add(this.viewStateCodeActivity_Initialize);
            this.viewStateInitializationActivity.Activities.Add(this.viewDocumentFormActivity);
            this.viewStateInitializationActivity.Name = "viewStateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
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
            this.cancelHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity1.Name = "cancelHandleExternalEventActivity1";
            // 
            // uninstallStateActivity
            // 
            this.uninstallStateActivity.Activities.Add(this.uninstallStateInitializationActivity);
            this.uninstallStateActivity.Name = "uninstallStateActivity";
            // 
            // viewStateActivity
            // 
            this.viewStateActivity.Activities.Add(this.viewStateInitializationActivity);
            this.viewStateActivity.Activities.Add(this.eventDrivenActivity_Uninstall);
            this.viewStateActivity.Name = "viewStateActivity";
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
            // ViewInstalledAddOnInfoWorkflow
            // 
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.viewStateActivity);
            this.Activities.Add(this.uninstallStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "ViewInstalledAddOnInfoWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateInitializationActivity initializeStateInitializationActivity;
        private SetStateActivity setStateActivity1;
        private StateActivity finalStateActivity;
        private StateActivity initializeStateActivity;
        private Composite.Workflow.Activities.DocumentFormActivity viewDocumentFormActivity;
        private SetStateActivity setStateActivity2;
        private StateInitializationActivity viewStateInitializationActivity;
        private StateActivity viewStateActivity;
        private CodeActivity viewStateCodeActivity_Initialize;
        private EventDrivenActivity eventDrivenActivity_Uninstall;
        private SetStateActivity setStateActivity3;
        private Composite.Workflow.Activities.CustomEvent01HandleExternalEventActivity customEvent01HandleExternalEventActivity1;
        private StateInitializationActivity uninstallStateInitializationActivity;
        private StateActivity uninstallStateActivity;
        private CodeActivity uninstallCodeActivity;
        private SetStateActivity setStateActivity4;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;















































































































    }
}
