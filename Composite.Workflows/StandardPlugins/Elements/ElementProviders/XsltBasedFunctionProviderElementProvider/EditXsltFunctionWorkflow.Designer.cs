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

namespace Composite.Plugins.Elements.ElementProviders.XsltBasedFunctionProviderElementProvider
{
    partial class EditXsltFunctionWorkflow
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
            this.setStateActivity8 = new System.Workflow.Activities.SetStateActivity();
            this.MissingPageCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.initializeCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.ifElseBranchActivity6 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity5 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity7 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity9 = new System.Workflow.Activities.SetStateActivity();
            this.MissingActiveLanguageCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.ifElseActivity_CheckPageExists = new System.Workflow.Activities.IfElseActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity4 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity3 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.saveCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.editPreviewActivity = new System.Workflow.Activities.CodeActivity();
            this.previewHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.PreviewHandleExternalEventActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.saveHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.SaveHandleExternalEventActivity();
            this.documentFormActivity1 = new Composite.C1Console.Workflow.Activities.DocumentFormActivity();
            this.ifElseActivity_CheckActiveLanguagesExists = new System.Workflow.Activities.IfElseActivity();
            this.validateInitializeStateActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.saveStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.editEventDrivenActivity_Preview = new System.Workflow.Activities.EventDrivenActivity();
            this.saveEventDrivenActivity_Save = new System.Workflow.Activities.EventDrivenActivity();
            this.editStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.validateStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.saveStateActivity = new System.Workflow.Activities.StateActivity();
            this.editStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity8
            // 
            this.setStateActivity8.Name = "setStateActivity8";
            this.setStateActivity8.TargetStateName = "finalStateActivity";
            // 
            // MissingPageCodeActivity
            // 
            this.MissingPageCodeActivity.Name = "MissingPageCodeActivity";
            this.MissingPageCodeActivity.ExecuteCode += new System.EventHandler(this.MissingPageCodeActivity_ExecuteCode);
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "editStateActivity";
            // 
            // initializeCodeActivity
            // 
            this.initializeCodeActivity.Name = "initializeCodeActivity";
            this.initializeCodeActivity.ExecuteCode += new System.EventHandler(this.initializeCodeActivity_ExecuteCode);
            // 
            // ifElseBranchActivity6
            // 
            this.ifElseBranchActivity6.Activities.Add(this.MissingPageCodeActivity);
            this.ifElseBranchActivity6.Activities.Add(this.setStateActivity8);
            this.ifElseBranchActivity6.Name = "ifElseBranchActivity6";
            // 
            // ifElseBranchActivity5
            // 
            this.ifElseBranchActivity5.Activities.Add(this.initializeCodeActivity);
            this.ifElseBranchActivity5.Activities.Add(this.setStateActivity3);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.CheckPageExists);
            this.ifElseBranchActivity5.Condition = codecondition1;
            this.ifElseBranchActivity5.Name = "ifElseBranchActivity5";
            // 
            // setStateActivity7
            // 
            this.setStateActivity7.Name = "setStateActivity7";
            this.setStateActivity7.TargetStateName = "editStateActivity";
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "saveStateActivity";
            // 
            // setStateActivity9
            // 
            this.setStateActivity9.Name = "setStateActivity9";
            this.setStateActivity9.TargetStateName = "finalStateActivity";
            // 
            // MissingActiveLanguageCodeActivity
            // 
            this.MissingActiveLanguageCodeActivity.Name = "MissingActiveLanguageCodeActivity";
            this.MissingActiveLanguageCodeActivity.ExecuteCode += new System.EventHandler(this.MissingActiveLanguageCodeActivity_ExecuteCode);
            // 
            // ifElseActivity_CheckPageExists
            // 
            this.ifElseActivity_CheckPageExists.Activities.Add(this.ifElseBranchActivity5);
            this.ifElseActivity_CheckPageExists.Activities.Add(this.ifElseBranchActivity6);
            this.ifElseActivity_CheckPageExists.Name = "ifElseActivity_CheckPageExists";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity7);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.setStateActivity6);
            codecondition2.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.IsValidData);
            this.ifElseBranchActivity1.Condition = codecondition2;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // ifElseBranchActivity4
            // 
            this.ifElseBranchActivity4.Activities.Add(this.MissingActiveLanguageCodeActivity);
            this.ifElseBranchActivity4.Activities.Add(this.setStateActivity9);
            this.ifElseBranchActivity4.Name = "ifElseBranchActivity4";
            // 
            // ifElseBranchActivity3
            // 
            this.ifElseBranchActivity3.Activities.Add(this.ifElseActivity_CheckPageExists);
            codecondition3.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.CheckActiveLanguagesExists);
            this.ifElseBranchActivity3.Condition = codecondition3;
            this.ifElseBranchActivity3.Name = "ifElseBranchActivity3";
            // 
            // ifElseActivity1
            // 
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity1);
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity2);
            this.ifElseActivity1.Name = "ifElseActivity1";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "editStateActivity";
            // 
            // saveCodeActivity
            // 
            this.saveCodeActivity.Name = "saveCodeActivity";
            this.saveCodeActivity.ExecuteCode += new System.EventHandler(this.saveCodeActivity_ExecuteCode);
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "editStateActivity";
            // 
            // editPreviewActivity
            // 
            this.editPreviewActivity.Name = "editPreviewActivity";
            this.editPreviewActivity.ExecuteCode += new System.EventHandler(this.editPreviewActivity_ExecuteCode);
            // 
            // previewHandleExternalEventActivity1
            // 
            this.previewHandleExternalEventActivity1.EventName = "Preview";
            this.previewHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.previewHandleExternalEventActivity1.Name = "previewHandleExternalEventActivity1";
            // 
            // setStateActivity1
            // 
            this.setStateActivity1.Name = "setStateActivity1";
            this.setStateActivity1.TargetStateName = "validateStateActivity";
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
            this.documentFormActivity1.FormDefinitionFileName = "\\Administrative\\EditXsltFunction.xml";
            this.documentFormActivity1.Name = "documentFormActivity1";
            // 
            // ifElseActivity_CheckActiveLanguagesExists
            // 
            this.ifElseActivity_CheckActiveLanguagesExists.Activities.Add(this.ifElseBranchActivity3);
            this.ifElseActivity_CheckActiveLanguagesExists.Activities.Add(this.ifElseBranchActivity4);
            this.ifElseActivity_CheckActiveLanguagesExists.Name = "ifElseActivity_CheckActiveLanguagesExists";
            // 
            // validateInitializeStateActivity
            // 
            this.validateInitializeStateActivity.Activities.Add(this.ifElseActivity1);
            this.validateInitializeStateActivity.Name = "validateInitializeStateActivity";
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity1
            // 
            this.cancelHandleExternalEventActivity1.EventName = "Cancel";
            this.cancelHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity1.Name = "cancelHandleExternalEventActivity1";
            // 
            // saveStateInitializationActivity
            // 
            this.saveStateInitializationActivity.Activities.Add(this.saveCodeActivity);
            this.saveStateInitializationActivity.Activities.Add(this.setStateActivity2);
            this.saveStateInitializationActivity.Name = "saveStateInitializationActivity";
            // 
            // editEventDrivenActivity_Preview
            // 
            this.editEventDrivenActivity_Preview.Activities.Add(this.previewHandleExternalEventActivity1);
            this.editEventDrivenActivity_Preview.Activities.Add(this.editPreviewActivity);
            this.editEventDrivenActivity_Preview.Activities.Add(this.setStateActivity4);
            this.editEventDrivenActivity_Preview.Name = "editEventDrivenActivity_Preview";
            // 
            // saveEventDrivenActivity_Save
            // 
            this.saveEventDrivenActivity_Save.Activities.Add(this.saveHandleExternalEventActivity1);
            this.saveEventDrivenActivity_Save.Activities.Add(this.setStateActivity1);
            this.saveEventDrivenActivity_Save.Name = "saveEventDrivenActivity_Save";
            // 
            // editStateInitializationActivity
            // 
            this.editStateInitializationActivity.Activities.Add(this.documentFormActivity1);
            this.editStateInitializationActivity.Name = "editStateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.ifElseActivity_CheckActiveLanguagesExists);
            this.initializeStateInitializationActivity.Name = "initializeStateInitializationActivity";
            // 
            // validateStateActivity
            // 
            this.validateStateActivity.Activities.Add(this.validateInitializeStateActivity);
            this.validateStateActivity.Name = "validateStateActivity";
            // 
            // eventDrivenActivity_GlobalCancel
            // 
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.cancelHandleExternalEventActivity1);
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.setStateActivity5);
            this.eventDrivenActivity_GlobalCancel.Name = "eventDrivenActivity_GlobalCancel";
            // 
            // finalStateActivity
            // 
            this.finalStateActivity.Name = "finalStateActivity";
            // 
            // saveStateActivity
            // 
            this.saveStateActivity.Activities.Add(this.saveStateInitializationActivity);
            this.saveStateActivity.Name = "saveStateActivity";
            // 
            // editStateActivity
            // 
            this.editStateActivity.Activities.Add(this.editStateInitializationActivity);
            this.editStateActivity.Activities.Add(this.saveEventDrivenActivity_Save);
            this.editStateActivity.Activities.Add(this.editEventDrivenActivity_Preview);
            this.editStateActivity.Name = "editStateActivity";
            // 
            // initializeStateActivity
            // 
            this.initializeStateActivity.Activities.Add(this.initializeStateInitializationActivity);
            this.initializeStateActivity.Name = "initializeStateActivity";
            // 
            // EditXsltFunctionWorkflow
            // 
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.editStateActivity);
            this.Activities.Add(this.saveStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.validateStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "EditXsltFunctionWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private SetStateActivity setStateActivity2;
        private SetStateActivity setStateActivity1;
        private Composite.C1Console.Workflow.Activities.SaveHandleExternalEventActivity saveHandleExternalEventActivity1;
        private SetStateActivity setStateActivity3;
        private CodeActivity initializeCodeActivity;
        private StateInitializationActivity saveStateInitializationActivity;
        private EventDrivenActivity saveEventDrivenActivity_Save;
        private StateInitializationActivity editStateInitializationActivity;
        private StateInitializationActivity initializeStateInitializationActivity;
        private StateActivity saveStateActivity;
        private StateActivity editStateActivity;
        private CodeActivity saveCodeActivity;
        private Composite.C1Console.Workflow.Activities.DocumentFormActivity documentFormActivity1;
        private Composite.C1Console.Workflow.Activities.PreviewHandleExternalEventActivity previewHandleExternalEventActivity1;
        private EventDrivenActivity editEventDrivenActivity_Preview;
        private SetStateActivity setStateActivity4;
        private CodeActivity editPreviewActivity;
        private SetStateActivity setStateActivity5;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;
        private StateActivity finalStateActivity;
        private StateInitializationActivity validateInitializeStateActivity;
        private StateActivity validateStateActivity;
        private SetStateActivity setStateActivity7;
        private SetStateActivity setStateActivity6;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private IfElseActivity ifElseActivity1;
        private SetStateActivity setStateActivity8;
        private CodeActivity MissingPageCodeActivity;
        private IfElseBranchActivity ifElseBranchActivity6;
        private IfElseBranchActivity ifElseBranchActivity5;
        private SetStateActivity setStateActivity9;
        private CodeActivity MissingActiveLanguageCodeActivity;
        private IfElseActivity ifElseActivity_CheckPageExists;
        private IfElseBranchActivity ifElseBranchActivity4;
        private IfElseBranchActivity ifElseBranchActivity3;
        private IfElseActivity ifElseActivity_CheckActiveLanguagesExists;
        private StateActivity initializeStateActivity;

































    }
}
