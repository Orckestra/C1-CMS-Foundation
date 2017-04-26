using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Web.Hosting;
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
using Composite.Core;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Threading;
using Composite.Core.Types;
using Composite.Core.Xml;
using Composite.Data;


namespace Composite.C1Console.Workflow
{
    internal sealed class WorkflowFacadeImpl : IWorkflowFacade
    {
        private static readonly string LogTitle = "WorkflowFacade";
        private static readonly string LogTitleColored = "RGB(194, 252, 131)" + LogTitle;

        private static readonly TimeSpan OldFileExistenceTimeout = TimeSpan.FromDays(30.0);

        private Thread _initializeThread;
        private readonly object _initializeThreadLock = new object();
        private bool _isShutDown;
        private WorkflowRuntime _workflowRuntime;
        private readonly List<Action> _actionToRunWhenInitialized = new List<Action>();

        private ExternalDataExchangeService _externalDataExchangeService;
        private FormsWorkflowEventService _formsWorkflowEventService;
        private ManualWorkflowSchedulerService _manualWorkflowSchedulerService;
        private FileWorkflowPersistenceService _fileWorkflowPersistenceService;

        private readonly ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.InitializeResources);

        private readonly Dictionary<Type, bool> _hasEntityTokenLockAttributeCache = new Dictionary<Type, bool>();


        public WorkflowFacadeImpl()
        {
            string serializedWorkflowsDirectory = PathUtil.Resolve(GlobalSettingsFacade.SerializedWorkflowsDirectory);
            string parentDirectory = Path.GetDirectoryName(serializedWorkflowsDirectory);
            string lockFileDirectory = Path.Combine(parentDirectory, "LockFiles");

            if (!C1Directory.Exists(lockFileDirectory)) C1Directory.CreateDirectory(lockFileDirectory);
        }


        public void EnsureInitialization()
        {
            if (_initializeThread != null) return;

            lock (_initializeThreadLock)
            {
                if (_initializeThread != null) return;
                
                ThreadStart threadStart = () =>
                    {
                        using(ThreadDataManager.EnsureInitialize()) 
                        {
                            int startTime = Environment.TickCount;
                            while (_workflowRuntime == null && !_isShutDown && startTime + 30000 > Environment.TickCount)
                            {
                                Thread.Sleep(100);
                            }

                            if (_workflowRuntime != null)
                            {
                                Log.LogVerbose(LogTitleColored, "Already initialized, skipping delayed initialization");
                                return;
                            }

                            if (_isShutDown || HostingEnvironment.ApplicationHost.ShutdownInitiated())
                            {
                                Log.LogVerbose(LogTitleColored, "System is shutting down, skipping delayed initialization");
                                return;
                            }

                            int endTime = Environment.TickCount;

                            try
                            {
                                using (_resourceLocker.Locker)
                                {
                                    DoInitialize(endTime - startTime);
                                }
                            }
                            catch (Exception ex)
                            {
                                if (_isShutDown || HostingEnvironment.ApplicationHost.ShutdownInitiated())
                                {
                                    Log.LogVerbose(LogTitleColored, "Delayed initialization has failed, but the exception is ignored as the website is shutting down");
                                    return;
                                }

                                Log.LogCritical(LogTitle, ex);
                            }
                        }
                    };

                _initializeThread = new Thread(threadStart);
                _initializeThread.Start();
                
            }
        }


        public WorkflowRuntime WorkflowRuntime
        {
            get
            {
                DoInitialize(0);

                return _workflowRuntime;
            }
        }



        public void RunWhenInitialized(Action action)
        {
            _actionToRunWhenInitialized.Add(action);
        }



