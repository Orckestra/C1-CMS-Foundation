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

namespace Composite.StandardPlugins.Elements.ElementProviders.VisualFunctionProviderElementProvider
{
    partial class EditVisualFunctionWorkflow
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
            System.Workflow.Activities.CodeCondition codecondition1 = new System.Workflow.Activities.CodeCondition();
            System.Workflow.Activities.CodeCondition codecondition2 = new System.Workflow.Activities.CodeCondition();
            System.Workflow.Activities.CodeCondition codecondition3 = new System.Workflow.Activities.CodeCondition();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.MissingPageTemplateActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.initializeCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.ifElseBranchActivity6 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity5 = new System.Workflow.Activities.IfElseBranchActivity();
            this.noSaveSetStateActivity = new System.Workflow.Activities.SetStateActivity();
            this.showFieldMessageActivity1 = new Composite.Workflow.Activities.ShowFieldMessageActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity7 = new System.Workflow.Activities.SetStateActivity();
            this.MissingActiveLanguageActivity = new System.Workflow.Activities.CodeActivity();
            this.ifElseActivity_CheckPageTemplatesExists = new System.Workflow.Activities.IfElseActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity4 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity3 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.saveCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.editPreviewCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.previewHandleExternalEventActivity1 = new Composite.Workflow.Activities.PreviewHandleExternalEventActivity();
            this.ifElseActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.saveHandleExternalEventActivity1 = new Composite.Workflow.Activities.SaveHandleExternalEventActivity();
            this.documentFormActivity1 = new Composite.Workflow.Activities.DocumentFormActivity();
            this.ifElseActivity_CheckActiveLanguageExists = new System.Workflow.Activities.IfElseActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.eventDrivenActivity_Preview = new System.Workflow.Activities.EventDrivenActivity();
            this.eventDrivenActivity_Save = new System.Workflow.Activities.EventDrivenActivity();
            this.editStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initialStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.cancelEventDrivenActivity = new System.Workflow.Activities.EventDrivenActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.saveStateActivity = new System.Workflow.Activities.StateActivity();
            this.editStateActivity = new System.Workflow.Activities.StateActivity();
            this.initialState = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "finalStateActivity";
            // 
            // MissingPageTemplateActivity
            // 
            this.MissingPageTemplateActivity.Name = "MissingPageTemplateActivity";
            this.MissingPageTemplateActivity.ExecuteCode += new System.EventHandler(this.MissingPageTemplateActivity_ExecuteCode);
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "editStateActivity";
            // 
            // initializeCodeActivity
            // 
            this.initializeCodeActivity.Name = "initializeCodeActivity";
            this.initializeCodeActivity.ExecuteCode += new System.EventHandler(this.initializeCodeActivity_ExecuteCode);
            // 
            // ifElseBranchActivity6
            // 
            this.ifElseBranchActivity6.Activities.Add(this.MissingPageTemplateActivity);
            this.ifElseBranchActivity6.Activities.Add(this.setStateActivity6);
            this.ifElseBranchActivity6.Name = "ifElseBranchActivity6";
            // 
            // ifElseBranchActivity5
            // 
            this.ifElseBranchActivity5.Activities.Add(this.initializeCodeActivity);
            this.ifElseBranchActivity5.Activities.Add(this.setStateActivity2);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.CheckPageTemplatesExists);
            this.ifElseBranchActivity5.Condition = codecondition1;
            this.ifElseBranchActivity5.Name = "ifElseBranchActivity5";
            // 
            // noSaveSetStateActivity
            // 
            this.noSaveSetStateActivity.Name = "noSaveSetStateActivity";
            this.noSaveSetStateActivity.TargetStateName = "editStateActivity";
            // 
            // showFieldMessageActivity1
            // 
            this.showFieldMessageActivity1.FieldBindingPath = "Function.Name";
            this.showFieldMessageActivity1.Message = "${Composite.StandardPlugins.VisualFunction, VisualFunctionElementProvider.Functio" +
                "nNameNotUniqueError}";
            this.showFieldMessageActivity1.Name = "showFieldMessageActivity1";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "saveStateActivity";
            // 
            // setStateActivity7
            // 
            this.setStateActivity7.Name = "setStateActivity7";
            this.setStateActivity7.TargetStateName = "finalStateActivity";
            // 
            // MissingActiveLanguageActivity
            // 
            this.MissingActiveLanguageActivity.Name = "MissingActiveLanguageActivity";
            this.MissingActiveLanguageActivity.ExecuteCode += new System.EventHandler(this.MissingActiveLanguageActivity_ExecuteCode);
            // 
            // ifElseActivity_CheckPageTemplatesExists
            // 
            this.ifElseActivity_CheckPageTemplatesExists.Activities.Add(this.ifElseBranchActivity5);
            this.ifElseActivity_CheckPageTemplatesExists.Activities.Add(this.ifElseBranchActivity6);
            this.ifElseActivity_CheckPageTemplatesExists.Name = "ifElseActivity_CheckPageTemplatesExists";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.showFieldMessageActivity1);
            this.ifElseBranchActivity2.Activities.Add(this.noSaveSetStateActivity);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.setStateActivity3);
            codecondition2.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.CheckFunctionReNameIsUnique);
            this.ifElseBranchActivity1.Condition = codecondition2;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // ifElseBranchActivity4
            // 
            this.ifElseBranchActivity4.Activities.Add(this.MissingActiveLanguageActivity);
            this.ifElseBranchActivity4.Activities.Add(this.setStateActivity7);
            this.ifElseBranchActivity4.Name = "ifElseBranchActivity4";
            // 
            // ifElseBranchActivity3
            // 
            this.ifElseBranchActivity3.Activities.Add(this.ifElseActivity_CheckPageTemplatesExists);
            codecondition3.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.CheckActiveLanguageExists);
            this.ifElseBranchActivity3.Condition = codecondition3;
            this.ifElseBranchActivity3.Name = "ifElseBranchActivity3";
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "editStateActivity";
            // 
            // saveCodeActivity
            // 
            this.saveCodeActivity.Name = "saveCodeActivity";
            this.saveCodeActivity.ExecuteCode += new System.EventHandler(this.saveCodeActivity_ExecuteCode);
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "editStateActivity";
            // 
            // editPreviewCodeActivity
            // 
            this.editPreviewCodeActivity.Name = "editPreviewCodeActivity";
            this.editPreviewCodeActivity.ExecuteCode += new System.EventHandler(this.editPreviewCodeActivity_ExecuteCode);
            // 
            // previewHandleExternalEventActivity1
            // 
            this.previewHandleExternalEventActivity1.EventName = "Preview";
            this.previewHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.previewHandleExternalEventActivity1.Name = "previewHandleExternalEventActivity1";
            this.previewHandleExternalEventActivity1.Invoked += new System.EventHandler<System.Workflow.Activities.ExternalDataEventArgs>(this.previewHandleExternalEventActivity1_Invoked);
            // 
            // ifElseActivity1
            // 
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity1);
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity2);
            this.ifElseActivity1.Name = "ifElseActivity1";
            // 
            // saveHandleExternalEventActivity1
            // 
            this.saveHandleExternalEventActivity1.EventName = "Save";
            this.saveHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.saveHandleExternalEventActivity1.Name = "saveHandleExternalEventActivity1";
            // 
            // documentFormActivity1
            // 
            this.documentFormActivity1.ContainerLabel = null;
            this.documentFormActivity1.CustomToolbarDefinitionFileName = null;
            this.documentFormActivity1.FormDefinitionFileName = "/Administrative/EditVisualFunction.xml";
            this.documentFormActivity1.Name = "documentFormActivity1";
            // 
            // ifElseActivity_CheckActiveLanguageExists
            // 
            this.ifElseActivity_CheckActiveLanguageExists.Activities.Add(this.ifElseBranchActivity3);
            this.ifElseActivity_CheckActiveLanguageExists.Activities.Add(this.ifElseBranchActivity4);
            this.ifElseActivity_CheckActiveLanguageExists.Name = "ifElseActivity_CheckActiveLanguageExists";
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
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.saveCodeActivity);
            this.finalizeStateInitializationActivity.Activities.Add(this.setStateActivity4);
            this.finalizeStateInitializationActivity.Name = "finalizeStateInitializationActivity";
            // 
            // eventDrivenActivity_Preview
            // 
            this.eventDrivenActivity_Preview.Activities.Add(this.previewHandleExternalEventActivity1);
            this.eventDrivenActivity_Preview.Activities.Add(this.editPreviewCodeActivity);
            this.eventDrivenActivity_Preview.Activities.Add(this.setStateActivity5);
            this.eventDrivenActivity_Preview.Name = "eventDrivenActivity_Preview";
            // 
            // eventDrivenActivity_Save
            // 
            this.eventDrivenActivity_Save.Activities.Add(this.saveHandleExternalEventActivity1);
            this.eventDrivenActivity_Save.Activities.Add(this.ifElseActivity1);
            this.eventDrivenActivity_Save.Name = "eventDrivenActivity_Save";
            // 
            // editStateInitializationActivity
            // 
            this.editStateInitializationActivity.Activities.Add(this.documentFormActivity1);
            this.editStateInitializationActivity.Name = "editStateInitializationActivity";
            // 
            // initialStateInitializationActivity
            // 
            this.initialStateInitializationActivity.Activities.Add(this.ifElseActivity_CheckActiveLanguageExists);
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
            // saveStateActivity
            // 
            this.saveStateActivity.Activities.Add(this.finalizeStateInitializationActivity);
            this.saveStateActivity.Name = "saveStateActivity";
            // 
            // editStateActivity
            // 
            this.editStateActivity.Activities.Add(this.editStateInitializationActivity);
            this.editStateActivity.Activities.Add(this.eventDrivenActivity_Save);
            this.editStateActivity.Activities.Add(this.eventDrivenActivity_Preview);
            this.editStateActivity.Name = "editStateActivity";
            // 
            // initialState
            // 
            this.initialState.Activities.Add(this.initialStateInitializationActivity);
            this.initialState.Name = "initialState";
            // 
            // EditVisualFunctionWorkflow
            // 
            this.Activities.Add(this.initialState);
            this.Activities.Add(this.editStateActivity);
            this.Activities.Add(this.saveStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.cancelEventDrivenActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initialState";
            this.Name = "EditVisualFunctionWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private CodeActivity initializeCodeActivity;
        private SetStateActivity setStateActivity1;
        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateInitializationActivity initialStateInitializationActivity;
        private EventDrivenActivity cancelEventDrivenActivity;
        private StateActivity finalStateActivity;
        private StateActivity saveStateActivity;
        private StateActivity editStateActivity;
        private Composite.Workflow.Activities.DocumentFormActivity documentFormActivity1;
        private StateInitializationActivity editStateInitializationActivity;
        private StateInitializationActivity finalizeStateInitializationActivity;
        private CodeActivity saveCodeActivity;
        private SetStateActivity setStateActivity3;
        private Composite.Workflow.Activities.SaveHandleExternalEventActivity saveHandleExternalEventActivity1;
        private SetStateActivity setStateActivity2;
        private EventDrivenActivity eventDrivenActivity_Save;
        private SetStateActivity setStateActivity4;
        private SetStateActivity setStateActivity5;
        private EventDrivenActivity eventDrivenActivity_Preview;
        private CodeActivity editPreviewCodeActivity;
        private Composite.Workflow.Activities.PreviewHandleExternalEventActivity previewHandleExternalEventActivity1;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private IfElseActivity ifElseActivity1;
        private Composite.Workflow.Activities.ShowFieldMessageActivity showFieldMessageActivity1;
        private SetStateActivity noSaveSetStateActivity;
        private IfElseBranchActivity ifElseBranchActivity4;
        private IfElseBranchActivity ifElseBranchActivity3;
        private IfElseActivity ifElseActivity_CheckActiveLanguageExists;
        private SetStateActivity setStateActivity6;
        private CodeActivity MissingPageTemplateActivity;
        private IfElseBranchActivity ifElseBranchActivity6;
        private IfElseBranchActivity ifElseBranchActivity5;
        private SetStateActivity setStateActivity7;
        private CodeActivity MissingActiveLanguageActivity;
        private IfElseActivity ifElseActivity_CheckPageTemplatesExists;
        private StateActivity initialState;










































    }
}
