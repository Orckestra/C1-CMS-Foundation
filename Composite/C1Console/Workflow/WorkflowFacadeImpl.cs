using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Workflow.Activities;
using System.Workflow.ComponentModel.Compiler;
using System.Workflow.Runtime;
using System.Workflow.Runtime.Hosting;
using System.Xml.Linq;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.C1Console.Tasks;
using Composite.C1Console.Workflow.Activities.Foundation;
using Composite.C1Console.Workflow.Foundation;
using Composite.C1Console.Workflow.Foundation.PluginFacades;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.Logging;
using Composite.Core.Threading;
using Composite.Core.Types;
using Composite.Core.Xml;
using Composite.Data;
using System.Diagnostics;


namespace Composite.C1Console.Workflow
{
    internal sealed class WorkflowFacadeImpl : IWorkflowFacade
    {
        private static TimeSpan _oldFileExistensTimeout = TimeSpan.FromHours(12.0);

        private WorkflowRuntime _workflowRuntime = null;
        private ExternalDataExchangeService _externalDataExchangeService = null;
        private FormsWorkflowEventService _formsWorkflowEventService = null;
        private ManualWorkflowSchedulerService _manualWorkflowSchedulerService = null;
        private FileWorkFlowPersisetenceService _fileWorkFlowPersisetenceService = null;

        private ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.InitializeResources);

        private Dictionary<Type, bool> _hasEntityTokenLockAttributeCache = new Dictionary<Type, bool>();

        private TwoPhaseFileLock _twoPhaseFileLock;

        public WorkflowFacadeImpl()
        {
            string lockFileDirectory = Path.Combine(Path.GetDirectoryName(PathUtil.Resolve(GlobalSettingsFacade.SerializedWorkflowsDirectory)), "LockFiles");
            if (!C1Directory.Exists(lockFileDirectory)) C1Directory.CreateDirectory(lockFileDirectory);

            _twoPhaseFileLock = new TwoPhaseFileLock("Workflows", lockFileDirectory);
            if (RuntimeInformation.IsDebugBuild == true)
            {
                _oldFileExistensTimeout = TimeSpan.FromMinutes(10.0);
            }
        }



        public void EnsureInitialization()
        {
            using (_resourceLocker.Locker)
            {
                if (_workflowRuntime == null)
                {
                    DoInitialize();
                }
            }
        }



        public WorkflowRuntime WorkflowRuntime
        {
            get
            {
                return _workflowRuntime;
            }
        }



        #region Workflow methods
        public WorkflowInstance CreateNewWorkflow(Type workflowType)
        {
            GlobalInitializerFacade.EnsureSystemIsInitialized();

            try
            {
                WorkflowInstance workflowInstance = _workflowRuntime.CreateWorkflow(workflowType);

                SetWorkflowPersistingType(workflowType, workflowInstance.InstanceId);

                return workflowInstance;
            }
            catch (WorkflowValidationFailedException exp)
            {
                StringBuilder errors = new StringBuilder();
                foreach (ValidationError error in exp.Errors)
                {

                    errors.AppendLine(error.ToString());
                }
                LoggingService.LogError("WorkflowFacade", errors.ToString());
                throw exp;
            }
        }



        public WorkflowInstance CreateNewWorkflow(Type workflowType, Dictionary<string, object> arguments)
        {
            GlobalInitializerFacade.EnsureSystemIsInitialized();

            try
            {
                WorkflowInstance workflowInstance = _workflowRuntime.CreateWorkflow(workflowType, arguments);

                SetWorkflowPersistingType(workflowType, workflowInstance.InstanceId);
                
                if ((arguments.ContainsKey("SerializedEntityToken") == true) &&
                    (arguments.ContainsKey("SerializedActionToken") == true))
                {
                    ActionToken actionToken = ActionTokenSerializer.Deserialize((string)arguments["SerializedActionToken"]);

                    if (actionToken.IgnoreEntityTokenLocking == false)
                    {
                        AcquireLockIfNeeded(workflowType, workflowInstance.InstanceId, (string)arguments["SerializedEntityToken"]);
                    }
                }

                return workflowInstance;
            }
            catch (WorkflowValidationFailedException exp)
            {
                StringBuilder errors = new StringBuilder();
                foreach (ValidationError error in exp.Errors)
                {

                    errors.AppendLine(error.ToString());
                }
                LoggingService.LogError("WorkflowFacade", errors.ToString());
                throw exp;
            }
        }



        public WorkflowFlowToken StartNewWorkflow(Type workflowType, FlowControllerServicesContainer flowControllerServicesContainer, EntityToken entityToken, ActionToken actionToken)
        {
            Dictionary<string, object> arguments = new Dictionary<string, object> { { "EntityToken", entityToken }, { "ActionToken", actionToken } };

            try
            {
                WorkflowInstance workflowInstance = _workflowRuntime.CreateWorkflow(workflowType, arguments);

                SetWorkflowPersistingType(workflowType, workflowInstance.InstanceId);
                AcquireLockIfNeeded(workflowType, workflowInstance.InstanceId, entityToken);

                workflowInstance.Start();

                SetFlowControllerServicesContainer(workflowInstance.InstanceId, flowControllerServicesContainer);

                RunWorkflow(workflowInstance);

                return new WorkflowFlowToken(workflowInstance.InstanceId);
            }
            catch (Exception e)
            {
                LoggingService.LogCritical("WorkflowFacade", e);

                throw;
            }
        }



