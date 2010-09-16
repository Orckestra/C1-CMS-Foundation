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
    partial class DeleteInlineFunctionWorkflow
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
            this.finalizeCodeActivity_DeleteFunction = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.confirmDialogFormActivity1 = new Composite.C1Console.Workflow.Activities.ConfirmDialogFormActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.confirmEventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.confirmEventDrivenActivity_Ok = new System.Workflow.Activities.EventDrivenActivity();
            this.confirmStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.finalizeStateActivity = new System.Workflow.Activities.StateActivity();
            this.confirmStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "finalStateActivity";
            // 
            // finalizeCodeActivity_DeleteFunction
            // 
            this.finalizeCodeActivity_DeleteFunction.Name = "finalizeCodeActivity_DeleteFunction";
            this.finalizeCodeActivity_DeleteFunction.ExecuteCode += new System.EventHandler(this.finalizeCodeActivity_DeleteFunction_ExecuteCode);
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity2
            // 
            this.cancelHandleExternalEventActivity2.EventName = "Cancel";
            this.cancelHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity2.Name = "cancelHandleExternalEventActivity2";
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "finalizeStateActivity";
            // 
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // confirmDialogFormActivity1
            // 
            this.confirmDialogFormActivity1.ContainerLabel = null;
            this.confirmDialogFormActivity1.FormDefinitionFileName = "\\Administrative\\InlineFunctionDeleteFunction.xml";
            this.confirmDialogFormActivity1.Name = "confirmDialogFormActivity1";
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "confirmStateActivity";
            // 
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.finalizeCodeActivity_DeleteFunction);
            this.finalizeStateInitializationActivity.Activities.Add(this.setStateActivity5);
            this.finalizeStateInitializationActivity.Name = "finalizeStateInitializationActivity";
            // 
            // confirmEventDrivenActivity_Cancel
            // 
            this.confirmEventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.confirmEventDrivenActivity_Cancel.Activities.Add(this.setStateActivity2);
            this.confirmEventDrivenActivity_Cancel.Name = "confirmEventDrivenActivity_Cancel";
            // 
            // confirmEventDrivenActivity_Ok
            // 
            this.confirmEventDrivenActivity_Ok.Activities.Add(this.finishHandleExternalEventActivity1);
            this.confirmEventDrivenActivity_Ok.Activities.Add(this.setStateActivity6);
            this.confirmEventDrivenActivity_Ok.Name = "confirmEventDrivenActivity_Ok";
            // 
            // confirmStateInitializationActivity
            // 
            this.confirmStateInitializationActivity.Activities.Add(this.confirmDialogFormActivity1);
            this.confirmStateInitializationActivity.Name = "confirmStateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
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
            // finalizeStateActivity
            // 
            this.finalizeStateActivity.Activities.Add(this.finalizeStateInitializationActivity);
            this.finalizeStateActivity.Name = "finalizeStateActivity";
            // 
            // confirmStateActivity
            // 
            this.confirmStateActivity.Activities.Add(this.confirmStateInitializationActivity);
            this.confirmStateActivity.Activities.Add(this.confirmEventDrivenActivity_Ok);
            this.confirmStateActivity.Activities.Add(this.confirmEventDrivenActivity_Cancel);
            this.confirmStateActivity.Name = "confirmStateActivity";
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
            // DeleteInlineFunctionWorkflow
            // 
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.confirmStateActivity);
            this.Activities.Add(this.finalizeStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "DeleteInlineFunctionWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;

        private StateInitializationActivity initializeStateInitializationActivity;

        private SetStateActivity setStateActivity1;

        private StateActivity finalStateActivity;

        private StateActivity initializeStateActivity;

        private SetStateActivity setStateActivity5;

        private CodeActivity finalizeCodeActivity_DeleteFunction;

        private SetStateActivity setStateActivity2;

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;

        private SetStateActivity setStateActivity6;

        private C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;

        private C1Console.Workflow.Activities.ConfirmDialogFormActivity confirmDialogFormActivity1;

        private SetStateActivity setStateActivity4;

        private StateInitializationActivity finalizeStateInitializationActivity;

        private EventDrivenActivity confirmEventDrivenActivity_Cancel;

        private EventDrivenActivity confirmEventDrivenActivity_Ok;

        private StateInitializationActivity confirmStateInitializationActivity;

        private StateActivity finalizeStateActivity;

        private StateActivity confirmStateActivity;

        private EventDrivenActivity eventDrivenActivity_GlobalCancel;






































































































    }
}
