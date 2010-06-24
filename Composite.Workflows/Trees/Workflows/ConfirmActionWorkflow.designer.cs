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

namespace Composite.Workflows.Trees.Workflows
{
    partial class ConfirmActionWorkflow
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
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.showConfirmCodeActivity_ExecuteFunction = new System.Workflow.Activities.CodeActivity();
            this.finishHandleExternalEventActivity1 = new Composite.Workflow.Activities.FinishHandleExternalEventActivity();
            this.confirmDialogFormActivity1 = new Composite.Workflow.Activities.ConfirmDialogFormActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.initializeCodeActivity_UpdateBinding = new System.Workflow.Activities.CodeActivity();
            this.showConfirmEventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.showConfirmEventDrivenActivity_Ok = new System.Workflow.Activities.EventDrivenActivity();
            this.showConfirmStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.showConfirmStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity2
            // 
            this.cancelHandleExternalEventActivity2.EventName = "Cancel";
            this.cancelHandleExternalEventActivity2.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity2.Name = "cancelHandleExternalEventActivity2";
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "finalStateActivity";
            // 
            // showConfirmCodeActivity_ExecuteFunction
            // 
            this.showConfirmCodeActivity_ExecuteFunction.Name = "showConfirmCodeActivity_ExecuteFunction";
            this.showConfirmCodeActivity_ExecuteFunction.ExecuteCode += new System.EventHandler(this.showConfirmCodeActivity_ExecuteFunction_ExecuteCode);
            // 
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // confirmDialogFormActivity1
            // 
            this.confirmDialogFormActivity1.ContainerLabel = null;
            this.confirmDialogFormActivity1.FormDefinitionFileName = "/Administrative/TreeConfirmActionConfirm.xml";
            this.confirmDialogFormActivity1.Name = "confirmDialogFormActivity1";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "showConfirmStateActivity";
            // 
            // initializeCodeActivity_UpdateBinding
            // 
            this.initializeCodeActivity_UpdateBinding.Name = "initializeCodeActivity_UpdateBinding";
            this.initializeCodeActivity_UpdateBinding.ExecuteCode += new System.EventHandler(this.initializeCodeActivity_UpdateBinding_ExecuteCode);
            // 
            // showConfirmEventDrivenActivity_Cancel
            // 
            this.showConfirmEventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.showConfirmEventDrivenActivity_Cancel.Activities.Add(this.setStateActivity3);
            this.showConfirmEventDrivenActivity_Cancel.Name = "showConfirmEventDrivenActivity_Cancel";
            // 
            // showConfirmEventDrivenActivity_Ok
            // 
            this.showConfirmEventDrivenActivity_Ok.Activities.Add(this.finishHandleExternalEventActivity1);
            this.showConfirmEventDrivenActivity_Ok.Activities.Add(this.showConfirmCodeActivity_ExecuteFunction);
            this.showConfirmEventDrivenActivity_Ok.Activities.Add(this.setStateActivity4);
            this.showConfirmEventDrivenActivity_Ok.Name = "showConfirmEventDrivenActivity_Ok";
            // 
            // showConfirmStateInitializationActivity
            // 
            this.showConfirmStateInitializationActivity.Activities.Add(this.confirmDialogFormActivity1);
            this.showConfirmStateInitializationActivity.Name = "showConfirmStateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.initializeCodeActivity_UpdateBinding);
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
            // showConfirmStateActivity
            // 
            this.showConfirmStateActivity.Activities.Add(this.showConfirmStateInitializationActivity);
            this.showConfirmStateActivity.Activities.Add(this.showConfirmEventDrivenActivity_Ok);
            this.showConfirmStateActivity.Activities.Add(this.showConfirmEventDrivenActivity_Cancel);
            this.showConfirmStateActivity.Name = "showConfirmStateActivity";
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
            // ConfirmActionWorkflow
            // 
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.showConfirmStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "ConfirmActionWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateInitializationActivity initializeStateInitializationActivity;
        private SetStateActivity setStateActivity1;
        private StateActivity finalStateActivity;
        private StateActivity initializeStateActivity;
        private StateActivity showConfirmStateActivity;
        private Workflow.Activities.ConfirmDialogFormActivity confirmDialogFormActivity1;
        private StateInitializationActivity showConfirmStateInitializationActivity;
        private Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;
        private Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;
        private SetStateActivity setStateActivity2;
        private EventDrivenActivity showConfirmEventDrivenActivity_Cancel;
        private EventDrivenActivity showConfirmEventDrivenActivity_Ok;
        private SetStateActivity setStateActivity3;
        private SetStateActivity setStateActivity4;
        private CodeActivity showConfirmCodeActivity_ExecuteFunction;
        private CodeActivity initializeCodeActivity_UpdateBinding;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;












































































































    }
}
