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

namespace Composite.C1Console.Tools
{
    partial class SetTimeZoneWorkflow
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
            this.sendMessageCodeActivity_SendMessage = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.dataDialogFormActivity1 = new Composite.C1Console.Workflow.Activities.DataDialogFormActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.initializeCodeActivity_InitializeBindings = new System.Workflow.Activities.CodeActivity();
            this.sendMessageStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.enterMessageEventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.enterMessageEventDrivenActivity_Ok = new System.Workflow.Activities.EventDrivenActivity();
            this.enterMessageStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.sendMessageStateActivity = new System.Workflow.Activities.StateActivity();
            this.enterMessageStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "finalStateActivity";
            // 
            // sendMessageCodeActivity_SendMessage
            // 
            this.sendMessageCodeActivity_SendMessage.Name = "sendMessageCodeActivity_SendMessage";
            this.sendMessageCodeActivity_SendMessage.ExecuteCode += new System.EventHandler(this.sendMessageCodeActivity_SendMessage_ExecuteCode);
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity2
            // 
            this.cancelHandleExternalEventActivity2.EventName = "Cancel";
            this.cancelHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity2.Name = "cancelHandleExternalEventActivity2";
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "sendMessageStateActivity";
            // 
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // dataDialogFormActivity1
            // 
            this.dataDialogFormActivity1.ContainerLabel = null;
            this.dataDialogFormActivity1.FormDefinitionFileName = "/Administrative/SetTimeZone_select.xml";
            this.dataDialogFormActivity1.Name = "dataDialogFormActivity1";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "enterMessageStateActivity";
            // 
            // initializeCodeActivity_InitializeBindings
            // 
            this.initializeCodeActivity_InitializeBindings.Name = "initializeCodeActivity_InitializeBindings";
            this.initializeCodeActivity_InitializeBindings.ExecuteCode += new System.EventHandler(this.initializeCodeActivity_InitializeBindings_ExecuteCode);
            // 
            // sendMessageStateInitializationActivity
            // 
            this.sendMessageStateInitializationActivity.Activities.Add(this.sendMessageCodeActivity_SendMessage);
            this.sendMessageStateInitializationActivity.Activities.Add(this.setStateActivity5);
            this.sendMessageStateInitializationActivity.Name = "sendMessageStateInitializationActivity";
            // 
            // enterMessageEventDrivenActivity_Cancel
            // 
            this.enterMessageEventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.enterMessageEventDrivenActivity_Cancel.Activities.Add(this.setStateActivity3);
            this.enterMessageEventDrivenActivity_Cancel.Name = "enterMessageEventDrivenActivity_Cancel";
            // 
            // enterMessageEventDrivenActivity_Ok
            // 
            this.enterMessageEventDrivenActivity_Ok.Activities.Add(this.finishHandleExternalEventActivity1);
            this.enterMessageEventDrivenActivity_Ok.Activities.Add(this.setStateActivity4);
            this.enterMessageEventDrivenActivity_Ok.Name = "enterMessageEventDrivenActivity_Ok";
            // 
            // enterMessageStateInitializationActivity
            // 
            this.enterMessageStateInitializationActivity.Activities.Add(this.dataDialogFormActivity1);
            this.enterMessageStateInitializationActivity.Name = "enterMessageStateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.initializeCodeActivity_InitializeBindings);
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
            // sendMessageStateActivity
            // 
            this.sendMessageStateActivity.Activities.Add(this.sendMessageStateInitializationActivity);
            this.sendMessageStateActivity.Name = "sendMessageStateActivity";
            // 
            // enterMessageStateActivity
            // 
            this.enterMessageStateActivity.Activities.Add(this.enterMessageStateInitializationActivity);
            this.enterMessageStateActivity.Activities.Add(this.enterMessageEventDrivenActivity_Ok);
            this.enterMessageStateActivity.Activities.Add(this.enterMessageEventDrivenActivity_Cancel);
            this.enterMessageStateActivity.Name = "enterMessageStateActivity";
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
            // SendMessageToConsolesWorkflow
            // 
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.enterMessageStateActivity);
            this.Activities.Add(this.sendMessageStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "SendMessageToConsolesWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;

        private StateInitializationActivity initializeStateInitializationActivity;

        private SetStateActivity setStateActivity1;

        private StateActivity finalStateActivity;

        private StateActivity initializeStateActivity;

        private SetStateActivity setStateActivity3;

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;

        private SetStateActivity setStateActivity4;

        private C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;

        private C1Console.Workflow.Activities.DataDialogFormActivity dataDialogFormActivity1;

        private SetStateActivity setStateActivity2;

        private EventDrivenActivity enterMessageEventDrivenActivity_Cancel;

        private EventDrivenActivity enterMessageEventDrivenActivity_Ok;

        private StateInitializationActivity enterMessageStateInitializationActivity;

        private StateActivity sendMessageStateActivity;

        private StateActivity enterMessageStateActivity;

        private SetStateActivity setStateActivity5;

        private CodeActivity initializeCodeActivity_InitializeBindings;

        private StateInitializationActivity sendMessageStateInitializationActivity;

        private CodeActivity sendMessageCodeActivity_SendMessage;

        private EventDrivenActivity eventDrivenActivity_GlobalCancel;








































































































    }
}
