using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Linq;
using System.Workflow.Activities;
using System.Workflow.ComponentModel;
using System.Workflow.ComponentModel.Compiler;
using System.Workflow.Runtime;
using Composite.Actions;
using Composite.ConsoleEventSystem;
using Composite.Data;
using Composite.Elements;
using Composite.Forms.Flows;
using Composite.Logging;
using Composite.ResourceSystem;
using Composite.Security;
using Composite.Tasks;
using Composite.Validation.ClientValidationRules;
using Composite.Workflow.Activities.Foundation;
using Composite.Trees;


namespace Composite.Workflow.Activities
{
    [ToolboxItem(false)]
    [ToolboxBitmap(typeof(StateMachineWorkflowActivity), "Resources.StateMachineWorkflowActivity.png")]
    [ActivityValidator(typeof(StateActivityValidator))]
    public class FormsWorkflow : StateMachineWorkflowActivity
    {
        private string _stringEntityToken;
        private string _stringActionToken;
        private Guid _parentWorkflowInstanceId;
        private string _workflowResult;
        private string _childWorkflowResult;


        [NonSerialized]
        private EntityToken _entityToken = null;

        [NonSerialized]
        private ActionToken _actionToken = null;

        [NonSerialized]
        private WorkflowActionToken _workflowActionToken = null;

        [NonSerialized]
        private Dictionary<string, object> _bindings = new Dictionary<string, object>();

        private Guid _instanceId;

        [NonSerialized]
        private EventHandler<WorkflowEventArgs> _onWorkflowIdledEventHandler;


        public FormsWorkflow()
        {
            this.BindingsValidationRules = new Dictionary<string, List<ClientValidationRule>>();
        }



        protected override void Initialize(IServiceProvider provider)
        {
            _onWorkflowIdledEventHandler = new EventHandler<WorkflowEventArgs>(OnWorkflowIdled);

            if (this.DesignMode == false)
            {
                WorkflowFacade.WorkflowRuntime.WorkflowIdled += _onWorkflowIdledEventHandler;
            }

            base.Initialize(provider);
        }




        protected override void OnClosed(IServiceProvider provider)
        {
            // Ensure that "CloseCurrentView" has been called when we close (when available)
            // If this WF is canceled FlowControllerServicesContainer is not available
            FlowControllerServicesContainer flowControllerServicesContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
            if (flowControllerServicesContainer != null)
            {
                IManagementConsoleMessageService managementConsoleMessageService = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

                if (managementConsoleMessageService != null
                    && managementConsoleMessageService.HasView == true
                    && managementConsoleMessageService.CloseCurrentViewRequested == false)
                {
                    managementConsoleMessageService.CloseCurrentView();
                }
            }

            base.OnClosed(provider);
        }




        protected override void Uninitialize(IServiceProvider provider)
        {
            if (this.DesignMode == false)
            {
                WorkflowFacade.WorkflowRuntime.WorkflowIdled -= _onWorkflowIdledEventHandler;
            }

            if (this.ParentWorkflowInstanceId != Guid.Empty)
            {
                WorkflowFacade.FireChildWorkflowDoneEvent(this.ParentWorkflowInstanceId, this.WorkflowResult);
            }

            base.Uninitialize(provider);
        }



        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public string SerializedEntityToken
        {
            get { return _stringEntityToken; }
            set { _stringEntityToken = value; }
        }



        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public string SerializedActionToken
        {
            get { return _stringActionToken; }
            set { _stringActionToken = value; }
        }



        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public Guid ParentWorkflowInstanceId
        {
            get { return _parentWorkflowInstanceId; }
            set { _parentWorkflowInstanceId = value; }
        }



        /// <summary>
        /// Use this property to set the result of the workflow
        /// </summary>
        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public string WorkflowResult
        {
            get { return _workflowResult; }
            set { _workflowResult = value; }
        }


