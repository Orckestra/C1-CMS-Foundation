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

namespace Composite.Plugins.Elements.ElementProviders.PageElementProvider
{
    partial class ManageHostNameBindingsWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
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
            this.setAddCompleted = new System.Workflow.Activities.SetStateActivity();
            this.saveHostNameBinding = new System.Workflow.Activities.CodeActivity();
            this.redoDialog1 = new System.Workflow.Activities.SetStateActivity();
            this.hostNameusedFieldMessage = new Composite.C1Console.Workflow.Activities.ShowFieldMessageActivity();
            this.isNotInUse = new System.Workflow.Activities.IfElseBranchActivity();
            this.isInUse = new System.Workflow.Activities.IfElseBranchActivity();
            this.hostNameInUseCheck = new System.Workflow.Activities.IfElseActivity();
            this.redoDialog2 = new System.Workflow.Activities.SetStateActivity();
            this.invalidHostNameSyntaxFieldMessage = new Composite.C1Console.Workflow.Activities.ShowFieldMessageActivity();
            this.transactionScopeActivity1 = new System.Workflow.ComponentModel.TransactionScopeActivity();
            this.setAddState = new System.Workflow.Activities.SetStateActivity();
            this.setRemoveState = new System.Workflow.Activities.SetStateActivity();
            this.hostNameSyntaxInvalid = new System.Workflow.Activities.IfElseBranchActivity();
            this.hostNameSyntaxIsValid = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.handleRemoveCancel = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.setRemoveCompletedState = new System.Workflow.Activities.SetStateActivity();
            this.removeSelectedHostHeaderBindongs = new System.Workflow.Activities.CodeActivity();
            this.handleRemoveFinish = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.removeDataDialog = new Composite.C1Console.Workflow.Activities.DataDialogFormActivity();
            this.ensureRemoveDialogBindings = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.handleAddCancel = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.hostNameSyntaxCheck = new System.Workflow.Activities.IfElseActivity();
            this.handleAddFinish = new Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity();
            this.addDataDialog = new Composite.C1Console.Workflow.Activities.DataDialogFormActivity();
            this.ensureAddDialogBindings = new System.Workflow.Activities.CodeActivity();
            this.ifElseActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.storeSelectedPageId = new System.Workflow.Activities.CodeActivity();
            this.removeCancelEvent = new System.Workflow.Activities.EventDrivenActivity();
            this.removeFinishEvent = new System.Workflow.Activities.EventDrivenActivity();
            this.removeHostNamesInitialization = new System.Workflow.Activities.StateInitializationActivity();
            this.addCancelEvent = new System.Workflow.Activities.EventDrivenActivity();
            this.addFinishEvent = new System.Workflow.Activities.EventDrivenActivity();
            this.addHostNameBindingInitialization = new System.Workflow.Activities.StateInitializationActivity();
            this.selectManagementActionInitialization = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity();
            this.removeHostNamesState = new System.Workflow.Activities.StateActivity();
            this.addHostNamesBindingState = new System.Workflow.Activities.StateActivity();
            this.selectManagementActionState = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // setAddCompleted
            // 
            this.setAddCompleted.Name = "setAddCompleted";
            this.setAddCompleted.TargetStateName = "finalStateActivity";
            // 
            // saveHostNameBinding
            // 
            this.saveHostNameBinding.Name = "saveHostNameBinding";
            this.saveHostNameBinding.ExecuteCode += new System.EventHandler(this.saveHostNameBinding_ExecuteCode);
            // 
            // redoDialog1
            // 
            this.redoDialog1.Name = "redoDialog1";
            this.redoDialog1.TargetStateName = "addHostNamesBindingState";
            // 
            // hostNameusedFieldMessage
            // 
            this.hostNameusedFieldMessage.FieldBindingPath = "HostName";
            this.hostNameusedFieldMessage.Message = "${Composite.Plugins.PageElementProvider,ManageHostNames.Add.HostNameNotUn" +
                "iqueError}";
            this.hostNameusedFieldMessage.Name = "hostNameusedFieldMessage";
            // 
            // isNotInUse
            // 
            this.isNotInUse.Activities.Add(this.saveHostNameBinding);
            this.isNotInUse.Activities.Add(this.setAddCompleted);
            this.isNotInUse.Name = "isNotInUse";
            // 
            // isInUse
            // 
            this.isInUse.Activities.Add(this.hostNameusedFieldMessage);
            this.isInUse.Activities.Add(this.redoDialog1);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.HostNameValueIsUsed);
            this.isInUse.Condition = codecondition1;
            this.isInUse.Name = "isInUse";
            // 
            // hostNameInUseCheck
            // 
            this.hostNameInUseCheck.Activities.Add(this.isInUse);
            this.hostNameInUseCheck.Activities.Add(this.isNotInUse);
            this.hostNameInUseCheck.Name = "hostNameInUseCheck";
            // 
            // redoDialog2
            // 
            this.redoDialog2.Name = "redoDialog2";
            this.redoDialog2.TargetStateName = "addHostNamesBindingState";
            // 
            // invalidHostNameSyntaxFieldMessage
            // 
            this.invalidHostNameSyntaxFieldMessage.FieldBindingPath = "HostName";
            this.invalidHostNameSyntaxFieldMessage.Message = "${Composite.Plugins.PageElementProvider,ManageHostNames.Add.InvalidHostNa" +
                "meSyntaxError}";
            this.invalidHostNameSyntaxFieldMessage.Name = "invalidHostNameSyntaxFieldMessage";
            // 
            // transactionScopeActivity1
            // 
            this.transactionScopeActivity1.Activities.Add(this.hostNameInUseCheck);
            this.transactionScopeActivity1.Name = "transactionScopeActivity1";
            this.transactionScopeActivity1.TransactionOptions.IsolationLevel = System.Transactions.IsolationLevel.Serializable;
            // 
            // setAddState
            // 
            this.setAddState.Name = "setAddState";
            this.setAddState.TargetStateName = "addHostNamesBindingState";
            // 
            // setRemoveState
            // 
            this.setRemoveState.Name = "setRemoveState";
            this.setRemoveState.TargetStateName = "removeHostNamesState";
            // 
            // hostNameSyntaxInvalid
            // 
            this.hostNameSyntaxInvalid.Activities.Add(this.invalidHostNameSyntaxFieldMessage);
            this.hostNameSyntaxInvalid.Activities.Add(this.redoDialog2);
            this.hostNameSyntaxInvalid.Name = "hostNameSyntaxInvalid";
            // 
            // hostNameSyntaxIsValid
            // 
            this.hostNameSyntaxIsValid.Activities.Add(this.transactionScopeActivity1);
            codecondition2.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.HostNameSyntaxValid);
            this.hostNameSyntaxIsValid.Condition = codecondition2;
            this.hostNameSyntaxIsValid.Name = "hostNameSyntaxIsValid";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.setAddState);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.setRemoveState);
            codecondition3.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.PageHasHostnameBindings);
            this.ifElseBranchActivity1.Condition = codecondition3;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "finalStateActivity";
            // 
            // handleRemoveCancel
            // 
            this.handleRemoveCancel.EventName = "Cancel";
            this.handleRemoveCancel.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.handleRemoveCancel.Name = "handleRemoveCancel";
            // 
            // setRemoveCompletedState
            // 
            this.setRemoveCompletedState.Name = "setRemoveCompletedState";
            this.setRemoveCompletedState.TargetStateName = "finalStateActivity";
            // 
            // removeSelectedHostHeaderBindongs
            // 
            this.removeSelectedHostHeaderBindongs.Name = "removeSelectedHostHeaderBindongs";
            this.removeSelectedHostHeaderBindongs.ExecuteCode += new System.EventHandler(this.removeSelectedHostHeaderBindongs_ExecuteCode);
            // 
            // handleRemoveFinish
            // 
            this.handleRemoveFinish.EventName = "Finish";
            this.handleRemoveFinish.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.handleRemoveFinish.Name = "handleRemoveFinish";
            // 
            // removeDataDialog
            // 
            this.removeDataDialog.ContainerLabel = null;
            this.removeDataDialog.FormDefinitionFileName = "/Administrative/RemovePageHostNameBindings.xml";
            this.removeDataDialog.Name = "removeDataDialog";
            // 
            // ensureRemoveDialogBindings
            // 
            this.ensureRemoveDialogBindings.Name = "ensureRemoveDialogBindings";
            this.ensureRemoveDialogBindings.ExecuteCode += new System.EventHandler(this.ensureRemoveDialogBindings_ExecuteCode);
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "finalStateActivity";
            // 
            // handleAddCancel
            // 
            this.handleAddCancel.EventName = "Cancel";
            this.handleAddCancel.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.handleAddCancel.Name = "handleAddCancel";
            // 
            // hostNameSyntaxCheck
            // 
            this.hostNameSyntaxCheck.Activities.Add(this.hostNameSyntaxIsValid);
            this.hostNameSyntaxCheck.Activities.Add(this.hostNameSyntaxInvalid);
            this.hostNameSyntaxCheck.Name = "hostNameSyntaxCheck";
            // 
            // handleAddFinish
            // 
            this.handleAddFinish.EventName = "Finish";
            this.handleAddFinish.InterfaceType = typeof(Composite.C1Console.Workflow.IFormsWorkflowEventService);
            this.handleAddFinish.Name = "handleAddFinish";
            // 
            // addDataDialog
            // 
            this.addDataDialog.ContainerLabel = null;
            this.addDataDialog.FormDefinitionFileName = "/Administrative/AddPageHostNameBindings.xml";
            this.addDataDialog.Name = "addDataDialog";
            // 
            // ensureAddDialogBindings
            // 
            this.ensureAddDialogBindings.Name = "ensureAddDialogBindings";
            this.ensureAddDialogBindings.ExecuteCode += new System.EventHandler(this.ensureAddDialogBindings_ExecuteCode);
            // 
            // ifElseActivity1
            // 
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity1);
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity2);
            this.ifElseActivity1.Name = "ifElseActivity1";
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "selectManagementActionState";
            // 
            // storeSelectedPageId
            // 
            this.storeSelectedPageId.Name = "storeSelectedPageId";
            this.storeSelectedPageId.ExecuteCode += new System.EventHandler(this.storeSelectedPageId_ExecuteCode);
            // 
            // removeCancelEvent
            // 
            this.removeCancelEvent.Activities.Add(this.handleRemoveCancel);
            this.removeCancelEvent.Activities.Add(this.setStateActivity3);
            this.removeCancelEvent.Name = "removeCancelEvent";
            // 
            // removeFinishEvent
            // 
            this.removeFinishEvent.Activities.Add(this.handleRemoveFinish);
            this.removeFinishEvent.Activities.Add(this.removeSelectedHostHeaderBindongs);
            this.removeFinishEvent.Activities.Add(this.setRemoveCompletedState);
            this.removeFinishEvent.Name = "removeFinishEvent";
            // 
            // removeHostNamesInitialization
            // 
            this.removeHostNamesInitialization.Activities.Add(this.ensureRemoveDialogBindings);
            this.removeHostNamesInitialization.Activities.Add(this.removeDataDialog);
            this.removeHostNamesInitialization.Name = "removeHostNamesInitialization";
            // 
            // addCancelEvent
            // 
            this.addCancelEvent.Activities.Add(this.handleAddCancel);
            this.addCancelEvent.Activities.Add(this.setStateActivity2);
            this.addCancelEvent.Name = "addCancelEvent";
            // 
            // addFinishEvent
            // 
            this.addFinishEvent.Activities.Add(this.handleAddFinish);
            this.addFinishEvent.Activities.Add(this.hostNameSyntaxCheck);
            this.addFinishEvent.Name = "addFinishEvent";
            // 
            // addHostNameBindingInitialization
            // 
            this.addHostNameBindingInitialization.Activities.Add(this.ensureAddDialogBindings);
            this.addHostNameBindingInitialization.Activities.Add(this.addDataDialog);
            this.addHostNameBindingInitialization.Name = "addHostNameBindingInitialization";
            // 
            // selectManagementActionInitialization
            // 
            this.selectManagementActionInitialization.Activities.Add(this.ifElseActivity1);
            this.selectManagementActionInitialization.Name = "selectManagementActionInitialization";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.storeSelectedPageId);
            this.initializeStateInitializationActivity.Activities.Add(this.setStateActivity4);
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
            // removeHostNamesState
            // 
            this.removeHostNamesState.Activities.Add(this.removeHostNamesInitialization);
            this.removeHostNamesState.Activities.Add(this.removeFinishEvent);
            this.removeHostNamesState.Activities.Add(this.removeCancelEvent);
            this.removeHostNamesState.Name = "removeHostNamesState";
            // 
            // addHostNamesBindingState
            // 
            this.addHostNamesBindingState.Activities.Add(this.addHostNameBindingInitialization);
            this.addHostNamesBindingState.Activities.Add(this.addFinishEvent);
            this.addHostNamesBindingState.Activities.Add(this.addCancelEvent);
            this.addHostNamesBindingState.Name = "addHostNamesBindingState";
            // 
            // selectManagementActionState
            // 
            this.selectManagementActionState.Activities.Add(this.selectManagementActionInitialization);
            this.selectManagementActionState.Name = "selectManagementActionState";
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
            // ManageHostNameBindingsWorkflow
            // 
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.selectManagementActionState);
            this.Activities.Add(this.addHostNamesBindingState);
            this.Activities.Add(this.removeHostNamesState);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "ManageHostNameBindingsWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateInitializationActivity initializeStateInitializationActivity;
        private SetStateActivity setStateActivity1;
        private StateActivity finalStateActivity;
        private StateActivity initializeStateActivity;
        private StateActivity selectManagementActionState;
        private StateInitializationActivity selectManagementActionInitialization;
        private SetStateActivity setAddState;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private IfElseActivity ifElseActivity1;
        private StateInitializationActivity addHostNameBindingInitialization;
        private StateActivity removeHostNamesState;
        private StateActivity addHostNamesBindingState;
        private SetStateActivity setRemoveState;
        private EventDrivenActivity removeCancelEvent;
        private EventDrivenActivity removeFinishEvent;
        private StateInitializationActivity removeHostNamesInitialization;
        private EventDrivenActivity addFinishEvent;
        private SetStateActivity setStateActivity3;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity handleRemoveCancel;
        private SetStateActivity setStateActivity2;
        private Composite.C1Console.Workflow.Activities.CancelHandleExternalEventActivity handleAddCancel;
        private SetStateActivity setStateActivity4;
        private EventDrivenActivity addCancelEvent;
        private Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity handleRemoveFinish;
        private Composite.C1Console.Workflow.Activities.DataDialogFormActivity removeDataDialog;
        private Composite.C1Console.Workflow.Activities.FinishHandleExternalEventActivity handleAddFinish;
        private Composite.C1Console.Workflow.Activities.DataDialogFormActivity addDataDialog;
        private CodeActivity ensureAddDialogBindings;
        private SetStateActivity redoDialog1;
        private Composite.C1Console.Workflow.Activities.ShowFieldMessageActivity hostNameusedFieldMessage;
        private IfElseBranchActivity isNotInUse;
        private IfElseBranchActivity isInUse;
        private IfElseActivity hostNameInUseCheck;
        private TransactionScopeActivity transactionScopeActivity1;
        private IfElseBranchActivity hostNameSyntaxInvalid;
        private IfElseBranchActivity hostNameSyntaxIsValid;
        private IfElseActivity hostNameSyntaxCheck;
        private Composite.C1Console.Workflow.Activities.ShowFieldMessageActivity invalidHostNameSyntaxFieldMessage;
        private CodeActivity saveHostNameBinding;
        private SetStateActivity setAddCompleted;
        private SetStateActivity redoDialog2;
        private CodeActivity ensureRemoveDialogBindings;
        private CodeActivity removeSelectedHostHeaderBindongs;
        private CodeActivity storeSelectedPageId;
        private SetStateActivity setRemoveCompletedState;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;
























































































































































    }
}
