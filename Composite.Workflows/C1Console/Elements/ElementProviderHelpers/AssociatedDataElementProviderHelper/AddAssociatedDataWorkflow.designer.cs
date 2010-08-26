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

namespace Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper
{
    partial class AddAssociatedDataWorkflow
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
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity7 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity4 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity3 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity8 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.closeCurrentViewActivity1 = new Composite.C1Console.Workflow.Activities.CloseCurrentViewActivity();
            this.selectTypeCodeActivity_Next = new System.Workflow.Activities.CodeActivity();
            this.nextHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.NextHandleExternalEventActivity();
            this.wizzardFormActivity1 = new Composite.C1Console.Workflow.Activities.WizardFormActivity();
            this.selectTypeCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.finalizeCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.saveHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.SaveHandleExternalEventActivity();
            this.enterDataCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.ifElseActivity2 = new System.Workflow.Activities.IfElseActivity();
            this.initialCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.selectTypeEventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.selectTypeEventDrivenActivity_Next = new System.Workflow.Activities.EventDrivenActivity();
            this.selectTypeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.saveStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.enterDataEventDrivenActivity_Save = new System.Workflow.Activities.EventDrivenActivity();
            this.enterDataStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initialStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.selectTypeStateActivity = new System.Workflow.Activities.StateActivity();
            this.saveStateActivity = new System.Workflow.Activities.StateActivity();
            this.enterDataStateActivity = new System.Workflow.Activities.StateActivity();
            this.initialStateActivity = new System.Workflow.Activities.StateActivity();
            this.cancelEventDrivenActivity = new System.Workflow.Activities.EventDrivenActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "enterDataStateActivity";
            // 
            // setStateActivity7
            // 
            this.setStateActivity7.Name = "setStateActivity7";
            this.setStateActivity7.TargetStateName = "selectTypeStateActivity";
            // 
            // ifElseBranchActivity4
            // 
            this.ifElseBranchActivity4.Activities.Add(this.setStateActivity2);
            this.ifElseBranchActivity4.Name = "ifElseBranchActivity4";
            // 
            // ifElseBranchActivity3
            // 
            this.ifElseBranchActivity3.Activities.Add(this.setStateActivity7);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.IsDataTypeDescriptorNullTest);
            this.ifElseBranchActivity3.Condition = codecondition1;
            this.ifElseBranchActivity3.Name = "ifElseBranchActivity3";
            // 
            // setStateActivity8
            // 
            this.setStateActivity8.Name = "setStateActivity8";
            this.setStateActivity8.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity2
            // 
            this.cancelHandleExternalEventActivity2.EventName = "Cancel";
            this.cancelHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity2.Name = "cancelHandleExternalEventActivity2";
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "finalStateActivity";
            // 
            // closeCurrentViewActivity1
            // 
            this.closeCurrentViewActivity1.Name = "closeCurrentViewActivity1";
            // 
            // selectTypeCodeActivity_Next
            // 
            this.selectTypeCodeActivity_Next.Name = "selectTypeCodeActivity_Next";
            this.selectTypeCodeActivity_Next.ExecuteCode += new System.EventHandler(this.selectTypeCodeActivity_Next_ExecuteCode);
            // 
            // nextHandleExternalEventActivity1
            // 
            this.nextHandleExternalEventActivity1.EventName = "Next";
            this.nextHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.nextHandleExternalEventActivity1.Name = "nextHandleExternalEventActivity1";
            // 
            // wizzardFormActivity1
            // 
            this.wizzardFormActivity1.ContainerLabel = null;
            this.wizzardFormActivity1.FormDefinitionFileName = "/Administrative/AddAssociatedDataWorkflowTypeSelection.xml";
            this.wizzardFormActivity1.Name = "wizzardFormActivity1";
            // 
            // selectTypeCodeActivity
            // 
            this.selectTypeCodeActivity.Name = "selectTypeCodeActivity";
            this.selectTypeCodeActivity.ExecuteCode += new System.EventHandler(this.selectTypeCodeActivity_ExecuteCode);
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "enterDataStateActivity";
            // 
            // finalizeCodeActivity
            // 
            this.finalizeCodeActivity.Name = "finalizeCodeActivity";
            this.finalizeCodeActivity.ExecuteCode += new System.EventHandler(this.finalizeCodeActivity_ExecuteCode);
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "saveStateActivity";
            // 
            // saveHandleExternalEventActivity1
            // 
            this.saveHandleExternalEventActivity1.EventName = "Save";
            this.saveHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.saveHandleExternalEventActivity1.Name = "saveHandleExternalEventActivity1";
            // 
            // enterDataCodeActivity
            // 
            this.enterDataCodeActivity.Name = "enterDataCodeActivity";
            this.enterDataCodeActivity.ExecuteCode += new System.EventHandler(this.enterDataCodeActivity_ExecuteCode);
            // 
            // ifElseActivity2
            // 
            this.ifElseActivity2.Activities.Add(this.ifElseBranchActivity3);
            this.ifElseActivity2.Activities.Add(this.ifElseBranchActivity4);
            this.ifElseActivity2.Name = "ifElseActivity2";
            // 
            // initialCodeActivity
            // 
            this.initialCodeActivity.Name = "initialCodeActivity";
            this.initialCodeActivity.ExecuteCode += new System.EventHandler(this.initialCodeActivity_ExecuteCode);
            // 
            // selectTypeEventDrivenActivity_Cancel
            // 
            this.selectTypeEventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.selectTypeEventDrivenActivity_Cancel.Activities.Add(this.setStateActivity8);
            this.selectTypeEventDrivenActivity_Cancel.Name = "selectTypeEventDrivenActivity_Cancel";
            // 
            // selectTypeEventDrivenActivity_Next
            // 
            this.selectTypeEventDrivenActivity_Next.Activities.Add(this.nextHandleExternalEventActivity1);
            this.selectTypeEventDrivenActivity_Next.Activities.Add(this.selectTypeCodeActivity_Next);
            this.selectTypeEventDrivenActivity_Next.Activities.Add(this.closeCurrentViewActivity1);
            this.selectTypeEventDrivenActivity_Next.Activities.Add(this.setStateActivity6);
            this.selectTypeEventDrivenActivity_Next.Name = "selectTypeEventDrivenActivity_Next";
            // 
            // selectTypeStateInitializationActivity
            // 
            this.selectTypeStateInitializationActivity.Activities.Add(this.selectTypeCodeActivity);
            this.selectTypeStateInitializationActivity.Activities.Add(this.wizzardFormActivity1);
            this.selectTypeStateInitializationActivity.Name = "selectTypeStateInitializationActivity";
            // 
            // saveStateInitializationActivity
            // 
            this.saveStateInitializationActivity.Activities.Add(this.finalizeCodeActivity);
            this.saveStateInitializationActivity.Activities.Add(this.setStateActivity5);
            this.saveStateInitializationActivity.Name = "saveStateInitializationActivity";
            // 
            // enterDataEventDrivenActivity_Save
            // 
            this.enterDataEventDrivenActivity_Save.Activities.Add(this.saveHandleExternalEventActivity1);
            this.enterDataEventDrivenActivity_Save.Activities.Add(this.setStateActivity4);
            this.enterDataEventDrivenActivity_Save.Name = "enterDataEventDrivenActivity_Save";
            // 
            // enterDataStateInitializationActivity
            // 
            this.enterDataStateInitializationActivity.Activities.Add(this.enterDataCodeActivity);
            this.enterDataStateInitializationActivity.Name = "enterDataStateInitializationActivity";
            // 
            // initialStateInitializationActivity
            // 
            this.initialStateInitializationActivity.Activities.Add(this.initialCodeActivity);
            this.initialStateInitializationActivity.Activities.Add(this.ifElseActivity2);
            this.initialStateInitializationActivity.Name = "initialStateInitializationActivity";
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
            // selectTypeStateActivity
            // 
            this.selectTypeStateActivity.Activities.Add(this.selectTypeStateInitializationActivity);
            this.selectTypeStateActivity.Activities.Add(this.selectTypeEventDrivenActivity_Next);
            this.selectTypeStateActivity.Activities.Add(this.selectTypeEventDrivenActivity_Cancel);
            this.selectTypeStateActivity.Name = "selectTypeStateActivity";
            // 
            // saveStateActivity
            // 
            this.saveStateActivity.Activities.Add(this.saveStateInitializationActivity);
            this.saveStateActivity.Name = "saveStateActivity";
            // 
            // enterDataStateActivity
            // 
            this.enterDataStateActivity.Activities.Add(this.enterDataStateInitializationActivity);
            this.enterDataStateActivity.Activities.Add(this.enterDataEventDrivenActivity_Save);
            this.enterDataStateActivity.Name = "enterDataStateActivity";
            // 
            // initialStateActivity
            // 
            this.initialStateActivity.Activities.Add(this.initialStateInitializationActivity);
            this.initialStateActivity.Name = "initialStateActivity";
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
            // AddAssociatedDataWorkflow
            // 
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.cancelEventDrivenActivity);
            this.Activities.Add(this.initialStateActivity);
            this.Activities.Add(this.enterDataStateActivity);
            this.Activities.Add(this.saveStateActivity);
            this.Activities.Add(this.selectTypeStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initialStateActivity";
            this.Name = "AddAssociatedDataWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private SetStateActivity setStateActivity8;

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;

        private EventDrivenActivity selectTypeEventDrivenActivity_Cancel;

        private CodeActivity selectTypeCodeActivity_Next;

        private SetStateActivity setStateActivity7;

        private IfElseBranchActivity ifElseBranchActivity4;

        private IfElseBranchActivity ifElseBranchActivity3;

        private IfElseActivity ifElseActivity2;

        private C1Console.Workflow.Activities.WizardFormActivity wizzardFormActivity1;

        private CodeActivity selectTypeCodeActivity;

        private SetStateActivity setStateActivity6;

        private C1Console.Workflow.Activities.NextHandleExternalEventActivity nextHandleExternalEventActivity1;

        private EventDrivenActivity selectTypeEventDrivenActivity_Next;

        private StateInitializationActivity selectTypeStateInitializationActivity;

        private StateActivity selectTypeStateActivity;

        private SetStateActivity setStateActivity5;

        private EventDrivenActivity enterDataEventDrivenActivity_Save;

        private CodeActivity finalizeCodeActivity;

        private SetStateActivity setStateActivity1;

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;

        private EventDrivenActivity cancelEventDrivenActivity;

        private CodeActivity enterDataCodeActivity;

        private SetStateActivity setStateActivity2;

        private StateInitializationActivity saveStateInitializationActivity;

        private StateInitializationActivity enterDataStateInitializationActivity;

        private StateInitializationActivity initialStateInitializationActivity;

        private StateActivity saveStateActivity;

        private StateActivity enterDataStateActivity;

        private StateActivity initialStateActivity;

        private CodeActivity initialCodeActivity;

        private SetStateActivity setStateActivity4;

        private C1Console.Workflow.Activities.CloseCurrentViewActivity closeCurrentViewActivity1;

        private C1Console.Workflow.Activities.SaveHandleExternalEventActivity saveHandleExternalEventActivity1;

        private StateActivity finalStateActivity;











































    }
}
