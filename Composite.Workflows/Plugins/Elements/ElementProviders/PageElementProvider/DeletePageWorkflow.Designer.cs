using System;
using System.Workflow.Activities;

namespace Composite.Plugins.Elements.ElementProviders.PageElementProvider
{
    partial class DeletePageWorkflow
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
            System.Workflow.Activities.CodeCondition codecondition4 = new System.Workflow.Activities.CodeCondition();
            System.Workflow.Activities.CodeCondition codecondition5 = new System.Workflow.Activities.CodeCondition();
            this.setStateActivity16 = new System.Workflow.Activities.SetStateActivity();
            this.confirmDialogFormActivity2 = new Composite.C1Console.Workflow.Activities.ConfirmDialogFormActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.confirmDialogFormActivity1 = new Composite.C1Console.Workflow.Activities.ConfirmDialogFormActivity();
            this.wizzardFormActivity2 = new Composite.C1Console.Workflow.Activities.ConfirmDialogFormActivity();
            this.setStateActivity7 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity17 = new System.Workflow.Activities.SetStateActivity();
            this.wizzardFormActivity1 = new Composite.C1Console.Workflow.Activities.ConfirmDialogFormActivity();
            this.setStateActivity15 = new System.Workflow.Activities.SetStateActivity();
            this.caCheckChildren = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.initializeCodeActivity_ShowError_InstanceCompositions = new System.Workflow.Activities.CodeActivity();
            this.branch_HasSingleVersion = new System.Workflow.Activities.IfElseBranchActivity();
            this.branch_HasMultipleVersions = new System.Workflow.Activities.IfElseBranchActivity();
            this.branchRelatedDataDoesntExist = new System.Workflow.Activities.IfElseBranchActivity();
            this.branchRelatedDataExist = new System.Workflow.Activities.IfElseBranchActivity();
            this.branch_deletionNotConfirmed = new System.Workflow.Activities.IfElseBranchActivity();
            this.branch_DeletionConfirmed = new System.Workflow.Activities.IfElseBranchActivity();
            this.branch_NoSubpages = new System.Workflow.Activities.IfElseBranchActivity();
            this.branch_HasSubpages = new System.Workflow.Activities.IfElseBranchActivity();
            this.branchNoCompositions = new System.Workflow.Activities.IfElseBranchActivity();
            this.branchHasCompositions = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity14 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity5 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity10 = new System.Workflow.Activities.SetStateActivity();
            this.codeActivity_MultipleVersionsDeletionConfirmed = new System.Workflow.Activities.CodeActivity();
            this.finishHandleExternalEventActivity4 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.ifElse_HasMultipleVersions = new System.Workflow.Activities.IfElseActivity();
            this.setStateActivity12 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.setStateActivity13 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.conditionCheckRelatedData = new System.Workflow.Activities.IfElseActivity();
            this.setStateActivity11 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity3 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity2 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.ifElse_DeletionAlreadyConfirmed = new System.Workflow.Activities.IfElseActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.closeCurrentViewActivity1 = new Composite.C1Console.Workflow.Activities.CloseCurrentViewActivity();
            this.codeActivity2 = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity9 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity4 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.finishHandleExternalEventActivity3 = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.ifElse_HasSubpages = new System.Workflow.Activities.IfElseActivity();
            this.ifElse_HasInstanceCompositions = new System.Workflow.Activities.IfElseActivity();
            this.eventDrivenActivity2 = new System.Workflow.Activities.EventDrivenActivity();
            this.eventDrivenActivity1 = new System.Workflow.Activities.EventDrivenActivity();
            this.stateInitializationActivity2 = new System.Workflow.Activities.StateInitializationActivity();
            this.eventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.eventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.stateInitializationActivity1 = new System.Workflow.Activities.StateInitializationActivity();
            this.step2EventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step2EventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.step2StateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.finalizeInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.step1EventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.step1EventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.step1InitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.confirmDeletingAllVersionsStateActivity = new System.Workflow.Activities.StateActivity();
            this.confDeletingReferencedDataStateActivity = new System.Workflow.Activities.StateActivity();
            this.confirmationStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            this.finalizeStateActivity = new System.Workflow.Activities.StateActivity();
            this.confirmDeletingChildrenStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity16
            // 
            this.setStateActivity16.Name = "setStateActivity16";
            this.setStateActivity16.TargetStateName = "confirmDeletingChildrenStateActivity";
            // 
            // confirmDialogFormActivity2
            // 
            this.confirmDialogFormActivity2.ContainerLabel = "Delete page";
            this.confirmDialogFormActivity2.FormDefinitionFileName = "\\Administrative\\DeletePage_ConfirmAllVersionsDeletion.xml";
            this.confirmDialogFormActivity2.Name = "confirmDialogFormActivity2";
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "confirmationStateActivity";
            // 
            // confirmDialogFormActivity1
            // 
            this.confirmDialogFormActivity1.ContainerLabel = null;
            this.confirmDialogFormActivity1.FormDefinitionFileName = "\\Administrative\\DeletePageStep3.xml";
            this.confirmDialogFormActivity1.Name = "confirmDialogFormActivity1";
            // 
            // wizzardFormActivity2
            // 
            this.wizzardFormActivity2.ContainerLabel = null;
            this.wizzardFormActivity2.FormDefinitionFileName = "\\Administrative\\DeletePageStep2.xml";
            this.wizzardFormActivity2.Name = "wizzardFormActivity2";
            // 
            // setStateActivity7
            // 
            this.setStateActivity7.Name = "setStateActivity7";
            this.setStateActivity7.TargetStateName = "finalizeStateActivity";
            // 
            // setStateActivity17
            // 
            this.setStateActivity17.Name = "setStateActivity17";
            this.setStateActivity17.TargetStateName = "confDeletingReferencedDataStateActivity";
            // 
            // wizzardFormActivity1
            // 
            this.wizzardFormActivity1.ContainerLabel = "Delete page";
            this.wizzardFormActivity1.FormDefinitionFileName = "\\Administrative\\DeletePageStep1.xml";
            this.wizzardFormActivity1.Name = "wizzardFormActivity1";
            // 
            // setStateActivity15
            // 
            this.setStateActivity15.Name = "setStateActivity15";
            this.setStateActivity15.TargetStateName = "confirmDeletingAllVersionsStateActivity";
            // 
            // caCheckChildren
            // 
            this.caCheckChildren.Description = "Checking page children";
            this.caCheckChildren.Name = "caCheckChildren";
            this.caCheckChildren.ExecuteCode += new System.EventHandler(this.codeActivity1_ExecuteCode);
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "finalStateActivity";
            // 
            // initializeCodeActivity_ShowError_InstanceCompositions
            // 
            this.initializeCodeActivity_ShowError_InstanceCompositions.Name = "initializeCodeActivity_ShowError_InstanceCompositions";
            this.initializeCodeActivity_ShowError_InstanceCompositions.ExecuteCode += new System.EventHandler(this.initializeCodeActivity_ShowError_InstanceCompositions_ExecuteCode);
            // 
            // branch_HasSingleVersion
            // 
            this.branch_HasSingleVersion.Activities.Add(this.setStateActivity16);
            this.branch_HasSingleVersion.Name = "branch_HasSingleVersion";
            // 
            // branch_HasMultipleVersions
            // 
            this.branch_HasMultipleVersions.Activities.Add(this.confirmDialogFormActivity2);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.PageHasMultpleVersions);
            this.branch_HasMultipleVersions.Condition = codecondition1;
            this.branch_HasMultipleVersions.Name = "branch_HasMultipleVersions";
            // 
            // branchRelatedDataDoesntExist
            // 
            this.branchRelatedDataDoesntExist.Activities.Add(this.setStateActivity5);
            this.branchRelatedDataDoesntExist.Name = "branchRelatedDataDoesntExist";
            // 
            // branchRelatedDataExist
            // 
            this.branchRelatedDataExist.Activities.Add(this.confirmDialogFormActivity1);
            codecondition2.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.HasDataReferences);
            this.branchRelatedDataExist.Condition = codecondition2;
            this.branchRelatedDataExist.Name = "branchRelatedDataExist";
            // 
            // branch_deletionNotConfirmed
            // 
            this.branch_deletionNotConfirmed.Activities.Add(this.wizzardFormActivity2);
            this.branch_deletionNotConfirmed.Name = "branch_deletionNotConfirmed";
            // 
            // branch_DeletionConfirmed
            // 
            this.branch_DeletionConfirmed.Activities.Add(this.setStateActivity7);
            codecondition3.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.HasPageDeletionBeenConfirmed);
            this.branch_DeletionConfirmed.Condition = codecondition3;
            this.branch_DeletionConfirmed.Name = "branch_DeletionConfirmed";
            // 
            // branch_NoSubpages
            // 
            this.branch_NoSubpages.Activities.Add(this.setStateActivity17);
            this.branch_NoSubpages.Name = "branch_NoSubpages";
            // 
            // branch_HasSubpages
            // 
            this.branch_HasSubpages.Activities.Add(this.wizzardFormActivity1);
            codecondition4.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.HasSubpages);
            this.branch_HasSubpages.Condition = codecondition4;
            this.branch_HasSubpages.Name = "branch_HasSubpages";
            // 
            // branchNoCompositions
            // 
            this.branchNoCompositions.Activities.Add(this.caCheckChildren);
            this.branchNoCompositions.Activities.Add(this.setStateActivity15);
            this.branchNoCompositions.Name = "branchNoCompositions";
            // 
            // branchHasCompositions
            // 
            this.branchHasCompositions.Activities.Add(this.initializeCodeActivity_ShowError_InstanceCompositions);
            this.branchHasCompositions.Activities.Add(this.setStateActivity6);
            codecondition5.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.HasInstanceCompositionsTest);
            this.branchHasCompositions.Condition = codecondition5;
            this.branchHasCompositions.Name = "branchHasCompositions";
            // 
            // setStateActivity14
            // 
            this.setStateActivity14.Name = "setStateActivity14";
            this.setStateActivity14.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity5
            // 
            this.cancelHandleExternalEventActivity5.EventName = "Cancel";
            this.cancelHandleExternalEventActivity5.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity5.Name = "cancelHandleExternalEventActivity5";
            // 
            // setStateActivity10
            // 
            this.setStateActivity10.Name = "setStateActivity10";
            this.setStateActivity10.TargetStateName = "confirmDeletingChildrenStateActivity";
            // 
            // codeActivity_MultipleVersionsDeletionConfirmed
            // 
            this.codeActivity_MultipleVersionsDeletionConfirmed.Name = "codeActivity_MultipleVersionsDeletionConfirmed";
            this.codeActivity_MultipleVersionsDeletionConfirmed.ExecuteCode += new System.EventHandler(this.codeActivity_MultipleVersionsDeletionConfirmedExecute);
            // 
            // finishHandleExternalEventActivity4
            // 
            this.finishHandleExternalEventActivity4.EventName = "Finish";
            this.finishHandleExternalEventActivity4.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity4.Name = "finishHandleExternalEventActivity4";
            // 
            // ifElse_HasMultipleVersions
            // 
            this.ifElse_HasMultipleVersions.Activities.Add(this.branch_HasMultipleVersions);
            this.ifElse_HasMultipleVersions.Activities.Add(this.branch_HasSingleVersion);
            this.ifElse_HasMultipleVersions.Name = "ifElse_HasMultipleVersions";
            // 
            // setStateActivity12
            // 
            this.setStateActivity12.Name = "setStateActivity12";
            this.setStateActivity12.TargetStateName = "finalizeStateActivity";
            // 
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // setStateActivity13
            // 
            this.setStateActivity13.Name = "setStateActivity13";
            this.setStateActivity13.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity2
            // 
            this.cancelHandleExternalEventActivity2.EventName = "Cancel";
            this.cancelHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity2.Name = "cancelHandleExternalEventActivity2";
            // 
            // conditionCheckRelatedData
            // 
            this.conditionCheckRelatedData.Activities.Add(this.branchRelatedDataExist);
            this.conditionCheckRelatedData.Activities.Add(this.branchRelatedDataDoesntExist);
            this.conditionCheckRelatedData.Name = "conditionCheckRelatedData";
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
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "finalizeStateActivity";
            // 
            // finishHandleExternalEventActivity2
            // 
            this.finishHandleExternalEventActivity2.EventName = "Finish";
            this.finishHandleExternalEventActivity2.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity2.Name = "finishHandleExternalEventActivity2";
            // 
            // ifElse_DeletionAlreadyConfirmed
            // 
            this.ifElse_DeletionAlreadyConfirmed.Activities.Add(this.branch_DeletionConfirmed);
            this.ifElse_DeletionAlreadyConfirmed.Activities.Add(this.branch_deletionNotConfirmed);
            this.ifElse_DeletionAlreadyConfirmed.Name = "ifElse_DeletionAlreadyConfirmed";
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
            // codeActivity2
            // 
            this.codeActivity2.Name = "codeActivity2";
            this.codeActivity2.ExecuteCode += new System.EventHandler(this.codeActivity2_ExecuteCode);
            // 
            // setStateActivity9
            // 
            this.setStateActivity9.Name = "setStateActivity9";
            this.setStateActivity9.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity4
            // 
            this.cancelHandleExternalEventActivity4.EventName = "Cancel";
            this.cancelHandleExternalEventActivity4.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity4.Name = "cancelHandleExternalEventActivity4";
            // 
            // setStateActivity1
            // 
            this.setStateActivity1.Name = "setStateActivity1";
            this.setStateActivity1.TargetStateName = "confDeletingReferencedDataStateActivity";
            // 
            // finishHandleExternalEventActivity3
            // 
            this.finishHandleExternalEventActivity3.EventName = "Finish";
            this.finishHandleExternalEventActivity3.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity3.Name = "finishHandleExternalEventActivity3";
            // 
            // ifElse_HasSubpages
            // 
            this.ifElse_HasSubpages.Activities.Add(this.branch_HasSubpages);
            this.ifElse_HasSubpages.Activities.Add(this.branch_NoSubpages);
            this.ifElse_HasSubpages.Name = "ifElse_HasSubpages";
            // 
            // ifElse_HasInstanceCompositions
            // 
            this.ifElse_HasInstanceCompositions.Activities.Add(this.branchHasCompositions);
            this.ifElse_HasInstanceCompositions.Activities.Add(this.branchNoCompositions);
            this.ifElse_HasInstanceCompositions.Name = "ifElse_HasInstanceCompositions";
            // 
            // eventDrivenActivity2
            // 
            this.eventDrivenActivity2.Activities.Add(this.cancelHandleExternalEventActivity5);
            this.eventDrivenActivity2.Activities.Add(this.setStateActivity14);
            this.eventDrivenActivity2.Name = "eventDrivenActivity2";
            // 
            // eventDrivenActivity1
            // 
            this.eventDrivenActivity1.Activities.Add(this.finishHandleExternalEventActivity4);
            this.eventDrivenActivity1.Activities.Add(this.codeActivity_MultipleVersionsDeletionConfirmed);
            this.eventDrivenActivity1.Activities.Add(this.setStateActivity10);
            this.eventDrivenActivity1.Name = "eventDrivenActivity1";
            // 
            // stateInitializationActivity2
            // 
            this.stateInitializationActivity2.Activities.Add(this.ifElse_HasMultipleVersions);
            this.stateInitializationActivity2.Name = "stateInitializationActivity2";
            // 
            // eventDrivenActivity_Finish
            // 
            this.eventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity1);
            this.eventDrivenActivity_Finish.Activities.Add(this.setStateActivity12);
            this.eventDrivenActivity_Finish.Name = "eventDrivenActivity_Finish";
            // 
            // eventDrivenActivity_Cancel
            // 
            this.eventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.eventDrivenActivity_Cancel.Activities.Add(this.setStateActivity13);
            this.eventDrivenActivity_Cancel.Name = "eventDrivenActivity_Cancel";
            // 
            // stateInitializationActivity1
            // 
            this.stateInitializationActivity1.Activities.Add(this.conditionCheckRelatedData);
            this.stateInitializationActivity1.Name = "stateInitializationActivity1";
            // 
            // step2EventDrivenActivity_Cancel
            // 
            this.step2EventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity3);
            this.step2EventDrivenActivity_Cancel.Activities.Add(this.setStateActivity11);
            this.step2EventDrivenActivity_Cancel.Name = "step2EventDrivenActivity_Cancel";
            // 
            // step2EventDrivenActivity_Finish
            // 
            this.step2EventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity2);
            this.step2EventDrivenActivity_Finish.Activities.Add(this.setStateActivity2);
            this.step2EventDrivenActivity_Finish.Name = "step2EventDrivenActivity_Finish";
            // 
            // step2StateInitializationActivity
            // 
            this.step2StateInitializationActivity.Activities.Add(this.ifElse_DeletionAlreadyConfirmed);
            this.step2StateInitializationActivity.Name = "step2StateInitializationActivity";
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity1
            // 
            this.cancelHandleExternalEventActivity1.EventName = "Cancel";
            this.cancelHandleExternalEventActivity1.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity1.Name = "cancelHandleExternalEventActivity1";
            // 
            // finalizeInitializationActivity
            // 
            this.finalizeInitializationActivity.Activities.Add(this.codeActivity2);
            this.finalizeInitializationActivity.Activities.Add(this.closeCurrentViewActivity1);
            this.finalizeInitializationActivity.Activities.Add(this.setStateActivity3);
            this.finalizeInitializationActivity.Name = "finalizeInitializationActivity";
            // 
            // step1EventDrivenActivity_Cancel
            // 
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity4);
            this.step1EventDrivenActivity_Cancel.Activities.Add(this.setStateActivity9);
            this.step1EventDrivenActivity_Cancel.Name = "step1EventDrivenActivity_Cancel";
            // 
            // step1EventDrivenActivity_Finish
            // 
            this.step1EventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity3);
            this.step1EventDrivenActivity_Finish.Activities.Add(this.setStateActivity1);
            this.step1EventDrivenActivity_Finish.Name = "step1EventDrivenActivity_Finish";
            // 
            // step1InitializationActivity
            // 
            this.step1InitializationActivity.Activities.Add(this.ifElse_HasSubpages);
            this.step1InitializationActivity.Name = "step1InitializationActivity";
            // 
            // initializeInitializationActivity
            // 
            this.initializeInitializationActivity.Activities.Add(this.ifElse_HasInstanceCompositions);
            this.initializeInitializationActivity.Name = "initializeInitializationActivity";
            // 
            // confirmDeletingAllVersionsStateActivity
            // 
            this.confirmDeletingAllVersionsStateActivity.Activities.Add(this.stateInitializationActivity2);
            this.confirmDeletingAllVersionsStateActivity.Activities.Add(this.eventDrivenActivity1);
            this.confirmDeletingAllVersionsStateActivity.Activities.Add(this.eventDrivenActivity2);
            this.confirmDeletingAllVersionsStateActivity.Name = "confirmDeletingAllVersionsStateActivity";
            // 
            // confDeletingReferencedDataStateActivity
            // 
            this.confDeletingReferencedDataStateActivity.Activities.Add(this.stateInitializationActivity1);
            this.confDeletingReferencedDataStateActivity.Activities.Add(this.eventDrivenActivity_Cancel);
            this.confDeletingReferencedDataStateActivity.Activities.Add(this.eventDrivenActivity_Finish);
            this.confDeletingReferencedDataStateActivity.Name = "confDeletingReferencedDataStateActivity";
            // 
            // confirmationStateActivity
            // 
            this.confirmationStateActivity.Activities.Add(this.step2StateInitializationActivity);
            this.confirmationStateActivity.Activities.Add(this.step2EventDrivenActivity_Finish);
            this.confirmationStateActivity.Activities.Add(this.step2EventDrivenActivity_Cancel);
            this.confirmationStateActivity.Name = "confirmationStateActivity";
            // 
            // eventDrivenActivity_GlobalCancel
            // 
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.cancelHandleExternalEventActivity1);
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.setStateActivity4);
            this.eventDrivenActivity_GlobalCancel.Name = "eventDrivenActivity_GlobalCancel";
            // 
            // finalizeStateActivity
            // 
            this.finalizeStateActivity.Activities.Add(this.finalizeInitializationActivity);
            this.finalizeStateActivity.Name = "finalizeStateActivity";
            // 
            // confirmDeletingChildrenStateActivity
            // 
            this.confirmDeletingChildrenStateActivity.Activities.Add(this.step1InitializationActivity);
            this.confirmDeletingChildrenStateActivity.Activities.Add(this.step1EventDrivenActivity_Finish);
            this.confirmDeletingChildrenStateActivity.Activities.Add(this.step1EventDrivenActivity_Cancel);
            this.confirmDeletingChildrenStateActivity.Name = "confirmDeletingChildrenStateActivity";
            // 
            // finalStateActivity
            // 
            this.finalStateActivity.Name = "finalStateActivity";
            // 
            // initializeStateActivity
            // 
            this.initializeStateActivity.Activities.Add(this.initializeInitializationActivity);
            this.initializeStateActivity.Name = "initializeStateActivity";
            // 
            // DeletePageWorkflow
            // 
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.confirmDeletingChildrenStateActivity);
            this.Activities.Add(this.finalizeStateActivity);
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.confirmationStateActivity);
            this.Activities.Add(this.confDeletingReferencedDataStateActivity);
            this.Activities.Add(this.confirmDeletingAllVersionsStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "DeletePageWorkflow";
            this.CanModifyActivities = false;

        }



















        #endregion

        private StateInitializationActivity initializeInitializationActivity;
        private StateActivity finalStateActivity;
        private SetStateActivity setStateActivity3;
        private StateInitializationActivity finalizeInitializationActivity;
        private StateActivity finalizeStateActivity;
        private CodeActivity caCheckChildren;
        private CodeActivity codeActivity2;
        private SetStateActivity setStateActivity4;
        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;
        private SetStateActivity setStateActivity2;
        private EventDrivenActivity step2EventDrivenActivity_Finish;
        private StateInitializationActivity step2StateInitializationActivity;
        private StateActivity confirmationStateActivity;
        private C1Console.Workflow.Activities.ConfirmDialogFormActivity wizzardFormActivity2;
        private C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity2;
        private C1Console.Workflow.Activities.CloseCurrentViewActivity closeCurrentViewActivity1;
        private SetStateActivity setStateActivity11;
        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity3;
        private EventDrivenActivity step2EventDrivenActivity_Cancel;
        private SetStateActivity setStateActivity6;
        private CodeActivity initializeCodeActivity_ShowError_InstanceCompositions;
        private IfElseBranchActivity branchNoCompositions;
        private IfElseBranchActivity branchHasCompositions;
        private IfElseActivity ifElse_HasInstanceCompositions;
        private StateActivity confDeletingReferencedDataStateActivity;
        private IfElseBranchActivity branchRelatedDataDoesntExist;
        private IfElseBranchActivity branchRelatedDataExist;
        private IfElseActivity conditionCheckRelatedData;
        private StateInitializationActivity stateInitializationActivity1;
        private SetStateActivity setStateActivity5;
        private SetStateActivity setStateActivity13;
        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;
        private EventDrivenActivity eventDrivenActivity_Cancel;
        private SetStateActivity setStateActivity12;
        private C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;
        private EventDrivenActivity eventDrivenActivity_Finish;
        private C1Console.Workflow.Activities.ConfirmDialogFormActivity confirmDialogFormActivity1;
        private SetStateActivity setStateActivity9;
        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity4;
        private SetStateActivity setStateActivity1;
        private C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity3;
        private C1Console.Workflow.Activities.ConfirmDialogFormActivity wizzardFormActivity1;
        private EventDrivenActivity step1EventDrivenActivity_Cancel;
        private EventDrivenActivity step1EventDrivenActivity_Finish;
        private StateInitializationActivity step1InitializationActivity;
        private StateActivity confirmDeletingChildrenStateActivity;
        private SetStateActivity setStateActivity14;
        private C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity5;
        private SetStateActivity setStateActivity10;
        private C1Console.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity4;
        private C1Console.Workflow.Activities.ConfirmDialogFormActivity confirmDialogFormActivity2;
        private EventDrivenActivity eventDrivenActivity2;
        private EventDrivenActivity eventDrivenActivity1;
        private StateInitializationActivity stateInitializationActivity2;
        private StateActivity confirmDeletingAllVersionsStateActivity;
        private SetStateActivity setStateActivity15;
        private SetStateActivity setStateActivity16;
        private SetStateActivity setStateActivity17;
        private IfElseBranchActivity branch_HasSingleVersion;
        private IfElseBranchActivity branch_HasMultipleVersions;
        private IfElseBranchActivity branch_NoSubpages;
        private IfElseBranchActivity branch_HasSubpages;
        private CodeActivity codeActivity_MultipleVersionsDeletionConfirmed;
        private IfElseActivity ifElse_HasMultipleVersions;
        private IfElseActivity ifElse_HasSubpages;
        private SetStateActivity setStateActivity7;
        private IfElseBranchActivity branch_deletionNotConfirmed;
        private IfElseBranchActivity branch_DeletionConfirmed;
        private IfElseActivity ifElse_DeletionAlreadyConfirmed;
        private StateActivity initializeStateActivity;
    }
}
