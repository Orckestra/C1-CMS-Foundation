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

namespace Composite.Plugins.Elements.ElementProviders.UserGroupElementProvider
{
    partial class EditUserGroupWorkflow
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
            System.Workflow.Activities.CodeCondition codecondition2 = new System.Workflow.Activities.CodeCondition();
            System.Workflow.Activities.CodeCondition codecondition3 = new System.Workflow.Activities.CodeCondition();
            this.setStateActivity7 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity4 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity3 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.step1CodeActivity_ShowErrorMessage = new System.Workflow.Activities.CodeActivity();
            this.ifElseActivity2 = new System.Workflow.Activities.IfElseActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.saveCodeActivity_Save = new System.Workflow.Activities.CodeActivity();
            this.step1DocumentFormActivity = new Composite.C1Console.Workflow.Activities.DocumentFormActivity();
            this.step1CodeActivity_ShowDocument = new System.Workflow.Activities.CodeActivity();
            this.ifElseActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.conditionalSetStateActivity1 = new Composite.C1Console.Workflow.Activities.ConditionalSetStateActivity();
            this.saveHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.SaveHandleExternalEventActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.initalizeCodeActivity_Initialize = new System.Workflow.Activities.CodeActivity();
            this.saveStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step1StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step1EventDrivenActivity_Save = new System.Workflow.Activities.EventDrivenActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.saveStateActivity = new System.Workflow.Activities.StateActivity();
            this.step1StateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // setStateActivity7
            // 
            this.setStateActivity7.Name = "setStateActivity7";
            this.setStateActivity7.TargetStateName = "step1StateActivity";
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "saveStateActivity";
            // 
            // ifElseBranchActivity4
            // 
            this.ifElseBranchActivity4.Activities.Add(this.setStateActivity7);
            this.ifElseBranchActivity4.Name = "ifElseBranchActivity4";
            // 
            // ifElseBranchActivity3
            // 
            this.ifElseBranchActivity3.Activities.Add(this.setStateActivity6);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.ValidateData);
            this.ifElseBranchActivity3.Condition = codecondition1;
            this.ifElseBranchActivity3.Name = "ifElseBranchActivity3";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "step1StateActivity";
            // 
            // step1CodeActivity_ShowErrorMessage
            // 
            this.step1CodeActivity_ShowErrorMessage.Name = "step1CodeActivity_ShowErrorMessage";
            this.step1CodeActivity_ShowErrorMessage.ExecuteCode += new System.EventHandler(this.ShowGroupValidationError);
            // 
            // ifElseActivity2
            // 
            this.ifElseActivity2.Activities.Add(this.ifElseBranchActivity3);
            this.ifElseActivity2.Activities.Add(this.ifElseBranchActivity4);
            this.ifElseActivity2.Name = "ifElseActivity2";
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "saveStateActivity";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.step1CodeActivity_ShowErrorMessage);
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity2);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.setStateActivity4);
            this.ifElseBranchActivity1.Activities.Add(this.ifElseActivity2);
            codecondition2.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.ValidateGroupName);
            this.ifElseBranchActivity1.Condition = codecondition2;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "step1StateActivity";
            // 
            // saveCodeActivity_Save
            // 
            this.saveCodeActivity_Save.Name = "saveCodeActivity_Save";
            this.saveCodeActivity_Save.ExecuteCode += new System.EventHandler(this.saveCodeActivity_Save_ExecuteCode);
            // 
            // step1DocumentFormActivity
            // 
            this.step1DocumentFormActivity.ContainerLabel = null;
            this.step1DocumentFormActivity.CustomToolbarDefinitionFileName = null;
            this.step1DocumentFormActivity.Enabled = false;
            this.step1DocumentFormActivity.FormDefinitionFileName = "\\Administrative\\UserGroupElementProviderEditUserGroupStep1.xml";
            this.step1DocumentFormActivity.Name = "step1DocumentFormActivity";
            // 
            // step1CodeActivity_ShowDocument
            // 
            this.step1CodeActivity_ShowDocument.Name = "step1CodeActivity_ShowDocument";
            this.step1CodeActivity_ShowDocument.ExecuteCode += new System.EventHandler(this.step1CodeActivity_ShowDocument_ExecuteCode);
            // 
            // ifElseActivity1
            // 
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity1);
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity2);
            this.ifElseActivity1.Name = "ifElseActivity1";
            // 
            // conditionalSetStateActivity1
            // 
            codecondition3.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.ValidateData);
            this.conditionalSetStateActivity1.Condition = codecondition3;
            this.conditionalSetStateActivity1.FalseTargetStateName = "step1StateActivity";
            this.conditionalSetStateActivity1.Name = "conditionalSetStateActivity1";
            this.conditionalSetStateActivity1.TrueTargetStateName = "saveStateActivity";
            // 
            // saveHandleExternalEventActivity1
            // 
            this.saveHandleExternalEventActivity1.EventName = "Save";
            this.saveHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.saveHandleExternalEventActivity1.Name = "saveHandleExternalEventActivity1";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "step1StateActivity";
            // 
            // initalizeCodeActivity_Initialize
            // 
            this.initalizeCodeActivity_Initialize.Name = "initalizeCodeActivity_Initialize";
            this.initalizeCodeActivity_Initialize.ExecuteCode += new System.EventHandler(this.initalizeCodeActivity_Initialize_ExecuteCode);
            // 
            // saveStateInitializationActivity
            // 
            this.saveStateInitializationActivity.Activities.Add(this.saveCodeActivity_Save);
            this.saveStateInitializationActivity.Activities.Add(this.setStateActivity5);
            this.saveStateInitializationActivity.Name = "saveStateInitializationActivity";
            // 
            // step1StateInitializationActivity
            // 
            this.step1StateInitializationActivity.Activities.Add(this.step1CodeActivity_ShowDocument);
            this.step1StateInitializationActivity.Activities.Add(this.step1DocumentFormActivity);
            this.step1StateInitializationActivity.Name = "step1StateInitializationActivity";
            // 
            // step1EventDrivenActivity_Save
            // 
            this.step1EventDrivenActivity_Save.Activities.Add(this.saveHandleExternalEventActivity1);
            this.step1EventDrivenActivity_Save.Activities.Add(this.conditionalSetStateActivity1);
            this.step1EventDrivenActivity_Save.Activities.Add(this.ifElseActivity1);
            this.step1EventDrivenActivity_Save.Name = "step1EventDrivenActivity_Save";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.initalizeCodeActivity_Initialize);
            this.initializeStateInitializationActivity.Activities.Add(this.setStateActivity3);
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
            // saveStateActivity
            // 
            this.saveStateActivity.Activities.Add(this.saveStateInitializationActivity);
            this.saveStateActivity.Name = "saveStateActivity";
            // 
            // step1StateActivity
            // 
            this.step1StateActivity.Activities.Add(this.step1EventDrivenActivity_Save);
            this.step1StateActivity.Activities.Add(this.step1StateInitializationActivity);
            this.step1StateActivity.Name = "step1StateActivity";
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
            // EditUserGroupWorkflow
            // 
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.step1StateActivity);
            this.Activities.Add(this.saveStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "EditUserGroupWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateInitializationActivity initializeStateInitializationActivity;
        private SetStateActivity setStateActivity1;
        private StateActivity finalStateActivity;
        private StateActivity initializeStateActivity;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private IfElseActivity ifElseActivity1;
        private Composite.C1Console.Workflow.Activities.SaveHandleExternalEventActivity saveHandleExternalEventActivity1;
        private EventDrivenActivity step1EventDrivenActivity_Save;
        private StateActivity step1StateActivity;
        private CodeActivity step1CodeActivity_ShowErrorMessage;
        private SetStateActivity setStateActivity2;
        private SetStateActivity setStateActivity4;
        private SetStateActivity setStateActivity5;
        private SetStateActivity setStateActivity3;
        private StateInitializationActivity saveStateInitializationActivity;
        private StateInitializationActivity step1StateInitializationActivity;
        private StateActivity saveStateActivity;
        private Composite.C1Console.Workflow.Activities.DocumentFormActivity step1DocumentFormActivity;
        private CodeActivity initalizeCodeActivity_Initialize;
        private CodeActivity saveCodeActivity_Save;
        private CodeActivity step1CodeActivity_ShowDocument;
        private SetStateActivity setStateActivity7;
        private SetStateActivity setStateActivity6;
        private IfElseBranchActivity ifElseBranchActivity4;
        private IfElseBranchActivity ifElseBranchActivity3;
        private IfElseActivity ifElseActivity2;
        private Composite.C1Console.Workflow.Activities.ConditionalSetStateActivity conditionalSetStateActivity1;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;
























































































































    }
}
