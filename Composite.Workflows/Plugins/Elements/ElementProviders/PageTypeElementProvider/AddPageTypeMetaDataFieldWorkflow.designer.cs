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

namespace Composite.Plugins.Elements.ElementProviders.PageTypeElementProvider
{
    partial class AddPageTypeMetaDataFieldWorkflow
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
            this.setStateActivity11 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity12 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity10 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity9 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity4 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity3 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity6 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity5 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity7 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity4 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity8 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.step2CodeActivity_ShowWizzard = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.finalizeCodeActivity_Finalize = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity3 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.step1ifElseActivity_Finish_ValidateMetaDataName = new System.Workflow.Activities.IfElseActivity();
            this.finishHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.step1WizardFormActivity_Finish = new Composite.C1Console.Workflow.Activities.WizardFormActivity();
            this.wizardFormActivity1 = new Composite.C1Console.Workflow.Activities.WizardFormActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.step1IfElseActivity_ValidateMetaDataName = new System.Workflow.Activities.IfElseActivity();
            this.nextHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.NextHandleExternalEventActivity();
            this.ifElseActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.initializeCodeActivity_UpdateBindings = new System.Workflow.Activities.CodeActivity();
            this.step2EventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step2EventDrivenActivity_Finsih = new System.Workflow.Activities.EventDrivenActivity();
            this.step2StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step1EventDrivenActivity_Finish_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step1EventDrivenActivity_Finish_Finsih = new System.Workflow.Activities.EventDrivenActivity();
            this.step1StateInitializationActivity_Finish = new System.Workflow.Activities.StateInitializationActivity();
            this.step1StateInitializationActivity_Next = new System.Workflow.Activities.StateInitializationActivity();
            this.step1EventDrivenActivity_Next_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step1EventDrivenActivity_Next_Next = new System.Workflow.Activities.EventDrivenActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.step2StateActivity = new System.Workflow.Activities.StateActivity();
            this.finalizeStateActivity = new System.Workflow.Activities.StateActivity();
            this.step1StateActivity_Finish = new System.Workflow.Activities.StateActivity();
            this.step1StateActivity_Next = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // setStateActivity11
            // 
            this.setStateActivity11.Name = "setStateActivity11";
            this.setStateActivity11.TargetStateName = "step1StateActivity_Finish";
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "finalizeStateActivity";
            // 
            // setStateActivity12
            // 
            this.setStateActivity12.Name = "setStateActivity12";
            this.setStateActivity12.TargetStateName = "step1StateActivity_Next";
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "step2StateActivity";
            // 
            // setStateActivity10
            // 
            this.setStateActivity10.Name = "setStateActivity10";
            this.setStateActivity10.TargetStateName = "step1StateActivity_Finish";
            // 
            // setStateActivity9
            // 
            this.setStateActivity9.Name = "setStateActivity9";
            this.setStateActivity9.TargetStateName = "step1StateActivity_Next";
            // 
            // ifElseBranchActivity4
            // 
            this.ifElseBranchActivity4.Activities.Add(this.setStateActivity11);
            this.ifElseBranchActivity4.Name = "ifElseBranchActivity4";
            // 
            // ifElseBranchActivity3
            // 
            this.ifElseBranchActivity3.Activities.Add(this.setStateActivity4);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.ValidateMetaDataName);
            this.ifElseBranchActivity3.Condition = codecondition1;
            this.ifElseBranchActivity3.Name = "ifElseBranchActivity3";
            // 
            // ifElseBranchActivity6
            // 
            this.ifElseBranchActivity6.Activities.Add(this.setStateActivity12);
            this.ifElseBranchActivity6.Name = "ifElseBranchActivity6";
            // 
            // ifElseBranchActivity5
            // 
            this.ifElseBranchActivity5.Activities.Add(this.setStateActivity6);
            codecondition2.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.ValidateMetaDataName);
            this.ifElseBranchActivity5.Condition = codecondition2;
            this.ifElseBranchActivity5.Name = "ifElseBranchActivity5";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity10);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.setStateActivity9);
            codecondition3.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.PagesUsingPageTypeExists);
            this.ifElseBranchActivity1.Condition = codecondition3;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // setStateActivity7
            // 
            this.setStateActivity7.Name = "setStateActivity7";
            this.setStateActivity7.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity4
            // 
            this.cancelHandleExternalEventActivity4.EventName = "Cancel";
            this.cancelHandleExternalEventActivity4.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity4.Name = "cancelHandleExternalEventActivity4";
            // 
            // setStateActivity8
            // 
            this.setStateActivity8.Name = "setStateActivity8";
            this.setStateActivity8.TargetStateName = "finalizeStateActivity";
            // 
            // finishHandleExternalEventActivity2
            // 
            this.finishHandleExternalEventActivity2.EventName = "Finish";
            this.finishHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity2.Name = "finishHandleExternalEventActivity2";
            // 
            // step2CodeActivity_ShowWizzard
            // 
            this.step2CodeActivity_ShowWizzard.Name = "step2CodeActivity_ShowWizzard";
            this.step2CodeActivity_ShowWizzard.ExecuteCode += new System.EventHandler(this.step2CodeActivity_ShowWizzard_ExecuteCode);
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "finalStateActivity";
            // 
            // finalizeCodeActivity_Finalize
            // 
            this.finalizeCodeActivity_Finalize.Name = "finalizeCodeActivity_Finalize";
            this.finalizeCodeActivity_Finalize.ExecuteCode += new System.EventHandler(this.finalizeCodeActivity_Finalize_ExecuteCode);
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity3
            // 
            this.cancelHandleExternalEventActivity3.EventName = "Cancel";
            this.cancelHandleExternalEventActivity3.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity3.Name = "cancelHandleExternalEventActivity3";
            // 
            // step1ifElseActivity_Finish_ValidateMetaDataName
            // 
            this.step1ifElseActivity_Finish_ValidateMetaDataName.Activities.Add(this.ifElseBranchActivity3);
            this.step1ifElseActivity_Finish_ValidateMetaDataName.Activities.Add(this.ifElseBranchActivity4);
            this.step1ifElseActivity_Finish_ValidateMetaDataName.Name = "step1ifElseActivity_Finish_ValidateMetaDataName";
            // 
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // step1WizardFormActivity_Finish
            // 
            this.step1WizardFormActivity_Finish.ContainerLabel = null;
            this.step1WizardFormActivity_Finish.FormDefinitionFileName = "/Administrative/PageTypeAddPageTypeMetaDataFieldStep1.xml";
            this.step1WizardFormActivity_Finish.Name = "step1WizardFormActivity_Finish";
            // 
            // wizardFormActivity1
            // 
            this.wizardFormActivity1.ContainerLabel = null;
            this.wizardFormActivity1.FormDefinitionFileName = "/Administrative/PageTypeAddPageTypeMetaDataFieldStep1.xml";
            this.wizardFormActivity1.Name = "wizardFormActivity1";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity2
            // 
            this.cancelHandleExternalEventActivity2.EventName = "Cancel";
            this.cancelHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity2.Name = "cancelHandleExternalEventActivity2";
            // 
            // step1IfElseActivity_ValidateMetaDataName
            // 
            this.step1IfElseActivity_ValidateMetaDataName.Activities.Add(this.ifElseBranchActivity5);
            this.step1IfElseActivity_ValidateMetaDataName.Activities.Add(this.ifElseBranchActivity6);
            this.step1IfElseActivity_ValidateMetaDataName.Name = "step1IfElseActivity_ValidateMetaDataName";
            // 
            // nextHandleExternalEventActivity1
            // 
            this.nextHandleExternalEventActivity1.EventName = "Next";
            this.nextHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.nextHandleExternalEventActivity1.Name = "nextHandleExternalEventActivity1";
            // 
            // ifElseActivity1
            // 
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity1);
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity2);
            this.ifElseActivity1.Name = "ifElseActivity1";
            // 
            // initializeCodeActivity_UpdateBindings
            // 
            this.initializeCodeActivity_UpdateBindings.Name = "initializeCodeActivity_UpdateBindings";
            this.initializeCodeActivity_UpdateBindings.ExecuteCode += new System.EventHandler(this.initializeCodeActivity_UpdateBindings_ExecuteCode);
            // 
            // step2EventDrivenActivity_Cancel
            // 
            this.step2EventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity4);
            this.step2EventDrivenActivity_Cancel.Activities.Add(this.setStateActivity7);
            this.step2EventDrivenActivity_Cancel.Name = "step2EventDrivenActivity_Cancel";
            // 
            // step2EventDrivenActivity_Finsih
            // 
            this.step2EventDrivenActivity_Finsih.Activities.Add(this.finishHandleExternalEventActivity2);
            this.step2EventDrivenActivity_Finsih.Activities.Add(this.setStateActivity8);
            this.step2EventDrivenActivity_Finsih.Name = "step2EventDrivenActivity_Finsih";
            // 
            // step2StateInitializationActivity
            // 
            this.step2StateInitializationActivity.Activities.Add(this.step2CodeActivity_ShowWizzard);
            this.step2StateInitializationActivity.Name = "step2StateInitializationActivity";
            // 
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.finalizeCodeActivity_Finalize);
            this.finalizeStateInitializationActivity.Activities.Add(this.setStateActivity5);
            this.finalizeStateInitializationActivity.Name = "finalizeStateInitializationActivity";
            // 
            // step1EventDrivenActivity_Finish_Cancel
            // 
            this.step1EventDrivenActivity_Finish_Cancel.Activities.Add(this.cancelHandleExternalEventActivity3);
            this.step1EventDrivenActivity_Finish_Cancel.Activities.Add(this.setStateActivity2);
            this.step1EventDrivenActivity_Finish_Cancel.Name = "step1EventDrivenActivity_Finish_Cancel";
            // 
            // step1EventDrivenActivity_Finish_Finsih
            // 
            this.step1EventDrivenActivity_Finish_Finsih.Activities.Add(this.finishHandleExternalEventActivity1);
            this.step1EventDrivenActivity_Finish_Finsih.Activities.Add(this.step1ifElseActivity_Finish_ValidateMetaDataName);
            this.step1EventDrivenActivity_Finish_Finsih.Name = "step1EventDrivenActivity_Finish_Finsih";
            // 
            // step1StateInitializationActivity_Finish
            // 
            this.step1StateInitializationActivity_Finish.Activities.Add(this.step1WizardFormActivity_Finish);
            this.step1StateInitializationActivity_Finish.Name = "step1StateInitializationActivity_Finish";
            // 
            // step1StateInitializationActivity_Next
            // 
            this.step1StateInitializationActivity_Next.Activities.Add(this.wizardFormActivity1);
            this.step1StateInitializationActivity_Next.Name = "step1StateInitializationActivity_Next";
            // 
            // step1EventDrivenActivity_Next_Cancel
            // 
            this.step1EventDrivenActivity_Next_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.step1EventDrivenActivity_Next_Cancel.Activities.Add(this.setStateActivity3);
            this.step1EventDrivenActivity_Next_Cancel.Name = "step1EventDrivenActivity_Next_Cancel";
            // 
            // step1EventDrivenActivity_Next_Next
            // 
            this.step1EventDrivenActivity_Next_Next.Activities.Add(this.nextHandleExternalEventActivity1);
            this.step1EventDrivenActivity_Next_Next.Activities.Add(this.step1IfElseActivity_ValidateMetaDataName);
            this.step1EventDrivenActivity_Next_Next.Name = "step1EventDrivenActivity_Next_Next";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.initializeCodeActivity_UpdateBindings);
            this.initializeStateInitializationActivity.Activities.Add(this.ifElseActivity1);
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
            // step2StateActivity
            // 
            this.step2StateActivity.Activities.Add(this.step2StateInitializationActivity);
            this.step2StateActivity.Activities.Add(this.step2EventDrivenActivity_Finsih);
            this.step2StateActivity.Activities.Add(this.step2EventDrivenActivity_Cancel);
            this.step2StateActivity.Name = "step2StateActivity";
            // 
            // finalizeStateActivity
            // 
            this.finalizeStateActivity.Activities.Add(this.finalizeStateInitializationActivity);
            this.finalizeStateActivity.Name = "finalizeStateActivity";
            // 
            // step1StateActivity_Finish
            // 
            this.step1StateActivity_Finish.Activities.Add(this.step1StateInitializationActivity_Finish);
            this.step1StateActivity_Finish.Activities.Add(this.step1EventDrivenActivity_Finish_Finsih);
            this.step1StateActivity_Finish.Activities.Add(this.step1EventDrivenActivity_Finish_Cancel);
            this.step1StateActivity_Finish.Name = "step1StateActivity_Finish";
            // 
            // step1StateActivity_Next
            // 
            this.step1StateActivity_Next.Activities.Add(this.step1EventDrivenActivity_Next_Next);
            this.step1StateActivity_Next.Activities.Add(this.step1EventDrivenActivity_Next_Cancel);
            this.step1StateActivity_Next.Activities.Add(this.step1StateInitializationActivity_Next);
            this.step1StateActivity_Next.Name = "step1StateActivity_Next";
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
            // AddPageTypeMetaDataFieldWorkflow
            // 
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.step1StateActivity_Next);
            this.Activities.Add(this.step1StateActivity_Finish);
            this.Activities.Add(this.finalizeStateActivity);
            this.Activities.Add(this.step2StateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "AddPageTypeMetaDataFieldWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateInitializationActivity initializeStateInitializationActivity;
        private SetStateActivity setStateActivity1;
        private StateActivity finalStateActivity;
        private StateActivity initializeStateActivity;
        private SetStateActivity setStateActivity3;
        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;
        private C1Console.Workflow.Activities.NextHandleExternalEventActivity nextHandleExternalEventActivity1;
        private CodeActivity initializeCodeActivity_UpdateBindings;
        private EventDrivenActivity step1EventDrivenActivity_Next_Cancel;
        private EventDrivenActivity step1EventDrivenActivity_Next_Next;
        private StateActivity step1StateActivity_Next;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private SetStateActivity setStateActivity7;
        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity4;
        private SetStateActivity setStateActivity8;
        private C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity2;
        private SetStateActivity setStateActivity5;
        private SetStateActivity setStateActivity2;
        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity3;
        private SetStateActivity setStateActivity4;
        private C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;
        private SetStateActivity setStateActivity6;
        private IfElseActivity ifElseActivity1;
        private EventDrivenActivity step2EventDrivenActivity_Cancel;
        private EventDrivenActivity step2EventDrivenActivity_Finsih;
        private StateInitializationActivity step2StateInitializationActivity;
        private StateInitializationActivity finalizeStateInitializationActivity;
        private EventDrivenActivity step1EventDrivenActivity_Finish_Cancel;
        private EventDrivenActivity step1EventDrivenActivity_Finish_Finsih;
        private StateInitializationActivity step1StateInitializationActivity_Finish;
        private StateInitializationActivity step1StateInitializationActivity_Next;
        private StateActivity step2StateActivity;
        private StateActivity finalizeStateActivity;
        private StateActivity step1StateActivity_Finish;
        private SetStateActivity setStateActivity10;
        private SetStateActivity setStateActivity9;
        private C1Console.Workflow.Activities.WizardFormActivity step1WizardFormActivity_Finish;
        private IfElseBranchActivity ifElseBranchActivity4;
        private IfElseBranchActivity ifElseBranchActivity3;
        private IfElseActivity step1ifElseActivity_Finish_ValidateMetaDataName;
        private SetStateActivity setStateActivity11;
        private SetStateActivity setStateActivity12;
        private IfElseBranchActivity ifElseBranchActivity6;
        private IfElseBranchActivity ifElseBranchActivity5;
        private IfElseActivity step1IfElseActivity_ValidateMetaDataName;
        private C1Console.Workflow.Activities.WizardFormActivity wizardFormActivity1;
        private CodeActivity step2CodeActivity_ShowWizzard;
        private CodeActivity finalizeCodeActivity_Finalize;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;

















































































































    }
}
