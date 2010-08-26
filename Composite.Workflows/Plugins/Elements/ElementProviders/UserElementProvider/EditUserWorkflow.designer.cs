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

namespace Composite.Plugins.Elements.ElementProviders.UserElementProvider
{
    partial class EditUserWorkflow
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
            this.showConsoleMessageBoxActivity2 = new Composite.C1Console.Workflow.Activities.ShowConsoleMessageBoxActivity();
            this.ifElseBranchActivity4 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity3 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseActivity_IsUserLoggedOn = new System.Workflow.Activities.IfElseActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.MissingActiveLanguageCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.initializeCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity6 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity5 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.saveCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.saveHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.SaveHandleExternalEventActivity();
            this.ifElseActivity_ActiveLanguagesExists = new System.Workflow.Activities.IfElseActivity();
            this.saveStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step1SventDrivenActivity_Save = new System.Workflow.Activities.EventDrivenActivity();
            this.step1StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.saveStateActivity = new System.Workflow.Activities.StateActivity();
            this.step1StateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            this.initializeActivity = new System.Workflow.Activities.StateActivity();
            this.finishState = new System.Workflow.Activities.StateActivity();
            // 
            // showConsoleMessageBoxActivity2
            // 
            this.showConsoleMessageBoxActivity2.DialogType = Composite.C1Console.Events.DialogType.Message;
            this.showConsoleMessageBoxActivity2.Message = "${Composite.Management, UserElementProvider.ChangeOtherActiveLocaleMessage}";
            this.showConsoleMessageBoxActivity2.Name = "showConsoleMessageBoxActivity2";
            this.showConsoleMessageBoxActivity2.Title = "${Composite.Management, UserElementProvider.ChangeOtherActiveLocaleTitle}";
            // 
            // ifElseBranchActivity4
            // 
            this.ifElseBranchActivity4.Name = "ifElseBranchActivity4";
            // 
            // ifElseBranchActivity3
            // 
            this.ifElseBranchActivity3.Activities.Add(this.showConsoleMessageBoxActivity2);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.IsUserLoggedOn);
            this.ifElseBranchActivity3.Condition = codecondition1;
            this.ifElseBranchActivity3.Name = "ifElseBranchActivity3";
            // 
            // ifElseActivity_IsUserLoggedOn
            // 
            this.ifElseActivity_IsUserLoggedOn.Activities.Add(this.ifElseBranchActivity3);
            this.ifElseActivity_IsUserLoggedOn.Activities.Add(this.ifElseBranchActivity4);
            this.ifElseActivity_IsUserLoggedOn.Name = "ifElseActivity_IsUserLoggedOn";
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "finishState";
            // 
            // MissingActiveLanguageCodeActivity
            // 
            this.MissingActiveLanguageCodeActivity.Name = "MissingActiveLanguageCodeActivity";
            this.MissingActiveLanguageCodeActivity.ExecuteCode += new System.EventHandler(this.MissingActiveLanguageCodeActivity_ExecuteCode);
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "step1StateActivity";
            // 
            // initializeCodeActivity
            // 
            this.initializeCodeActivity.Name = "initializeCodeActivity";
            this.initializeCodeActivity.ExecuteCode += new System.EventHandler(this.initializeCodeActivity_ExecuteCode);
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.ifElseActivity_IsUserLoggedOn);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            codecondition2.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.IsSameUser);
            this.ifElseBranchActivity1.Condition = codecondition2;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // ifElseBranchActivity6
            // 
            this.ifElseBranchActivity6.Activities.Add(this.MissingActiveLanguageCodeActivity);
            this.ifElseBranchActivity6.Activities.Add(this.setStateActivity5);
            this.ifElseBranchActivity6.Name = "ifElseBranchActivity6";
            // 
            // ifElseBranchActivity5
            // 
            this.ifElseBranchActivity5.Activities.Add(this.initializeCodeActivity);
            this.ifElseBranchActivity5.Activities.Add(this.setStateActivity2);
            codecondition3.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.CheckActiveLanguagesExists);
            this.ifElseBranchActivity5.Condition = codecondition3;
            this.ifElseBranchActivity5.Name = "ifElseBranchActivity5";
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "step1StateActivity";
            // 
            // saveCodeActivity
            // 
            this.saveCodeActivity.Name = "saveCodeActivity";
            this.saveCodeActivity.ExecuteCode += new System.EventHandler(this.saveCodeActivity_ExecuteCode);
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "saveStateActivity";
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
            this.saveHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.saveHandleExternalEventActivity1.Name = "saveHandleExternalEventActivity1";
            // 
            // ifElseActivity_ActiveLanguagesExists
            // 
            this.ifElseActivity_ActiveLanguagesExists.Activities.Add(this.ifElseBranchActivity5);
            this.ifElseActivity_ActiveLanguagesExists.Activities.Add(this.ifElseBranchActivity6);
            this.ifElseActivity_ActiveLanguagesExists.Name = "ifElseActivity_ActiveLanguagesExists";
            // 
            // saveStateInitializationActivity
            // 
            this.saveStateInitializationActivity.Activities.Add(this.saveCodeActivity);
            this.saveStateInitializationActivity.Activities.Add(this.setStateActivity4);
            this.saveStateInitializationActivity.Name = "saveStateInitializationActivity";
            // 
            // step1SventDrivenActivity_Save
            // 
            this.step1SventDrivenActivity_Save.Activities.Add(this.saveHandleExternalEventActivity1);
            this.step1SventDrivenActivity_Save.Activities.Add(this.ifElseActivity1);
            this.step1SventDrivenActivity_Save.Activities.Add(this.setStateActivity3);
            this.step1SventDrivenActivity_Save.Name = "step1SventDrivenActivity_Save";
            // 
            // step1StateInitializationActivity
            // 
            this.step1StateInitializationActivity.Name = "step1StateInitializationActivity";
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
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.ifElseActivity_ActiveLanguagesExists);
            this.initializeStateInitializationActivity.Name = "initializeStateInitializationActivity";
            // 
            // saveStateActivity
            // 
            this.saveStateActivity.Activities.Add(this.saveStateInitializationActivity);
            this.saveStateActivity.Name = "saveStateActivity";
            // 
            // step1StateActivity
            // 
            this.step1StateActivity.Activities.Add(this.step1StateInitializationActivity);
            this.step1StateActivity.Activities.Add(this.step1SventDrivenActivity_Save);
            this.step1StateActivity.Name = "step1StateActivity";
            // 
            // eventDrivenActivity_GlobalCancel
            // 
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.cancelHandleExternalEventActivity1);
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.setStateActivity1);
            this.eventDrivenActivity_GlobalCancel.Name = "eventDrivenActivity_GlobalCancel";
            // 
            // initializeActivity
            // 
            this.initializeActivity.Activities.Add(this.initializeStateInitializationActivity);
            this.initializeActivity.Name = "initializeActivity";
            // 
            // finishState
            // 
            this.finishState.Name = "finishState";
            // 
            // EditUserWorkflow
            // 
            this.Activities.Add(this.finishState);
            this.Activities.Add(this.initializeActivity);
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.step1StateActivity);
            this.Activities.Add(this.saveStateActivity);
            this.CompletedStateName = "finishState";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeActivity";
            this.Name = "EditUserWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private StateActivity finishState;
        private StateInitializationActivity initializeStateInitializationActivity;
        private StateActivity initializeActivity;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;
        private SetStateActivity setStateActivity1;
        private StateActivity saveStateActivity;
        private StateActivity step1StateActivity;
        private StateInitializationActivity saveStateInitializationActivity;
        private EventDrivenActivity step1SventDrivenActivity_Save;
        private StateInitializationActivity step1StateInitializationActivity;
        private CodeActivity initializeCodeActivity;
        private SetStateActivity setStateActivity2;
        private SetStateActivity setStateActivity4;
        private SetStateActivity setStateActivity3;
        private Composite.C1Console.Workflow.Activities.SaveHandleExternalEventActivity saveHandleExternalEventActivity1;
        private IfElseBranchActivity ifElseBranchActivity4;
        private IfElseBranchActivity ifElseBranchActivity3;
        private IfElseActivity ifElseActivity_IsUserLoggedOn;
        private Composite.C1Console.Workflow.Activities.ShowConsoleMessageBoxActivity showConsoleMessageBoxActivity2;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private IfElseActivity ifElseActivity1;
        private IfElseBranchActivity ifElseBranchActivity6;
        private IfElseBranchActivity ifElseBranchActivity5;
        private IfElseActivity ifElseActivity_ActiveLanguagesExists;
        private SetStateActivity setStateActivity5;
        private CodeActivity MissingActiveLanguageCodeActivity;
        private CodeActivity saveCodeActivity;
















































































































































    }
}
