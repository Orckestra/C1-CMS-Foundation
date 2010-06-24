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

namespace Composite.StandardPlugins.Elements.ElementProviders.VisualFunctionProviderElementProvider
{
    partial class AddNewVisualFunctionWorkflow
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
            System.Workflow.Activities.CodeCondition codecondition4 = new System.Workflow.Activities.CodeCondition();
            System.Workflow.Activities.CodeCondition codecondition5 = new System.Workflow.Activities.CodeCondition();
            System.Workflow.Activities.CodeCondition codecondition6 = new System.Workflow.Activities.CodeCondition();
            this.setStateActivity9 = new System.Workflow.Activities.SetStateActivity();
            this.MissingPageActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity9 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity3 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.missingDataMessageBoxActivity = new Composite.Workflow.Activities.ShowConsoleMessageBoxActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.codeActivity1 = new System.Workflow.Activities.CodeActivity();
            this.abortFlowSetStateActivity = new System.Workflow.Activities.SetStateActivity();
            this.noTypesMessageBoxActivity = new Composite.Workflow.Activities.ShowConsoleMessageBoxActivity();
            this.ifElseActivity_CheckPageExists = new System.Workflow.Activities.IfElseActivity();
            this.ifElseBranchActivity6 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranch_heckDataExists = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity8 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity7 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.showFieldMessageActivity2 = new Composite.Workflow.Activities.ShowFieldMessageActivity();
            this.ifElseActivity2 = new System.Workflow.Activities.IfElseActivity();
            this.setStateActivity12 = new System.Workflow.Activities.SetStateActivity();
            this.showConsoleMessageBoxActivity_NoTemplate = new Composite.Workflow.Activities.ShowConsoleMessageBoxActivity();
            this.ifElseActivity3 = new System.Workflow.Activities.IfElseActivity();
            this.backTostep2 = new System.Workflow.Activities.SetStateActivity();
            this.showFieldMessageActivity1 = new Composite.Workflow.Activities.ShowFieldMessageActivity();
            this.setStateActivity11 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity4 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranch_CheckTypeNameIsDynamicType = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity11 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity10 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity7 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.ifElseActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.handleExternalEventActivity1 = new System.Workflow.Activities.HandleExternalEventActivity();
            this.wizzardFormActivity1 = new Composite.Workflow.Activities.WizardFormActivity();
            this.ifElseActivity5 = new System.Workflow.Activities.IfElseActivity();
            this.initializeCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity8 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity3 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.ifNameUniqueActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.handleExternalEventActivity3 = new System.Workflow.Activities.HandleExternalEventActivity();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.handleExternalEventActivity2 = new System.Workflow.Activities.HandleExternalEventActivity();
            this.step2WizzardFormActivity = new Composite.Workflow.Activities.WizardFormActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.stepFinalize_codeActivity = new System.Workflow.Activities.CodeActivity();
            this.closeCurrentViewActivity1 = new Composite.Workflow.Activities.CloseCurrentViewActivity();
            this.step1_eventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step1_eventDrivenActivity_Next = new System.Workflow.Activities.EventDrivenActivity();
            this.step1StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity19 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step2_eventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step2_eventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.step2_eventDrivenActivity_Previous = new System.Workflow.Activities.EventDrivenActivity();
            this.step2StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step1State = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            this.initializeActivity = new System.Workflow.Activities.StateActivity();
            this.step2State = new System.Workflow.Activities.StateActivity();
            this.finalizeActivity = new System.Workflow.Activities.StateActivity();
            this.finishState = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity9
            // 
            this.setStateActivity9.Name = "setStateActivity9";
            this.setStateActivity9.TargetStateName = "finishState";
            // 
            // MissingPageActivity
            // 
            this.MissingPageActivity.Name = "MissingPageActivity";
            this.MissingPageActivity.ExecuteCode += new System.EventHandler(this.MissingActiveLanguageActivity_ExecuteCode);
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "step1State";
            // 
            // ifElseBranchActivity9
            // 
            this.ifElseBranchActivity9.Activities.Add(this.MissingPageActivity);
            this.ifElseBranchActivity9.Activities.Add(this.setStateActivity9);
            this.ifElseBranchActivity9.Name = "ifElseBranchActivity9";
            // 
            // ifElseBranchActivity3
            // 
            this.ifElseBranchActivity3.Activities.Add(this.setStateActivity4);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.CheckActiveLanguageExists);
            this.ifElseBranchActivity3.Condition = codecondition1;
            this.ifElseBranchActivity3.Name = "ifElseBranchActivity3";
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "step1State";
            // 
            // missingDataMessageBoxActivity
            // 
            this.missingDataMessageBoxActivity.DialogType = Composite.ConsoleEventSystem.DialogType.Error;
            this.missingDataMessageBoxActivity.Message = "${Composite.StandardPlugins.VisualFunction,AddNew.NoDataExistsErrorMessage}";
            this.missingDataMessageBoxActivity.Name = "missingDataMessageBoxActivity";
            this.missingDataMessageBoxActivity.Title = "${Composite.StandardPlugins.VisualFunction,AddNew.NoDataExistsErrorTitle}";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "step2State";
            // 
            // codeActivity1
            // 
            this.codeActivity1.Name = "codeActivity1";
            this.codeActivity1.ExecuteCode += new System.EventHandler(this.prepareFunctionObject_codeActivity_ExecuteCode);
            // 
            // abortFlowSetStateActivity
            // 
            this.abortFlowSetStateActivity.Name = "abortFlowSetStateActivity";
            this.abortFlowSetStateActivity.TargetStateName = "finishState";
            // 
            // noTypesMessageBoxActivity
            // 
            this.noTypesMessageBoxActivity.DialogType = Composite.ConsoleEventSystem.DialogType.Message;
            this.noTypesMessageBoxActivity.Message = "${Composite.StandardPlugins.VisualFunction,AddNew.NoTypesExistsErrorMessage}";
            this.noTypesMessageBoxActivity.Name = "noTypesMessageBoxActivity";
            this.noTypesMessageBoxActivity.Title = "${Composite.StandardPlugins.VisualFunction,AddNew.NoTypesExistsErrorTitle}";
            // 
            // ifElseActivity_CheckPageExists
            // 
            this.ifElseActivity_CheckPageExists.Activities.Add(this.ifElseBranchActivity3);
            this.ifElseActivity_CheckPageExists.Activities.Add(this.ifElseBranchActivity9);
            this.ifElseActivity_CheckPageExists.Name = "ifElseActivity_CheckPageExists";
            // 
            // ifElseBranchActivity6
            // 
            this.ifElseBranchActivity6.Activities.Add(this.missingDataMessageBoxActivity);
            this.ifElseBranchActivity6.Activities.Add(this.setStateActivity5);
            this.ifElseBranchActivity6.Name = "ifElseBranchActivity6";
            // 
            // ifElseBranch_heckDataExists
            // 
            this.ifElseBranch_heckDataExists.Activities.Add(this.codeActivity1);
            this.ifElseBranch_heckDataExists.Activities.Add(this.setStateActivity3);
            codecondition2.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.CheckDataExists);
            this.ifElseBranch_heckDataExists.Condition = codecondition2;
            this.ifElseBranch_heckDataExists.Name = "ifElseBranch_heckDataExists";
            // 
            // ifElseBranchActivity8
            // 
            this.ifElseBranchActivity8.Activities.Add(this.noTypesMessageBoxActivity);
            this.ifElseBranchActivity8.Activities.Add(this.abortFlowSetStateActivity);
            this.ifElseBranchActivity8.Name = "ifElseBranchActivity8";
            // 
            // ifElseBranchActivity7
            // 
            this.ifElseBranchActivity7.Activities.Add(this.ifElseActivity_CheckPageExists);
            codecondition3.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.CheckTypesExists);
            this.ifElseBranchActivity7.Condition = codecondition3;
            this.ifElseBranchActivity7.Name = "ifElseBranchActivity7";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "step1State";
            // 
            // showFieldMessageActivity2
            // 
            this.showFieldMessageActivity2.FieldBindingPath = "TypeName";
            this.showFieldMessageActivity2.Message = "Specified type is not a dynamic type";
            this.showFieldMessageActivity2.Name = "showFieldMessageActivity2";
            // 
            // ifElseActivity2
            // 
            this.ifElseActivity2.Activities.Add(this.ifElseBranch_heckDataExists);
            this.ifElseActivity2.Activities.Add(this.ifElseBranchActivity6);
            this.ifElseActivity2.Name = "ifElseActivity2";
            // 
            // setStateActivity12
            // 
            this.setStateActivity12.Name = "setStateActivity12";
            this.setStateActivity12.TargetStateName = "finishState";
            // 
            // showConsoleMessageBoxActivity_NoTemplate
            // 
            this.showConsoleMessageBoxActivity_NoTemplate.DialogType = Composite.ConsoleEventSystem.DialogType.Message;
            this.showConsoleMessageBoxActivity_NoTemplate.Message = "${Composite.StandardPlugins.VisualFunction,AddNew.NoPageTemplatesExistsErrorMessa" +
                "ge}";
            this.showConsoleMessageBoxActivity_NoTemplate.Name = "showConsoleMessageBoxActivity_NoTemplate";
            this.showConsoleMessageBoxActivity_NoTemplate.Title = "${Composite.StandardPlugins.VisualFunction,AddNew.NoPageTemplatesExistsErrorTitle" +
                "}";
            // 
            // ifElseActivity3
            // 
            this.ifElseActivity3.Activities.Add(this.ifElseBranchActivity7);
            this.ifElseActivity3.Activities.Add(this.ifElseBranchActivity8);
            this.ifElseActivity3.Name = "ifElseActivity3";
            // 
            // backTostep2
            // 
            this.backTostep2.Name = "backTostep2";
            this.backTostep2.TargetStateName = "step2State";
            // 
            // showFieldMessageActivity1
            // 
            this.showFieldMessageActivity1.FieldBindingPath = "Function.Name";
            this.showFieldMessageActivity1.Message = "${Composite.StandardPlugins.VisualFunction, VisualFunctionElementProvider.Functio" +
                "nNameNotUniqueError}";
            this.showFieldMessageActivity1.Name = "showFieldMessageActivity1";
            // 
            // setStateActivity11
            // 
            this.setStateActivity11.Name = "setStateActivity11";
            this.setStateActivity11.TargetStateName = "finalizeActivity";
            // 
            // ifElseBranchActivity4
            // 
            this.ifElseBranchActivity4.Activities.Add(this.showFieldMessageActivity2);
            this.ifElseBranchActivity4.Activities.Add(this.setStateActivity2);
            this.ifElseBranchActivity4.Name = "ifElseBranchActivity4";
            // 
            // ifElseBranch_CheckTypeNameIsDynamicType
            // 
            this.ifElseBranch_CheckTypeNameIsDynamicType.Activities.Add(this.ifElseActivity2);
            codecondition4.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.CheckTypeNameIsDynamicType);
            this.ifElseBranch_CheckTypeNameIsDynamicType.Condition = codecondition4;
            this.ifElseBranch_CheckTypeNameIsDynamicType.Name = "ifElseBranch_CheckTypeNameIsDynamicType";
            // 
            // ifElseBranchActivity11
            // 
            this.ifElseBranchActivity11.Activities.Add(this.showConsoleMessageBoxActivity_NoTemplate);
            this.ifElseBranchActivity11.Activities.Add(this.setStateActivity12);
            this.ifElseBranchActivity11.Name = "ifElseBranchActivity11";
            // 
            // ifElseBranchActivity10
            // 
            this.ifElseBranchActivity10.Activities.Add(this.ifElseActivity3);
            codecondition5.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.CheckPageTemplatesExists);
            this.ifElseBranchActivity10.Condition = codecondition5;
            this.ifElseBranchActivity10.Name = "ifElseBranchActivity10";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.showFieldMessageActivity1);
            this.ifElseBranchActivity2.Activities.Add(this.backTostep2);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.setStateActivity11);
            codecondition6.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.CheckFunctionNameIsUnique);
            this.ifElseBranchActivity1.Condition = codecondition6;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // setStateActivity7
            // 
            this.setStateActivity7.Name = "setStateActivity7";
            this.setStateActivity7.TargetStateName = "finishState";
            // 
            // cancelHandleExternalEventActivity2
            // 
            this.cancelHandleExternalEventActivity2.EventName = "Cancel";
            this.cancelHandleExternalEventActivity2.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity2.Name = "cancelHandleExternalEventActivity2";
            // 
            // ifElseActivity1
            // 
            this.ifElseActivity1.Activities.Add(this.ifElseBranch_CheckTypeNameIsDynamicType);
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity4);
            this.ifElseActivity1.Name = "ifElseActivity1";
            // 
            // handleExternalEventActivity1
            // 
            this.handleExternalEventActivity1.EventName = "Next";
            this.handleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.handleExternalEventActivity1.Name = "handleExternalEventActivity1";
            // 
            // wizzardFormActivity1
            // 
            this.wizzardFormActivity1.ContainerLabel = "Add new";
            this.wizzardFormActivity1.FormDefinitionFileName = "\\Administrative\\AddNewVisualFunctionStep1.xml";
            this.wizzardFormActivity1.Name = "wizzardFormActivity1";
            // 
            // ifElseActivity5
            // 
            this.ifElseActivity5.Activities.Add(this.ifElseBranchActivity10);
            this.ifElseActivity5.Activities.Add(this.ifElseBranchActivity11);
            this.ifElseActivity5.Name = "ifElseActivity5";
            // 
            // initializeCodeActivity
            // 
            this.initializeCodeActivity.Name = "initializeCodeActivity";
            this.initializeCodeActivity.ExecuteCode += new System.EventHandler(this.stepInitialize_codeActivity_ExecuteCode);
            // 
            // setStateActivity8
            // 
            this.setStateActivity8.Name = "setStateActivity8";
            this.setStateActivity8.TargetStateName = "finishState";
            // 
            // cancelHandleExternalEventActivity3
            // 
            this.cancelHandleExternalEventActivity3.EventName = "Cancel";
            this.cancelHandleExternalEventActivity3.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity3.Name = "cancelHandleExternalEventActivity3";
            // 
            // ifNameUniqueActivity1
            // 
            this.ifNameUniqueActivity1.Activities.Add(this.ifElseBranchActivity1);
            this.ifNameUniqueActivity1.Activities.Add(this.ifElseBranchActivity2);
            this.ifNameUniqueActivity1.Name = "ifNameUniqueActivity1";
            // 
            // handleExternalEventActivity3
            // 
            this.handleExternalEventActivity3.EventName = "Finish";
            this.handleExternalEventActivity3.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.handleExternalEventActivity3.Name = "handleExternalEventActivity3";
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "step1State";
            // 
            // handleExternalEventActivity2
            // 
            this.handleExternalEventActivity2.EventName = "Previous";
            this.handleExternalEventActivity2.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.handleExternalEventActivity2.Name = "handleExternalEventActivity2";
            // 
            // step2WizzardFormActivity
            // 
            this.step2WizzardFormActivity.ContainerLabel = "Add new";
            this.step2WizzardFormActivity.FormDefinitionFileName = "\\Administrative\\AddNewVisualFunctionStep2.xml";
            this.step2WizzardFormActivity.Name = "step2WizzardFormActivity";
            // 
            // setStateActivity1
            // 
            this.setStateActivity1.Name = "setStateActivity1";
            this.setStateActivity1.TargetStateName = "finishState";
            // 
            // stepFinalize_codeActivity
            // 
            this.stepFinalize_codeActivity.Name = "stepFinalize_codeActivity";
            this.stepFinalize_codeActivity.ExecuteCode += new System.EventHandler(this.stepFinalize_codeActivity_ExecuteCode);
            // 
            // closeCurrentViewActivity1
            // 
            this.closeCurrentViewActivity1.Name = "closeCurrentViewActivity1";
            // 
            // step1_eventDrivenActivity_Cancel
            // 
            this.step1_eventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.step1_eventDrivenActivity_Cancel.Activities.Add(this.setStateActivity7);
            this.step1_eventDrivenActivity_Cancel.Name = "step1_eventDrivenActivity_Cancel";
            // 
            // step1_eventDrivenActivity_Next
            // 
            this.step1_eventDrivenActivity_Next.Activities.Add(this.handleExternalEventActivity1);
            this.step1_eventDrivenActivity_Next.Activities.Add(this.ifElseActivity1);
            this.step1_eventDrivenActivity_Next.Name = "step1_eventDrivenActivity_Next";
            // 
            // step1StateInitializationActivity
            // 
            this.step1StateInitializationActivity.Activities.Add(this.wizzardFormActivity1);
            this.step1StateInitializationActivity.Name = "step1StateInitializationActivity";
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
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.initializeCodeActivity);
            this.initializeStateInitializationActivity.Activities.Add(this.ifElseActivity5);
            this.initializeStateInitializationActivity.Name = "initializeStateInitializationActivity";
            // 
            // step2_eventDrivenActivity_Cancel
            // 
            this.step2_eventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity3);
            this.step2_eventDrivenActivity_Cancel.Activities.Add(this.setStateActivity8);
            this.step2_eventDrivenActivity_Cancel.Name = "step2_eventDrivenActivity_Cancel";
            // 
            // step2_eventDrivenActivity_Finish
            // 
            this.step2_eventDrivenActivity_Finish.Activities.Add(this.handleExternalEventActivity3);
            this.step2_eventDrivenActivity_Finish.Activities.Add(this.ifNameUniqueActivity1);
            this.step2_eventDrivenActivity_Finish.Name = "step2_eventDrivenActivity_Finish";
            // 
            // step2_eventDrivenActivity_Previous
            // 
            this.step2_eventDrivenActivity_Previous.Activities.Add(this.handleExternalEventActivity2);
            this.step2_eventDrivenActivity_Previous.Activities.Add(this.setStateActivity6);
            this.step2_eventDrivenActivity_Previous.Name = "step2_eventDrivenActivity_Previous";
            // 
            // step2StateInitializationActivity
            // 
            this.step2StateInitializationActivity.Activities.Add(this.step2WizzardFormActivity);
            this.step2StateInitializationActivity.Name = "step2StateInitializationActivity";
            // 
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.closeCurrentViewActivity1);
            this.finalizeStateInitializationActivity.Activities.Add(this.stepFinalize_codeActivity);
            this.finalizeStateInitializationActivity.Activities.Add(this.setStateActivity1);
            this.finalizeStateInitializationActivity.Name = "finalizeStateInitializationActivity";
            // 
            // step1State
            // 
            this.step1State.Activities.Add(this.step1StateInitializationActivity);
            this.step1State.Activities.Add(this.step1_eventDrivenActivity_Next);
            this.step1State.Activities.Add(this.step1_eventDrivenActivity_Cancel);
            this.step1State.Name = "step1State";
            // 
            // eventDrivenActivity_GlobalCancel
            // 
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.cancelHandleExternalEventActivity1);
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.setStateActivity19);
            this.eventDrivenActivity_GlobalCancel.Name = "eventDrivenActivity_GlobalCancel";
            // 
            // initializeActivity
            // 
            this.initializeActivity.Activities.Add(this.initializeStateInitializationActivity);
            this.initializeActivity.Name = "initializeActivity";
            // 
            // step2State
            // 
            this.step2State.Activities.Add(this.step2StateInitializationActivity);
            this.step2State.Activities.Add(this.step2_eventDrivenActivity_Previous);
            this.step2State.Activities.Add(this.step2_eventDrivenActivity_Finish);
            this.step2State.Activities.Add(this.step2_eventDrivenActivity_Cancel);
            this.step2State.Name = "step2State";
            // 
            // finalizeActivity
            // 
            this.finalizeActivity.Activities.Add(this.finalizeStateInitializationActivity);
            this.finalizeActivity.Name = "finalizeActivity";
            // 
            // finishState
            // 
            this.finishState.Name = "finishState";
            // 
            // AddNewVisualFunctionWorkflow
            // 
            this.Activities.Add(this.finishState);
            this.Activities.Add(this.finalizeActivity);
            this.Activities.Add(this.step2State);
            this.Activities.Add(this.initializeActivity);
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.step1State);
            this.CompletedStateName = "finishState";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeActivity";
            this.Name = "AddNewVisualFunctionWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private StateInitializationActivity step2StateInitializationActivity;
        private HandleExternalEventActivity handleExternalEventActivity3;
        private EventDrivenActivity step2_eventDrivenActivity_Finish;
        private StateActivity finishState;
        private StateActivity finalizeActivity;
        private StateInitializationActivity finalizeStateInitializationActivity;
        private CodeActivity stepFinalize_codeActivity;
        private StateInitializationActivity initializeStateInitializationActivity;
        private StateActivity initializeActivity;
        private SetStateActivity setStateActivity11;
        private Composite.Workflow.Activities.WizardFormActivity step2WizzardFormActivity;
        private SetStateActivity setStateActivity1;
        private SetStateActivity setStateActivity19;
        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private IfElseActivity ifNameUniqueActivity1;
        private SetStateActivity backTostep2;
        private Composite.Workflow.Activities.ShowFieldMessageActivity showFieldMessageActivity1;
        private StateActivity step1State;
        private StateInitializationActivity step1StateInitializationActivity;
        private EventDrivenActivity step1_eventDrivenActivity_Next;
        private HandleExternalEventActivity handleExternalEventActivity1;
        private IfElseBranchActivity ifElseBranchActivity4;
        private IfElseBranchActivity ifElseBranch_CheckTypeNameIsDynamicType;
        private IfElseActivity ifElseActivity1;
        private SetStateActivity setStateActivity5;
        private Composite.Workflow.Activities.ShowConsoleMessageBoxActivity missingDataMessageBoxActivity;
        private SetStateActivity setStateActivity3;
        private CodeActivity codeActivity1;
        private IfElseBranchActivity ifElseBranchActivity6;
        private IfElseBranchActivity ifElseBranch_heckDataExists;
        private IfElseActivity ifElseActivity2;
        private Composite.Workflow.Activities.WizardFormActivity wizzardFormActivity1;
        private SetStateActivity setStateActivity4;
        private SetStateActivity setStateActivity6;
        private HandleExternalEventActivity handleExternalEventActivity2;
        private EventDrivenActivity step2_eventDrivenActivity_Previous;
        private SetStateActivity setStateActivity2;
        private Composite.Workflow.Activities.ShowFieldMessageActivity showFieldMessageActivity2;
        private CodeActivity initializeCodeActivity;
        private SetStateActivity abortFlowSetStateActivity;
        private IfElseBranchActivity ifElseBranchActivity8;
        private IfElseBranchActivity ifElseBranchActivity7;
        private IfElseActivity ifElseActivity3;
        private Composite.Workflow.Activities.ShowConsoleMessageBoxActivity noTypesMessageBoxActivity;
        private SetStateActivity setStateActivity7;
        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;
        private SetStateActivity setStateActivity8;
        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity3;
        private EventDrivenActivity step1_eventDrivenActivity_Cancel;
        private EventDrivenActivity step2_eventDrivenActivity_Cancel;
        private Composite.Workflow.Activities.CloseCurrentViewActivity closeCurrentViewActivity1;
        private IfElseBranchActivity ifElseBranchActivity9;
        private IfElseBranchActivity ifElseBranchActivity3;
        private IfElseActivity ifElseActivity_CheckPageExists;
        private SetStateActivity setStateActivity9;
        private CodeActivity MissingPageActivity;
        private SetStateActivity setStateActivity12;
        private Composite.Workflow.Activities.ShowConsoleMessageBoxActivity showConsoleMessageBoxActivity_NoTemplate;
        private IfElseBranchActivity ifElseBranchActivity11;
        private IfElseBranchActivity ifElseBranchActivity10;
        private IfElseActivity ifElseActivity5;
        private StateActivity step2State;


















































































































































































    }
}
