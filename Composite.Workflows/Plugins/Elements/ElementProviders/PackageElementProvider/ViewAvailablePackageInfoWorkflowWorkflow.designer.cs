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

namespace Composite.Plugins.Elements.ElementProviders.PackageElementProvider
{
    partial class ViewAvailablePackageInfoWorkflowWorkflow
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
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.viewCodeActivity_ShowMessage = new System.Workflow.Activities.CodeActivity();
            this.viewDocumentFormActivity = new Composite.C1Console.Workflow.Activities.DocumentFormActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.installAddOnCodeActivity_Execute = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.customEvent01HandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CustomEvent01HandleExternalEventActivity();
            this.ifElseActivity_AddOnDescriptionExists = new System.Workflow.Activities.IfElseActivity();
            this.viewStateCodeActivity_Initialize = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.installAddOnStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.viewSateEventDrivenActivity_Install = new System.Workflow.Activities.EventDrivenActivity();
            this.viewStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.installAddOnStateActivity = new System.Workflow.Activities.StateActivity();
            this.viewStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "finalStateActivity";
            // 
            // viewCodeActivity_ShowMessage
            // 
            this.viewCodeActivity_ShowMessage.Name = "viewCodeActivity_ShowMessage";
            this.viewCodeActivity_ShowMessage.ExecuteCode += new System.EventHandler(this.viewCodeActivity_ShowMessage_ExecuteCode);
            // 
            // viewDocumentFormActivity
            // 
            this.viewDocumentFormActivity.ContainerLabel = null;
            this.viewDocumentFormActivity.CustomToolbarDefinitionFileName = null;
            this.viewDocumentFormActivity.FormDefinitionFileName = "\\Administrative\\PackageElementProviderViewAvailablePackageInformation.xml";
            this.viewDocumentFormActivity.Name = "viewDocumentFormActivity";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.viewCodeActivity_ShowMessage);
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity5);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.viewDocumentFormActivity);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.AddOnDescriptionExists);
            this.ifElseBranchActivity1.Condition = codecondition1;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "viewStateActivity";
            // 
            // installAddOnCodeActivity_Execute
            // 
            this.installAddOnCodeActivity_Execute.Name = "installAddOnCodeActivity_Execute";
            this.installAddOnCodeActivity_Execute.ExecuteCode += new System.EventHandler(this.installAddOnCodeActivity_Execute_ExecuteCode);
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "installAddOnStateActivity";
            // 
            // customEvent01HandleExternalEventActivity1
            // 
            this.customEvent01HandleExternalEventActivity1.EventName = "CustomEvent01";
            this.customEvent01HandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.customEvent01HandleExternalEventActivity1.Name = "customEvent01HandleExternalEventActivity1";
            // 
            // ifElseActivity_AddOnDescriptionExists
            // 
            this.ifElseActivity_AddOnDescriptionExists.Activities.Add(this.ifElseBranchActivity1);
            this.ifElseActivity_AddOnDescriptionExists.Activities.Add(this.ifElseBranchActivity2);
            this.ifElseActivity_AddOnDescriptionExists.Name = "ifElseActivity_AddOnDescriptionExists";
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
            // installAddOnStateInitializationActivity
            // 
            this.installAddOnStateInitializationActivity.Activities.Add(this.installAddOnCodeActivity_Execute);
            this.installAddOnStateInitializationActivity.Activities.Add(this.setStateActivity4);
            this.installAddOnStateInitializationActivity.Name = "installAddOnStateInitializationActivity";
            // 
            // viewSateEventDrivenActivity_Install
            // 
            this.viewSateEventDrivenActivity_Install.Activities.Add(this.customEvent01HandleExternalEventActivity1);
            this.viewSateEventDrivenActivity_Install.Activities.Add(this.setStateActivity3);
            this.viewSateEventDrivenActivity_Install.Name = "viewSateEventDrivenActivity_Install";
            // 
            // viewStateInitializationActivity
            // 
            this.viewStateInitializationActivity.Activities.Add(this.viewStateCodeActivity_Initialize);
            this.viewStateInitializationActivity.Activities.Add(this.ifElseActivity_AddOnDescriptionExists);
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
            this.cancelHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity1.Name = "cancelHandleExternalEventActivity1";
            // 
            // installAddOnStateActivity
            // 
            this.installAddOnStateActivity.Activities.Add(this.installAddOnStateInitializationActivity);
            this.installAddOnStateActivity.Name = "installAddOnStateActivity";
            // 
            // viewStateActivity
            // 
            this.viewStateActivity.Activities.Add(this.viewStateInitializationActivity);
            this.viewStateActivity.Activities.Add(this.viewSateEventDrivenActivity_Install);
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
            // ViewAvailablePackageInfoWorkflowWorkflow
            // 
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.viewStateActivity);
            this.Activities.Add(this.installAddOnStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "ViewAvailablePackageInfoWorkflowWorkflow";
            this.CanModifyActivities = false;

        }


















































































































        #endregion

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateInitializationActivity initializeStateInitializationActivity;
        private SetStateActivity setStateActivity1;
        private StateActivity finalStateActivity;
        private StateActivity initializeStateActivity;
        private StateInitializationActivity viewStateInitializationActivity;
        private StateActivity viewStateActivity;
        private C1Console.Workflow.Activities.DocumentFormActivity viewDocumentFormActivity;
        private CodeActivity viewStateCodeActivity_Initialize;
        private EventDrivenActivity viewSateEventDrivenActivity_Install;
        private SetStateActivity setStateActivity2;
        private C1Console.Workflow.Activities.CustomEvent01HandleExternalEventActivity customEvent01HandleExternalEventActivity1;
        private CodeActivity installAddOnCodeActivity_Execute;
        private SetStateActivity setStateActivity3;
        private StateInitializationActivity installAddOnStateInitializationActivity;
        private StateActivity installAddOnStateActivity;
        private SetStateActivity setStateActivity4;
        private SetStateActivity setStateActivity5;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private IfElseActivity ifElseActivity_AddOnDescriptionExists;
        private CodeActivity viewCodeActivity_ShowMessage;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;
    }
}
