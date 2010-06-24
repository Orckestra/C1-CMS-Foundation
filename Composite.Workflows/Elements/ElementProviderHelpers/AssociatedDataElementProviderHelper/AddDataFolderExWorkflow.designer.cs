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

namespace Composite.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper
{
    partial class AddDataFolderExWorkflow
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
            this.setStateActivity12 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity8 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity7 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity10 = new System.Workflow.Activities.SetStateActivity();
            this.setStateActivity5 = new System.Workflow.Activities.SetStateActivity();
            this.closeCurrentViewActivity2 = new Composite.Workflow.Activities.CloseCurrentViewActivity();
            this.setStateActivity9 = new System.Workflow.Activities.SetStateActivity();
            this.closeCurrentViewActivity3 = new Composite.Workflow.Activities.CloseCurrentViewActivity();
            this.selectTypeCodeActivity_StartCreateNewTypeWorkflow = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity6 = new System.Workflow.Activities.SetStateActivity();
            this.if_UnusedTypesExist = new System.Workflow.Activities.IfElseActivity();
            this.setStateActivity8 = new System.Workflow.Activities.SetStateActivity();
            this.ifElseBranchActivity6 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity5 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity4 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity3 = new System.Workflow.Activities.IfElseBranchActivity();
            this.setStateActivity11 = new System.Workflow.Activities.SetStateActivity();
            this.noTypesToAddCodeActivity_ShowMessage = new System.Workflow.Activities.CodeActivity();
            this.ifElseActivity2 = new System.Workflow.Activities.IfElseActivity();
            this.saceNewTypeCodeActivity_Save = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.saveHandleExternalEventActivity1 = new Composite.Workflow.Activities.SaveHandleExternalEventActivity();
            this.documentFormActivity1 = new Composite.Workflow.Activities.DocumentFormActivity();
            this.createNewTypeCodeActivity_Initialize = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity7 = new System.Workflow.Activities.SetStateActivity();
            this.finalizeCodeActivity_Finalize = new System.Workflow.Activities.CodeActivity();
            this.closeCurrentViewActivity1 = new Composite.Workflow.Activities.CloseCurrentViewActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity2 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.ifElseActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.finishHandleExternalEventActivity1 = new Composite.Workflow.Activities.FinishHandleExternalEventActivity();
            this.dataDialogFormActivity1 = new Composite.Workflow.Activities.WizardFormActivity();
            this.selectTypeCodeActivity_Initialize = new System.Workflow.Activities.CodeActivity();
            this.if_CreateNewType = new System.Workflow.Activities.IfElseActivity();
            this.noTypesToAddStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.saveNewTypeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.createNewTypeEventDrivenActivity_Save = new System.Workflow.Activities.EventDrivenActivity();
            this.createNewTypeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.finalizeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.selectTypeEventDrivenActivity_Cancel = new System.Workflow.Activities.EventDrivenActivity();
            this.selectTypeEventDrivenActivity_Finish = new System.Workflow.Activities.EventDrivenActivity();
            this.selectTypeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.noTypesToAddStateActivity = new System.Workflow.Activities.StateActivity();
            this.saveNewTypeStateActivity = new System.Workflow.Activities.StateActivity();
            this.createNewTypeStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalizeStateActivity = new System.Workflow.Activities.StateActivity();
            this.selectTypeToAddStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // setStateActivity12
            // 
            this.setStateActivity12.Name = "setStateActivity12";
            this.setStateActivity12.TargetStateName = "noTypesToAddStateActivity";
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "selectTypeToAddStateActivity";
            // 
            // ifElseBranchActivity8
            // 
            this.ifElseBranchActivity8.Activities.Add(this.setStateActivity12);
            this.ifElseBranchActivity8.Name = "ifElseBranchActivity8";
            // 
            // ifElseBranchActivity7
            // 
            this.ifElseBranchActivity7.Activities.Add(this.setStateActivity3);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.UnunsedTypesExist);
            this.ifElseBranchActivity7.Condition = codecondition1;
            this.ifElseBranchActivity7.Name = "ifElseBranchActivity7";
            // 
            // setStateActivity10
            // 
            this.setStateActivity10.Name = "setStateActivity10";
            this.setStateActivity10.TargetStateName = "createNewTypeStateActivity";
            // 
            // setStateActivity5
            // 
            this.setStateActivity5.Name = "setStateActivity5";
            this.setStateActivity5.TargetStateName = "finalizeStateActivity";
            // 
            // closeCurrentViewActivity2
            // 
            this.closeCurrentViewActivity2.Name = "closeCurrentViewActivity2";
            // 
            // setStateActivity9
            // 
            this.setStateActivity9.Name = "setStateActivity9";
            this.setStateActivity9.TargetStateName = "finalStateActivity";
            // 
            // closeCurrentViewActivity3
            // 
            this.closeCurrentViewActivity3.Name = "closeCurrentViewActivity3";
            // 
            // selectTypeCodeActivity_StartCreateNewTypeWorkflow
            // 
            this.selectTypeCodeActivity_StartCreateNewTypeWorkflow.Name = "selectTypeCodeActivity_StartCreateNewTypeWorkflow";
            this.selectTypeCodeActivity_StartCreateNewTypeWorkflow.ExecuteCode += new System.EventHandler(this.selectTypeCodeActivity_StartCreateNewTypeWorkflow_ExecuteCode);
            // 
            // setStateActivity6
            // 
            this.setStateActivity6.Name = "setStateActivity6";
            this.setStateActivity6.TargetStateName = "finalizeStateActivity";
            // 
            // if_UnusedTypesExist
            // 
            this.if_UnusedTypesExist.Activities.Add(this.ifElseBranchActivity7);
            this.if_UnusedTypesExist.Activities.Add(this.ifElseBranchActivity8);
            this.if_UnusedTypesExist.Name = "if_UnusedTypesExist";
            // 
            // setStateActivity8
            // 
            this.setStateActivity8.Name = "setStateActivity8";
            this.setStateActivity8.TargetStateName = "createNewTypeStateActivity";
            // 
            // ifElseBranchActivity6
            // 
            this.ifElseBranchActivity6.Activities.Add(this.setStateActivity10);
            this.ifElseBranchActivity6.Name = "ifElseBranchActivity6";
            // 
            // ifElseBranchActivity5
            // 
            this.ifElseBranchActivity5.Activities.Add(this.closeCurrentViewActivity2);
            this.ifElseBranchActivity5.Activities.Add(this.setStateActivity5);
            codecondition2.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.IsTypeCreated);
            this.ifElseBranchActivity5.Condition = codecondition2;
            this.ifElseBranchActivity5.Name = "ifElseBranchActivity5";
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.selectTypeCodeActivity_StartCreateNewTypeWorkflow);
            this.ifElseBranchActivity2.Activities.Add(this.closeCurrentViewActivity3);
            this.ifElseBranchActivity2.Activities.Add(this.setStateActivity9);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.setStateActivity6);
            codecondition3.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.UseExistingType);
            this.ifElseBranchActivity1.Condition = codecondition3;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // ifElseBranchActivity4
            // 
            this.ifElseBranchActivity4.Activities.Add(this.if_UnusedTypesExist);
            this.ifElseBranchActivity4.Name = "ifElseBranchActivity4";
            // 
            // ifElseBranchActivity3
            // 
            this.ifElseBranchActivity3.Activities.Add(this.setStateActivity8);
            codecondition4.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.ShouldCreateNewType);
            this.ifElseBranchActivity3.Condition = codecondition4;
            this.ifElseBranchActivity3.Name = "ifElseBranchActivity3";
            // 
            // setStateActivity11
            // 
            this.setStateActivity11.Name = "setStateActivity11";
            this.setStateActivity11.TargetStateName = "finalStateActivity";
            // 
            // noTypesToAddCodeActivity_ShowMessage
            // 
            this.noTypesToAddCodeActivity_ShowMessage.Name = "noTypesToAddCodeActivity_ShowMessage";
            this.noTypesToAddCodeActivity_ShowMessage.ExecuteCode += new System.EventHandler(this.noTypesToAddCodeActivity_ShowMessage_ExecuteCode);
            // 
            // ifElseActivity2
            // 
            this.ifElseActivity2.Activities.Add(this.ifElseBranchActivity5);
            this.ifElseActivity2.Activities.Add(this.ifElseBranchActivity6);
            this.ifElseActivity2.Name = "ifElseActivity2";
            // 
            // saceNewTypeCodeActivity_Save
            // 
            this.saceNewTypeCodeActivity_Save.Name = "saceNewTypeCodeActivity_Save";
            this.saceNewTypeCodeActivity_Save.ExecuteCode += new System.EventHandler(this.saceNewTypeCodeActivity_Save_ExecuteCode);
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "saveNewTypeStateActivity";
            // 
            // saveHandleExternalEventActivity1
            // 
            this.saveHandleExternalEventActivity1.EventName = "Save";
            this.saveHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.saveHandleExternalEventActivity1.Name = "saveHandleExternalEventActivity1";
            // 
            // documentFormActivity1
            // 
            this.documentFormActivity1.ContainerLabel = null;
            this.documentFormActivity1.CustomToolbarDefinitionFileName = null;
            this.documentFormActivity1.FormDefinitionFileName = "\\Administrative\\AddDataFolderCreateNewType.xml";
            this.documentFormActivity1.Name = "documentFormActivity1";
            // 
            // createNewTypeCodeActivity_Initialize
            // 
            this.createNewTypeCodeActivity_Initialize.Name = "createNewTypeCodeActivity_Initialize";
            this.createNewTypeCodeActivity_Initialize.ExecuteCode += new System.EventHandler(this.createNewTypeCodeActivity_Initialize_ExecuteCode);
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
            // closeCurrentViewActivity1
            // 
            this.closeCurrentViewActivity1.Name = "closeCurrentViewActivity1";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity2
            // 
            this.cancelHandleExternalEventActivity2.EventName = "Cancel";
            this.cancelHandleExternalEventActivity2.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity2.Name = "cancelHandleExternalEventActivity2";
            // 
            // ifElseActivity1
            // 
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity1);
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity2);
            this.ifElseActivity1.Name = "ifElseActivity1";
            // 
            // finishHandleExternalEventActivity1
            // 
            this.finishHandleExternalEventActivity1.EventName = "Finish";
            this.finishHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.finishHandleExternalEventActivity1.Name = "finishHandleExternalEventActivity1";
            // 
            // dataDialogFormActivity1
            // 
            this.dataDialogFormActivity1.ContainerLabel = null;
            this.dataDialogFormActivity1.FormDefinitionFileName = "\\Administrative\\AddDataFolderExSelectType.xml";
            this.dataDialogFormActivity1.Name = "dataDialogFormActivity1";
            // 
            // selectTypeCodeActivity_Initialize
            // 
            this.selectTypeCodeActivity_Initialize.Name = "selectTypeCodeActivity_Initialize";
            this.selectTypeCodeActivity_Initialize.ExecuteCode += new System.EventHandler(this.selectTypeCodeActivity_Initialize_ExecuteCode);
            // 
            // if_CreateNewType
            // 
            this.if_CreateNewType.Activities.Add(this.ifElseBranchActivity3);
            this.if_CreateNewType.Activities.Add(this.ifElseBranchActivity4);
            this.if_CreateNewType.Name = "if_CreateNewType";
            // 
            // noTypesToAddStateInitializationActivity
            // 
            this.noTypesToAddStateInitializationActivity.Activities.Add(this.noTypesToAddCodeActivity_ShowMessage);
            this.noTypesToAddStateInitializationActivity.Activities.Add(this.setStateActivity11);
            this.noTypesToAddStateInitializationActivity.Name = "noTypesToAddStateInitializationActivity";
            // 
            // saveNewTypeStateInitializationActivity
            // 
            this.saveNewTypeStateInitializationActivity.Activities.Add(this.saceNewTypeCodeActivity_Save);
            this.saveNewTypeStateInitializationActivity.Activities.Add(this.ifElseActivity2);
            this.saveNewTypeStateInitializationActivity.Name = "saveNewTypeStateInitializationActivity";
            // 
            // createNewTypeEventDrivenActivity_Save
            // 
            this.createNewTypeEventDrivenActivity_Save.Activities.Add(this.saveHandleExternalEventActivity1);
            this.createNewTypeEventDrivenActivity_Save.Activities.Add(this.setStateActivity4);
            this.createNewTypeEventDrivenActivity_Save.Name = "createNewTypeEventDrivenActivity_Save";
            // 
            // createNewTypeStateInitializationActivity
            // 
            this.createNewTypeStateInitializationActivity.Activities.Add(this.createNewTypeCodeActivity_Initialize);
            this.createNewTypeStateInitializationActivity.Activities.Add(this.documentFormActivity1);
            this.createNewTypeStateInitializationActivity.Name = "createNewTypeStateInitializationActivity";
            // 
            // finalizeStateInitializationActivity
            // 
            this.finalizeStateInitializationActivity.Activities.Add(this.closeCurrentViewActivity1);
            this.finalizeStateInitializationActivity.Activities.Add(this.finalizeCodeActivity_Finalize);
            this.finalizeStateInitializationActivity.Activities.Add(this.setStateActivity7);
            this.finalizeStateInitializationActivity.Name = "finalizeStateInitializationActivity";
            // 
            // selectTypeEventDrivenActivity_Cancel
            // 
            this.selectTypeEventDrivenActivity_Cancel.Activities.Add(this.cancelHandleExternalEventActivity2);
            this.selectTypeEventDrivenActivity_Cancel.Activities.Add(this.setStateActivity2);
            this.selectTypeEventDrivenActivity_Cancel.Name = "selectTypeEventDrivenActivity_Cancel";
            // 
            // selectTypeEventDrivenActivity_Finish
            // 
            this.selectTypeEventDrivenActivity_Finish.Activities.Add(this.finishHandleExternalEventActivity1);
            this.selectTypeEventDrivenActivity_Finish.Activities.Add(this.ifElseActivity1);
            this.selectTypeEventDrivenActivity_Finish.Name = "selectTypeEventDrivenActivity_Finish";
            // 
            // selectTypeStateInitializationActivity
            // 
            this.selectTypeStateInitializationActivity.Activities.Add(this.selectTypeCodeActivity_Initialize);
            this.selectTypeStateInitializationActivity.Activities.Add(this.dataDialogFormActivity1);
            this.selectTypeStateInitializationActivity.Name = "selectTypeStateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.if_CreateNewType);
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
            this.cancelHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity1.Name = "cancelHandleExternalEventActivity1";
            // 
            // noTypesToAddStateActivity
            // 
            this.noTypesToAddStateActivity.Activities.Add(this.noTypesToAddStateInitializationActivity);
            this.noTypesToAddStateActivity.Name = "noTypesToAddStateActivity";
            // 
            // saveNewTypeStateActivity
            // 
            this.saveNewTypeStateActivity.Activities.Add(this.saveNewTypeStateInitializationActivity);
            this.saveNewTypeStateActivity.Name = "saveNewTypeStateActivity";
            // 
            // createNewTypeStateActivity
            // 
            this.createNewTypeStateActivity.Activities.Add(this.createNewTypeStateInitializationActivity);
            this.createNewTypeStateActivity.Activities.Add(this.createNewTypeEventDrivenActivity_Save);
            this.createNewTypeStateActivity.Name = "createNewTypeStateActivity";
            // 
            // finalizeStateActivity
            // 
            this.finalizeStateActivity.Activities.Add(this.finalizeStateInitializationActivity);
            this.finalizeStateActivity.Name = "finalizeStateActivity";
            // 
            // selectTypeToAddStateActivity
            // 
            this.selectTypeToAddStateActivity.Activities.Add(this.selectTypeStateInitializationActivity);
            this.selectTypeToAddStateActivity.Activities.Add(this.selectTypeEventDrivenActivity_Finish);
            this.selectTypeToAddStateActivity.Activities.Add(this.selectTypeEventDrivenActivity_Cancel);
            this.selectTypeToAddStateActivity.Name = "selectTypeToAddStateActivity";
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
            // AddDataFolderExWorkflow
            // 
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.selectTypeToAddStateActivity);
            this.Activities.Add(this.finalizeStateActivity);
            this.Activities.Add(this.createNewTypeStateActivity);
            this.Activities.Add(this.saveNewTypeStateActivity);
            this.Activities.Add(this.noTypesToAddStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "AddDataFolderExWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private StateActivity selectTypeToAddStateActivity;
        private SetStateActivity setStateActivity2;
        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity2;
        private SetStateActivity setStateActivity3;
        private EventDrivenActivity selectTypeEventDrivenActivity_Cancel;
        private EventDrivenActivity selectTypeEventDrivenActivity_Finish;
        private StateInitializationActivity selectTypeStateInitializationActivity;
        private Composite.Workflow.Activities.FinishHandleExternalEventActivity finishHandleExternalEventActivity1;
        private Composite.Workflow.Activities.WizardFormActivity dataDialogFormActivity1;
        private CodeActivity selectTypeCodeActivity_Initialize;
        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateInitializationActivity initializeStateInitializationActivity;
        private SetStateActivity setStateActivity1;
        private StateActivity finalStateActivity;
        private StateActivity initializeStateActivity;
        private CodeActivity finalizeCodeActivity_Finalize;
        private StateInitializationActivity finalizeStateInitializationActivity;
        private StateActivity finalizeStateActivity;
        private SetStateActivity setStateActivity7;
        private Composite.Workflow.Activities.CloseCurrentViewActivity closeCurrentViewActivity1;
        private SetStateActivity setStateActivity6;
        private Composite.Workflow.Activities.SaveHandleExternalEventActivity saveHandleExternalEventActivity1;
        private EventDrivenActivity createNewTypeEventDrivenActivity_Save;
        private StateInitializationActivity createNewTypeStateInitializationActivity;
        private StateActivity saveNewTypeStateActivity;
        private StateActivity createNewTypeStateActivity;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private SetStateActivity setStateActivity5;
        private SetStateActivity setStateActivity4;
        private IfElseActivity ifElseActivity1;
        private StateInitializationActivity saveNewTypeStateInitializationActivity;
        private Composite.Workflow.Activities.DocumentFormActivity documentFormActivity1;
        private CodeActivity saceNewTypeCodeActivity_Save;
        private Composite.Workflow.Activities.CloseCurrentViewActivity closeCurrentViewActivity2;
        private IfElseBranchActivity ifElseBranchActivity4;
        private IfElseBranchActivity ifElseBranchActivity3;
        private IfElseActivity if_CreateNewType;
        private SetStateActivity setStateActivity8;
        private CodeActivity selectTypeCodeActivity_StartCreateNewTypeWorkflow;
        private SetStateActivity setStateActivity9;
        private Composite.Workflow.Activities.CloseCurrentViewActivity closeCurrentViewActivity3;
        private CodeActivity createNewTypeCodeActivity_Initialize;
        private IfElseBranchActivity ifElseBranchActivity6;
        private IfElseBranchActivity ifElseBranchActivity5;
        private IfElseActivity ifElseActivity2;
        private SetStateActivity setStateActivity10;
        private SetStateActivity setStateActivity12;
        private IfElseBranchActivity ifElseBranchActivity8;
        private IfElseBranchActivity ifElseBranchActivity7;
        private IfElseActivity if_UnusedTypesExist;
        private SetStateActivity setStateActivity11;
        private CodeActivity noTypesToAddCodeActivity_ShowMessage;
        private StateInitializationActivity noTypesToAddStateInitializationActivity;
        private StateActivity noTypesToAddStateActivity;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;











































































































































































    }
}
