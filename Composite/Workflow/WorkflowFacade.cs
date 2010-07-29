using System;
using System.Collections.Generic;
using System.Threading;
using System.Workflow.Activities;
using System.Workflow.Runtime;
using Composite.Actions;
using Composite.ConsoleEventSystem;
using Composite.EventSystem;
using Composite.Security;
using Composite.Workflow.Foundation;
using Composite.Types;


namespace Composite.Workflow
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class WorkflowFacade
    {
        private static IWorkflowFacade _workflowFacade = new WorkflowFacadeImpl();


        static WorkflowFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
            GlobalEventSystemFacade.SubscribeToShutDownEvent(OnShutDownEvent);
            ConsoleFacade.SubscribeToConsoleClosedEvent(OnConsoleClosedEvent);
        }



        internal static IWorkflowFacade Implementation { get { return _workflowFacade; } set { _workflowFacade = value; } }


        public static void EnsureInitialization()
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                _workflowFacade.EnsureInitialization();
            }
        }



        public static WorkflowRuntime WorkflowRuntime
        {
            get
            {
                return _workflowFacade.WorkflowRuntime;
            }
        }



        public static Type GetWorkflowType(string typeName)
        {
            Type type = null;

            type = TypeManager.TryGetType(typeName);
            if (type != null) return type;

            string fullname;
            if (typeName.Contains(",") == false)
            {
                fullname = typeName + ", Composite.Workflows";
            }
            else
            {
                fullname = typeName;
            }

            type = TypeManager.TryGetType(fullname);
            if (type != null) return type;

            throw new InvalidOperationException(string.Format("Could not find the workflow type: {0}", fullname));
        }



        #region Workflow methods
        public static WorkflowInstance CreateNewWorkflow(Type workflowType)
        {
            return _workflowFacade.CreateNewWorkflow(workflowType);
        }



        public static WorkflowInstance CreateNewWorkflow(Type workflowType, Dictionary<string, object> arguments)
        {
            return _workflowFacade.CreateNewWorkflow(workflowType, arguments);
        }



        public static WorkflowFlowToken StartNewWorkflow(Type workflowType, FlowControllerServicesContainer flowControllerServicesContainer, EntityToken entityToken, ActionToken actionToken)
        {
            return _workflowFacade.StartNewWorkflow(workflowType, flowControllerServicesContainer, entityToken, actionToken);
        }



        public static WorkflowInstance GetWorkflow(Guid instanceId)
        {
           return _workflowFacade.GetWorkflow(instanceId);
        }



        public static StateMachineWorkflowInstance GetStateMachineWorkflowInstance(Guid instanceId)
        {
           return _workflowFacade.GetStateMachineWorkflowInstance(instanceId);
        }



        public static void RunWorkflow(Guid instanceId)
        {
           _workflowFacade.RunWorkflow(instanceId);
        }



        public static void RunWorkflow(WorkflowInstance workflowInstance)
        {
           _workflowFacade.RunWorkflow(workflowInstance);
        }



        public static void AbortWorkflow(Guid instanceId)
        {
          _workflowFacade.AbortWorkflow(instanceId);
        }        



        public static void AcquireLock(Guid isntanceId, EntityToken entityToken)
        {
           _workflowFacade.AcquireLock(isntanceId, entityToken);
        }        
        #endregion



        #region FlowControllerServices methods
        public static void SetFlowControllerServicesContainer(Guid instanceId, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            _workflowFacade.SetFlowControllerServicesContainer(instanceId, flowControllerServicesContainer);
        }



        public static FlowControllerServicesContainer GetFlowControllerServicesContainer(Guid instanceId)
        {
            return _workflowFacade.GetFlowControllerServicesContainer(instanceId);
        }



        private static void RemoveFlowControllerServicesContainer(Guid instanceId)
        {
            _workflowFacade.RemoveFlowControllerServicesContainer(instanceId);
        }
        #endregion



        #region Workflow status methods
        public static bool WorkflowExists(Guid instanceId)
        {
           return _workflowFacade.WorkflowExists(instanceId);
        }


        /// <summary>
        /// This method returns a semaphore that will be signaled when the workflow instance becomes idle.
        /// Or null if the workflow instance is idle at the calling moment.
        /// </summary>
        /// <param name="instanceId"></param>
        /// <returns></returns>
        public static Semaphore WaitForIdleStatus(Guid instanceId)
        {
           return _workflowFacade.WaitForIdleStatus(instanceId);
        }        
        #endregion



        #region Form workflow methods
        public static void SetEventHandlerFilter(Guid instanceId, Type eventHandlerFilterType)
        {
            _workflowFacade.SetEventHandlerFilter(instanceId, eventHandlerFilterType);
        }



        public static IEventHandleFilter GetEventHandleFilter(Guid instanceId)
        {
            return _workflowFacade.GetEventHandleFilter(instanceId);
        }



        public static IEnumerable<string> GetCurrentFormEvents(Guid instanceId)
        {
            return _workflowFacade.GetCurrentFormEvents(instanceId);
        }



        public static IEnumerable<string> GetCurrentFormEvents(WorkflowInstance workflowInstance)
        {
            return _workflowFacade.GetCurrentFormEvents(workflowInstance);
        }



        public static void FireSaveEvent(Guid instanceId, Dictionary<string, object> bindings)
        {
            _workflowFacade.FireSaveEvent(instanceId, bindings);
        }



        public static void FireNextEvent(Guid instanceId, Dictionary<string, object> bindings)
        {
            _workflowFacade.FireNextEvent(instanceId, bindings);
        }



        public static void FirePreviousEvent(Guid instanceId, Dictionary<string, object> bindings)
        {
            _workflowFacade.FirePreviousEvent(instanceId, bindings);
        }



        public static void FireFinishEvent(Guid instanceId, Dictionary<string, object> bindings)
        {
            _workflowFacade.FireFinishEvent(instanceId, bindings);
        }



        public static void FireCancelEvent(Guid instanceId, Dictionary<string, object> bindings)
        {
            _workflowFacade.FireCancelEvent(instanceId, bindings);
        }



        public static void FirePreviewEvent(Guid instanceId, Dictionary<string, object> bindings)
        {
            _workflowFacade.FirePreviewEvent(instanceId, bindings);
        }



        public static void FireCustomEvent(int customEventNumber, Guid instanceId, Dictionary<string, object> bindings)
        {
            if (customEventNumber < 1 || customEventNumber > 5) throw new ArgumentException("Number must be between 1 and 5", "customEventNumber");

            _workflowFacade.FireCustomEvent(customEventNumber, instanceId, bindings);
        }



        public static void FireChildWorkflowDoneEvent(Guid parentInstanceId, string workflowResult)
        {
            _workflowFacade.FireChildWorkflowDoneEvent(parentInstanceId, workflowResult);

        }
        #endregion



        #region FormData methods
        internal static void AddFormData(Guid instanceId, FormData formData)
        {
            _workflowFacade.AddFormData(instanceId, formData);
        }



        public static bool TryGetFormData(Guid instanceId, out FormData formData)
        {
            return _workflowFacade.TryGetFormData(instanceId, out formData);
        }



        public static FormData GetFormData(Guid instanceId)
        {
            return _workflowFacade.GetFormData(instanceId);
        }        
        #endregion



        

        private static void OnFlushEvent(FlushEventArgs args)
        {
            _workflowFacade.Flush();
        }



        private static void OnShutDownEvent(ShutDownEventArgs args)
        {
            _workflowFacade.ShutDown();
        }



        private static void OnConsoleClosedEvent(ConsoleClosedEventArgs args)
        {
            _workflowFacade.ConsoleClosed(args);
        }
    }
}
