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

namespace Composite.Plugins.Elements.ElementProviders.MethodBasedFunctionProviderElementProvider
{
    partial class AddNewMethodBasedFunctionWorkflow
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
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity9 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity7 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity4 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity3 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.setStateActivity12 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity4 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.wizzardFormActivity2 = new Composite.C1Console.Workflow.Activities.WizardFormActivity();
            this.setStateActivity11 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity3 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity10 = new System.Workflow.Activities.SetStateActivity();
            this.step2CodeActivity = new System.Workflow.Activities.CodeActivity();
            this.nextHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.NextHandleExternalEventActivity();
            this.wizzardFormActivity3 = new Composite.C1Console.Workflow.Activities.WizardFormActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.closeCurrentViewActivity1 = new Composite.C1Console.Workflow.Activities.CloseCurrentViewActivity();
            this.finalizeCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity8 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.ifElseActivity2 = new System.Workflow.Activities.IfElseActivity();
            this.nextHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.NextHandleExternalEventActivity();
            this.wizzardFormActivity1 = new Composite.C1Console.Workflow.Activities.WizardFormActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.initializeCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.checkMethodNameStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.step3EventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step3EventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.step3StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step2EventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step2EventDrivenActivity_Next = new System.Workflow.Activities.EventDrivenActivity();
            this.step2StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step1EventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step1EventDrivenActivity_Next = new System.Workflow.Activities.EventDrivenActivity();
            this.step1StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.checkMethodNameStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step3StateActivity = new System.Workflow.Activities.StateActivity();
            this.step2StateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalizeStateActivity = new System.Workflow.Activities.StateActivity();
            this.step1StateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "step3StateActivity";
            // 
            // setStateActivity9
            // 
            this.setStateActivity9.Name = "setStateActivity9";
            this.setStateActivity9.TargetStateName = "finalizeStateActivity";
            // 
            // setStateActivity7
            // 
            this.setStateActivity7.Name = "setStateActivity7";
            this.setStateActivity7.TargetStateName = "step1StateActivity";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "step2StateActivity";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity5);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.setStateActivity9);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.IsValidMethodName);
            this.ifElseBranchActivity1.Condition = codecondition1;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // ifElseBranchActivity4
            // 
            this.ifElseBranchActivity4.Activities.Add(this.setStateActivity7);
            this.ifElseBranchActivity4.Name = "ifElseBranchActivity4";
            // 
            // ifElseBranchActivity3
            // 
            this.ifElseBranchActivity3.Activities.Add(this.setStateActivity2);
            codecondition2.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.CheckType);
            this.ifElseBranchActivity3.Condition = codecondition2;
            this.ifElseBranchActivity3.Name = "ifElseBranchActivity3";
            // 
            // ifElseActivity1
            // 
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity1);
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity2);
            this.ifElseActivity1.Name = "ifElseActivity1";
            // 
            // setStateActivity12
            // 
            this.setStateActivity12.Name = "setStateActivity12";
            this.setStateActivity12.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity4
            // 
            this.cancelHandleExternalEventActivity4.EventName = "Cancel";
            this.cancelHandleExternalEventActivity4.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity4.Name = "cancelHandleExternalEventActivity4";
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "checkMethodNameStateActivity";
            // 
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // wizzardFormActivity2
            // 
            this.wizzardFormActivity2.ContainerLabel = "Add new";
            this.wizzardFormActivity2.FormDefinitionFileName = "\\Administrative\\AddNewMethodBasedFunctionStep3.xml";
            this.wizzardFormActivity2.Name = "wizzardFormActivity2";
            // 
            // setStateActivity11
            // 
            this.setStateActivity11.Name = "setStateActivity11";
            this.setStateActivity11.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity3
            // 
            this.cancelHandleExternalEventActivity3.EventName = "Cancel";
            this.cancelHandleExternalEventActivity3.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity3.Name = "cancelHandleExternalEventActivity3";
            // 
            // setStateActivity10
            // 
            this.setStateActivity10.Name = "setStateActivity10";
            this.setStateActivity10.TargetStateName = "step3StateActivity";
            // 
            // step2CodeActivity
            // 
            this.step2CodeActivity.Name = "step2CodeActivity";
            this.step2CodeActivity.ExecuteCode += new System.EventHandler(this.step2CodeActivity_ExecuteCode);
            // 
            // nextHandleExternalEventActivity2
            // 
            this.nextHandleExternalEventActivity2.EventName = "Next";
            this.nextHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.nextHandleExternalEventActivity2.Name = "nextHandleExternalEventActivity2";
            // 
            // wizzardFormActivity3
            // 
            this.wizzardFormActivity3.ContainerLabel = "Add new";
            this.wizzardFormActivity3.FormDefinitionFileName = "\\Administrative\\AddNewMethodBasedFunctionStep2.xml";
            this.wizzardFormActivity3.Name = "wizzardFormActivity3";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "finalStateActivity";
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
            // ifElseActivity2
            // 
            this.ifElseActivity2.Activities.Add(this.ifElseBranchActivity3);
            this.ifElseActivity2.Activities.Add(this.ifElseBranchActivity4);
            this.ifElseActivity2.Name = "ifElseActivity2";
            // 
            // nextHandleExternalEventActivity1
            // 
            this.nextHandleExternalEventActivity1.EventName = "Next";
            this.nextHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.nextHandleExternalEventActivity1.Name = "nextHandleExternalEventActivity1";
            // 
            // wizzardFormActivity1
            // 
            this.wizzardFormActivity1.ContainerLabel = "Add new";
            this.wizzardFormActivity1.FormDefinitionFileName = "\\Administrative\\AddNewMethodBasedFunctionStep1.xml";
            this.wizzardFormActivity1.Name = "wizzardFormActivity1";
            // 
            // setStateActivity1
            // 
            this.setStateActivity1.Name = "setStateActivity1";
            this.setStateActivity1.TargetStateName = "step1StateActivity";
            // 
            // initializeCodeActivity
            // 
            this.initializeCodeActivity.Name = "initializeCodeActivity";
            this.initializeCodeActivity.ExecuteCode += new System.EventHandler(this.initializeCodeActivity_ExecuteCode);
            // 
            // checkMethodNameStateInitializationActivity
            // 
            this.checkMethodNameStateInitializationActivity.Activities.Add(this.ifElseActivity1);
            this.checkMethodNameStateInitializationActivity.Name = "checkMethodNameStateInitializationActivity";
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity1
            // 
            this.cancelHandleExternalEventActivity1.EventName = "Cancel";
            this.cancelHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity1.Name = "cancelHandleExternalEventActivity1";
            // 
            // step3EventDrivenActivity_Cancel
            // 
            this.step3EventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity4);
            this.step3EventDrivenActivity_Cancel.Activities.Add(this.setStateActivity12);
            this.step3EventDrivenActivity_Cancel.Name = "step3EventDrivenActivity_Cancel";
            // 
            // step3EventDrivenActivity_Finish
            // 
            this.step3EventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity1);
            this.step3EventDrivenActivity_Finish.Activities.Add(this.setStateActivity4);
            this.step3EventDrivenActivity_Finish.Name = "step3EventDrivenActivity_Finish";
            // 
            // step3StateInitializationActivity
            // 
            this.step3StateInitializationActivity.Activities.Add(this.wizzardFormActivity2);
            this.step3StateInitializationActivity.Name = "step3StateInitializationActivity";
            // 
            // step2EventDrivenActivity_Cancel
            // 
            this.step2EventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity3);
            this.step2EventDrivenActivity_Cancel.Activities.Add(this.setStateActivity11);
            this.step2EventDrivenActivity_Cancel.Name = "step2EventDrivenActivity_Cancel";
            // 
            // step2EventDrivenActivity_Next
            // 
            this.step2EventDrivenActivity_Next.Activities.Add(this.nextHandleExternalEventActivity2);
            this.step2EventDrivenActivity_Next.Activities.Add(this.step2CodeActivity);
            this.step2EventDrivenActivity_Next.Activities.Add(this.setStateActivity10);
            this.step2EventDrivenActivity_Next.Name = "step2EventDrivenActivity_Next";
            // 
            // step2StateInitializationActivity
            // 
            this.step2StateInitializationActivity.Activities.Add(this.wizzardFormActivity3);
            this.step2StateInitializationActivity.Name = "step2StateInitializationActivity";
            // 
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.finalizeCodeActivity);
            this.finalizeStateInitializationActivity.Activities.Add(this.closeCurrentViewActivity1);
            this.finalizeStateInitializationActivity.Activities.Add(this.setStateActivity3);
            this.finalizeStateInitializationActivity.Name = "finalizeStateInitializationActivity";
            // 
            // step1EventDrivenActivity_Cancel
            // 
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.setStateActivity8);
            this.step1EventDrivenActivity_Cancel.Name = "step1EventDrivenActivity_Cancel";
            // 
            // step1EventDrivenActivity_Next
            // 
            this.step1EventDrivenActivity_Next.Activities.Add(this.nextHandleExternalEventActivity1);
            this.step1EventDrivenActivity_Next.Activities.Add(this.ifElseActivity2);
            this.step1EventDrivenActivity_Next.Name = "step1EventDrivenActivity_Next";
            // 
            // step1StateInitializationActivity
            // 
            this.step1StateInitializationActivity.Activities.Add(this.wizzardFormActivity1);
            this.step1StateInitializationActivity.Name = "step1StateInitializationActivity";
            // 
            // initalizeStateInitializationActivity
            // 
            this.initalizeStateInitializationActivity.Activities.Add(this.initializeCodeActivity);
            this.initalizeStateInitializationActivity.Activities.Add(this.setStateActivity1);
            this.initalizeStateInitializationActivity.Name = "initalizeStateInitializationActivity";
            // 
            // checkMethodNameStateActivity
            // 
            this.checkMethodNameStateActivity.Activities.Add(this.checkMethodNameStateInitializationActivity);
            this.checkMethodNameStateActivity.Name = "checkMethodNameStateActivity";
            // 
            // eventDrivenActivity_GlobalCancel
            // 
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.cancelHandleExternalEventActivity1);
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.setStateActivity6);
            this.eventDrivenActivity_GlobalCancel.Name = "eventDrivenActivity_GlobalCancel";
            // 
            // step3StateActivity
            // 
            this.step3StateActivity.Activities.Add(this.step3StateInitializationActivity);
            this.step3StateActivity.Activities.Add(this.step3EventDrivenActivity_Finish);
            this.step3StateActivity.Activities.Add(this.step3EventDrivenActivity_Cancel);
            this.step3StateActivity.Name = "step3StateActivity";
            // 
            // step2StateActivity
            // 
            this.step2StateActivity.Activities.Add(this.step2StateInitializationActivity);
            this.step2StateActivity.Activities.Add(this.step2EventDrivenActivity_Next);
            this.step2StateActivity.Activities.Add(this.step2EventDrivenActivity_Cancel);
            this.step2StateActivity.Name = "step2StateActivity";
            // 
            // finalStateActivity
            // 
            this.finalStateActivity.Name = "finalStateActivity";
            // 
            // finalizeStateActivity
            // 
            this.finalizeStateActivity.Activities.Add(this.finalizeStateInitializationActivity);
            this.finalizeStateActivity.Name = "finalizeStateActivity";
            // 
            // step1StateActivity
            // 
            this.step1StateActivity.Activities.Add(this.step1StateInitializationActivity);
            this.step1StateActivity.Activities.Add(this.step1EventDrivenActivity_Next);
            this.step1StateActivity.Activities.Add(this.step1EventDrivenActivity_Cancel);
            this.step1StateActivity.Name = "step1StateActivity";
            // 
            // initializeStateActivity
            // 
            this.initializeStateActivity.Activities.Add(this.initalizeStateInitializationActivity);
            this.initializeStateActivity.Name = "initializeStateActivity";
            // 
            // AddNewMethodBasedFunctionWorkflow
            // 
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.step1StateActivity);
            this.Activities.Add(this.finalizeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.step2StateActivity);
            this.Activities.Add(this.step3StateActivity);
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.checkMethodNameStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "AddNewMethodBasedFunctionWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private SetStateActivity setStateActivity3;
        private Composite.C1Console.Workflow.Activities.CloseCurrentViewActivity closeCurrentViewActivity1;
        private Composite.C1Console.Workflow.Activities.WizardFormActivity wizzardFormActivity1;
        private SetStateActivity setStateActivity1;
        private StateInitializationActivity finalizeStateInitializationActivity;
        private StateInitializationActivity step1StateInitializationActivity;
        private StateInitializationActivity initalizeStateInitializationActivity;
        private StateActivity finalStateActivity;
        private StateActivity finalizeStateActivity;
        private StateActivity step1StateActivity;
        private CodeActivity initializeCodeActivity;
        private CodeActivity finalizeCodeActivity;
        private SetStateActivity setStateActivity2;
        private Composite.C1Console.Workflow.Activities.NextHandleExternalEventActivity nextHandleExternalEventActivity1;
        private StateInitializationActivity step2StateInitializationActivity;
        private EventDrivenActivity step1EventDrivenActivity_Next;
        private StateActivity step2StateActivity;
        private Composite.C1Console.Workflow.Activities.WizardFormActivity wizzardFormActivity2;
        private Composite.C1Console.Workflow.Activities.NextHandleExternalEventActivity nextHandleExternalEventActivity2;
        private Composite.C1Console.Workflow.Activities.WizardFormActivity wizzardFormActivity3;
        private EventDrivenActivity step3EventDrivenActivity_Finish;
        private StateInitializationActivity step3StateInitializationActivity;
        private EventDrivenActivity step2EventDrivenActivity_Next;
        private StateActivity step3StateActivity;
        private SetStateActivity setStateActivity7;
        private IfElseBranchActivity ifElseBranchActivity4;
        private IfElseBranchActivity ifElseBranchActivity3;
        private IfElseActivity ifElseActivity2;
        private CodeActivity step2CodeActivity;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;
        private SetStateActivity setStateActivity6;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private IfElseActivity ifElseActivity1;
        private SetStateActivity setStateActivity4;
        private Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;
        private StateInitializationActivity checkMethodNameStateInitializationActivity;
        private StateActivity checkMethodNameStateActivity;
        private SetStateActivity setStateActivity9;
        private SetStateActivity setStateActivity5;
        private SetStateActivity setStateActivity10;
        private EventDrivenActivity step3EventDrivenActivity_Cancel;
        private EventDrivenActivity step2EventDrivenActivity_Cancel;
        private EventDrivenActivity step1EventDrivenActivity_Cancel;
        private SetStateActivity setStateActivity12;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity4;
        private SetStateActivity setStateActivity11;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity3;
        private SetStateActivity setStateActivity8;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;
        private StateActivity initializeStateActivity;











































    }
}