        /// <summary>
        /// This holds the result of a chlid workflow
        /// </summary>
        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public string ChildWorkflowResult
        {
            get { return _childWorkflowResult; }
            set { _childWorkflowResult = value; }
        }



        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public EntityToken EntityToken
        {
            get
            {
                if ((_entityToken == null) && (this.SerializedEntityToken != null))
                {
                    _entityToken = EntityTokenSerializer.Deserialize(this.SerializedEntityToken);
                }

                return _entityToken;
            }
        }



        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public ActionToken ActionToken
        {
            get
            {
                if ((_actionToken == null) && (this.SerializedActionToken != null))
                {
                    _actionToken = ActionTokenSerializer.Deserialize(this.SerializedActionToken);
                }

                return _actionToken;
            }
        }



        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public Dictionary<string, object> Bindings
        {
            get
            {
                if (_bindings == null)
                {
                    // Workflows with WorkflowPersistingType.Never does not get their bindings persisted.
                    if (FormsWorkflowBindingCache.Bindings.ContainsKey(InstanceId) == true)
                    {
                        _bindings = FormsWorkflowBindingCache.Bindings[_instanceId];
                    }
                    else
                    {
                        _bindings = new Dictionary<string, object>();
                    }
                }
                return _bindings;
            }
            set
            {
                _bindings = value;

                if (FormsWorkflowBindingCache.Bindings.ContainsKey(_instanceId) == false)
                {
                    FormsWorkflowBindingCache.Bindings.Add(_instanceId, _bindings);
                }
                else
                {
                    FormsWorkflowBindingCache.Bindings[_instanceId] = _bindings;
                }
            }
        }



        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public Dictionary<string, List<ClientValidationRule>> BindingsValidationRules { get; set; }



        public T GetBinding<T>(string name)
        {
            object obj;
            if (this.Bindings.TryGetValue(name, out obj) == false)
            {
                throw new InvalidOperationException(string.Format("The binding named '{0}' was not found", name));
            }

            return (T)obj;
        }



        public bool TryGetBinding<T>(string name, out T binding)
        {
            object obj;
            if (this.Bindings.TryGetValue(name, out obj) == true)
            {
                binding = (T)obj;
                return true;
            }
            else
            {
                binding = default(T);
                return false;
            }
        }



        public void UpdateBinding(string name, object value)
        {
            if (BindingExist(name) == false)
            {
                this.Bindings.Add(name, value);
            }
            else
            {
                this.Bindings[name] = value;
            }
        }



        public void UpdateBindings(Dictionary<string, object> bindings)
        {
            foreach (var kvp in bindings)
            {
                if (this.BindingExist(kvp.Key) == true)
                {
                    this.Bindings[kvp.Key] = kvp.Value;
                }
                else
                {
                    this.Bindings.Add(kvp.Key, kvp.Value);
                }
            }
        }



        public bool BindingExist(string name)
        {
            return this.Bindings.ContainsKey(name);
        }



        public T GetDataItemFromEntityToken<T>()
            where T : IData
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

            return (T)dataEntityToken.Data;
        }



        public string Payload
        {
            get
            {
                if (_workflowActionToken == null)
                {
                    _workflowActionToken = this.ActionToken as WorkflowActionToken;
                }

                if (_workflowActionToken == null)
                {
                    return null;
                }
                else
                {
                    return _workflowActionToken.Payload;
                }
            }
        }



        public string ExtraPayload
        {
            get
            {
                if (_workflowActionToken == null)
                {
                    _workflowActionToken = this.ActionToken as WorkflowActionToken;
                }

                if (_workflowActionToken == null)
                {
                    return null;
                }
                else
                {
                    return _workflowActionToken.ExtraPayload;
                }
            }
        }



        internal Guid InstanceId
        {
            get
            {
                return _instanceId;
            }
        }

        protected void ReportException(Exception ex)
        {
            if (ex == null) throw new ArgumentNullException("ex");

            this.ShowMessage(DialogType.Error, "An error occured", string.Format("Sorry, but an error has occured, preventing the opperation from completing as expected. The error has been documented in details so a technican may follow up on this issue.\n\nThe error message is: {0}", ex.Message));

            Composite.Logging.LoggingService.LogCritical(this.GetType().Name, ex);

            FlowControllerServicesContainer container = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
            IManagementConsoleMessageService service = container.GetService<IManagementConsoleMessageService>();
            service.ShowLogEntry(this.GetType(), ex);
        }



