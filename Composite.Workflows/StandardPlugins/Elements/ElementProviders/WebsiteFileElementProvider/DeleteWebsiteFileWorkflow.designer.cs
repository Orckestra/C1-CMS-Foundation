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

namespace Composite.StandardPlugins.Elements.ElementProviders.WebsiteFileElementProvider
{
    partial class DeleteWebsiteFileWorkflow
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
            this.closeCurrentViewActivity1 = new Composite.Workflow.Activities.CloseCurrentViewActivity();
            this.deleteCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.wizzardFormActivity1 = new Composite.Workflow.Activities.ConfirmDialogFormActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity1 = new Composite.Workflow.Activities.FinishHandleExternalEventActivity();
            this.stateInitializationActivity1 = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.deleteEventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.initializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.deleteEventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.finalizeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity1 = new System.Workflow.Activities.EventDrivenActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.DeleteWebsiteFileWorkflowInitialState = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "finalStateActivity";
            // 
            // closeCurrentViewActivity1
            // 
            this.closeCurrentViewActivity1.Name = "closeCurrentViewActivity1";
            // 
            // deleteCodeActivity
            // 
            this.deleteCodeActivity.Name = "deleteCodeActivity";
            this.deleteCodeActivity.ExecuteCode += new System.EventHandler(this.deleteCodeActivity_ExecuteCode);
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity2
            // 
            this.cancelHandleExternalEventActivity2.EventName = "Cancel";
            this.cancelHandleExternalEventActivity2.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity2.Name = "cancelHandleExternalEventActivity2";
            // 
            // wizzardFormActivity1
            // 
            this.wizzardFormActivity1.ContainerLabel = null;
            this.wizzardFormActivity1.FormDefinitionFileName = "\\Administrative\\WebsiteFileElementProviderDeleteFile.xml";
            this.wizzardFormActivity1.Name = "wizzardFormActivity1";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "finalizeStateActivity";
            // 
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // stateInitializationActivity1
            // 
            this.stateInitializationActivity1.Activities.Add(this.deleteCodeActivity);
            this.stateInitializationActivity1.Activities.Add(this.closeCurrentViewActivity1);
            this.stateInitializationActivity1.Activities.Add(this.setStateActivity2);
            this.stateInitializationActivity1.Name = "stateInitializationActivity1";
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
            // deleteEventDrivenActivity_Cancel
            // 
            this.deleteEventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.deleteEventDrivenActivity_Cancel.Activities.Add(this.setStateActivity4);
            this.deleteEventDrivenActivity_Cancel.Name = "deleteEventDrivenActivity_Cancel";
            // 
            // initializationActivity
            // 
            this.initializationActivity.Activities.Add(this.wizzardFormActivity1);
            this.initializationActivity.Name = "initializationActivity";
            // 
            // deleteEventDrivenActivity_Finish
            // 
            this.deleteEventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity1);
            this.deleteEventDrivenActivity_Finish.Activities.Add(this.setStateActivity3);
            this.deleteEventDrivenActivity_Finish.Name = "deleteEventDrivenActivity_Finish";
            // 
            // finalizeStateActivity
            // 
            this.finalizeStateActivity.Activities.Add(this.stateInitializationActivity1);
            this.finalizeStateActivity.Name = "finalizeStateActivity";
            // 
            // eventDrivenActivity1
            // 
            this.eventDrivenActivity1.Activities.Add(this.cancelHandleExternalEventActivity1);
            this.eventDrivenActivity1.Activities.Add(this.setStateActivity1);
            this.eventDrivenActivity1.Name = "eventDrivenActivity1";
            // 
            // finalStateActivity
            // 
            this.finalStateActivity.Name = "finalStateActivity";
            // 
            // DeleteWebsiteFileWorkflowInitialState
            // 
            this.DeleteWebsiteFileWorkflowInitialState.Activities.Add(this.deleteEventDrivenActivity_Finish);
            this.DeleteWebsiteFileWorkflowInitialState.Activities.Add(this.initializationActivity);
            this.DeleteWebsiteFileWorkflowInitialState.Activities.Add(this.deleteEventDrivenActivity_Cancel);
            this.DeleteWebsiteFileWorkflowInitialState.Name = "DeleteWebsiteFileWorkflowInitialState";
            // 
            // DeleteWebsiteFileWorkflow
            // 
            this.Activities.Add(this.DeleteWebsiteFileWorkflowInitialState);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.eventDrivenActivity1);
            this.Activities.Add(this.finalizeStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "DeleteWebsiteFileWorkflowInitialState";
            this.Name = "DeleteWebsiteFileWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private EventDrivenActivity eventDrivenActivity1;
        private StateActivity finalStateActivity;
        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private CodeActivity deleteCodeActivity;
        private SetStateActivity setStateActivity1;
        private StateInitializationActivity stateInitializationActivity1;
        private SetStateActivity setStateActivity2;
        private EventDrivenActivity deleteEventDrivenActivity_Finish;
        private StateActivity finalizeStateActivity;
        private SetStateActivity setStateActivity3;
        private Composite.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;
        private Composite.Workflow.Activities.ConfirmDialogFormActivity wizzardFormActivity1;
        private StateInitializationActivity initializationActivity;
        private Composite.Workflow.Activities.CloseCurrentViewActivity closeCurrentViewActivity1;
        private SetStateActivity setStateActivity4;
        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;
        private EventDrivenActivity deleteEventDrivenActivity_Cancel;
        private StateActivity DeleteWebsiteFileWorkflowInitialState;


















    }
}
