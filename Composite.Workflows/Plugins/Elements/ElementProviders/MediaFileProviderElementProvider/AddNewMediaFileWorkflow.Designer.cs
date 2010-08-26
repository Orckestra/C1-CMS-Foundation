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

namespace Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider
{
    partial class AddNewMediaFileWorkflow
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
            this.setStateActivity12 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity11 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity7 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity10 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity8 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity6 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity5 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity4 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity3 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.finalizeCodeActivity_Finalize = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity3 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.step2IfElseActivity_ValidateStep2Bindings = new System.Workflow.Activities.IfElseActivity();
            this.finishHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.setStateActivity9 = new System.Workflow.Activities.SetStateActivity();
            this.previousHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.PreviousHandleExternalEventActivity();
            this.wizardFormActivity2 = new Composite.C1Console.Workflow.Activities.WizardFormActivity();
            this.step2CodeActivity_UpdateBindings = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.step1IfElseActivity_Finish_ValidateStep1Bindings = new System.Workflow.Activities.IfElseActivity();
            this.finishHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.step1IfElseActivity_Next_ValidateStep1Bindings = new System.Workflow.Activities.IfElseActivity();
            this.nextHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.NextHandleExternalEventActivity();
            this.wizardFormActivity1 = new Composite.C1Console.Workflow.Activities.WizardFormActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.initializeCodeActivity_InitializeBindings = new System.Workflow.Activities.CodeActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step2EventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step2EventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.step2EventDrivenActivity_Previous = new System.Workflow.Activities.EventDrivenActivity();
            this.step2StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step1EventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step1EventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.stepEventDrivenActivity_Next = new System.Workflow.Activities.EventDrivenActivity();
            this.step1StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.finalizeStateActivity = new System.Workflow.Activities.StateActivity();
            this.step2StateActivity = new System.Workflow.Activities.StateActivity();
            this.step1StateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // setStateActivity12
            // 
            this.setStateActivity12.Name = "setStateActivity12";
            this.setStateActivity12.TargetStateName = "step2StateActivity";
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "finalizeStateActivity";
            // 
            // setStateActivity11
            // 
            this.setStateActivity11.Name = "setStateActivity11";
            this.setStateActivity11.TargetStateName = "step1StateActivity";
            // 
            // setStateActivity7
            // 
            this.setStateActivity7.Name = "setStateActivity7";
            this.setStateActivity7.TargetStateName = "finalizeStateActivity";
            // 
            // setStateActivity10
            // 
            this.setStateActivity10.Name = "setStateActivity10";
            this.setStateActivity10.TargetStateName = "step1StateActivity";
            // 
            // setStateActivity8
            // 
            this.setStateActivity8.Name = "setStateActivity8";
            this.setStateActivity8.TargetStateName = "step2StateActivity";
            // 
            // ifElseBranchActivity6
            // 
            this.ifElseBranchActivity6.Activities.Add(this.setStateActivity12);
            this.ifElseBranchActivity6.Name = "ifElseBranchActivity6";
            // 
            // ifElseBranchActivity5
            // 
            this.ifElseBranchActivity5.Activities.Add(this.setStateActivity4);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.ValidateStep2Bindings);
            this.ifElseBranchActivity5.Condition = codecondition1;
            this.ifElseBranchActivity5.Description = "ValidateStep2Bindings";
            this.ifElseBranchActivity5.Name = "ifElseBranchActivity5";
            // 
            // ifElseBranchActivity4
            // 
            this.ifElseBranchActivity4.Activities.Add(this.setStateActivity11);
            this.ifElseBranchActivity4.Name = "ifElseBranchActivity4";
            // 
            // ifElseBranchActivity3
            // 
            this.ifElseBranchActivity3.Activities.Add(this.setStateActivity7);
            codecondition2.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.ValidateStep1Bindings_Finish);
            this.ifElseBranchActivity3.Condition = codecondition2;
            this.ifElseBranchActivity3.Name = "ifElseBranchActivity3";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity10);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.setStateActivity8);
            codecondition3.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.ValidateStep1Bindings_Next);
            this.ifElseBranchActivity1.Condition = codecondition3;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "finalStateActivity";
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
            // cancelHandleExternalEventActivity3
            // 
            this.cancelHandleExternalEventActivity3.EventName = "Cancel";
            this.cancelHandleExternalEventActivity3.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity3.Name = "cancelHandleExternalEventActivity3";
            // 
            // step2IfElseActivity_ValidateStep2Bindings
            // 
            this.step2IfElseActivity_ValidateStep2Bindings.Activities.Add(this.ifElseBranchActivity5);
            this.step2IfElseActivity_ValidateStep2Bindings.Activities.Add(this.ifElseBranchActivity6);
            this.step2IfElseActivity_ValidateStep2Bindings.Name = "step2IfElseActivity_ValidateStep2Bindings";
            // 
            // finishHandleExternalEventActivity2
            // 
            this.finishHandleExternalEventActivity2.EventName = "Finish";
            this.finishHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity2.Name = "finishHandleExternalEventActivity2";
            // 
            // setStateActivity9
            // 
            this.setStateActivity9.Name = "setStateActivity9";
            this.setStateActivity9.TargetStateName = "step1StateActivity";
            // 
            // previousHandleExternalEventActivity1
            // 
            this.previousHandleExternalEventActivity1.EventName = "Previous";
            this.previousHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.previousHandleExternalEventActivity1.Name = "previousHandleExternalEventActivity1";
            // 
            // wizardFormActivity2
            // 
            this.wizardFormActivity2.ContainerLabel = null;
            this.wizardFormActivity2.FormDefinitionFileName = "/Administrative/AddMediaFileStep2.xml";
            this.wizardFormActivity2.Name = "wizardFormActivity2";
            // 
            // step2CodeActivity_UpdateBindings
            // 
            this.step2CodeActivity_UpdateBindings.Name = "step2CodeActivity_UpdateBindings";
            this.step2CodeActivity_UpdateBindings.ExecuteCode += new System.EventHandler(this.step2CodeActivity_UpdateBindings_ExecuteCode);
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity2
            // 
            this.cancelHandleExternalEventActivity2.EventName = "Cancel";
            this.cancelHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity2.Name = "cancelHandleExternalEventActivity2";
            // 
            // step1IfElseActivity_Finish_ValidateStep1Bindings
            // 
            this.step1IfElseActivity_Finish_ValidateStep1Bindings.Activities.Add(this.ifElseBranchActivity3);
            this.step1IfElseActivity_Finish_ValidateStep1Bindings.Activities.Add(this.ifElseBranchActivity4);
            this.step1IfElseActivity_Finish_ValidateStep1Bindings.Name = "step1IfElseActivity_Finish_ValidateStep1Bindings";
            // 
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // step1IfElseActivity_Next_ValidateStep1Bindings
            // 
            this.step1IfElseActivity_Next_ValidateStep1Bindings.Activities.Add(this.ifElseBranchActivity1);
            this.step1IfElseActivity_Next_ValidateStep1Bindings.Activities.Add(this.ifElseBranchActivity2);
            this.step1IfElseActivity_Next_ValidateStep1Bindings.Name = "step1IfElseActivity_Next_ValidateStep1Bindings";
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
            this.wizardFormActivity1.FormDefinitionFileName = "/Administrative/AddMediaFileStep1.xml";
            this.wizardFormActivity1.Name = "wizardFormActivity1";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "step1StateActivity";
            // 
            // initializeCodeActivity_InitializeBindings
            // 
            this.initializeCodeActivity_InitializeBindings.Name = "initializeCodeActivity_InitializeBindings";
            this.initializeCodeActivity_InitializeBindings.ExecuteCode += new System.EventHandler(this.initializeCodeActivity_InitializeBindings_ExecuteCode);
            // 
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.finalizeCodeActivity_Finalize);
            this.finalizeStateInitializationActivity.Activities.Add(this.setStateActivity3);
            this.finalizeStateInitializationActivity.Name = "finalizeStateInitializationActivity";
            // 
            // step2EventDrivenActivity_Cancel
            // 
            this.step2EventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity3);
            this.step2EventDrivenActivity_Cancel.Activities.Add(this.setStateActivity5);
            this.step2EventDrivenActivity_Cancel.Name = "step2EventDrivenActivity_Cancel";
            // 
            // step2EventDrivenActivity_Finish
            // 
            this.step2EventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity2);
            this.step2EventDrivenActivity_Finish.Activities.Add(this.step2IfElseActivity_ValidateStep2Bindings);
            this.step2EventDrivenActivity_Finish.Name = "step2EventDrivenActivity_Finish";
            // 
            // step2EventDrivenActivity_Previous
            // 
            this.step2EventDrivenActivity_Previous.Activities.Add(this.previousHandleExternalEventActivity1);
            this.step2EventDrivenActivity_Previous.Activities.Add(this.setStateActivity9);
            this.step2EventDrivenActivity_Previous.Name = "step2EventDrivenActivity_Previous";
            // 
            // step2StateInitializationActivity
            // 
            this.step2StateInitializationActivity.Activities.Add(this.step2CodeActivity_UpdateBindings);
            this.step2StateInitializationActivity.Activities.Add(this.wizardFormActivity2);
            this.step2StateInitializationActivity.Name = "step2StateInitializationActivity";
            // 
            // step1EventDrivenActivity_Cancel
            // 
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.setStateActivity6);
            this.step1EventDrivenActivity_Cancel.Name = "step1EventDrivenActivity_Cancel";
            // 
            // step1EventDrivenActivity_Finish
            // 
            this.step1EventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity1);
            this.step1EventDrivenActivity_Finish.Activities.Add(this.step1IfElseActivity_Finish_ValidateStep1Bindings);
            this.step1EventDrivenActivity_Finish.Name = "step1EventDrivenActivity_Finish";
            // 
            // stepEventDrivenActivity_Next
            // 
            this.stepEventDrivenActivity_Next.Activities.Add(this.nextHandleExternalEventActivity1);
            this.stepEventDrivenActivity_Next.Activities.Add(this.step1IfElseActivity_Next_ValidateStep1Bindings);
            this.stepEventDrivenActivity_Next.Name = "stepEventDrivenActivity_Next";
            // 
            // step1StateInitializationActivity
            // 
            this.step1StateInitializationActivity.Activities.Add(this.wizardFormActivity1);
            this.step1StateInitializationActivity.Name = "step1StateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.initializeCodeActivity_InitializeBindings);
            this.initializeStateInitializationActivity.Activities.Add(this.setStateActivity2);
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
            // finalizeStateActivity
            // 
            this.finalizeStateActivity.Activities.Add(this.finalizeStateInitializationActivity);
            this.finalizeStateActivity.Name = "finalizeStateActivity";
            // 
            // step2StateActivity
            // 
            this.step2StateActivity.Activities.Add(this.step2StateInitializationActivity);
            this.step2StateActivity.Activities.Add(this.step2EventDrivenActivity_Previous);
            this.step2StateActivity.Activities.Add(this.step2EventDrivenActivity_Finish);
            this.step2StateActivity.Activities.Add(this.step2EventDrivenActivity_Cancel);
            this.step2StateActivity.Name = "step2StateActivity";
            // 
            // step1StateActivity
            // 
            this.step1StateActivity.Activities.Add(this.step1StateInitializationActivity);
            this.step1StateActivity.Activities.Add(this.stepEventDrivenActivity_Next);
            this.step1StateActivity.Activities.Add(this.step1EventDrivenActivity_Finish);
            this.step1StateActivity.Activities.Add(this.step1EventDrivenActivity_Cancel);
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
            // AddNewMediaFileWorkflow
            // 
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.step1StateActivity);
            this.Activities.Add(this.step2StateActivity);
            this.Activities.Add(this.finalizeStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "AddNewMediaFileWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private CodeActivity step2CodeActivity_UpdateBindings;

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;

        private StateInitializationActivity initializeStateInitializationActivity;

        private SetStateActivity setStateActivity1;

        private StateActivity finalStateActivity;

        private StateActivity initializeStateActivity;

        private SetStateActivity setStateActivity3;

        private SetStateActivity setStateActivity5;

        private SetStateActivity setStateActivity4;

        private SetStateActivity setStateActivity9;

        private SetStateActivity setStateActivity6;

        private SetStateActivity setStateActivity7;

        private SetStateActivity setStateActivity8;

        private SetStateActivity setStateActivity2;

        private CodeActivity initializeCodeActivity_InitializeBindings;

        private StateInitializationActivity finalizeStateInitializationActivity;

        private EventDrivenActivity step2EventDrivenActivity_Cancel;

        private EventDrivenActivity step2EventDrivenActivity_Finish;

        private EventDrivenActivity step2EventDrivenActivity_Previous;

        private StateInitializationActivity step2StateInitializationActivity;

        private EventDrivenActivity step1EventDrivenActivity_Cancel;

        private EventDrivenActivity step1EventDrivenActivity_Finish;

        private EventDrivenActivity stepEventDrivenActivity_Next;

        private StateInitializationActivity step1StateInitializationActivity;

        private StateActivity finalizeStateActivity;

        private StateActivity step2StateActivity;

        private StateActivity step1StateActivity;

        private IfElseBranchActivity ifElseBranchActivity2;

        private IfElseBranchActivity ifElseBranchActivity1;

        private IfElseActivity step1IfElseActivity_Next_ValidateStep1Bindings;

        private C1Console.Workflow.Activities.NextHandleExternalEventActivity nextHandleExternalEventActivity1;

        private SetStateActivity setStateActivity12;

        private SetStateActivity setStateActivity11;

        private SetStateActivity setStateActivity10;

        private IfElseBranchActivity ifElseBranchActivity6;

        private IfElseBranchActivity ifElseBranchActivity5;

        private IfElseBranchActivity ifElseBranchActivity4;

        private IfElseBranchActivity ifElseBranchActivity3;

        private IfElseActivity step2IfElseActivity_ValidateStep2Bindings;

        private C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity2;

        private C1Console.Workflow.Activities.PreviousHandleExternalEventActivity previousHandleExternalEventActivity1;

        private C1Console.Workflow.Activities.WizardFormActivity wizardFormActivity2;

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;

        private IfElseActivity step1IfElseActivity_Finish_ValidateStep1Bindings;

        private C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;

        private C1Console.Workflow.Activities.WizardFormActivity wizardFormActivity1;

        private CodeActivity finalizeCodeActivity_Finalize;

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity3;

        private EventDrivenActivity eventDrivenActivity_GlobalCancel;














































































































    }
}
