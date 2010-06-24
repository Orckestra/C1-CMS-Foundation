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

namespace Composite.Elements.ElementProviderHelpers.VisualFunctionElementProviderHelper
{
    partial class EditVisualFunctionWorkflow
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
            this.showFieldMessageActivity1 = new Composite.Workflow.Activities.ShowFieldMessageActivity();
            this.saveCodeActivity_Save = new System.Workflow.Activities.CodeActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.editCodeActivity_Preview = new System.Workflow.Activities.CodeActivity();
            this.previewHandleExternalEventActivity1 = new Composite.Workflow.Activities.PreviewHandleExternalEventActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.saveHandleExternalEventActivity1 = new Composite.Workflow.Activities.SaveHandleExternalEventActivity();
            this.editDocumentFormActivity = new Composite.Workflow.Activities.DocumentFormActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.initializeCodeActivity_Initialize = new System.Workflow.Activities.CodeActivity();
            this.saveStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.editEventDrivenActivity_Preview = new System.Workflow.Activities.EventDrivenActivity();
            this.editEventDrivenActivity_Save = new System.Workflow.Activities.EventDrivenActivity();
            this.editStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity19 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.saveStateActivity = new System.Workflow.Activities.StateActivity();
            this.editStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            this.finishState = new System.Workflow.Activities.StateActivity();
            // 
            // showFieldMessageActivity1
            // 
            this.showFieldMessageActivity1.FieldBindingPath = "Function.Name";
            this.showFieldMessageActivity1.Message = "${Composite.Management, EditVisualFunctionWorkflow.FunctionNameValidato" +
                "inErrorMessage}";
            this.showFieldMessageActivity1.Name = "showFieldMessageActivity1";
            // 
            // saveCodeActivity_Save
            // 
            this.saveCodeActivity_Save.Name = "saveCodeActivity_Save";
            this.saveCodeActivity_Save.ExecuteCode += new System.EventHandler(this.saveCodeActivity_Save_ExecuteCode);
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.showFieldMessageActivity1);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.saveCodeActivity_Save);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.CheckFunctionNameIsUnique);
            this.ifElseBranchActivity1.Condition = codecondition1;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "editStateActivity";
            // 
            // ifElseActivity1
            // 
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity1);
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity2);
            this.ifElseActivity1.Name = "ifElseActivity1";
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "editStateActivity";
            // 
            // editCodeActivity_Preview
            // 
            this.editCodeActivity_Preview.Name = "editCodeActivity_Preview";
            this.editCodeActivity_Preview.ExecuteCode += new System.EventHandler(this.editCodeActivity_Preview_ExecuteCode);
            // 
            // previewHandleExternalEventActivity1
            // 
            this.previewHandleExternalEventActivity1.EventName = "Preview";
            this.previewHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.previewHandleExternalEventActivity1.Name = "previewHandleExternalEventActivity1";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "saveStateActivity";
            // 
            // saveHandleExternalEventActivity1
            // 
            this.saveHandleExternalEventActivity1.EventName = "Save";
            this.saveHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.saveHandleExternalEventActivity1.Name = "saveHandleExternalEventActivity1";
            // 
            // editDocumentFormActivity
            // 
            this.editDocumentFormActivity.ContainerLabel = null;
            this.editDocumentFormActivity.FormDefinitionFileName = "/Administrative/VisualFunctionElementProviderHelperEdit.xml";
            this.editDocumentFormActivity.Name = "editDocumentFormActivity";
            // 
            // setStateActivity1
            // 
            this.setStateActivity1.Name = "setStateActivity1";
            this.setStateActivity1.TargetStateName = "editStateActivity";
            // 
            // initializeCodeActivity_Initialize
            // 
            this.initializeCodeActivity_Initialize.Name = "initializeCodeActivity_Initialize";
            this.initializeCodeActivity_Initialize.ExecuteCode += new System.EventHandler(this.initializeCodeActivity_Initialize_ExecuteCode);
            // 
            // saveStateInitializationActivity
            // 
            this.saveStateInitializationActivity.Activities.Add(this.ifElseActivity1);
            this.saveStateInitializationActivity.Activities.Add(this.setStateActivity3);
            this.saveStateInitializationActivity.Name = "saveStateInitializationActivity";
            // 
            // editEventDrivenActivity_Preview
            // 
            this.editEventDrivenActivity_Preview.Activities.Add(this.previewHandleExternalEventActivity1);
            this.editEventDrivenActivity_Preview.Activities.Add(this.editCodeActivity_Preview);
            this.editEventDrivenActivity_Preview.Activities.Add(this.setStateActivity4);
            this.editEventDrivenActivity_Preview.Name = "editEventDrivenActivity_Preview";
            // 
            // editEventDrivenActivity_Save
            // 
            this.editEventDrivenActivity_Save.Activities.Add(this.saveHandleExternalEventActivity1);
            this.editEventDrivenActivity_Save.Activities.Add(this.setStateActivity2);
            this.editEventDrivenActivity_Save.Name = "editEventDrivenActivity_Save";
            // 
            // editStateInitializationActivity
            // 
            this.editStateInitializationActivity.Activities.Add(this.editDocumentFormActivity);
            this.editStateInitializationActivity.Name = "editStateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.initializeCodeActivity_Initialize);
            this.initializeStateInitializationActivity.Activities.Add(this.setStateActivity1);
            this.initializeStateInitializationActivity.Name = "initializeStateInitializationActivity";
            // 
            // setStateActivity19
            // 
            this.setStateActivity19.Name = "setStateActivity19";
            this.setStateActivity19.TargetStateName = "finishState";
            // 
            // cancelHandleExternalEventActivity1
            // 
            this.cancelHandleExternalEventActivity1.EventName = "Cancel";
            this.cancelHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity1.Name = "cancelHandleExternalEventActivity1";
            // 
            // saveStateActivity
            // 
            this.saveStateActivity.Activities.Add(this.saveStateInitializationActivity);
            this.saveStateActivity.Name = "saveStateActivity";
            // 
            // editStateActivity
            // 
            this.editStateActivity.Activities.Add(this.editStateInitializationActivity);
            this.editStateActivity.Activities.Add(this.editEventDrivenActivity_Save);
            this.editStateActivity.Activities.Add(this.editEventDrivenActivity_Preview);
            this.editStateActivity.Name = "editStateActivity";
            // 
            // initializeStateActivity
            // 
            this.initializeStateActivity.Activities.Add(this.initializeStateInitializationActivity);
            this.initializeStateActivity.Name = "initializeStateActivity";
            // 
            // eventDrivenActivity_GlobalCancel
            // 
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.cancelHandleExternalEventActivity1);
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.setStateActivity19);
            this.eventDrivenActivity_GlobalCancel.Name = "eventDrivenActivity_GlobalCancel";
            // 
            // finishState
            // 
            this.finishState.Name = "finishState";
            // 
            // EditVisualFunctionWorkflow
            // 
            this.Activities.Add(this.finishState);
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.editStateActivity);
            this.Activities.Add(this.saveStateActivity);
            this.CompletedStateName = "finishState";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "EditVisualFunctionWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private StateActivity finishState;
        private SetStateActivity setStateActivity19;
        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private SetStateActivity setStateActivity3;
        private SetStateActivity setStateActivity4;
        private Composite.Workflow.Activities.PreviewHandleExternalEventActivity previewHandleExternalEventActivity1;
        private SetStateActivity setStateActivity2;
        private Composite.Workflow.Activities.SaveHandleExternalEventActivity saveHandleExternalEventActivity1;
        private SetStateActivity setStateActivity1;
        private StateInitializationActivity saveStateInitializationActivity;
        private EventDrivenActivity editEventDrivenActivity_Preview;
        private EventDrivenActivity editEventDrivenActivity_Save;
        private StateInitializationActivity editStateInitializationActivity;
        private StateInitializationActivity initializeStateInitializationActivity;
        private StateActivity saveStateActivity;
        private StateActivity editStateActivity;
        private StateActivity initializeStateActivity;
        private CodeActivity initializeCodeActivity_Initialize;
        private CodeActivity saveCodeActivity_Save;
        private CodeActivity editCodeActivity_Preview;
        private Composite.Workflow.Activities.DocumentFormActivity editDocumentFormActivity;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private IfElseActivity ifElseActivity1;
        private Composite.Workflow.Activities.ShowFieldMessageActivity showFieldMessageActivity1;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;
















































































































    }
}
