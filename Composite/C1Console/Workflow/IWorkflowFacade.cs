using System;
using System.Collections.Generic;
using System.Threading;
using System.Workflow.Activities;
using System.Workflow.Runtime;
using Composite.C1Console.Actions;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow.Foundation;
using Composite.C1Console.Events;


namespace Composite.C1Console.Workflow
{
	internal interface IWorkflowFacade
	{
        void EnsureInitialization();
        WorkflowRuntime WorkflowRuntime { get; }

        void RunWhenInitialized(Action action);


        #region Workflow methods
        WorkflowInstance CreateNewWorkflow(Type workflowType);
        WorkflowInstance CreateNewWorkflow(Type workflowType, Dictionary<string, object> arguments);
        WorkflowFlowToken StartNewWorkflow(Type workflowType, FlowControllerServicesContainer flowControllerServicesContainer, EntityToken entityToken, ActionToken actionToken);
        WorkflowInstance GetWorkflow(Guid instanceId);
        StateMachineWorkflowInstance GetStateMachineWorkflowInstance(Guid instanceId);
        void RunWorkflow(Guid instanceId);
        void RunWorkflow(WorkflowInstance workflowInstance);
        void AbortWorkflow(Guid instanceId);
        void AcquireLock(Guid instanceId, EntityToken entityToken);
        #endregion


        #region FlowControllerServices methods
        void SetFlowControllerServicesContainer(Guid instanceId, FlowControllerServicesContainer flowControllerServicesContainer);
        FlowControllerServicesContainer GetFlowControllerServicesContainer(Guid instanceId);
        void RemoveFlowControllerServicesContainer(Guid instanceId);
        #endregion


        #region Workflow status methods
        bool WorkflowExists(Guid instanceId);
        Semaphore WaitForIdleStatus(Guid instanceId);
        #endregion


        #region Form workflow methods
        void SetEventHandlerFilter(Guid instanceId, Type eventHandlerFilterType);
        IEventHandleFilter GetEventHandleFilter(Guid instanceId);
        IEnumerable<string> GetCurrentFormEvents(Guid instanceId);
        IEnumerable<string> GetCurrentFormEvents(WorkflowInstance workflowInstance);
        void FireSaveEvent(Guid instanceId, Dictionary<string, object> bindings);
        void FireSaveAndPublishEvent(Guid instanceId, Dictionary<string, object> bindings);
        void FireNextEvent(Guid instanceId, Dictionary<string, object> bindings);
        void FirePreviousEvent(Guid instanceId, Dictionary<string, object> bindings);
        void FireFinishEvent(Guid instanceId, Dictionary<string, object> bindings);
        void FireCancelEvent(Guid instanceId, Dictionary<string, object> bindings);
        void FirePreviewEvent(Guid instanceId, Dictionary<string, object> bindings);
        void FireCustomEvent(int eventNumber, Guid instanceId, Dictionary<string, object> bindings);
        void FireChildWorkflowDoneEvent(Guid parentInstanceId, string workflowResult);
        #endregion


        #region FormData methods
        void AddFormData(Guid instanceId, FormData formData);
        bool TryGetFormData(Guid instanceId, out FormData formData);
        FormData GetFormData(Guid instanceId, bool allowCreationIfNotExisting);
        #endregion


        void Flush();
        void ShutDown();
        void ConsoleClosed(ConsoleClosedEventArgs args);

    }
}
