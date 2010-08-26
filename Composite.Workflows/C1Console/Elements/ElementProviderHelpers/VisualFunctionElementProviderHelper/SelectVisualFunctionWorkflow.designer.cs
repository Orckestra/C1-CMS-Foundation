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

namespace Composite.C1Console.Elements.ElementProviderHelpers.VisualFunctionElementProviderHelper
{
    partial class SelectVisualFunctionWorkflow
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
            this.closeCurrentViewActivity1 = new Composite.C1Console.Workflow.Activities.CloseCurrentViewActivity();
            this.finalizeCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.slectWizzardFormActivity = new Composite.C1Console.Workflow.Activities.DataDialogFormActivity();
            this.selectCodeActivity_Initialize = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.selectEventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.selectEventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.selectStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.finalizeStateActivity = new System.Workflow.Activities.StateActivity();
            this.selectStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            this.finishState = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "finishState";
            // 
            // closeCurrentViewActivity1
            // 
            this.closeCurrentViewActivity1.Name = "closeCurrentViewActivity1";
            // 
            // finalizeCodeActivity
            // 
            this.finalizeCodeActivity.Name = "finalizeCodeActivity";
            this.finalizeCodeActivity.ExecuteCode += new System.EventHandler(this.finalizeCodeActivity_ExecuteCode);
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "finishState";
            // 
            // cancelHandleExternalEventActivity2
            // 
            this.cancelHandleExternalEventActivity2.EventName = "Cancel";
            this.cancelHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity2.Name = "cancelHandleExternalEventActivity2";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "finalizeStateActivity";
            // 
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // slectWizzardFormActivity
            // 
            this.slectWizzardFormActivity.ContainerLabel = null;
            this.slectWizzardFormActivity.FormDefinitionFileName = "/Administrative/VisualFunctionElementProviderHelperSelect.xml";
            this.slectWizzardFormActivity.Name = "slectWizzardFormActivity";
            // 
            // selectCodeActivity_Initialize
            // 
            this.selectCodeActivity_Initialize.Name = "selectCodeActivity_Initialize";
            this.selectCodeActivity_Initialize.ExecuteCode += new System.EventHandler(this.selectCodeActivity_Initialize_ExecuteCode);
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "selectStateActivity";
            // 
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.finalizeCodeActivity);
            this.finalizeStateInitializationActivity.Activities.Add(this.closeCurrentViewActivity1);
            this.finalizeStateInitializationActivity.Activities.Add(this.setStateActivity4);
            this.finalizeStateInitializationActivity.Name = "finalizeStateInitializationActivity";
            // 
            // selectEventDrivenActivity_Cancel
            // 
            this.selectEventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.selectEventDrivenActivity_Cancel.Activities.Add(this.setStateActivity5);
            this.selectEventDrivenActivity_Cancel.Name = "selectEventDrivenActivity_Cancel";
            // 
            // selectEventDrivenActivity_Finish
            // 
            this.selectEventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity1);
            this.selectEventDrivenActivity_Finish.Activities.Add(this.setStateActivity3);
            this.selectEventDrivenActivity_Finish.Name = "selectEventDrivenActivity_Finish";
            // 
            // selectStateInitializationActivity
            // 
            this.selectStateInitializationActivity.Activities.Add(this.selectCodeActivity_Initialize);
            this.selectStateInitializationActivity.Activities.Add(this.slectWizzardFormActivity);
            this.selectStateInitializationActivity.Name = "selectStateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.setStateActivity2);
            this.initializeStateInitializationActivity.Name = "initializeStateInitializationActivity";
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
            // finalizeStateActivity
            // 
            this.finalizeStateActivity.Activities.Add(this.finalizeStateInitializationActivity);
            this.finalizeStateActivity.Name = "finalizeStateActivity";
            // 
            // selectStateActivity
            // 
            this.selectStateActivity.Activities.Add(this.selectStateInitializationActivity);
            this.selectStateActivity.Activities.Add(this.selectEventDrivenActivity_Finish);
            this.selectStateActivity.Activities.Add(this.selectEventDrivenActivity_Cancel);
            this.selectStateActivity.Name = "selectStateActivity";
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
            // finishState
            // 
            this.finishState.Name = "finishState";
            // 
            // SelectVisualFunctionWorkflow
            // 
            this.Activities.Add(this.finishState);
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.selectStateActivity);
            this.Activities.Add(this.finalizeStateActivity);
            this.CompletedStateName = "finishState";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "SelectVisualFunctionWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private StateActivity finishState;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private SetStateActivity setStateActivity4;
        private SetStateActivity setStateActivity3;
        private Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;
        private CodeActivity selectCodeActivity_Initialize;
        private SetStateActivity setStateActivity2;
        private StateInitializationActivity finalizeStateInitializationActivity;
        private EventDrivenActivity selectEventDrivenActivity_Finish;
        private StateInitializationActivity selectStateInitializationActivity;
        private StateInitializationActivity initializeStateInitializationActivity;
        private SetStateActivity setStateActivity1;
        private StateActivity finalizeStateActivity;
        private StateActivity selectStateActivity;
        private StateActivity initializeStateActivity;
        private Composite.C1Console.Workflow.Activities.DataDialogFormActivity slectWizzardFormActivity;
        private CodeActivity finalizeCodeActivity;
        private Composite.C1Console.Workflow.Activities.CloseCurrentViewActivity closeCurrentViewActivity1;
        private SetStateActivity setStateActivity5;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;
        private EventDrivenActivity selectEventDrivenActivity_Cancel;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;










































































































    }
}
