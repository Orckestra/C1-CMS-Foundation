using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading;
using System.Workflow.Activities;
using System.Workflow.Runtime;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow.Foundation;
using Composite.Core.Types;


namespace Composite.C1Console.Workflow
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class WorkflowFacade
    {
        private static IWorkflowFacade _workflowFacade = new WorkflowFacadeImpl();

        private static readonly ConcurrentDictionary<string, Type> _workflowTypeLookupCache = new ConcurrentDictionary<string, Type>();


        static WorkflowFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
            GlobalEventSystemFacade.SubscribeToShutDownEvent(OnShutDownEvent);
            ConsoleFacade.SubscribeToConsoleClosedEvent(OnConsoleClosedEvent);
        }



        internal static IWorkflowFacade Implementation { get { return _workflowFacade; } set { _workflowFacade = value; } }


        /// <exclude />
        public static void EnsureInitialization()
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                _workflowFacade.EnsureInitialization();
            }
        }



        /// <exclude />
        public static WorkflowRuntime WorkflowRuntime
        {
            get
            {
                return _workflowFacade.WorkflowRuntime;
            }
        }



        /// <exclude />
        public static Type GetWorkflowType(string typeName)
        {
            Type type = _workflowTypeLookupCache.GetOrAdd(typeName, GetWorkflowTypeInternal);

            Verify.IsNotNull(type, "Could not find the workflow type: {0}", typeName);

            return type;
        }

        private static Type GetWorkflowTypeInternal(string typeName)
        {
            Type type = TypeManager.TryGetType(typeName);
            if (type == null && !typeName.Contains(","))
            {
                string fullname = typeName + ", Composite.Workflows";

                type = TypeManager.TryGetType(fullname);
            }

            return type;
        }


        /// <summary>
        /// Runs the when initialized.
        /// </summary>
        /// <param name="action">The action.</param>
        public static void RunWhenInitialized(Action action)
        {
            _workflowFacade.RunWhenInitialized(action);
        }



        #region Workflow methods
        /// <exclude />
        public static WorkflowInstance CreateNewWorkflow(Type workflowType)
        {
            return _workflowFacade.CreateNewWorkflow(workflowType);
        }



        /// <exclude />
        public static WorkflowInstance CreateNewWorkflow(Type workflowType, Dictionary<string, object> arguments)
        {
            return _workflowFacade.CreateNewWorkflow(workflowType, arguments);
        }



        /// <exclude />
        public static WorkflowFlowToken StartNewWorkflow(Type workflowType, FlowControllerServicesContainer flowControllerServicesContainer, EntityToken entityToken, ActionToken actionToken)
        {
            return _workflowFacade.StartNewWorkflow(workflowType, flowControllerServicesContainer, entityToken, actionToken);
        }



        /// <exclude />
        public static WorkflowInstance GetWorkflow(Guid instanceId)
        {
           return _workflowFacade.GetWorkflow(instanceId);
        }



        /// <exclude />
        public static StateMachineWorkflowInstance GetStateMachineWorkflowInstance(Guid instanceId)
        {
           return _workflowFacade.GetStateMachineWorkflowInstance(instanceId);
        }



        /// <exclude />
        public static void RunWorkflow(Guid instanceId)
        {
           _workflowFacade.RunWorkflow(instanceId);
        }



        /// <exclude />
        public static void RunWorkflow(WorkflowInstance workflowInstance)
        {
           _workflowFacade.RunWorkflow(workflowInstance);
        }



        /// <exclude />
        public static void AbortWorkflow(Guid instanceId)
        {
          _workflowFacade.AbortWorkflow(instanceId);
        }



        /// <exclude />
        public static void AcquireLock(Guid instanceId, EntityToken entityToken)
        {
           _workflowFacade.AcquireLock(instanceId, entityToken);
        }        
        #endregion



        #region FlowControllerServices methods
        /// <exclude />
        public static void SetFlowControllerServicesContainer(Guid instanceId, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            _workflowFacade.SetFlowControllerServicesContainer(instanceId, flowControllerServicesContainer);
        }



        /// <exclude />
        public static FlowControllerServicesContainer GetFlowControllerServicesContainer(Guid instanceId)
        {
            return _workflowFacade.GetFlowControllerServicesContainer(instanceId);
        }



        /// <exclude />
        private static void RemoveFlowControllerServicesContainer(Guid instanceId)
        {
            _workflowFacade.RemoveFlowControllerServicesContainer(instanceId);
        }
        #endregion



        #region Workflow status methods
        /// <exclude />
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
        /// <exclude />
        public static void SetEventHandlerFilter(Guid instanceId, Type eventHandlerFilterType)
        {
            _workflowFacade.SetEventHandlerFilter(instanceId, eventHandlerFilterType);
        }



        /// <exclude />
        public static IEventHandleFilter GetEventHandleFilter(Guid instanceId)
        {
            return _workflowFacade.GetEventHandleFilter(instanceId);
        }



        /// <exclude />
        public static IEnumerable<string> GetCurrentFormEvents(Guid instanceId)
        {
            return _workflowFacade.GetCurrentFormEvents(instanceId);
        }



        /// <exclude />
        public static IEnumerable<string> GetCurrentFormEvents(WorkflowInstance workflowInstance)
        {
            return _workflowFacade.GetCurrentFormEvents(workflowInstance);
        }



        /// <exclude />
        public static void FireSaveEvent(Guid instanceId, Dictionary<string, object> bindings)
        {
            _workflowFacade.FireSaveEvent(instanceId, bindings);
        }



        /// <exclude />
        public static void FireSaveAndPublishEvent(Guid instanceId, Dictionary<string, object> bindings)
        {
            _workflowFacade.FireSaveAndPublishEvent(instanceId, bindings);
        }


        /// <exclude />
        public static void FireNextEvent(Guid instanceId, Dictionary<string, object> bindings)
        {
            _workflowFacade.FireNextEvent(instanceId, bindings);
        }



        /// <exclude />
        public static void FirePreviousEvent(Guid instanceId, Dictionary<string, object> bindings)
        {
            _workflowFacade.FirePreviousEvent(instanceId, bindings);
        }



        /// <exclude />
        public static void FireFinishEvent(Guid instanceId, Dictionary<string, object> bindings)
        {
            _workflowFacade.FireFinishEvent(instanceId, bindings);
        }



        /// <exclude />
        public static void FireCancelEvent(Guid instanceId, Dictionary<string, object> bindings)
        {
            _workflowFacade.FireCancelEvent(instanceId, bindings);
        }



        /// <exclude />
        public static void FirePreviewEvent(Guid instanceId, Dictionary<string, object> bindings)
        {
            _workflowFacade.FirePreviewEvent(instanceId, bindings);
        }



        /// <exclude />
        public static void FireCustomEvent(int customEventNumber, Guid instanceId, Dictionary<string, object> bindings)
        {
            if (customEventNumber < 1 || customEventNumber > 5) throw new ArgumentException("Number must be between 1 and 5", "customEventNumber");

            _workflowFacade.FireCustomEvent(customEventNumber, instanceId, bindings);
        }



        /// <exclude />
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



        /// <exclude />
        public static bool TryGetFormData(Guid instanceId, out FormData formData)
        {
            return _workflowFacade.TryGetFormData(instanceId, out formData);
        }



        /// <exclude />
        public static FormData GetFormData(Guid instanceId, bool allowCreationIfNotExisting = false)
        {
            return _workflowFacade.GetFormData(instanceId, allowCreationIfNotExisting);
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