        public WorkflowInstance GetWorkflow(Guid instanceId)
        {
            return _workflowRuntime.GetWorkflow(instanceId);
        }



        public StateMachineWorkflowInstance GetStateMachineWorkflowInstance(Guid instanceId)
        {
            return new StateMachineWorkflowInstance(_workflowRuntime, instanceId);
        }


        public void RunWorkflow(Guid instanceId)
        {
            using (_resourceLocker.Locker)
            {
                SetWorkflowInstanceStatus(instanceId, WorkflowInstanceStatus.Running, false);

                _manualWorkflowSchedulerService.RunWorkflow(instanceId);

                Exception exception;
                if (_resourceLocker.Resources.ExceptionFromWorkflow.TryGetValue(Thread.CurrentThread.ManagedThreadId, out exception) == true)
                {
                    _resourceLocker.Resources.ExceptionFromWorkflow.Remove(Thread.CurrentThread.ManagedThreadId);

                    LoggingService.LogCritical("WorkflowFacade", exception);

                    throw exception;
                }
            }
        }



        public void RunWorkflow(WorkflowInstance workflowInstance)
        {
            RunWorkflow(workflowInstance.InstanceId);
        }



        public void AbortWorkflow(Guid instanceId)
        {
            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.WorkflowStatusDictionary.ContainsKey(instanceId) == true)
                {
                    WorkflowRuntime.GetWorkflow(instanceId).Abort();

                    _manualWorkflowSchedulerService.RunWorkflow(instanceId);                    

                    Exception exception;
                    if (_resourceLocker.Resources.ExceptionFromWorkflow.TryGetValue(Thread.CurrentThread.ManagedThreadId, out exception) == true)
                    {
                        _resourceLocker.Resources.ExceptionFromWorkflow.Remove(Thread.CurrentThread.ManagedThreadId);

                        throw exception;
                    }
                }
            }
        }



        private void SetWorkflowPersistingType(Type workflowType, Guid instanceId)
        {
            using (_resourceLocker.Locker)
            {
                List<AllowPersistingWorkflowAttribute> attributes = workflowType.GetCustomAttributesRecursively<AllowPersistingWorkflowAttribute>().ToList();
                if (attributes.Count == 0)
                {
                    _resourceLocker.Resources.WorkflowPersistingTypeDictionary.Add(instanceId, WorkflowPersistingType.Never);
                }
                else if (attributes.Count == 1)
                {
                    _resourceLocker.Resources.WorkflowPersistingTypeDictionary.Add(instanceId, attributes[0].WorkflowPersistingType);
                }
                else
                {
                    throw new NotImplementedException();
                }
            }
        }



        private void RemovePersistingType(Guid instanceId)
        {
            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.WorkflowPersistingTypeDictionary.ContainsKey(instanceId) == true)
                {
                    _resourceLocker.Resources.WorkflowPersistingTypeDictionary.Remove(instanceId);
                }
            }
        }



        private void AcquireLockIfNeeded(Type workflowType, Guid instanceId, string serializedEntityToken)
        {
            if (HasEntityTokenLockAttribute(workflowType) == true)
            {
                EntityToken entityToken = EntityTokenSerializer.Deserialize(serializedEntityToken);

                AcquireLock(instanceId, entityToken);
            }
        }



        private void AcquireLockIfNeeded(Type workflowType, Guid instanceId, EntityToken entityToken)
        {
            if (HasEntityTokenLockAttribute(workflowType) == true)
            {
                AcquireLock(instanceId, entityToken);
            }
        }



        public void AcquireLock(Guid isntanceId, EntityToken entityToken)
        {
            if (ActionLockingFacade.IsLocked(entityToken) == true)
            {
                throw new InvalidOperationException("The entityToken is already locked");
            }

            ActionLockingFacade.AcquireLock(entityToken, isntanceId);
        }



        private void ReleaseAllLocks(Guid instanceId)
        {
            ActionLockingFacade.ReleaseAllLocks(instanceId);
        }



        private bool HasEntityTokenLockAttribute(Type workflowType)
        {
            bool hasEntityLockAttribute;
            if (_hasEntityTokenLockAttributeCache.TryGetValue(workflowType, out hasEntityLockAttribute) == false)
            {
                hasEntityLockAttribute = workflowType.GetCustomAttributesRecursively<EntityTokenLockAttribute>().Any() == true;

                _hasEntityTokenLockAttributeCache.Add(workflowType, hasEntityLockAttribute);
            }

            return hasEntityLockAttribute;
        }
        #endregion



        #region FlowControllerServices methods
        public void SetFlowControllerServicesContainer(Guid instanceId, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.FlowControllerServicesContainers.ContainsKey(instanceId) == false)
                {
                    _resourceLocker.Resources.FlowControllerServicesContainers.Add(instanceId, flowControllerServicesContainer);
                }
                else
                {
                    _resourceLocker.Resources.FlowControllerServicesContainers[instanceId] = flowControllerServicesContainer;
                }
            }
        }



        public FlowControllerServicesContainer GetFlowControllerServicesContainer(Guid instanceId)
        {
            FlowControllerServicesContainer flowControllerServicesContainer;

            using (_resourceLocker.Locker)
            {
                _resourceLocker.Resources.FlowControllerServicesContainers.TryGetValue(instanceId, out flowControllerServicesContainer);
            }

            return flowControllerServicesContainer;
        }



        public void RemoveFlowControllerServicesContainer(Guid instanceId)
        {
            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.FlowControllerServicesContainers.ContainsKey(instanceId) == true)
                {
                    _resourceLocker.Resources.FlowControllerServicesContainers.Remove(instanceId);
                }
            }
        }
        #endregion



        #region Workflow status methods
        public bool WorkflowExists(Guid instanceId)
        {
            using (_resourceLocker.Locker)
            {
                return _resourceLocker.Resources.WorkflowStatusDictionary.ContainsKey(instanceId);
            }
        }



        public Semaphore WaitForIdleStatus(Guid instanceId)
        {
            using (_resourceLocker.Locker)
            {
                WorkflowInstanceStatus workflowInstanceStatus;
                if (_resourceLocker.Resources.WorkflowStatusDictionary.TryGetValue(instanceId, out workflowInstanceStatus) == false)
                {
                    throw new InvalidOperationException(string.Format("The workflow with the id '{0}' is unknown", instanceId));
                }

                if (workflowInstanceStatus == WorkflowInstanceStatus.Idle)
                {
                    return null;
                }
                else
                {
                    if (_resourceLocker.Resources.WorkflowIdleWaitSemaphoes.ContainsKey(instanceId))
                    {
                        _resourceLocker.Resources.WorkflowIdleWaitSemaphoes.Remove(instanceId);
                    }

                    Semaphore semaphore = new Semaphore(0, 1);
                    _resourceLocker.Resources.WorkflowIdleWaitSemaphoes.Add(instanceId, semaphore);
                    return semaphore;
                }
            }
        }



        private void SetWorkflowInstanceStatus(Guid instanceId, WorkflowInstanceStatus workflowInstanceStatus, bool newlyCreateOrLoaded)
        {
            using (_resourceLocker.Locker)
            {
                switch (workflowInstanceStatus)
                {
                    case WorkflowInstanceStatus.Idle:
                        if (_resourceLocker.Resources.WorkflowIdleWaitSemaphoes.ContainsKey(instanceId) == true)
                        {
                            _resourceLocker.Resources.WorkflowIdleWaitSemaphoes[instanceId].Release();
                            _resourceLocker.Resources.WorkflowIdleWaitSemaphoes.Remove(instanceId); ;
                        }

                        if ((_resourceLocker.Resources.WorkflowStatusDictionary.ContainsKey(instanceId) == false) && (newlyCreateOrLoaded == true))
                        {
                            _resourceLocker.Resources.WorkflowStatusDictionary.Add(instanceId, WorkflowInstanceStatus.Idle);
                        }

                        _resourceLocker.Resources.WorkflowStatusDictionary[instanceId] = WorkflowInstanceStatus.Idle;

                        LoggingService.LogVerbose("WorkflowFacade", string.Format("Workflow instance status changed to idle. Id = {0}", instanceId));

                        break;

                    case WorkflowInstanceStatus.Running:
                        _resourceLocker.Resources.WorkflowStatusDictionary[instanceId] = WorkflowInstanceStatus.Running;

                        LoggingService.LogVerbose("WorkflowFacade", string.Format("Workflow instance status changed to running. Id = {0}", instanceId));
                        break;

                    case WorkflowInstanceStatus.Terminated:
                        if (_resourceLocker.Resources.WorkflowIdleWaitSemaphoes.ContainsKey(instanceId) == true)
                        {
                            _resourceLocker.Resources.WorkflowIdleWaitSemaphoes[instanceId].Release();
                            _resourceLocker.Resources.WorkflowIdleWaitSemaphoes.Remove(instanceId); ;
                        }

                        _resourceLocker.Resources.WorkflowStatusDictionary.Remove(instanceId);

                        LoggingService.LogVerbose("WorkflowFacade", string.Format("Workflow instance status changed to terminated. Id = {0}", instanceId));
                        break;
                }
            }
        }
        #endregion



        #region Form workflow methods
        public void SetEventHandlerFilter(Guid instanceId, Type eventHandlerFilterType)
        {
            if (eventHandlerFilterType != null)
            {
                if (typeof(IEventHandleFilter).IsAssignableFrom(eventHandlerFilterType) == false) throw new ArgumentException(string.Format("The argument eventHandlerFilterType does dot implement the interface '{0}'", typeof(IEventHandleFilter)));

                FormData formData = GetFormData(instanceId);
                if (formData != null)
                {
                    formData.EventHandleFilterType = eventHandlerFilterType;
                }
            }
        }



        public IEventHandleFilter GetEventHandleFilter(Guid instanceId)
        {
            FormData formData = GetFormData(instanceId);

            if ((formData == null) || (formData.EventHandleFilterType == null)) return null;

            IEventHandleFilter eventHandleFilter;
            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.EventHandleFilters.TryGetValue(formData.EventHandleFilterType, out eventHandleFilter) == false)
                {
                    eventHandleFilter = (IEventHandleFilter)Activator.CreateInstance(formData.EventHandleFilterType);
                    _resourceLocker.Resources.EventHandleFilters.Add(formData.EventHandleFilterType, eventHandleFilter);
                }
            }

            return eventHandleFilter;
        }



        public IEnumerable<string> GetCurrentFormEvents(Guid instanceId)
        {
            var q = ((Composite.C1Console.Workflow.Activities.FormsWorkflow)(new StateMachineWorkflowInstance(WorkflowFacade.WorkflowRuntime, instanceId)).StateMachineWorkflow).ActionToken;

            IEnumerable<string> eventNames = new StateMachineWorkflowInstance(WorkflowFacade.WorkflowRuntime, instanceId).GetCurrentEventNames(typeof(IFormsWorkflowEventService));

            return eventNames;
        }



        public IEnumerable<string> GetCurrentFormEvents(WorkflowInstance workflowInstance)
        {
            return GetCurrentFormEvents(workflowInstance.InstanceId);
        }



        public void FireSaveEvent(Guid instanceId, Dictionary<string, object> bindings)
        {
            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.WorkflowStatusDictionary.ContainsKey(instanceId) == true)
                {
                    _formsWorkflowEventService.FireSaveEvent(new FormEventArgs(instanceId, bindings));
                }
            }
        }



        public void FireNextEvent(Guid instanceId, Dictionary<string, object> bindings)
        {
            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.WorkflowStatusDictionary.ContainsKey(instanceId) == true)
                {
                    _formsWorkflowEventService.FireNextEvent(new FormEventArgs(instanceId, bindings));
                }
            }
        }



        public void FirePreviousEvent(Guid instanceId, Dictionary<string, object> bindings)
        {
            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.WorkflowStatusDictionary.ContainsKey(instanceId) == true)
                {
                    _formsWorkflowEventService.FirePreviousEvent(new FormEventArgs(instanceId, bindings));
                }
            }
        }



        public void FireFinishEvent(Guid instanceId, Dictionary<string, object> bindings)
        {
            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.WorkflowStatusDictionary.ContainsKey(instanceId) == true)
                {
                    _formsWorkflowEventService.FireFinishEvent(new FormEventArgs(instanceId, bindings));
                }
            }
        }



        public void FireCancelEvent(Guid instanceId, Dictionary<string, object> bindings)
        {
            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.WorkflowStatusDictionary.ContainsKey(instanceId) == true)
                {
                    _formsWorkflowEventService.FireCancelEvent(new FormEventArgs(instanceId, bindings));
                }
            }
        }



        public void FirePreviewEvent(Guid instanceId, Dictionary<string, object> bindings)
        {
            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.WorkflowStatusDictionary.ContainsKey(instanceId) == true)
                {
                    _formsWorkflowEventService.FirePreviewEvent(new FormEventArgs(instanceId, bindings));
                }
            }
        }



        public void FireCustomEvent(int customEventNumber, Guid instanceId, Dictionary<string, object> bindings)
        {
            if (customEventNumber < 1 || customEventNumber > 5) throw new ArgumentException("Number must be between 1 and 5", "customEventNumber");

            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.WorkflowStatusDictionary.ContainsKey(instanceId) == true)
                {
                    switch (customEventNumber)
                    {
                        case 01:
                            _formsWorkflowEventService.FireCustomEvent01(new FormEventArgs(instanceId, bindings));
                            break;
                        case 02:
                            _formsWorkflowEventService.FireCustomEvent02(new FormEventArgs(instanceId, bindings));
                            break;
                        case 03:
                            _formsWorkflowEventService.FireCustomEvent03(new FormEventArgs(instanceId, bindings));
                            break;
                        case 04:
                            _formsWorkflowEventService.FireCustomEvent04(new FormEventArgs(instanceId, bindings));
                            break;
                        case 05:
                            _formsWorkflowEventService.FireCustomEvent05(new FormEventArgs(instanceId, bindings));
                            break;
                        default:
                            break;
                    }
                }
            }
        }



        public void FireChildWorkflowDoneEvent(Guid parentInstanceId, string workflowResult)
        {
            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.WorkflowStatusDictionary.ContainsKey(parentInstanceId) == true)
                {
                    _formsWorkflowEventService.FireChildWorkflowDoneEvent(new FormEventArgs(parentInstanceId, workflowResult));
                }
            }
        }
        #endregion



        #region FormData methods
        public void AddFormData(Guid instanceId, FormData formData)
        {
            using (_resourceLocker.Locker)
            {
                _resourceLocker.Resources.FormDatas.Add(instanceId, formData);
            }
        }



        public bool TryGetFormData(Guid instanceId, out FormData formData)
        {
            using (_resourceLocker.Locker)
            {
                formData = null;

                if (_resourceLocker.Resources.FormDatas.TryGetValue(instanceId, out formData) == true)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }



        public FormData GetFormData(Guid instanceId)
        {
            FormData formData = null;

            TryGetFormData(instanceId, out formData);

            return formData;
        }



        private void RemoveIfExistFormData(Guid instanceId)
        {
            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.FormDatas.ContainsKey(instanceId) == true)
                {
                    _resourceLocker.Resources.FormDatas.Remove(instanceId);
                }
            }
        }
        #endregion



        public void Flush()
        {
            _workflowRuntime = null;
            _externalDataExchangeService = null;
            _manualWorkflowSchedulerService = null;
            _fileWorkFlowPersisetenceService = null;
            _formsWorkflowEventService = null;

            _resourceLocker.ResetInitialization();
        }



        public void ShutDown()
        {
            LoggingService.LogVerbose("RGB(194, 252, 131)WorkflowFacade", "----------========== Finalizing Workflows ==========----------");
            int startTime = Environment.TickCount;

            if (_workflowRuntime != null)
            {
                // system shut down - close all console bound resources
                using (_resourceLocker.Locker)
                {
                    using (GlobalInitializerFacade.CoreIsInitializedScope)
                    {
                        PersistFormDatas();

                        AbortWorkflows();

                        PersistExistingWorkflows();

                        RemoveAbortedPersistedWorkflow();
                    }
                }
            }

            int endTime = Environment.TickCount;
            LoggingService.LogVerbose("RGB(194, 252, 131)WorkflowFacade", string.Format("----------========== Done finalizing Workflows ({0} ms ) ==========----------", endTime - startTime));

            _twoPhaseFileLock.Release();
        }



        public void ConsoleClosed(ConsoleClosedEventArgs args)
        {
            using (_resourceLocker.Locker)
            {
                List<Guid> workflowsToCancel =
                    (from kp in _resourceLocker.Resources.FlowControllerServicesContainers
                     where ConsoleIdEquals(kp.Value, args.ConsoleId) == true
                     select kp.Key).ToList();

                foreach (Guid instanceId in workflowsToCancel)
                {
                    AbortWorkflow(instanceId);
                }
            }
        }



        private void DoInitialize()
        {
            using (_resourceLocker.Locker)
            {
                _twoPhaseFileLock.Acquire();

                LoggingService.LogVerbose("RGB(194, 252, 131)WorkflowFacade", "----------========== Initializing Workflows ==========----------");
                int startTime = Environment.TickCount;

                _resourceLocker.ResetInitialization();

                InitializeWorkflowRuntime();

                InitializeFormsWorkflowRuntime();

                if (_workflowRuntime.IsStarted == false)
                {
                    _workflowRuntime.StartRuntime();
                }

                DeleteOldWorkflows();

                LoadPersistedWorkflows();
                LoadPerssistedFormDatas();

                int endTime = Environment.TickCount;
                LoggingService.LogVerbose("RGB(194, 252, 131)WorkflowFacade", string.Format("----------========== Done initializing Workflows ({0} ms ) ==========----------", endTime - startTime));                
            }
        }



        private void InitializeWorkflowRuntime()
        {
            if (WorkflowRuntimeProviderPluginFacade.HasConfiguration == true)
            {
                string providerName = WorkflowRuntimeProviderRegistry.DefaultWorkflowRuntimeProviderName;

                _workflowRuntime = WorkflowRuntimeProviderPluginFacade.GetWorkflowRuntime(providerName);
            }
            else
            {
                LoggingService.LogWarning("WorkflowFacade", "Using default workflow runtime");
                _workflowRuntime = new WorkflowRuntime();
            }


            _manualWorkflowSchedulerService = new ManualWorkflowSchedulerService(true);
            _workflowRuntime.AddService(_manualWorkflowSchedulerService);

            _fileWorkFlowPersisetenceService = new FileWorkFlowPersisetenceService(SerializedWorkflowsDirectory);
            _workflowRuntime.AddService(_fileWorkFlowPersisetenceService);

            _externalDataExchangeService = new ExternalDataExchangeService();
            _workflowRuntime.AddService(_externalDataExchangeService);


            AddWorkflowLoggingEvents();


            _workflowRuntime.WorkflowCompleted += delegate(object sender, WorkflowCompletedEventArgs args)
            {
                using(ThreadDataManager.EnsureInitialize())
                {
                    OnWorkflowInstanceTerminatedCleanup(args.WorkflowInstance.InstanceId);
                }
            };



            _workflowRuntime.WorkflowAborted += delegate(object sender, WorkflowEventArgs args)
            {
                using (ThreadDataManager.EnsureInitialize())
                {
                    OnWorkflowInstanceTerminatedCleanup(args.WorkflowInstance.InstanceId);
                }
            };



            _workflowRuntime.WorkflowTerminated += delegate(object sender, WorkflowTerminatedEventArgs args)
            {
                using (ThreadDataManager.EnsureInitialize())
                {
                    OnWorkflowInstanceTerminatedCleanup(args.WorkflowInstance.InstanceId);
                }

                using (_resourceLocker.Locker)
                {
                    _resourceLocker.Resources.ExceptionFromWorkflow.Add(Thread.CurrentThread.ManagedThreadId, args.Exception);
                }
            };



            _workflowRuntime.WorkflowCreated += delegate(object sender, WorkflowEventArgs args)
            {
                SetWorkflowInstanceStatus(args.WorkflowInstance.InstanceId, WorkflowInstanceStatus.Idle, true);
            };



            _workflowRuntime.WorkflowIdled += delegate(object sender, WorkflowEventArgs args)
            {
                SetWorkflowInstanceStatus(args.WorkflowInstance.InstanceId, WorkflowInstanceStatus.Idle, false);
            };



            _workflowRuntime.WorkflowLoaded += delegate(object sender, WorkflowEventArgs args)
            {
                SetWorkflowInstanceStatus(args.WorkflowInstance.InstanceId, WorkflowInstanceStatus.Idle, true);
            };
        }



        private void OnWorkflowInstanceTerminatedCleanup(Guid instanceId)
        {
            WorkflowFlowToken flowToken = new WorkflowFlowToken(instanceId);

            TaskManagerFacade.CompleteTasks(flowToken);

            ReleaseAllLocks(instanceId);

            SetWorkflowInstanceStatus(instanceId, WorkflowInstanceStatus.Terminated, false);

            RemoveFlowControllerServicesContainer(instanceId);

            RemoveIfExistFormData(instanceId);

            RemovePersistingType(instanceId);

            DeletePersistedWorkflow(instanceId);

            DeletePersistedFormData(instanceId);

            using (ThreadDataManager.EnsureInitialize())
            {
                FlowControllerFacade.FlowComplete(new WorkflowFlowToken(instanceId));
            }
        }



        private void InitializeFormsWorkflowRuntime()
        {
            _formsWorkflowEventService = new FormsWorkflowEventService();
            _externalDataExchangeService.AddService(_formsWorkflowEventService);


            IFormsWorkflowActivityService formsWorkflowActivityService = new FormsWorkflowActivityService();
            _externalDataExchangeService.AddService(formsWorkflowActivityService);
        }



        [DebuggerHidden]
        private void HandleWorkflowPersistedEvent(object sender, WorkflowEventArgs args)
        {
            var instance = args.WorkflowInstance;

            try
            {
                LoggingService.LogVerbose(
                    "WorkflowFacade",
                    string.Format("Workflow persisted, Activity = {0}, Id = {1}", instance.GetWorkflowDefinition().GetType(), instance.InstanceId));
            }
            catch (Exception)
            {
                LoggingService.LogVerbose("WorkflowFacade", "Workflow persisted, Id = {0}" + instance.InstanceId);
            }                
        }



        [DebuggerHidden]
        private void HandleWorkflowAbortedEvent(object sender, WorkflowEventArgs args)
        {
            var instance = args.WorkflowInstance;

            try
            {                
                LoggingService.LogVerbose(
                    "WorkflowFacade",
                    string.Format("Workflow aborted, Activity = {0}, Id = {1}", instance.GetWorkflowDefinition().GetType(), instance.InstanceId));
            }
            catch (Exception)
            {
                LoggingService.LogVerbose("WorkflowFacade", "Workflow aborted Id = "+ instance.InstanceId);
            }
        }
        


        private void AddWorkflowLoggingEvents()
        {
            _workflowRuntime.WorkflowAborted += HandleWorkflowAbortedEvent;
            

            //_workflowRuntime.WorkflowCompleted += delegate(object sender, WorkflowCompletedEventArgs args)
            //{
            //    LoggingService.LogVerbose(
            //        "WorkflowFacade",
            //        string.Format("Workflow completed  - Id = {0}", args.WorkflowInstance.InstanceId));
            //};

            _workflowRuntime.WorkflowCreated += delegate(object sender, WorkflowEventArgs args)
            {
                LoggingService.LogVerbose(
                    "WorkflowFacade",
                    string.Format("Workflow created, Activity = {1}, Id = {0}", args.WorkflowInstance.GetWorkflowDefinition().GetType(), args.WorkflowInstance.InstanceId));
            };

            //_workflowRuntime.WorkflowIdled += delegate(object sender, WorkflowEventArgs args)
            //{
            //    LoggingService.LogVerbose(
            //        "WorkflowFacade",
            //        string.Format("Workflow idled      - Id = {0}", args.WorkflowInstance.InstanceId));
            //};

            _workflowRuntime.WorkflowLoaded += delegate(object sender, WorkflowEventArgs args)
            {
                LoggingService.LogVerbose(
                    "WorkflowFacade",
                    string.Format("Workflow loaded, Activity = {0}, Id = {1}", args.WorkflowInstance.GetWorkflowDefinition().GetType(), args.WorkflowInstance.InstanceId));
            };


            _workflowRuntime.WorkflowPersisted += HandleWorkflowPersistedEvent;

          /*  _workflowRuntime.WorkflowPersisted += delegate(object sender, WorkflowEventArgs args)
            {                
                //try
                //{
                //    LoggingService.LogVerbose(
                //        "WorkflowFacade",
                //        string.Format("Workflow persisted, Activity = {0}, Id = {1}", args.WorkflowInstance.GetWorkflowDefinition().GetType(), args.WorkflowInstance.InstanceId));
                //}
                //catch (Exception)
                //{
                //    LoggingService.LogVerbose(
                //        "WorkflowFacade",
                //        string.Format("Workflow persisted, Id = {0}", args.WorkflowInstance.InstanceId));
                //}                
            };*/

            //_workflowRuntime.WorkflowResumed += delegate(object sender, WorkflowEventArgs args)
            //{
            //    LoggingService.LogVerbose(
            //        "WorkflowFacade",
            //        string.Format("Workflow resumed    - Id = {0}", args.WorkflowInstance.InstanceId));
            //};

            //_workflowRuntime.WorkflowStarted += delegate(object sender, WorkflowEventArgs args)
            //{
            //    LoggingService.LogVerbose(
            //        "WorkflowFacade",
            //        string.Format("Workflow started    - Id = {0}", args.WorkflowInstance.InstanceId));
            //};

            //_workflowRuntime.WorkflowSuspended += delegate(object sender, WorkflowSuspendedEventArgs args)
            //{
            //    LoggingService.LogVerbose(
            //        "WorkflowFacade",
            //        string.Format("Workflow suspended  - Id = {0}, Error = {1}", args.WorkflowInstance.InstanceId, args.Error));
            //};

            _workflowRuntime.WorkflowTerminated += delegate(object sender, WorkflowTerminatedEventArgs args)
            {
                StringBuilder sb = new StringBuilder();
                sb.AppendLine(string.Format("Workflow terminated - Id = {0}, Exception:", args.WorkflowInstance.InstanceId));
                sb.AppendLine(args.Exception.Message);
                sb.AppendLine(args.Exception.StackTrace);

                LoggingService.LogCritical(
                    "WorkflowFacade",
                    sb.ToString());
            };

            _workflowRuntime.WorkflowUnloaded += delegate(object sender, WorkflowEventArgs args)
            {
                //LoggingService.LogVerbose(
                //    "WorkflowFacade",
                //    string.Format("Workflow unloaded   - Id = {0}", args.WorkflowInstance.InstanceId));
            };
        }



        private void LoadPersistedWorkflows()
        {
            foreach (Guid instanceId in _fileWorkFlowPersisetenceService.GetPersistedWorkflows())
            {
                if ((_resourceLocker.Resources.WorkflowStatusDictionary.ContainsKey(instanceId) == false) ||
                    (_resourceLocker.Resources.WorkflowStatusDictionary[instanceId] != WorkflowInstanceStatus.Running))
                {
                    // This will make the runtime load the persised workflow
                    WorkflowInstance workflowInstance = null;
                    try
                    {
                        workflowInstance = WorkflowRuntime.GetWorkflow(instanceId);
                    }
                    catch (InvalidOperationException)
                    {
                        _fileWorkFlowPersisetenceService.RemovePersistedWorkflow(instanceId);
                    }

                    if(workflowInstance != null
                        && !_resourceLocker.Resources.WorkflowPersistingTypeDictionary.ContainsKey(instanceId))
                    {
                        Type workflowType = workflowInstance.GetWorkflowDefinition().GetType();
                        SetWorkflowPersistingType(workflowType, instanceId);
                    }
                }
            }
        }



        private void LoadPerssistedFormDatas()
        {
            using (_resourceLocker.Locker)
            {
                foreach (string filename in C1Directory.GetFiles(SerializedWorkflowsDirectory, "*.xml"))
                {
                    string guidString = Path.GetFileNameWithoutExtension(filename);
                    Guid id = new Guid(guidString);

                    XDocument doc = XDocumentUtils.Load(filename);

                    try
                    {
                        FormData formData = FormData.Deserialize(doc.Root);

                        if (_resourceLocker.Resources.FormDatas.ContainsKey(id) == false)
                        {
                            _resourceLocker.Resources.FormDatas.Add(id, formData);
                            FormsWorkflowBindingCache.Bindings.Add(id, formData.Bindings);
                        }
                    }
                    catch (DataSerilizationException)
                    {
                        AbortWorkflow(id);

                        LoggingService.LogVerbose("WorkflowFacade", string.Format("The workflow {0} contained one or more bindings where data was deleted or data type changed, workflow can not be resumed", id));

                    }
                    catch (Exception ex)
                    {                        
                        AbortWorkflow(id);

                        LoggingService.LogCritical("WorkflowFacade", string.Format("Could not deserialize form data for the workflow {0}", id));
                        LoggingService.LogCritical("WorkflowFacade", "Original form data:");
                        LoggingService.LogCritical("WorkflowFacade", doc.Root.ToString());
                        LoggingService.LogCritical("WorkflowFacade", ex);
                    }
                }
            }
        }



        private void AbortWorkflows()
        {
            List<Guid> workflowsToCancel =
                (from kp in _resourceLocker.Resources.WorkflowPersistingTypeDictionary
                 where kp.Value == WorkflowPersistingType.Never
                 select kp.Key).ToList();

            foreach (Guid instanceId in workflowsToCancel)
            {
                AbortWorkflow(instanceId);
            }
        }



        private void RemoveAbortedPersistedWorkflow()
        {
            using (_resourceLocker.Locker)
            {
                IEnumerable<Guid> instanceIds =
                    from kvp in _resourceLocker.Resources.WorkflowPersistingTypeDictionary
                    where kvp.Value == WorkflowPersistingType.Never
                    select kvp.Key;

                foreach (Guid instanceId in instanceIds)
                {
                    _fileWorkFlowPersisetenceService.RemovePersistedWorkflow(instanceId);
                }
            }
        }



        private void PersistExistingWorkflows()
        {
            _fileWorkFlowPersisetenceService.PersistAll = true;

            IEnumerable<Guid> abortedWorkflows = _fileWorkFlowPersisetenceService.GetAbortedWorkflows();

            foreach (Guid instanceId in _resourceLocker.Resources.WorkflowStatusDictionary.Keys.ToList())
            {
                if(abortedWorkflows.Contains(instanceId))
                {
                    continue;
                }

                WorkflowPersistingType workflowPersistingType;

                if (_resourceLocker.Resources.WorkflowPersistingTypeDictionary.TryGetValue(instanceId, out workflowPersistingType)
                    && workflowPersistingType != WorkflowPersistingType.Never)
                {
                    UnloadSilent(instanceId);
                }
            }

            _fileWorkFlowPersisetenceService.PersistAll = false;
        }

        [DebuggerHidden]
        private void UnloadSilent(Guid instanceId)
        {
            try
            {
                WorkflowInstance workflowInstance = WorkflowRuntime.GetWorkflow(instanceId);
                workflowInstance.Unload();
            }
            catch (Exception)
            {
                // Ignore, the workflow is already dead
            }
        }


        private void PersistFormDatas()
        {
            var resources = _resourceLocker.Resources;

            List<Guid> instanceIds =
                (from kvp in resources.WorkflowPersistingTypeDictionary
                 where kvp.Value != WorkflowPersistingType.Never
                 select kvp.Key).ToList();

            // Copying collection since it may be modified why execution of forech-statement
            var formDataSetToBePersisted = resources.FormDatas.Where(f => instanceIds.Contains(f.Key)).ToList();

            foreach (var kvp in formDataSetToBePersisted)
            {
                Guid instanceid = kvp.Key;

                try
                {
                    XElement element = kvp.Value.Serialize();

                    string filename = Path.Combine(SerializedWorkflowsDirectory, string.Format("{0}.xml", instanceid));

                    XDocument doc = new XDocument(element);
                    doc.SaveToFile(filename);

                    LoggingService.LogVerbose("WorkflowFacade", string.Format("FormData persisted for workflow id = {0}", instanceid));
                }
                catch (Exception ex)
                {
                    // Stop trying serializing this workflow
                    AbortWorkflow(instanceid);

                    LoggingService.LogCritical("WorkflowFacade", ex);
                }
            }
        }



        private void DeletePersistedWorkflow(Guid instanceId)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                _fileWorkFlowPersisetenceService.RemovePersistedWorkflow(instanceId);
            }
        }



        private void DeletePersistedFormData(Guid instanceId)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                string filename = Path.Combine(SerializedWorkflowsDirectory, string.Format("{0}.xml", instanceId));

                if (C1File.Exists(filename) == true)
                {
                    C1File.Delete(filename);

                    LoggingService.LogVerbose("WorkflowFacade", string.Format("Persisted FormData deleted for workflow id = {0}", instanceId));
                }
            }
        }



        private void DeleteOldWorkflows()
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                foreach (string filename in C1Directory.GetFiles(SerializedWorkflowsDirectory))
                {
                    DateTime creationTime = C1File.GetLastWriteTime(filename);

                    if (DateTime.Now.Subtract(creationTime) > _oldFileExistensTimeout)
                    {
                        Guid instanceId = new Guid(Path.GetFileNameWithoutExtension(filename));

                        if (Path.GetExtension(filename) == "bin")
                        {
                            try
                            {
                                WorkflowRuntime.GetWorkflow(instanceId);
                                AbortWorkflow(instanceId);
                            }
                            catch (Exception)
                            {
                            }
                        }

                        C1File.Delete(filename);

                        LoggingService.LogVerbose("WorkflowFacade", string.Format("Old workflow instance file deleted {0}", filename));
                    }
                }
            }
        }



        private static string SerializedWorkflowsDirectory
        {
            get
            {
                string directory = PathUtil.Resolve(GlobalSettingsFacade.SerializedWorkflowsDirectory);
                if (C1Directory.Exists(directory) == false)
                {
                    C1Directory.CreateDirectory(directory);
                }

                return directory;
            }
        }


        private static bool ConsoleIdEquals(FlowControllerServicesContainer flowControllerServicesContainer, string consoleId)
        {
            if (flowControllerServicesContainer == null) return false;

            IManagementConsoleMessageService managementConsoleMessageService = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

            if (managementConsoleMessageService == null) return false;

            if (managementConsoleMessageService.CurrentConsoleId == consoleId) return true;

            return false;
        }



        private enum WorkflowInstanceStatus
        {
            Idle,
            Running,
            Terminated
        }



        private sealed class Resources
        {
            public Resources()
            {
                this.WorkflowStatusDictionary = new Dictionary<Guid, WorkflowInstanceStatus>();
                this.FormDatas = new Dictionary<Guid, FormData>();
                this.FlowControllerServicesContainers = new Dictionary<Guid, FlowControllerServicesContainer>();
                this.WorkflowPersistingTypeDictionary = new Dictionary<Guid, WorkflowPersistingType>();
                this.EventHandleFilters = new Dictionary<Type, IEventHandleFilter>();
            }

            public Dictionary<Guid, WorkflowInstanceStatus> WorkflowStatusDictionary { get; set; }
            public Dictionary<Guid, FormData> FormDatas { get; set; }
            public Dictionary<Guid, FlowControllerServicesContainer> FlowControllerServicesContainers { get; set; }

            public Dictionary<Guid, WorkflowPersistingType> WorkflowPersistingTypeDictionary { get; set; }

            public Dictionary<Guid, Semaphore> WorkflowIdleWaitSemaphoes { get; set; }
            public Dictionary<int, Exception> ExceptionFromWorkflow { get; set; }

            public Dictionary<Type, IEventHandleFilter> EventHandleFilters { get; set; }

            public static void InitializeResources(Resources resources)
            {
                IEnumerable<Guid> instanceIds =
                    (from kvp in resources.WorkflowPersistingTypeDictionary
                     where kvp.Value == WorkflowPersistingType.Never
                     select kvp.Key).ToList();

                foreach (Guid instanceId in instanceIds)
                {
                    if (resources.WorkflowStatusDictionary.ContainsKey(instanceId) == true)
                    {
                        resources.WorkflowStatusDictionary.Remove(instanceId);
                    }

                    if (resources.FormDatas.ContainsKey(instanceId) == true)
                    {
                        resources.FormDatas.Remove(instanceId);
                    }

                    if (resources.FlowControllerServicesContainers.ContainsKey(instanceId) == true)
                    {
                        resources.FlowControllerServicesContainers.Remove(instanceId);
                    }

                    resources.WorkflowPersistingTypeDictionary.Remove(instanceId);
                }

                resources.WorkflowIdleWaitSemaphoes = new Dictionary<Guid, Semaphore>();
                resources.ExceptionFromWorkflow = new Dictionary<int, Exception>();
            }
        }
    }
}