        protected void LogMessage(LogLevel logLevel, string message)
        {
            FlowControllerServicesContainer container = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
            IManagementConsoleMessageService service = container.GetService<IManagementConsoleMessageService>();
            service.ShowLogEntry(this.GetType(), logLevel, message);

            switch (logLevel)
            {
                case LogLevel.Info:
                case LogLevel.Debug:
                case LogLevel.Fine:
                    LoggingService.LogVerbose(this.GetType().Name, message);
                    break;
                case LogLevel.Warning:
                    LoggingService.LogWarning(this.GetType().Name, message);
                    break;
                case LogLevel.Error:
                    LoggingService.LogError(this.GetType().Name, message);
                    break;
                case LogLevel.Fatal:
                    LoggingService.LogCritical(this.GetType().Name, message);
                    break;
                default:
                    throw new NotImplementedException();
            }
        }



        protected void ShowMessage(DialogType dislogType, string title, string message)
        {
            FlowControllerServicesContainer container = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);

            IManagementConsoleMessageService service = container.GetService<IManagementConsoleMessageService>();

            string localizedTitle = StringResourceSystemFacade.ParseString(title);
            string localizedMessage = StringResourceSystemFacade.ParseString(message);

            service.ShowMessage(
                    dislogType,
                    localizedTitle,
                    localizedMessage
                );
        }



        protected void RebootConsole()
        {
            FlowControllerServicesContainer container = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);

            IManagementConsoleMessageService service = container.GetService<IManagementConsoleMessageService>();

            service.RebootConsole();
        }



        protected void ShowFieldMessage(string fieldBindingPath, string message)
        {
            FlowControllerServicesContainer flowControllerServicesContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);

            IFormFlowRenderingService formFlowRenderingService = flowControllerServicesContainer.GetService<IFormFlowRenderingService>();

            formFlowRenderingService.ShowFieldMessage(fieldBindingPath, StringResourceSystemFacade.ParseString(message));
        }


        protected void SetSaveStatus(bool succeeded)
        {
            SetSaveStatus(succeeded, (string)null);
        }

        protected void SetSaveStatus(bool succeeded, IData data)
        {
            SetSaveStatus(succeeded, data.GetDataEntityToken());
        }

        protected void SetSaveStatus(bool succeeded, EntityToken entityToken)
        {
            string serializedEntityToken = EntityTokenSerializer.Serialize(entityToken, true);
            SetSaveStatus(succeeded, serializedEntityToken);
        }

        protected void SetSaveStatus(bool succeeded, string serializedEntityToken)
        {
            SaveWorklowTaskManagerEvent saveWorklowTaskManagerEvent = new SaveWorklowTaskManagerEvent
                (
                    new WorkflowFlowToken(this.InstanceId),
                    this.WorkflowInstanceId,
                    succeeded
                );

            FlowControllerServicesContainer container = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
            ITaskManagerFlowControllerService service = container.GetService<ITaskManagerFlowControllerService>();
            service.OnStatus(saveWorklowTaskManagerEvent);

            var flowRenderingService = container.GetService<IFormFlowRenderingService>();
            if(flowRenderingService != null)
            {
                flowRenderingService.SetSaveStatus(succeeded);
            }

            
            IManagementConsoleMessageService managementConsoleMessageService = container.GetService<IManagementConsoleMessageService>();
            managementConsoleMessageService.SaveStatus(succeeded); // TO BE REMOVED

            if (serializedEntityToken != null)
            {
                managementConsoleMessageService = container.GetService<IManagementConsoleMessageService>();
                managementConsoleMessageService.BindEntityTokenToView(serializedEntityToken);
            }
        }


        protected void CloseCurrentView()
        {
            FlowControllerServicesContainer flowControllerServicesContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);

            IManagementConsoleMessageService managementConsoleMessageService = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

            if (managementConsoleMessageService.CloseCurrentViewRequested == false)
            {
                managementConsoleMessageService.CloseCurrentView();
            }
        }



        protected void LockTheSystem()
        {
            FlowControllerServicesContainer flowControllerServicesContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);

            IManagementConsoleMessageService managementConsoleMessageService = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

            managementConsoleMessageService.LockSystem();
        }


        protected void RerenderView()
        {
            FlowControllerServicesContainer flowControllerServicesContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
            IFormFlowRenderingService formFlowRenderingService = flowControllerServicesContainer.GetService<IFormFlowRenderingService>();
            formFlowRenderingService.RerenderView();
        }



        protected void CollapseAndRefresh()
        {
            FlowControllerServicesContainer container = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
            IManagementConsoleMessageService service = container.GetService<IManagementConsoleMessageService>();
            service.CollapseAndRefresh();
        }



        protected string GetCurrentConsoleId()
        {
            FlowControllerServicesContainer flowControllerServicesContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);

            IManagementConsoleMessageService managementConsoleMessageService = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

            return managementConsoleMessageService.CurrentConsoleId;
        }


        protected void ExecuteAction(EntityToken entityToken, ActionToken actionToken)
        {
            FlowControllerServicesContainer flowControllerServicesContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);

            IActionExecutionService actionExecutionService = flowControllerServicesContainer.GetService<IActionExecutionService>();

            var taskManagerEvent = new WorkflowCreationTaskManagerEvent(_instanceId);
            actionExecutionService.Execute(entityToken, actionToken, taskManagerEvent);
        }



        protected void ExecuteWorklow(EntityToken entityToken, Type workflowType)
        {
            ExecuteAction(entityToken, new WorkflowActionToken(workflowType));
        }



        protected void DeliverFormData(string containerLabel, IFlowUiContainerType containerType, string formDefinition, Dictionary<string, object> bindings, Dictionary<string, List<ClientValidationRule>> bindingsValidationRules)
        {
            ExternalDataExchangeService externalDataExchangeService = WorkflowFacade.WorkflowRuntime.GetService<ExternalDataExchangeService>();

            IFormsWorkflowActivityService formsWorkflowActivityService = externalDataExchangeService.GetService(typeof(IFormsWorkflowActivityService)) as IFormsWorkflowActivityService;

            formsWorkflowActivityService.DeliverFormData(WorkflowEnvironment.WorkflowInstanceId, containerLabel, containerType, formDefinition, bindings, bindingsValidationRules);
        }



        protected void DeliverFormData(string containerLabel, IFlowUiContainerType containerType, IFormMarkupProvider formMarkupProvider, Dictionary<string, object> bindings, Dictionary<string, List<ClientValidationRule>> bindingsValidationRules)
        {
            ExternalDataExchangeService externalDataExchangeService = WorkflowFacade.WorkflowRuntime.GetService<ExternalDataExchangeService>();

            IFormsWorkflowActivityService formsWorkflowActivityService = externalDataExchangeService.GetService(typeof(IFormsWorkflowActivityService)) as IFormsWorkflowActivityService;

            formsWorkflowActivityService.DeliverFormData(WorkflowEnvironment.WorkflowInstanceId, containerLabel, containerType, formMarkupProvider, bindings, bindingsValidationRules);
        }


        /// <summary>
        /// Adds the cms:layout elements Form Definition to the UI toolbar. 
        /// </summary>
        /// <param name="customToolbarDefinition">String containing a valid Form Definition markup document</param>
        protected void SetCustomToolbarDefinition(string customToolbarDefinition)
        {
            ExternalDataExchangeService externalDataExchangeService = WorkflowFacade.WorkflowRuntime.GetService<ExternalDataExchangeService>();
            IFormsWorkflowActivityService formsWorkflowActivityService = externalDataExchangeService.GetService(typeof(IFormsWorkflowActivityService)) as IFormsWorkflowActivityService;
            formsWorkflowActivityService.DeliverCustomToolbarDefinition(WorkflowEnvironment.WorkflowInstanceId, customToolbarDefinition);
        }



        /// <summary>
        /// Adds the cms:layout elements Form Definition to the UI toolbar. 
        /// </summary>
        /// <param name="customToolbarMarkupProvider">Markup provider that can deliver a valid Form Definition markup document</param>
        protected void SetCustomToolbarDefinition(IFormMarkupProvider customToolbarMarkupProvider)
        {
            ExternalDataExchangeService externalDataExchangeService = WorkflowFacade.WorkflowRuntime.GetService<ExternalDataExchangeService>();
            IFormsWorkflowActivityService formsWorkflowActivityService = externalDataExchangeService.GetService(typeof(IFormsWorkflowActivityService)) as IFormsWorkflowActivityService;
            formsWorkflowActivityService.DeliverCustomToolbarDefinition(WorkflowEnvironment.WorkflowInstanceId, customToolbarMarkupProvider);
        }


        protected AddNewTreeRefresher CreateAddNewTreeRefresher(EntityToken parentEntityToken)
        {
            return new AddNewTreeRefresher(parentEntityToken, WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId));
        }


        protected UpdateTreeRefresher CreateUpdateTreeRefresher(EntityToken beforeUpdateEntityToken)
        {
            return new UpdateTreeRefresher(beforeUpdateEntityToken, WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId));
        }



        protected DeleteTreeRefresher CreateDeleteTreeRefresher(EntityToken beforeDeleteEntityToken)
        {
            return new DeleteTreeRefresher(beforeDeleteEntityToken, WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId));
        }



        protected ParentTreeRefresher CreateParentTreeRefresher()
        {
            return new ParentTreeRefresher(WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId));
        }



        protected SpecificTreeRefresher CreateSpecificTreeRefresher()
        {
            return new SpecificTreeRefresher(WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId));
        }



        protected void RefreshEntityToken(EntityToken entityToken)
        {
            SpecificTreeRefresher specificTreeRefresher = this.CreateSpecificTreeRefresher();
            specificTreeRefresher.PostRefreshMesseges(entityToken);
        }



        protected void RefreshCurrentEntityToken()
        {
            SpecificTreeRefresher specificTreeRefresher = this.CreateSpecificTreeRefresher();
            specificTreeRefresher.PostRefreshMesseges(this.EntityToken);
        }



        protected void RefreshParentEntityToken()
        {
            ParentTreeRefresher parentTreeRefresher = this.CreateParentTreeRefresher();
            parentTreeRefresher.PostRefreshMesseges(this.EntityToken);
        }



        protected void RefreshRootEntityToken()
        {
            SpecificTreeRefresher specificTreeRefresher = this.CreateSpecificTreeRefresher();
            specificTreeRefresher.PostRefreshMesseges(ElementFacade.GetRootsWithNoSecurity().First().ElementHandle.EntityToken);
        }



        protected void AcquireLock(EntityToken entityToken)
        {
            ActionLockingFacade.AcquireLock(entityToken, this.WorkflowInstanceId);
        }



        protected DynamicValuesHelperReplaceContext CreateDynamicValuesHelperReplaceContext()
        {
            return CreateDynamicValuesHelperReplaceContext(this.ExtraPayload);
        }


        protected DynamicValuesHelperReplaceContext CreateDynamicValuesHelperReplaceContext(string serializedPiggybag)
        {
            Dictionary<string, string> piggybag = PiggybagSerializer.Deserialize(serializedPiggybag);

            return CreateDynamicValuesHelperReplaceContext(piggybag);
        }


        protected DynamicValuesHelperReplaceContext CreateDynamicValuesHelperReplaceContext(Dictionary<string, string> piggybag)
        {
            IData dataItem = null;
            if ((this.EntityToken is DataEntityToken) == true)
            {
                dataItem = (this.EntityToken as DataEntityToken).Data;
            }

            DynamicValuesHelperReplaceContext dynamicValuesHelperReplaceContext = new DynamicValuesHelperReplaceContext
            {
                CurrentDataItem = dataItem,
                PiggybagDataFinder = new PiggybagDataFinder(piggybag, this.EntityToken)
            };

            return dynamicValuesHelperReplaceContext;
        }



        protected override ActivityExecutionStatus Execute(ActivityExecutionContext executionContext)
        {
            _instanceId = WorkflowEnvironment.WorkflowInstanceId;

            ActivityExecutionStatus activityExecutionStatus = base.Execute(executionContext);

            return activityExecutionStatus;
        }



        private void OnWorkflowIdled(object sender, WorkflowEventArgs e)
        {
            if (e.WorkflowInstance.InstanceId == _instanceId)
            {
                if (FormsWorkflowBindingCache.Bindings.ContainsKey(_instanceId) == false)
                {
                    FormsWorkflowBindingCache.Bindings.Add(_instanceId, this.Bindings);
                }
                else
                {
                    FormsWorkflowBindingCache.Bindings[_instanceId] = this.Bindings;
                }
            }
        }
    }
}