        #region Workflow methods
        public WorkflowInstance CreateNewWorkflow(Type workflowType)
        {
            GlobalInitializerFacade.EnsureSystemIsInitialized();
            DoInitialize(0);

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
                Log.LogError("WorkflowFacade", errors.ToString());
                throw;
            }
        }



        public WorkflowInstance CreateNewWorkflow(Type workflowType, Dictionary<string, object> arguments)
        {
            GlobalInitializerFacade.EnsureSystemIsInitialized();
            DoInitialize(0);

            try
            {
                WorkflowInstance workflowInstance = _workflowRuntime.CreateWorkflow(workflowType, arguments);

                SetWorkflowPersistingType(workflowType, workflowInstance.InstanceId);

                if (arguments.ContainsKey("SerializedEntityToken")
                    && arguments.ContainsKey("SerializedActionToken"))
                {
                    ActionToken actionToken = ActionTokenSerializer.Deserialize((string)arguments["SerializedActionToken"]);

                    if (!actionToken.IgnoreEntityTokenLocking)
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
                Log.LogError("WorkflowFacade", errors.ToString());
                throw;
            }
        }



        public WorkflowFlowToken StartNewWorkflow(Type workflowType, FlowControllerServicesContainer flowControllerServicesContainer, EntityToken entityToken, ActionToken actionToken)
        {
            DoInitialize(0);

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
                Log.LogCritical(LogTitle, e);

                throw;
            }
        }



        public WorkflowInstance GetWorkflow(Guid instanceId)
        {
            DoInitialize(0);

            return _workflowRuntime.GetWorkflow(instanceId);
        }



        public StateMachineWorkflowInstance GetStateMachineWorkflowInstance(Guid instanceId)
        {
            DoInitialize(0);

            return new StateMachineWorkflowInstance(_workflowRuntime, instanceId);
        }



        public void RunWorkflow(Guid instanceId)
        {
            DoInitialize(0);

            using (_resourceLocker.Locker)
            {
                SetWorkflowInstanceStatus(instanceId, WorkflowInstanceStatus.Running, false);

                _manualWorkflowSchedulerService.RunWorkflow(instanceId);

                int managedThreadId = Thread.CurrentThread.ManagedThreadId;

                Exception exception;
                if (_resourceLocker.Resources.ExceptionFromWorkflow.TryGetValue(managedThreadId, out exception))
                {
                    _resourceLocker.Resources.ExceptionFromWorkflow.Remove(managedThreadId);

                    throw new InvalidOperationException("Error executing workflow " + instanceId, exception);
                }
            }
        }



        public void RunWorkflow(WorkflowInstance workflowInstance)
        {
            RunWorkflow(workflowInstance.InstanceId);
        }


        public void AbortWorkflow(Guid instanceId)
        {
            DoInitialize(0);

            using (_resourceLocker.Locker)
            {
                if (AbortedWorkflows.Contains(instanceId)) return;
                AbortedWorkflows.Add(instanceId);

                if (_resourceLocker.Resources.WorkflowStatusDictionary.ContainsKey(instanceId))
                {
                    var workflowInstance = WorkflowRuntime.GetWorkflow(instanceId);

                    workflowInstance.Abort();
                    
                    Exception exception;
                    if (_resourceLocker.Resources.ExceptionFromWorkflow.TryGetValue(Thread.CurrentThread.ManagedThreadId, out exception))
                    {
                        _resourceLocker.Resources.ExceptionFromWorkflow.Remove(Thread.CurrentThread.ManagedThreadId);

                        throw exception;
                    }
                }
            }
        }



        private void SetWorkflowPersistingType(Type workflowType, Guid instanceId)
        {
            List<AllowPersistingWorkflowAttribute> attributes = workflowType.GetCustomAttributesRecursively<AllowPersistingWorkflowAttribute>().ToList();

            Verify.That(attributes.Count <= 1, "More than one attribute of type '{0}' found", typeof(AllowPersistingWorkflowAttribute).FullName);

            var persistenceType = attributes.Count == 1 ? attributes[0].WorkflowPersistingType : WorkflowPersistingType.Never;

            using (_resourceLocker.Locker)
            {
                _resourceLocker.Resources.WorkflowPersistingTypeDictionary.Add(instanceId, persistenceType);
            }
        }



        private void RemovePersistingType(Guid instanceId)
        {
            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.WorkflowPersistingTypeDictionary.ContainsKey(instanceId))
                {
                    _resourceLocker.Resources.WorkflowPersistingTypeDictionary.Remove(instanceId);
                }
            }
        }



        private void AcquireLockIfNeeded(Type workflowType, Guid instanceId, string serializedEntityToken)
        {
            if (HasEntityTokenLockAttribute(workflowType))
            {
                EntityToken entityToken = EntityTokenSerializer.Deserialize(serializedEntityToken);

                AcquireLock(instanceId, entityToken);
            }
        }



        private void AcquireLockIfNeeded(Type workflowType, Guid instanceId, EntityToken entityToken)
        {
            if (HasEntityTokenLockAttribute(workflowType))
            {
                AcquireLock(instanceId, entityToken);
            }
        }



        public void AcquireLock(Guid instanceId, EntityToken entityToken)
        {
            Verify.That(!ActionLockingFacade.IsLocked(entityToken), "The entityToken is already locked");

            ActionLockingFacade.AcquireLock(entityToken, instanceId);
        }



        private void ReleaseAllLocks(Guid instanceId)
        {
            ActionLockingFacade.ReleaseAllLocks(instanceId);
        }



        private bool HasEntityTokenLockAttribute(Type workflowType)
        {
            bool hasEntityLockAttribute;
            if (!_hasEntityTokenLockAttributeCache.TryGetValue(workflowType, out hasEntityLockAttribute))
            {
                hasEntityLockAttribute = workflowType.GetCustomAttributesRecursively<EntityTokenLockAttribute>().Any();

                _hasEntityTokenLockAttributeCache.Add(workflowType, hasEntityLockAttribute);
            }

            return hasEntityLockAttribute;
        }
        #endregion



        #region FlowControllerServices methods
        public void SetFlowControllerServicesContainer(Guid instanceId, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            DoInitialize(0);

            using (_resourceLocker.Locker)
            {
                if (!_resourceLocker.Resources.FlowControllerServicesContainers.ContainsKey(instanceId))
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
            DoInitialize(0);

            FlowControllerServicesContainer flowControllerServicesContainer;

            using (_resourceLocker.Locker)
            {
                _resourceLocker.Resources.FlowControllerServicesContainers.TryGetValue(instanceId, out flowControllerServicesContainer);
            }

            return flowControllerServicesContainer;
        }



        public void RemoveFlowControllerServicesContainer(Guid instanceId)
        {
            DoInitialize(0);

            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.FlowControllerServicesContainers.ContainsKey(instanceId))
                {
                    _resourceLocker.Resources.FlowControllerServicesContainers.Remove(instanceId);
                }
            }
        }
        #endregion



        #region Workflow status methods
        public bool WorkflowExists(Guid instanceId)
        {
            DoInitialize(0);

            using (_resourceLocker.Locker)
            {
                return _resourceLocker.Resources.WorkflowStatusDictionary.ContainsKey(instanceId);
            }
        }



        public Semaphore WaitForIdleStatus(Guid instanceId)
        {
            DoInitialize(0);

            using (_resourceLocker.Locker)
            {
                WorkflowInstanceStatus workflowInstanceStatus;
                if (!_resourceLocker.Resources.WorkflowStatusDictionary.TryGetValue(instanceId, out workflowInstanceStatus))
                {
                    throw new InvalidOperationException($"The workflow with the id '{instanceId}' is unknown");
                }

                if (workflowInstanceStatus == WorkflowInstanceStatus.Idle)
                {
                    return null;
                }
                
                if (_resourceLocker.Resources.WorkflowIdleWaitSemaphores.ContainsKey(instanceId))
                {
                    _resourceLocker.Resources.WorkflowIdleWaitSemaphores.Remove(instanceId);
                }

                Semaphore semaphore = new Semaphore(0, 1);
                _resourceLocker.Resources.WorkflowIdleWaitSemaphores.Add(instanceId, semaphore);
                return semaphore;
            }
        }



        private void SetWorkflowInstanceStatus(Guid instanceId, WorkflowInstanceStatus workflowInstanceStatus, bool newlyCreateOrLoaded)
        {
            using (_resourceLocker.Locker)
            {
                var resources = _resourceLocker.Resources;

                string identity = UserValidationFacade.IsLoggedIn() ? UserValidationFacade.GetUsername() : "(system process)";

                Action releaseIdleWaitSemaphore = () =>
                {
                    if (resources.WorkflowIdleWaitSemaphores.ContainsKey(instanceId))
                    {
                        resources.WorkflowIdleWaitSemaphores[instanceId].Release();
                        resources.WorkflowIdleWaitSemaphores.Remove(instanceId);
                    }
                };

                switch (workflowInstanceStatus)
                {
                    case WorkflowInstanceStatus.Idle:
                        releaseIdleWaitSemaphore();

                        if (!resources.WorkflowStatusDictionary.ContainsKey(instanceId) && newlyCreateOrLoaded)
                        {
                            resources.WorkflowStatusDictionary.Add(instanceId, WorkflowInstanceStatus.Idle);
                        }

                        resources.WorkflowStatusDictionary[instanceId] = WorkflowInstanceStatus.Idle;                        

                        PersistFormData(instanceId);

                        break;

                    case WorkflowInstanceStatus.Running:
                        resources.WorkflowStatusDictionary[instanceId] = WorkflowInstanceStatus.Running;
                        break;

                    case WorkflowInstanceStatus.Terminated:
                        releaseIdleWaitSemaphore();
                        resources.WorkflowStatusDictionary.Remove(instanceId);
                        break;
                    default:
                        throw new InvalidOperationException("This line should not be reachable.");
                }

                Log.LogVerbose(LogTitle, "Workflow instance status changed to {0}. Id = {1}, User = {2}", workflowInstanceStatus, instanceId, identity);
            }
        }
        #endregion



        #region Form workflow methods
        public void SetEventHandlerFilter(Guid instanceId, Type eventHandlerFilterType)
        {
            DoInitialize(0);

            if (eventHandlerFilterType != null)
            {
                Verify.That(typeof(IEventHandleFilter).IsAssignableFrom(eventHandlerFilterType), "The argument eventHandlerFilterType does dot implement the interface '{0}'", typeof(IEventHandleFilter));

                FormData formData = GetFormData(instanceId);
                if (formData != null)
                {
                    formData.EventHandleFilterType = eventHandlerFilterType;
                }
            }
        }



        public IEventHandleFilter GetEventHandleFilter(Guid instanceId)
        {
            DoInitialize(0);

            FormData formData = GetFormData(instanceId);

            if (formData == null || formData.EventHandleFilterType == null) return null;

            IEventHandleFilter eventHandleFilter;
            using (_resourceLocker.Locker)
            {
                if (!_resourceLocker.Resources.EventHandleFilters.TryGetValue(formData.EventHandleFilterType, out eventHandleFilter))
                {
                    eventHandleFilter = (IEventHandleFilter)Activator.CreateInstance(formData.EventHandleFilterType);
                    _resourceLocker.Resources.EventHandleFilters.Add(formData.EventHandleFilterType, eventHandleFilter);
                }
            }

            return eventHandleFilter;
        }



        public IEnumerable<string> GetCurrentFormEvents(Guid instanceId)
        {
            DoInitialize(0);

            IEnumerable<string> eventNames = new StateMachineWorkflowInstance(WorkflowFacade.WorkflowRuntime, instanceId).GetCurrentEventNames(typeof(IFormsWorkflowEventService));

            return eventNames;
        }



        public IEnumerable<string> GetCurrentFormEvents(WorkflowInstance workflowInstance)
        {
            DoInitialize(0);

            return GetCurrentFormEvents(workflowInstance.InstanceId);
        }



        public void FireSaveEvent(Guid instanceId, Dictionary<string, object> bindings)
        {
            DoInitialize(0);

            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.WorkflowStatusDictionary.ContainsKey(instanceId))
                {
                    _formsWorkflowEventService.FireSaveEvent(new FormEventArgs(instanceId, bindings));
                }
            }
        }



        public void FireSaveAndPublishEvent(Guid instanceId, Dictionary<string, object> bindings)
        {
            DoInitialize(0);

            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.WorkflowStatusDictionary.ContainsKey(instanceId))
                {
                    _formsWorkflowEventService.FireSaveAndPublishEvent(new FormEventArgs(instanceId, bindings));
                }
            }
        }



        public void FireNextEvent(Guid instanceId, Dictionary<string, object> bindings)
        {
            DoInitialize(0);

            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.WorkflowStatusDictionary.ContainsKey(instanceId))
                {
                    _formsWorkflowEventService.FireNextEvent(new FormEventArgs(instanceId, bindings));
                }
            }
        }



        public void FirePreviousEvent(Guid instanceId, Dictionary<string, object> bindings)
        {
            DoInitialize(0);

            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.WorkflowStatusDictionary.ContainsKey(instanceId))
                {
                    _formsWorkflowEventService.FirePreviousEvent(new FormEventArgs(instanceId, bindings));
                }
            }
        }



        public void FireFinishEvent(Guid instanceId, Dictionary<string, object> bindings)
        {
            DoInitialize(0);

            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.WorkflowStatusDictionary.ContainsKey(instanceId))
                {
                    _formsWorkflowEventService.FireFinishEvent(new FormEventArgs(instanceId, bindings));
                }
            }
        }



        public void FireCancelEvent(Guid instanceId, Dictionary<string, object> bindings)
        {
            DoInitialize(0);

            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.WorkflowStatusDictionary.ContainsKey(instanceId))
                {
                    _formsWorkflowEventService.FireCancelEvent(new FormEventArgs(instanceId, bindings));
                }
            }
        }



        public void FirePreviewEvent(Guid instanceId, Dictionary<string, object> bindings)
        {
            DoInitialize(0);

            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.WorkflowStatusDictionary.ContainsKey(instanceId))
                {
                    _formsWorkflowEventService.FirePreviewEvent(new FormEventArgs(instanceId, bindings));
                }
            }
        }



        public void FireCustomEvent(int customEventNumber, Guid instanceId, Dictionary<string, object> bindings)
        {
            DoInitialize(0);

            if (customEventNumber < 1 || customEventNumber > 5) throw new ArgumentException("Number must be between 1 and 5", "customEventNumber");

            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.WorkflowStatusDictionary.ContainsKey(instanceId))
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
                    }
                }
            }
        }



        public void FireChildWorkflowDoneEvent(Guid parentInstanceId, string workflowResult)
        {
            DoInitialize(0);

            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.WorkflowStatusDictionary.ContainsKey(parentInstanceId))
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
                _resourceLocker.Resources.FormData.Add(instanceId, formData);
            }
        }



        public bool TryGetFormData(Guid instanceId, out FormData formData)
        {
            using (_resourceLocker.Locker)
            {
                return _resourceLocker.Resources.FormData.TryGetValue(instanceId, out formData);
            }
        }



        public FormData GetFormData(Guid instanceId, bool allowCreationIfNotExisting = false)
        {
            FormData formData;
            if (!TryGetFormData(instanceId, out formData) && allowCreationIfNotExisting)
            {
                formData = new FormData();
                AddFormData(instanceId, formData);
            }

            return formData;
        }



        private void RemoveIfExistFormData(Guid instanceId)
        {
            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.FormData.ContainsKey(instanceId))
                {
                    _resourceLocker.Resources.FormData.Remove(instanceId);
                }
            }
        }
        #endregion



        public void Flush()
        {
            _workflowRuntime = null;
            _externalDataExchangeService = null;
            _manualWorkflowSchedulerService = null;
            _fileWorkflowPersistenceService = null;
            _formsWorkflowEventService = null;

            _resourceLocker.ResetInitialization();
        }



        public void ShutDown()
        {
            _isShutDown = true;

            Log.LogVerbose(LogTitleColored, "----------========== Finalizing Workflows ==========----------");
            int startTime = Environment.TickCount;

            while (_workflowRuntime == null && Environment.TickCount - startTime < 5000)
                Thread.Sleep(10);

            if (_workflowRuntime != null)
            {
                // system shut down - close all console bound resources
                using (_resourceLocker.Locker)
                {
                    using (GlobalInitializerFacade.CoreIsInitializedScope)
                    {
                        PersistFormData();

                        UnloadWorkflowsSilent();

                        RemoveNotPersistableWorkflowsState();
                    }
                }
            }

            _workflowRuntime = null;

            int endTime = Environment.TickCount;
            Log.LogVerbose(LogTitleColored, "----------========== Done finalizing Workflows ({0} ms ) ==========----------", endTime - startTime);
        }



        public void ConsoleClosed(ConsoleClosedEventArgs args)
        {
            DoInitialize(0);

            using (_resourceLocker.Locker)
            {
                List<Guid> workflowsToCancel =
                    (from kp in _resourceLocker.Resources.FlowControllerServicesContainers
                     where ConsoleIdEquals(kp.Value, args.ConsoleId)
                     select kp.Key).ToList();

                foreach (Guid instanceId in workflowsToCancel)
                {
                    try
                    {
                        AbortWorkflow(instanceId);
                    }
                    catch(Exception ex)
                    {
                        Log.LogError(LogTitle, "Error aborting workflow " + instanceId);
                        Log.LogError(LogTitle, ex);
                    }
                }
            }
        }



        private void DoInitialize(int delayedTime)
        {
            if (_workflowRuntime != null) return;
            
            using (GlobalInitializerFacade.CoreNotLockedScope)
            using (_resourceLocker.Locker)
            {
                if (_workflowRuntime != null) return;

                Log.LogVerbose(LogTitleColored, "----------========== Initializing Workflows (Delayed: {0}) ==========----------", delayedTime);
                int startTime = Environment.TickCount;

                _resourceLocker.ResetInitialization();

                _workflowRuntime = InitializeWorkflowRuntime();

                InitializeFormsWorkflowRuntime();

                if (!_workflowRuntime.IsStarted)
                {
                    _workflowRuntime.StartRuntime();
                }

                DeleteOldWorkflows();


                _fileWorkflowPersistenceService.ListenToDynamicallyAddedWorkflows(OnNewWorkflowFileAdded);
                LoadPersistedWorkflows();
                LoadPersistedFormData();

                int endTime = Environment.TickCount;
                Log.LogVerbose(LogTitleColored, "----------========== Done initializing Workflows ({0} ms ) ==========----------", endTime - startTime);

                foreach (Action action in _actionToRunWhenInitialized)
                {
                    action();
                }
            }
        }



        private WorkflowRuntime InitializeWorkflowRuntime()
        {
            WorkflowRuntime workflowRuntime;

            if (WorkflowRuntimeProviderPluginFacade.HasConfiguration)
            {
                string providerName = WorkflowRuntimeProviderRegistry.DefaultWorkflowRuntimeProviderName;

                workflowRuntime = WorkflowRuntimeProviderPluginFacade.GetWorkflowRuntime(providerName);
            }
            else
            {
                Log.LogVerbose(LogTitle, "Using default workflow runtime");
                workflowRuntime = new WorkflowRuntime();
            }


            _manualWorkflowSchedulerService = new ManualWorkflowSchedulerService(true);
            workflowRuntime.AddService(_manualWorkflowSchedulerService);

            _fileWorkflowPersistenceService = new FileWorkflowPersistenceService(SerializedWorkflowsDirectory);
            workflowRuntime.AddService(_fileWorkflowPersistenceService);

            _externalDataExchangeService = new ExternalDataExchangeService();
            workflowRuntime.AddService(_externalDataExchangeService);


            AddWorkflowLoggingEvents(workflowRuntime);


            workflowRuntime.WorkflowCompleted += (sender, args) =>
            {
                using (ThreadDataManager.EnsureInitialize())
                {
                    OnWorkflowInstanceTerminatedCleanup(args.WorkflowInstance.InstanceId);
                }
            };



            workflowRuntime.WorkflowAborted += (sender, args) =>
            {
                using (ThreadDataManager.EnsureInitialize())
                {
                    OnWorkflowInstanceTerminatedCleanup(args.WorkflowInstance.InstanceId);
                }
            };



            workflowRuntime.WorkflowTerminated += (sender, args) =>
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



            workflowRuntime.WorkflowCreated += (sender, args) =>
                SetWorkflowInstanceStatus(args.WorkflowInstance.InstanceId, WorkflowInstanceStatus.Idle, true);

            workflowRuntime.WorkflowIdled += (sender, args) =>
                SetWorkflowInstanceStatus(args.WorkflowInstance.InstanceId, WorkflowInstanceStatus.Idle, false);

            workflowRuntime.WorkflowLoaded += (sender, args) => 
                SetWorkflowInstanceStatus(args.WorkflowInstance.InstanceId, WorkflowInstanceStatus.Idle, true);

            return workflowRuntime;
        }



        private void OnWorkflowInstanceTerminatedCleanup(Guid instanceId)
        {
            AbortedWorkflows.Remove(instanceId);

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
        private void LogWorkflowChange(string change, WorkflowEventArgs args, bool logUserName, bool workflowDefinitionAvailable, bool error)
        {
            WorkflowInstance instance = null;

            string activityTypeName = null;

            try
            {
                instance = args.WorkflowInstance;
            }
            catch 
            {
                // Silent
            }

            if (workflowDefinitionAvailable && instance != null)
            {
                try
                {
                    activityTypeName = instance.GetWorkflowDefinition().GetType().FullName;
                }
                catch
                {
                    // Silent
                }
            }

            var message = new StringBuilder("Workflow ").Append(change);

            if (activityTypeName != null)
            {
                message.Append(", Activity = " + activityTypeName);
            }

            if (instance != null)
            {
                message.Append(", Id = " + instance.InstanceId);
            }

            if (logUserName)
            {
                string identity = UserValidationFacade.IsLoggedIn() ? UserValidationFacade.GetUsername() : "(system process)";
                message.Append(", User = " + identity);
            }

            if (!error)
            {
                Log.LogVerbose(LogTitle, message.ToString());
            }
            else
            {
                Log.LogError(LogTitle, message.ToString());
            }
        }



        private void AddWorkflowLoggingEvents(WorkflowRuntime workflowRuntime)
        {

            workflowRuntime.WorkflowCreated += (sender, args) => LogWorkflowChange("created", args, true, true, false);
            workflowRuntime.WorkflowLoaded += (sender, args) => LogWorkflowChange("loaded", args, true, true, false);
            workflowRuntime.WorkflowPersisted += (sender, args) => LogWorkflowChange("persisted", args, false, false, false);
            workflowRuntime.WorkflowAborted += (sender, args) => LogWorkflowChange("aborted", args, false, false, true);

            workflowRuntime.WorkflowTerminated += (sender, args) =>
            {
                Log.LogError(LogTitle, "Workflow terminated - Id = {0}, Exception:",
                                args.WorkflowInstance.InstanceId);
                Log.LogError(LogTitle, args.Exception);
            };
        }



        private void LoadPersistedWorkflows()
        {
            foreach (Guid instanceId in _fileWorkflowPersistenceService.GetPersistedWorkflows())
            {
                LoadPersistedWorkflow(instanceId);
            }
        }


        private void LoadPersistedWorkflow(Guid instanceId)
        {
            WorkflowInstanceStatus status;
            if (!_resourceLocker.Resources.WorkflowStatusDictionary.TryGetValue(instanceId, out status)
                || status != WorkflowInstanceStatus.Running)
            {
                // This will make the runtime load the persisted workflow
                WorkflowInstance workflowInstance = null;
                try
                {
                    workflowInstance = WorkflowRuntime.GetWorkflow(instanceId);
                }
                catch (InvalidOperationException)
                {
                    _fileWorkflowPersistenceService.RemovePersistedWorkflow(instanceId);
                }

                if (workflowInstance != null
                    && !_resourceLocker.Resources.WorkflowPersistingTypeDictionary.ContainsKey(instanceId))
                {
                    Type workflowType = workflowInstance.GetWorkflowDefinition().GetType();
                    SetWorkflowPersistingType(workflowType, instanceId);
                }
            }
        } 


        private void LoadPersistedFormData()
        {
            using (_resourceLocker.Locker)
            {
                foreach (string filename in C1Directory.GetFiles(SerializedWorkflowsDirectory, "*.xml"))
                {
                    TryLoadPersistedFormData(filename);
                }
            }
        }

        private void TryLoadPersistedFormData(string filename)
        {
            string guidString = Path.GetFileNameWithoutExtension(filename);

            Guid id;
            if (!Guid.TryParse(guidString ?? "", out id)) return;

            try
            {
                var doc = XDocumentUtils.Load(filename);
                var formData = FormData.Deserialize(doc.Root);

                if (!_resourceLocker.Resources.FormData.ContainsKey(id))
                {
                    _resourceLocker.Resources.FormData.Add(id, formData);

                    FormsWorkflowBindingCache.Bindings.TryAdd(id, formData.Bindings);
                }
            }
            catch (DataSerilizationException ex)
            {
                Log.LogWarning(LogTitle, $"The workflow {id} contained one or more bindings where data was deleted or data type changed");
                Log.LogWarning(LogTitle, ex);

                //AbortWorkflow(id);
            }
            catch (Exception ex)
            {
                Log.LogCritical(LogTitle, $"Could not deserialize form data for the workflow {id}");
                Log.LogCritical(LogTitle, ex);
                AbortWorkflow(id);
            }
        }

        private void OnNewWorkflowFileAdded(Guid instanceId)
        {
            Thread.Sleep(100);

            if (HostingEnvironment.ApplicationHost.ShutdownInitiated()) return;
            Log.LogInformation(LogTitle, "New workflow detected: " + instanceId);

            LoadPersistedWorkflow(instanceId);

            string formDataFilename = GetFormDataFileName(instanceId);
            if (C1File.Exists(formDataFilename))
            {
                TryLoadPersistedFormData(formDataFilename);
            }
        }


        private void RemoveNotPersistableWorkflowsState()
        {
            using (_resourceLocker.Locker)
            {
                IEnumerable<Guid> instanceIds =
                    from kvp in _resourceLocker.Resources.WorkflowPersistingTypeDictionary
                    where kvp.Value == WorkflowPersistingType.Never
                    select kvp.Key;

                foreach (Guid instanceId in instanceIds)
                {
                    _fileWorkflowPersistenceService.RemovePersistedWorkflow(instanceId);
                }
            }
        }



        private void UnloadWorkflowsSilent()
        {
            _fileWorkflowPersistenceService.PersistAll = true;

            var abortedWorkflows = new HashSet<Guid>(_fileWorkflowPersistenceService.GetAbortedWorkflows());

            foreach (Guid instanceId in _resourceLocker.Resources.WorkflowStatusDictionary.Keys.ToList())
            {
                if (abortedWorkflows.Contains(instanceId))
                {
                    continue;
                }

                UnloadSilent(instanceId);
            }

            _fileWorkflowPersistenceService.PersistAll = false;
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


        static readonly HashSet<Guid> AbortedWorkflows = new HashSet<Guid>();

        private void PersistFormData(Guid instanceId)
        {
            var resources = _resourceLocker.Resources;

            bool shouldPersist =
                resources.WorkflowPersistingTypeDictionary
                         .Any(f => f.Key == instanceId && f.Value != WorkflowPersistingType.Never);

            if (!shouldPersist) return;


            FormData formData = resources.FormData.
                Where(f => f.Key == instanceId).
                Select(f => f.Value).
                SingleOrDefault();

            if (formData == null) return;

            PersistFormData(instanceId, formData);
        }



        private void PersistFormData()
        {
            var resources = _resourceLocker.Resources;

            List<Guid> instanceIds =
                (from kvp in resources.WorkflowPersistingTypeDictionary
                 where kvp.Value != WorkflowPersistingType.Never
                 select kvp.Key).ToList();

            // Copying collection since it may be modified why execution of forech-statement
            var formDataSetToBePersisted = resources.FormData.Where(f => instanceIds.Contains(f.Key)).ToList();

            foreach (var kvp in formDataSetToBePersisted)
            {
                PersistFormData(kvp.Key, kvp.Value);
            }
        }


        private void PersistFormData(Guid instanceId, FormData formData)
        {
            try
            {
                XElement element = formData.Serialize();

                string filename = GetFormDataFileName(instanceId);

                XDocument doc = new XDocument(element);
                doc.SaveToFile(filename);

                Log.LogVerbose(LogTitle, "FormData persisted for workflow id = " + instanceId);
            }
            catch (Exception ex)
            {
                // Stop trying serializing this workflow
                AbortWorkflow(instanceId);

                Log.LogCritical(LogTitle, ex);
            }
        }


        private void DeletePersistedWorkflow(Guid instanceId)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                _fileWorkflowPersistenceService.RemovePersistedWorkflow(instanceId);
            }
        }



        private void DeletePersistedFormData(Guid instanceId)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                string filename = GetFormDataFileName(instanceId);

                if (C1File.Exists(filename))
                {
                    C1File.Delete(filename);

                    Log.LogVerbose(LogTitle, $"Persisted FormData deleted for workflow id = {instanceId}");
                }
            }
        }


        private string GetFormDataFileName(Guid instanceId)
        {
            return Path.Combine(SerializedWorkflowsDirectory, $"{instanceId}.xml");
        }


        private void DeleteOldWorkflows()
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                foreach (string filename in C1Directory.GetFiles(SerializedWorkflowsDirectory))
                {
                    DateTime creationTime = C1File.GetLastWriteTime(filename);

                    if (DateTime.Now.Subtract(creationTime) > OldFileExistenceTimeout)
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

                        Log.LogVerbose(LogTitle, $"Old workflow instance file deleted {filename}");
                    }
                }
            }
        }



        private static string SerializedWorkflowsDirectory
        {
            get
            {
                string directory = PathUtil.Resolve(GlobalSettingsFacade.SerializedWorkflowsDirectory);
                if (!C1Directory.Exists(directory))
                {
                    C1Directory.CreateDirectory(directory);
                }

                return directory;
            }
        }


        private static bool ConsoleIdEquals(FlowControllerServicesContainer flowControllerServicesContainer, string consoleId)
        {
            if (flowControllerServicesContainer == null) return false;

            var managementConsoleMessageService = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

            if (managementConsoleMessageService == null) return false;

            return managementConsoleMessageService.CurrentConsoleId == consoleId;
        }



        private enum WorkflowInstanceStatus
        {
            Idle = 0,
            Running = 1,
            Terminated = 2
        }



        private sealed class Resources
        {
            public Resources()
            {
                this.WorkflowStatusDictionary = new Dictionary<Guid, WorkflowInstanceStatus>();
                this.FormData = new Dictionary<Guid, FormData>();
                this.FlowControllerServicesContainers = new Dictionary<Guid, FlowControllerServicesContainer>();
                this.WorkflowPersistingTypeDictionary = new Dictionary<Guid, WorkflowPersistingType>();
                this.EventHandleFilters = new Dictionary<Type, IEventHandleFilter>();
            }

            public Dictionary<Guid, WorkflowInstanceStatus> WorkflowStatusDictionary { get; set; }
            public Dictionary<Guid, FormData> FormData { get; set; }
            public Dictionary<Guid, FlowControllerServicesContainer> FlowControllerServicesContainers { get; set; }

            public Dictionary<Guid, WorkflowPersistingType> WorkflowPersistingTypeDictionary { get; set; }

            public Dictionary<Guid, Semaphore> WorkflowIdleWaitSemaphores { get; set; }
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
                    if (resources.WorkflowStatusDictionary.ContainsKey(instanceId))
                    {
                        resources.WorkflowStatusDictionary.Remove(instanceId);
                    }

                    if (resources.FormData.ContainsKey(instanceId))
                    {
                        resources.FormData.Remove(instanceId);
                    }

                    if (resources.FlowControllerServicesContainers.ContainsKey(instanceId))
                    {
                        resources.FlowControllerServicesContainers.Remove(instanceId);
                    }

                    resources.WorkflowPersistingTypeDictionary.Remove(instanceId);
                }

                resources.WorkflowIdleWaitSemaphores = new Dictionary<Guid, Semaphore>();
                resources.ExceptionFromWorkflow = new Dictionary<int, Exception>();
            }
        }
    }
}
