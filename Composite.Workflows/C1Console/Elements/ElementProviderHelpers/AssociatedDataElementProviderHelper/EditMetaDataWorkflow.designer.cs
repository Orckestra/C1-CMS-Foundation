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

namespace Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper
{
    partial class EditMetaDataWorkflow
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
            this.setStateActivity15 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity14 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity16 = new System.Workflow.Activities.SetStateActivity();
            this.editDefinitionIfElseActivity_AffectedPagesExists = new System.Workflow.Activities.IfElseActivity();
            this.initializeCodeActivity_ShowNoDefinedDefinitionsMessage = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.initializeCodeActivity_UpdateBindings = new System.Workflow.Activities.CodeActivity();
            this.ifElseBranchActivity6 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity5 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity4 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity3 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity11 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity5 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity12 = new System.Workflow.Activities.SetStateActivity();
            this.previousHandleExternalEventActivity3 = new Composite.C1Console.Workflow.Activities.PreviousHandleExternalEventActivity();
            this.setStateActivity13 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.wizardFormActivity3 = new Composite.C1Console.Workflow.Activities.WizardFormActivity();
            this.setStateActivity7 = new System.Workflow.Activities.SetStateActivity();
            this.finalizeCodeActivity_Finalize = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity4 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity10 = new System.Workflow.Activities.SetStateActivity();
            this.previousHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.PreviousHandleExternalEventActivity();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.collectDefaultValuesCodeActivity_ShowWizzard = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity3 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity8 = new System.Workflow.Activities.SetStateActivity();
            this.previousHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.PreviousHandleExternalEventActivity();
            this.editIfElseActivity_ValidateNewBinding = new System.Workflow.Activities.IfElseActivity();
            this.nextHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.NextHandleExternalEventActivity();
            this.wizardFormActivity2 = new Composite.C1Console.Workflow.Activities.WizardFormActivity();
            this.editDefinitionCodeActivity_UpdateBindings = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity9 = new System.Workflow.Activities.SetStateActivity();
            this.nextHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.NextHandleExternalEventActivity();
            this.wizardFormActivity1 = new Composite.C1Console.Workflow.Activities.WizardFormActivity();
            this.initializeIfElseActivity_DefinedDefintionsExists = new System.Workflow.Activities.IfElseActivity();
            this.noDefaultValuesNeededEventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.noDefaultValuesNeededEventDrivenActivity_Previous = new System.Workflow.Activities.EventDrivenActivity();
            this.noDefaultValuesNeededEventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.noDefaultValuesNeededStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.colectDefaultValuesEventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.colectDefaultValuesEventDrivenActivity_Previous = new System.Workflow.Activities.EventDrivenActivity();
            this.colectDefaultValuesEventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.colectDefaultValuesStateInitializationActivity3 = new System.Workflow.Activities.StateInitializationActivity();
            this.editDefinitionEventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.editDefinitionEventDrivenActivity_Previous = new System.Workflow.Activities.EventDrivenActivity();
            this.editDefinitionEventDrivenActivity_Next = new System.Workflow.Activities.EventDrivenActivity();
            this.editDefinitionStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.selectDefinitionEventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.selectDefinitionEventDrivenActivity_Next = new System.Workflow.Activities.EventDrivenActivity();
            this.selectDefinitionStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.noDefaultDataNeededStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalizeStateActivity = new System.Workflow.Activities.StateActivity();
            this.colectDefaultValuesStateActivity3 = new System.Workflow.Activities.StateActivity();
            this.editDefinitionStateActivity2 = new System.Workflow.Activities.StateActivity();
            this.selectDefinitionStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // setStateActivity15
            // 
            this.setStateActivity15.Name = "setStateActivity15";
            this.setStateActivity15.TargetStateName = "noDefaultDataNeededStateActivity";
            // 
            // setStateActivity14
            // 
            this.setStateActivity14.Name = "setStateActivity14";
            this.setStateActivity14.TargetStateName = "colectDefaultValuesStateActivity3";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity15);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.setStateActivity14);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.AffectedPagesExists);
            this.ifElseBranchActivity1.Condition = codecondition1;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // setStateActivity16
            // 
            this.setStateActivity16.Name = "setStateActivity16";
            this.setStateActivity16.TargetStateName = "colectDefaultValuesStateActivity3";
            // 
            // editDefinitionIfElseActivity_AffectedPagesExists
            // 
            this.editDefinitionIfElseActivity_AffectedPagesExists.Activities.Add(this.ifElseBranchActivity1);
            this.editDefinitionIfElseActivity_AffectedPagesExists.Activities.Add(this.ifElseBranchActivity2);
            this.editDefinitionIfElseActivity_AffectedPagesExists.Name = "editDefinitionIfElseActivity_AffectedPagesExists";
            // 
            // initializeCodeActivity_ShowNoDefinedDefinitionsMessage
            // 
            this.initializeCodeActivity_ShowNoDefinedDefinitionsMessage.Name = "initializeCodeActivity_ShowNoDefinedDefinitionsMessage";
            this.initializeCodeActivity_ShowNoDefinedDefinitionsMessage.ExecuteCode += new System.EventHandler(this.initializeCodeActivity_ShowNoDefinedDefinitionsMessage_ExecuteCode);
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "selectDefinitionStateActivity";
            // 
            // initializeCodeActivity_UpdateBindings
            // 
            this.initializeCodeActivity_UpdateBindings.Name = "initializeCodeActivity_UpdateBindings";
            this.initializeCodeActivity_UpdateBindings.ExecuteCode += new System.EventHandler(this.initializeCodeActivity_UpdateBindings_ExecuteCode);
            // 
            // ifElseBranchActivity6
            // 
            this.ifElseBranchActivity6.Activities.Add(this.setStateActivity16);
            this.ifElseBranchActivity6.Name = "ifElseBranchActivity6";
            // 
            // ifElseBranchActivity5
            // 
            this.ifElseBranchActivity5.Activities.Add(this.editDefinitionIfElseActivity_AffectedPagesExists);
            codecondition2.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.ValidateNewDefinition);
            this.ifElseBranchActivity5.Condition = codecondition2;
            this.ifElseBranchActivity5.Name = "ifElseBranchActivity5";
            // 
            // ifElseBranchActivity4
            // 
            this.ifElseBranchActivity4.Activities.Add(this.initializeCodeActivity_ShowNoDefinedDefinitionsMessage);
            this.ifElseBranchActivity4.Name = "ifElseBranchActivity4";
            // 
            // ifElseBranchActivity3
            // 
            this.ifElseBranchActivity3.Activities.Add(this.initializeCodeActivity_UpdateBindings);
            this.ifElseBranchActivity3.Activities.Add(this.setStateActivity2);
            codecondition3.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.DefinedDefinitionsExists);
            this.ifElseBranchActivity3.Condition = codecondition3;
            this.ifElseBranchActivity3.Name = "ifElseBranchActivity3";
            // 
            // setStateActivity11
            // 
            this.setStateActivity11.Name = "setStateActivity11";
            this.setStateActivity11.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity5
            // 
            this.cancelHandleExternalEventActivity5.EventName = "Cancel";
            this.cancelHandleExternalEventActivity5.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity5.Name = "cancelHandleExternalEventActivity5";
            // 
            // setStateActivity12
            // 
            this.setStateActivity12.Name = "setStateActivity12";
            this.setStateActivity12.TargetStateName = "editDefinitionStateActivity2";
            // 
            // previousHandleExternalEventActivity3
            // 
            this.previousHandleExternalEventActivity3.EventName = "Previous";
            this.previousHandleExternalEventActivity3.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.previousHandleExternalEventActivity3.Name = "previousHandleExternalEventActivity3";
            // 
            // setStateActivity13
            // 
            this.setStateActivity13.Name = "setStateActivity13";
            this.setStateActivity13.TargetStateName = "finalizeStateActivity";
            // 
            // finishHandleExternalEventActivity2
            // 
            this.finishHandleExternalEventActivity2.EventName = "Finish";
            this.finishHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity2.Name = "finishHandleExternalEventActivity2";
            // 
            // wizardFormActivity3
            // 
            this.wizardFormActivity3.ContainerLabel = null;
            this.wizardFormActivity3.FormDefinitionFileName = "/Administrative/EditMetaData_NoDefaultValuesNeeded.xml";
            this.wizardFormActivity3.Name = "wizardFormActivity3";
            // 
            // setStateActivity7
            // 
            this.setStateActivity7.Name = "setStateActivity7";
            this.setStateActivity7.TargetStateName = "finalStateActivity";
            // 
            // finalizeCodeActivity_Finalize
            // 
            this.finalizeCodeActivity_Finalize.Name = "finalizeCodeActivity_Finalize";
            this.finalizeCodeActivity_Finalize.ExecuteCode += new System.EventHandler(this.finalizeCodeActivity_Finalize_ExecuteCode);
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity4
            // 
            this.cancelHandleExternalEventActivity4.EventName = "Cancel";
            this.cancelHandleExternalEventActivity4.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity4.Name = "cancelHandleExternalEventActivity4";
            // 
            // setStateActivity10
            // 
            this.setStateActivity10.Name = "setStateActivity10";
            this.setStateActivity10.TargetStateName = "editDefinitionStateActivity2";
            // 
            // previousHandleExternalEventActivity2
            // 
            this.previousHandleExternalEventActivity2.EventName = "Previous";
            this.previousHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.previousHandleExternalEventActivity2.Name = "previousHandleExternalEventActivity2";
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "finalizeStateActivity";
            // 
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // collectDefaultValuesCodeActivity_ShowWizzard
            // 
            this.collectDefaultValuesCodeActivity_ShowWizzard.Name = "collectDefaultValuesCodeActivity_ShowWizzard";
            this.collectDefaultValuesCodeActivity_ShowWizzard.ExecuteCode += new System.EventHandler(this.collectDefaultValuesCodeActivity_ShowWizzard_ExecuteCode);
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity3
            // 
            this.cancelHandleExternalEventActivity3.EventName = "Cancel";
            this.cancelHandleExternalEventActivity3.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity3.Name = "cancelHandleExternalEventActivity3";
            // 
            // setStateActivity8
            // 
            this.setStateActivity8.Name = "setStateActivity8";
            this.setStateActivity8.TargetStateName = "selectDefinitionStateActivity";
            // 
            // previousHandleExternalEventActivity1
            // 
            this.previousHandleExternalEventActivity1.EventName = "Previous";
            this.previousHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.previousHandleExternalEventActivity1.Name = "previousHandleExternalEventActivity1";
            // 
            // editIfElseActivity_ValidateNewBinding
            // 
            this.editIfElseActivity_ValidateNewBinding.Activities.Add(this.ifElseBranchActivity5);
            this.editIfElseActivity_ValidateNewBinding.Activities.Add(this.ifElseBranchActivity6);
            this.editIfElseActivity_ValidateNewBinding.Name = "editIfElseActivity_ValidateNewBinding";
            // 
            // nextHandleExternalEventActivity2
            // 
            this.nextHandleExternalEventActivity2.EventName = "Next";
            this.nextHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.nextHandleExternalEventActivity2.Name = "nextHandleExternalEventActivity2";
            // 
            // wizardFormActivity2
            // 
            this.wizardFormActivity2.ContainerLabel = null;
            this.wizardFormActivity2.FormDefinitionFileName = "/Administrative/EditMetaData_EditDefinition.xml";
            this.wizardFormActivity2.Name = "wizardFormActivity2";
            // 
            // editDefinitionCodeActivity_UpdateBindings
            // 
            this.editDefinitionCodeActivity_UpdateBindings.Name = "editDefinitionCodeActivity_UpdateBindings";
            this.editDefinitionCodeActivity_UpdateBindings.ExecuteCode += new System.EventHandler(this.editDefinitionCodeActivity_UpdateBindings_ExecuteCode);
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity2
            // 
            this.cancelHandleExternalEventActivity2.EventName = "Cancel";
            this.cancelHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity2.Name = "cancelHandleExternalEventActivity2";
            // 
            // setStateActivity9
            // 
            this.setStateActivity9.Name = "setStateActivity9";
            this.setStateActivity9.TargetStateName = "editDefinitionStateActivity2";
            // 
            // nextHandleExternalEventActivity1
            // 
            this.nextHandleExternalEventActivity1.EventName = "Next";
            this.nextHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.nextHandleExternalEventActivity1.Name = "nextHandleExternalEventActivity1";
            // 
            // wizardFormActivity1
            // 
            this.wizardFormActivity1.ContainerLabel = null;
            this.wizardFormActivity1.FormDefinitionFileName = "/Administrative/EditMetaData_SelectDefinition.xml";
            this.wizardFormActivity1.Name = "wizardFormActivity1";
            // 
            // initializeIfElseActivity_DefinedDefintionsExists
            // 
            this.initializeIfElseActivity_DefinedDefintionsExists.Activities.Add(this.ifElseBranchActivity3);
            this.initializeIfElseActivity_DefinedDefintionsExists.Activities.Add(this.ifElseBranchActivity4);
            this.initializeIfElseActivity_DefinedDefintionsExists.Name = "initializeIfElseActivity_DefinedDefintionsExists";
            // 
            // noDefaultValuesNeededEventDrivenActivity_Cancel
            // 
            this.noDefaultValuesNeededEventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity5);
            this.noDefaultValuesNeededEventDrivenActivity_Cancel.Activities.Add(this.setStateActivity11);
            this.noDefaultValuesNeededEventDrivenActivity_Cancel.Name = "noDefaultValuesNeededEventDrivenActivity_Cancel";
            // 
            // noDefaultValuesNeededEventDrivenActivity_Previous
            // 
            this.noDefaultValuesNeededEventDrivenActivity_Previous.Activities.Add(this.previousHandleExternalEventActivity3);
            this.noDefaultValuesNeededEventDrivenActivity_Previous.Activities.Add(this.setStateActivity12);
            this.noDefaultValuesNeededEventDrivenActivity_Previous.Name = "noDefaultValuesNeededEventDrivenActivity_Previous";
            // 
            // noDefaultValuesNeededEventDrivenActivity_Finish
            // 
            this.noDefaultValuesNeededEventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity2);
            this.noDefaultValuesNeededEventDrivenActivity_Finish.Activities.Add(this.setStateActivity13);
            this.noDefaultValuesNeededEventDrivenActivity_Finish.Name = "noDefaultValuesNeededEventDrivenActivity_Finish";
            // 
            // noDefaultValuesNeededStateInitializationActivity
            // 
            this.noDefaultValuesNeededStateInitializationActivity.Activities.Add(this.wizardFormActivity3);
            this.noDefaultValuesNeededStateInitializationActivity.Name = "noDefaultValuesNeededStateInitializationActivity";
            // 
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.finalizeCodeActivity_Finalize);
            this.finalizeStateInitializationActivity.Activities.Add(this.setStateActivity7);
            this.finalizeStateInitializationActivity.Name = "finalizeStateInitializationActivity";
            // 
            // colectDefaultValuesEventDrivenActivity_Cancel
            // 
            this.colectDefaultValuesEventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity4);
            this.colectDefaultValuesEventDrivenActivity_Cancel.Activities.Add(this.setStateActivity5);
            this.colectDefaultValuesEventDrivenActivity_Cancel.Name = "colectDefaultValuesEventDrivenActivity_Cancel";
            // 
            // colectDefaultValuesEventDrivenActivity_Previous
            // 
            this.colectDefaultValuesEventDrivenActivity_Previous.Activities.Add(this.previousHandleExternalEventActivity2);
            this.colectDefaultValuesEventDrivenActivity_Previous.Activities.Add(this.setStateActivity10);
            this.colectDefaultValuesEventDrivenActivity_Previous.Name = "colectDefaultValuesEventDrivenActivity_Previous";
            // 
            // colectDefaultValuesEventDrivenActivity_Finish
            // 
            this.colectDefaultValuesEventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity1);
            this.colectDefaultValuesEventDrivenActivity_Finish.Activities.Add(this.setStateActivity6);
            this.colectDefaultValuesEventDrivenActivity_Finish.Name = "colectDefaultValuesEventDrivenActivity_Finish";
            // 
            // colectDefaultValuesStateInitializationActivity3
            // 
            this.colectDefaultValuesStateInitializationActivity3.Activities.Add(this.collectDefaultValuesCodeActivity_ShowWizzard);
            this.colectDefaultValuesStateInitializationActivity3.Name = "colectDefaultValuesStateInitializationActivity3";
            // 
            // editDefinitionEventDrivenActivity_Cancel
            // 
            this.editDefinitionEventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity3);
            this.editDefinitionEventDrivenActivity_Cancel.Activities.Add(this.setStateActivity3);
            this.editDefinitionEventDrivenActivity_Cancel.Name = "editDefinitionEventDrivenActivity_Cancel";
            // 
            // editDefinitionEventDrivenActivity_Previous
            // 
            this.editDefinitionEventDrivenActivity_Previous.Activities.Add(this.previousHandleExternalEventActivity1);
            this.editDefinitionEventDrivenActivity_Previous.Activities.Add(this.setStateActivity8);
            this.editDefinitionEventDrivenActivity_Previous.Name = "editDefinitionEventDrivenActivity_Previous";
            // 
            // editDefinitionEventDrivenActivity_Next
            // 
            this.editDefinitionEventDrivenActivity_Next.Activities.Add(this.nextHandleExternalEventActivity2);
            this.editDefinitionEventDrivenActivity_Next.Activities.Add(this.editIfElseActivity_ValidateNewBinding);
            this.editDefinitionEventDrivenActivity_Next.Name = "editDefinitionEventDrivenActivity_Next";
            // 
            // editDefinitionStateInitializationActivity
            // 
            this.editDefinitionStateInitializationActivity.Activities.Add(this.editDefinitionCodeActivity_UpdateBindings);
            this.editDefinitionStateInitializationActivity.Activities.Add(this.wizardFormActivity2);
            this.editDefinitionStateInitializationActivity.Name = "editDefinitionStateInitializationActivity";
            // 
            // selectDefinitionEventDrivenActivity_Cancel
            // 
            this.selectDefinitionEventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.selectDefinitionEventDrivenActivity_Cancel.Activities.Add(this.setStateActivity4);
            this.selectDefinitionEventDrivenActivity_Cancel.Name = "selectDefinitionEventDrivenActivity_Cancel";
            // 
            // selectDefinitionEventDrivenActivity_Next
            // 
            this.selectDefinitionEventDrivenActivity_Next.Activities.Add(this.nextHandleExternalEventActivity1);
            this.selectDefinitionEventDrivenActivity_Next.Activities.Add(this.setStateActivity9);
            this.selectDefinitionEventDrivenActivity_Next.Name = "selectDefinitionEventDrivenActivity_Next";
            // 
            // selectDefinitionStateInitializationActivity
            // 
            this.selectDefinitionStateInitializationActivity.Activities.Add(this.wizardFormActivity1);
            this.selectDefinitionStateInitializationActivity.Name = "selectDefinitionStateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.initializeIfElseActivity_DefinedDefintionsExists);
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
            // noDefaultDataNeededStateActivity
            // 
            this.noDefaultDataNeededStateActivity.Activities.Add(this.noDefaultValuesNeededStateInitializationActivity);
            this.noDefaultDataNeededStateActivity.Activities.Add(this.noDefaultValuesNeededEventDrivenActivity_Finish);
            this.noDefaultDataNeededStateActivity.Activities.Add(this.noDefaultValuesNeededEventDrivenActivity_Previous);
            this.noDefaultDataNeededStateActivity.Activities.Add(this.noDefaultValuesNeededEventDrivenActivity_Cancel);
            this.noDefaultDataNeededStateActivity.Name = "noDefaultDataNeededStateActivity";
            // 
            // finalizeStateActivity
            // 
            this.finalizeStateActivity.Activities.Add(this.finalizeStateInitializationActivity);
            this.finalizeStateActivity.Name = "finalizeStateActivity";
            // 
            // colectDefaultValuesStateActivity3
            // 
            this.colectDefaultValuesStateActivity3.Activities.Add(this.colectDefaultValuesStateInitializationActivity3);
            this.colectDefaultValuesStateActivity3.Activities.Add(this.colectDefaultValuesEventDrivenActivity_Finish);
            this.colectDefaultValuesStateActivity3.Activities.Add(this.colectDefaultValuesEventDrivenActivity_Previous);
            this.colectDefaultValuesStateActivity3.Activities.Add(this.colectDefaultValuesEventDrivenActivity_Cancel);
            this.colectDefaultValuesStateActivity3.Name = "colectDefaultValuesStateActivity3";
            // 
            // editDefinitionStateActivity2
            // 
            this.editDefinitionStateActivity2.Activities.Add(this.editDefinitionStateInitializationActivity);
            this.editDefinitionStateActivity2.Activities.Add(this.editDefinitionEventDrivenActivity_Next);
            this.editDefinitionStateActivity2.Activities.Add(this.editDefinitionEventDrivenActivity_Previous);
            this.editDefinitionStateActivity2.Activities.Add(this.editDefinitionEventDrivenActivity_Cancel);
            this.editDefinitionStateActivity2.Name = "editDefinitionStateActivity2";
            // 
            // selectDefinitionStateActivity
            // 
            this.selectDefinitionStateActivity.Activities.Add(this.selectDefinitionStateInitializationActivity);
            this.selectDefinitionStateActivity.Activities.Add(this.selectDefinitionEventDrivenActivity_Next);
            this.selectDefinitionStateActivity.Activities.Add(this.selectDefinitionEventDrivenActivity_Cancel);
            this.selectDefinitionStateActivity.Name = "selectDefinitionStateActivity";
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
            // EditMetaDataWorkflow
            // 
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.selectDefinitionStateActivity);
            this.Activities.Add(this.editDefinitionStateActivity2);
            this.Activities.Add(this.colectDefaultValuesStateActivity3);
            this.Activities.Add(this.finalizeStateActivity);
            this.Activities.Add(this.noDefaultDataNeededStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "EditMetaDataWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;

        private StateInitializationActivity initializeStateInitializationActivity;

        private SetStateActivity setStateActivity1;

        private StateActivity finalStateActivity;

        private StateActivity initializeStateActivity;

        private CodeActivity initializeCodeActivity_UpdateBindings;

        private SetStateActivity setStateActivity11;

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity5;

        private SetStateActivity setStateActivity12;

        private C1Console.Workflow.Activities.PreviousHandleExternalEventActivity previousHandleExternalEventActivity3;

        private SetStateActivity setStateActivity13;

        private C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity2;

        private SetStateActivity setStateActivity7;

        private SetStateActivity setStateActivity5;

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity4;

        private SetStateActivity setStateActivity10;

        private C1Console.Workflow.Activities.PreviousHandleExternalEventActivity previousHandleExternalEventActivity2;

        private SetStateActivity setStateActivity6;

        private C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;

        private SetStateActivity setStateActivity3;

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity3;

        private SetStateActivity setStateActivity8;

        private C1Console.Workflow.Activities.PreviousHandleExternalEventActivity previousHandleExternalEventActivity1;

        private C1Console.Workflow.Activities.NextHandleExternalEventActivity nextHandleExternalEventActivity2;

        private SetStateActivity setStateActivity4;

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;

        private SetStateActivity setStateActivity9;

        private C1Console.Workflow.Activities.NextHandleExternalEventActivity nextHandleExternalEventActivity1;

        private SetStateActivity setStateActivity2;

        private EventDrivenActivity noDefaultValuesNeededEventDrivenActivity_Cancel;

        private EventDrivenActivity noDefaultValuesNeededEventDrivenActivity_Previous;

        private EventDrivenActivity noDefaultValuesNeededEventDrivenActivity_Finish;

        private StateInitializationActivity noDefaultValuesNeededStateInitializationActivity;

        private StateInitializationActivity finalizeStateInitializationActivity;

        private EventDrivenActivity colectDefaultValuesEventDrivenActivity_Cancel;

        private EventDrivenActivity colectDefaultValuesEventDrivenActivity_Previous;

        private EventDrivenActivity colectDefaultValuesEventDrivenActivity_Finish;

        private StateInitializationActivity colectDefaultValuesStateInitializationActivity3;

        private EventDrivenActivity editDefinitionEventDrivenActivity_Cancel;

        private EventDrivenActivity editDefinitionEventDrivenActivity_Previous;

        private EventDrivenActivity editDefinitionEventDrivenActivity_Next;

        private StateInitializationActivity editDefinitionStateInitializationActivity;

        private EventDrivenActivity selectDefinitionEventDrivenActivity_Cancel;

        private EventDrivenActivity selectDefinitionEventDrivenActivity_Next;

        private StateInitializationActivity selectDefinitionStateInitializationActivity;

        private StateActivity noDefaultDataNeededStateActivity;

        private StateActivity finalizeStateActivity;

        private StateActivity colectDefaultValuesStateActivity3;

        private StateActivity editDefinitionStateActivity2;

        private StateActivity selectDefinitionStateActivity;

        private IfElseBranchActivity ifElseBranchActivity2;

        private IfElseBranchActivity ifElseBranchActivity1;

        private IfElseActivity editDefinitionIfElseActivity_AffectedPagesExists;

        private SetStateActivity setStateActivity15;

        private SetStateActivity setStateActivity14;

        private CodeActivity initializeCodeActivity_ShowNoDefinedDefinitionsMessage;

        private IfElseBranchActivity ifElseBranchActivity4;

        private IfElseBranchActivity ifElseBranchActivity3;

        private C1Console.Workflow.Activities.WizardFormActivity wizardFormActivity1;

        private IfElseActivity initializeIfElseActivity_DefinedDefintionsExists;

        private C1Console.Workflow.Activities.WizardFormActivity wizardFormActivity3;

        private CodeActivity collectDefaultValuesCodeActivity_ShowWizzard;

        private C1Console.Workflow.Activities.WizardFormActivity wizardFormActivity2;

        private CodeActivity finalizeCodeActivity_Finalize;

        private CodeActivity editDefinitionCodeActivity_UpdateBindings;

        private SetStateActivity setStateActivity16;

        private IfElseBranchActivity ifElseBranchActivity6;

        private IfElseBranchActivity ifElseBranchActivity5;

        private IfElseActivity editIfElseActivity_ValidateNewBinding;

        private EventDrivenActivity eventDrivenActivity_GlobalCancel;




















































































































    }
}
