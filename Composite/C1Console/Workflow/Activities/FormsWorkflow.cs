using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Linq;
using System.Workflow.Activities;
using System.Workflow.ComponentModel;
using System.Workflow.ComponentModel.Compiler;
using System.Workflow.Runtime;
using System.Xml.Linq;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Users;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Data;
using Composite.C1Console.Elements;
using Composite.C1Console.Forms.Flows;
using Composite.Core.Logging;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Security;
using Composite.C1Console.Tasks;
using Composite.Data.DynamicTypes;
using Composite.Data.Validation;
using Composite.Data.Validation.ClientValidationRules;
using Composite.C1Console.Workflow.Activities.Foundation;
using Composite.C1Console.Trees;
using Microsoft.Practices.EnterpriseLibrary.Validation;


namespace Composite.C1Console.Workflow.Activities
{
    /// <summary>
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
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
        private EntityToken _entityToken;

        [NonSerialized]
        private ActionToken _actionToken;

        [NonSerialized]
        private WorkflowActionToken _workflowActionToken;

        [NonSerialized]
        private Dictionary<string, object> _bindings = new Dictionary<string, object>();

        private Guid _instanceId;

        [NonSerialized]
        private EventHandler<WorkflowEventArgs> _onWorkflowIdledEventHandler;


        /// <exclude />
        public FormsWorkflow()
        {
            this.BindingsValidationRules = new Dictionary<string, List<ClientValidationRule>>();
        }


        /// <exclude />
        protected void InitializeExtensions()
        {
            CanModifyActivities = true;

            foreach (var extension in FormsWorkflowExtensions.GetExtensions())
            {
                extension.Initialize(this);
            }

            CanModifyActivities = false;
        }


        /// <exclude />
        protected override void Initialize(IServiceProvider provider)
        {
            _onWorkflowIdledEventHandler = OnWorkflowIdled;

            if (!this.DesignMode)
            {
                WorkflowFacade.WorkflowRuntime.WorkflowIdled += _onWorkflowIdledEventHandler;
            }

            base.Initialize(provider);

            if (!BindingExist(EntityTokenKey))
            {
                Bindings.Add(EntityTokenKey, EntityToken);
            }
        }

        internal static readonly string EntityTokenKey = typeof(FormsWorkflow).FullName + ":EntityToken";


        /// <exclude />
        protected override void Uninitialize(IServiceProvider provider)
        {
            if (!this.DesignMode)
            {
                WorkflowFacade.WorkflowRuntime.WorkflowIdled -= _onWorkflowIdledEventHandler;
            }

            if (this.ParentWorkflowInstanceId != Guid.Empty)
            {
                WorkflowFacade.FireChildWorkflowDoneEvent(this.ParentWorkflowInstanceId, this.WorkflowResult);
            }

            base.Uninitialize(provider);
        }



        /// <exclude />
        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public string SerializedEntityToken
        {
            get { return _stringEntityToken; }
            set { _stringEntityToken = value; }
        }



        /// <exclude />
        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public string SerializedActionToken
        {
            get { return _stringActionToken; }
            set { _stringActionToken = value; }
        }



        /// <exclude />
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



        /// <exclude />
        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public EntityToken EntityToken
        {
            get
            {
                if (_entityToken == null && this.SerializedEntityToken != null)
                {
                    _entityToken = EntityTokenSerializer.Deserialize(this.SerializedEntityToken);
                }

                return _entityToken;
            }
        }


        /// <exclude />
        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public ActionToken ActionToken
        {
            get
            {
                if (_actionToken == null && this.SerializedActionToken != null)
                {
                    _actionToken = ActionTokenSerializer.Deserialize(this.SerializedActionToken);
                }

                return _actionToken;
            }
        }



        /// <exclude />
        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public Dictionary<string, object> Bindings
        {
            get
            {
                if (_bindings == null)
                {
                    // Workflows with WorkflowPersistingType.Never does not get their bindings persisted.
                    if (!FormsWorkflowBindingCache.Bindings.TryGetValue(_instanceId, out _bindings))
                    {
                        _bindings = new Dictionary<string, object>();
                    }
                }

                return _bindings;
            }
            set
            {
                _bindings = value;

                FormsWorkflowBindingCache.Bindings[_instanceId] = _bindings;
            }
        }


        internal Dictionary<string, Exception> GetBindingErrors()
        {
            Guid workflowId = WorkflowEnvironment.WorkflowInstanceId;;

            FlowControllerServicesContainer container = WorkflowFacade.GetFlowControllerServicesContainer(workflowId);
            var bindingValidationService = container.GetService<IBindingValidationService>();

            if (bindingValidationService == null)
            {
                return new Dictionary<string, Exception>();
            }

            return bindingValidationService.BindingErrors;
        }


        /// <exclude />
        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public Dictionary<string, List<ClientValidationRule>> BindingsValidationRules { get; set; }



        /// <exclude />
        public T GetBinding<T>(string name)
        {
            object obj;
            if (!Bindings.TryGetValue(name, out obj))
            {
                throw new InvalidOperationException($"The binding named '{name}' was not found");
            }

            return (T)obj;
        }



        /// <exclude />
        public bool TryGetBinding<T>(string name, out T binding)
        {
            object obj;
            if (this.Bindings.TryGetValue(name, out obj))
            {
                binding = (T)obj;
                return true;
            }

            binding = default(T);
            return false;
        }



        /// <exclude />
        public void UpdateBinding(string name, object value)
        {
            this.Bindings[name] = value;
        }



        /// <exclude />
        public void UpdateBindings(Dictionary<string, object> bindings)
        {
            foreach (var kvp in bindings)
            {
                this.Bindings[kvp.Key] = kvp.Value;
            }
        }



        /// <exclude />
        public bool BindingExist(string name)
        {
            return this.Bindings.ContainsKey(name);
        }



        /// <exclude />
        public T GetDataItemFromEntityToken<T>()
            where T : IData
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

            return (T)dataEntityToken.Data;
        }



        /// <exclude />
        public string Payload
        {
            get
            {
                if (_workflowActionToken == null)
                {
                    _workflowActionToken = this.ActionToken as WorkflowActionToken;
                }

                return _workflowActionToken?.Payload;
            }
        }



        /// <exclude />
        public string ExtraPayload
        {
            get
            {
                if (_workflowActionToken == null)
                {
                    _workflowActionToken = this.ActionToken as WorkflowActionToken;
                }

                return _workflowActionToken?.ExtraPayload;
            }
        }



        internal Guid InstanceId => _instanceId;


        private static FlowControllerServicesContainer GetFlowControllerServicesContainer()
        {
            return WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
        }

        /// <exclude />
        protected void ReportException(Exception ex)
        {
            Verify.ArgumentNotNull(ex, nameof(ex));

            this.ShowMessage(DialogType.Error, "An unfortunate error occurred", $"Sorry, but an error has occurred, preventing the opperation from completing as expected. The error has been documented in details so a technican may follow up on this issue.\n\nThe error message is: {ex.Message}");

            Log.LogCritical(this.GetType().Name, ex);

            var container = GetFlowControllerServicesContainer();
            IManagementConsoleMessageService service = container.GetService<IManagementConsoleMessageService>();
            service.ShowLogEntry(this.GetType(), ex);
        }



        /// <exclude />
        protected void LogMessage(LogLevel logLevel, string message)
        {
            var container = GetFlowControllerServicesContainer();
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



        /// <exclude />
        protected void ShowMessage(DialogType dialogType, string title, string message)
        {
            var container = GetFlowControllerServicesContainer();

            IManagementConsoleMessageService service = container.GetService<IManagementConsoleMessageService>();

            string localizedTitle = StringResourceSystemFacade.ParseString(title);
            string localizedMessage = StringResourceSystemFacade.ParseString(message);

            service.ShowMessage(
                    dialogType,
                    localizedTitle,
                    localizedMessage
                );
        }



        /// <exclude />
        protected void SelectElement(EntityToken entityToken)
        {
            var container = GetFlowControllerServicesContainer();

            IManagementConsoleMessageService service = container.GetService<IManagementConsoleMessageService>();
            
            service.SelectElement(EntityTokenSerializer.Serialize(entityToken, true));
        }



        /// <exclude />
        protected void RebootConsole()
        {
            var container = GetFlowControllerServicesContainer();

            IManagementConsoleMessageService service = container.GetService<IManagementConsoleMessageService>();

            service.RebootConsole();
        }



        /// <exclude />
        protected void ShowFieldMessage(string fieldBindingPath, string message)
        {
            var flowControllerServicesContainer = GetFlowControllerServicesContainer();

            var formFlowRenderingService = flowControllerServicesContainer.GetService<IFormFlowRenderingService>();

            formFlowRenderingService.ShowFieldMessage(fieldBindingPath, StringResourceSystemFacade.ParseString(message));
        }



        /// <exclude />
        protected void SetSaveStatus(bool succeeded)
        {
            SetSaveStatus(succeeded, (string)null);
        }



        /// <exclude />
        protected void SetSaveStatus(bool succeeded, IData data)
        {
            SetSaveStatus(succeeded, data.GetDataEntityToken());
        }



        /// <exclude />
        protected void SetSaveStatus(bool succeeded, EntityToken entityToken)
        {
            string serializedEntityToken = EntityTokenSerializer.Serialize(entityToken, true);
            SetSaveStatus(succeeded, serializedEntityToken);
        }



        /// <exclude />
        protected void SetSaveStatus(bool succeeded, string serializedEntityToken)
        {
            var saveWorklowTaskManagerEvent = new SaveWorklowTaskManagerEvent
            (
                new WorkflowFlowToken(this.InstanceId),
                this.WorkflowInstanceId,
                succeeded
            );

            var container = GetFlowControllerServicesContainer();
            var service = container.GetService<ITaskManagerFlowControllerService>();
            service.OnStatus(saveWorklowTaskManagerEvent);

            var flowRenderingService = container.GetService<IFormFlowRenderingService>();
            flowRenderingService?.SetSaveStatus(succeeded);


            var managementConsoleMessageService = container.GetService<IManagementConsoleMessageService>();
            managementConsoleMessageService.SaveStatus(succeeded); // TO BE REMOVED

            if (serializedEntityToken != null)
            {
                managementConsoleMessageService = container.GetService<IManagementConsoleMessageService>();
                managementConsoleMessageService.BindEntityTokenToView(serializedEntityToken);
            }
        }



        /// <exclude />
        protected void CloseCurrentView()
        {
            var flowControllerServicesContainer = GetFlowControllerServicesContainer();

            var managementConsoleMessageService = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

            if (!managementConsoleMessageService.CloseCurrentViewRequested)
            {
                managementConsoleMessageService.CloseCurrentView();
            }
        }



        /// <exclude />
        protected void LockTheSystem()
        {
            var flowControllerServicesContainer = GetFlowControllerServicesContainer();

            IManagementConsoleMessageService managementConsoleMessageService = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

            managementConsoleMessageService.LockSystem();
        }



        /// <exclude />
        public void RerenderView()
        {
            var flowControllerServicesContainer = GetFlowControllerServicesContainer();
            IFormFlowRenderingService formFlowRenderingService = flowControllerServicesContainer.GetService<IFormFlowRenderingService>();
            formFlowRenderingService.RerenderView();
        }



        /// <exclude />
        protected void CollapseAndRefresh()
        {
            var container = GetFlowControllerServicesContainer();
            var service = container.GetService<IManagementConsoleMessageService>();
            service.CollapseAndRefresh();
        }



        /// <exclude />
        protected string GetCurrentConsoleId()
        {
            var flowControllerServicesContainer = GetFlowControllerServicesContainer();

            IManagementConsoleMessageService managementConsoleMessageService = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

            return managementConsoleMessageService.CurrentConsoleId;
        }

        /// <exclude />
        protected IEnumerable<string> GetConsoleIdsOpenedByCurrentUser()
        {
            return GetConsoleIdsOpenedByUser(UserSettings.Username);
        }

        /// <exclude />
        protected IEnumerable<string> GetConsoleIdsOpenedByUser(string username)
        {
            if (UserSettings.Username == username)
            {
                string currentConsoleId = GetCurrentConsoleId();
                return ConsoleFacade.GetConsoleIdsByUsername(username).Union(new[] { currentConsoleId });
            }
            else
            {
                return ConsoleFacade.GetConsoleIdsByUsername(username);
            }
        }


        /// <exclude />
        public void ExecuteAction(EntityToken entityToken, ActionToken actionToken)
        {
            var flowControllerServicesContainer = GetFlowControllerServicesContainer();

            IActionExecutionService actionExecutionService = flowControllerServicesContainer.GetService<IActionExecutionService>();

            var taskManagerEvent = new WorkflowCreationTaskManagerEvent(_instanceId);
            actionExecutionService.Execute(entityToken, actionToken, taskManagerEvent);
        }



        /// <exclude />
        public void ExecuteWorklow(EntityToken entityToken, Type workflowType)
        {
            ExecuteAction(entityToken, new WorkflowActionToken(workflowType));
        }



        /// <exclude />
        protected void DeliverFormData(string containerLabel, IFlowUiContainerType containerType, string formDefinition, Dictionary<string, object> bindings, Dictionary<string, List<ClientValidationRule>> bindingsValidationRules)
        {
            OnDeliverFormData(bindings, bindingsValidationRules);

            ExternalDataExchangeService externalDataExchangeService = WorkflowFacade.WorkflowRuntime.GetService<ExternalDataExchangeService>();

            IFormsWorkflowActivityService formsWorkflowActivityService = externalDataExchangeService.GetService(typeof(IFormsWorkflowActivityService)) as IFormsWorkflowActivityService;

            formsWorkflowActivityService.DeliverFormData(WorkflowEnvironment.WorkflowInstanceId, containerLabel, containerType, formDefinition, bindings, bindingsValidationRules);
        }



        /// <exclude />
        protected void DeliverFormData(string containerLabel, IFlowUiContainerType containerType, IFormMarkupProvider formMarkupProvider, Dictionary<string, object> bindings, Dictionary<string, List<ClientValidationRule>> bindingsValidationRules)
        {
            OnDeliverFormData(bindings, bindingsValidationRules);

            var externalDataExchangeService = WorkflowFacade.WorkflowRuntime.GetService<ExternalDataExchangeService>();

            var formsWorkflowActivityService = externalDataExchangeService.GetService(typeof(IFormsWorkflowActivityService)) as IFormsWorkflowActivityService;

            formsWorkflowActivityService.DeliverFormData(WorkflowEnvironment.WorkflowInstanceId, containerLabel, containerType, formMarkupProvider, bindings, bindingsValidationRules);
        }



        private void OnDeliverFormData(Dictionary<string, object> bindings, Dictionary<string, List<ClientValidationRule>> bindingsValidationRules)
        {
            var parameters = new OnDeliverFormDataParameters
            {
                Bindings = bindings,
                BindingsValidationRules = bindingsValidationRules
            };

            foreach (var extension in FormsWorkflowExtensions.GetExtensions())
            {
                extension.OnDeliverFormData(this, parameters);
            }
        }





        /// <summary>
        /// Adds the cms:layout elements Form Definition to the UI toolbar. 
        /// </summary>
        /// <param name="customToolbarDefinition">String containing a valid Form Definition markup document</param>
        public void SetCustomToolbarDefinition(string customToolbarDefinition)
        {
            SetCustomToolbarDefinition(new StringBasedFormMarkupProvider(customToolbarDefinition));
        }



        /// <summary>
        /// Adds the cms:layout elements Form Definition to the UI toolbar. 
        /// </summary>
        /// <param name="customToolbarMarkupProvider">Markup provider that can deliver a valid Form Definition markup document</param>
        protected void SetCustomToolbarDefinition(IFormMarkupProvider customToolbarMarkupProvider)
        {
            var externalDataExchangeService = WorkflowFacade.WorkflowRuntime.GetService<ExternalDataExchangeService>();
            var fwas = externalDataExchangeService.GetService<IFormsWorkflowActivityService>();
            fwas.DeliverCustomToolbarDefinition(WorkflowEnvironment.WorkflowInstanceId, customToolbarMarkupProvider);
        }


        /// <summary>
        /// Adds a custom toolbar item.
        /// </summary>
        /// <param name="itemId">The item id.</param>
        /// <param name="markup">The markup.</param>
        /// <param name="priority">The priority - is used for sorting multiple toolbar items.</param>
        public void AddCustomToolbarItem(string itemId, XDocument markup, ActionGroupPriority priority)
        {
            var externalDataExchangeService = WorkflowFacade.WorkflowRuntime.GetService<ExternalDataExchangeService>();
            var fwas = externalDataExchangeService.GetService<IFormsWorkflowActivityService>();

            Verify.That(WorkflowInstanceId == WorkflowEnvironment.WorkflowInstanceId, "Unexpected workflow id!");
            fwas.AddCustomToolbarItem(WorkflowInstanceId, itemId, markup, priority);
        }


        /// <exclude />
        protected AddNewTreeRefresher CreateAddNewTreeRefresher(EntityToken parentEntityToken)
        {
            return new AddNewTreeRefresher(parentEntityToken, WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId));
        }



        /// <exclude />
        protected UpdateTreeRefresher CreateUpdateTreeRefresher(EntityToken beforeUpdateEntityToken)
        {
            return new UpdateTreeRefresher(beforeUpdateEntityToken, WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId));
        }



        /// <exclude />
        protected DeleteTreeRefresher CreateDeleteTreeRefresher(EntityToken beforeDeleteEntityToken)
        {
            return new DeleteTreeRefresher(beforeDeleteEntityToken, WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId));
        }



        /// <exclude />
        protected ParentTreeRefresher CreateParentTreeRefresher()
        {
            return new ParentTreeRefresher(WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId));
        }



        /// <exclude />
        protected SpecificTreeRefresher CreateSpecificTreeRefresher()
        {
            return new SpecificTreeRefresher(WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId));
        }



        /// <exclude />
        protected void RefreshEntityToken(EntityToken entityToken)
        {
            SpecificTreeRefresher specificTreeRefresher = this.CreateSpecificTreeRefresher();
            specificTreeRefresher.PostRefreshMesseges(entityToken);
        }



        /// <exclude />
        protected void RefreshCurrentEntityToken()
        {
            SpecificTreeRefresher specificTreeRefresher = this.CreateSpecificTreeRefresher();
            specificTreeRefresher.PostRefreshMesseges(this.EntityToken);
        }



        /// <exclude />
        protected void RefreshParentEntityToken()
        {
            ParentTreeRefresher parentTreeRefresher = this.CreateParentTreeRefresher();
            parentTreeRefresher.PostRefreshMesseges(this.EntityToken);
        }



        /// <exclude />
        protected void RefreshRootEntityToken()
        {
            SpecificTreeRefresher specificTreeRefresher = this.CreateSpecificTreeRefresher();
            specificTreeRefresher.PostRefreshMesseges(ElementFacade.GetRootsWithNoSecurity().First().ElementHandle.EntityToken);
        }



        /// <exclude />
        protected void AcquireLock(EntityToken entityToken)
        {
            ActionLockingFacade.AcquireLock(entityToken, this.WorkflowInstanceId);
        }



        /// <exclude />
        public DynamicValuesHelperReplaceContext CreateDynamicValuesHelperReplaceContext()
        {
            return CreateDynamicValuesHelperReplaceContext(this.ExtraPayload);
        }



        internal DynamicValuesHelperReplaceContext CreateDynamicValuesHelperReplaceContext(string serializedPiggybag)
        {
            Dictionary<string, string> piggybag = PiggybagSerializer.Deserialize(serializedPiggybag);

            return CreateDynamicValuesHelperReplaceContext(piggybag);
        }



        internal DynamicValuesHelperReplaceContext CreateDynamicValuesHelperReplaceContext(Dictionary<string, string> piggybag)
        {
            return new DynamicValuesHelperReplaceContext(this.EntityToken, piggybag);
        }



        /// <exclude />
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
                FormsWorkflowBindingCache.Bindings[_instanceId] = this.Bindings;
            }
        }

        /// <summary>
        /// Shows validation messages for fields that weren't binded correctly. 
        /// </summary>
        /// <returns>True if all the bindings were processed correctly</returns>
        protected bool ValidateBindings()
        {
            Dictionary<string, Exception> bindingErrors = GetBindingErrors();
            if (bindingErrors.Count == 0)
            {
                return true;
            }

            foreach (var pair in bindingErrors)
            {
                ShowFieldMessage(pair.Key, pair.Value.Message);
            }

            return false;
        }

        /// <summary>
        /// Binds form values to a data item and sends messages to client to display validation messages. 
        /// </summary>
        /// <param name="helper">Form binding helper</param>
        /// <param name="data">An IData instance</param>
        /// <returns>True, if there were no binding/validation errors</returns>
        protected bool BindAndValidate(DataTypeDescriptorFormsHelper helper, IData data)
        {
            Dictionary<string, string> errorMessages = helper.BindingsToObject(this.Bindings, data);

            ValidationResults validationResults = ValidationFacade.Validate(data.DataSourceId.InterfaceType, data);

            bool isValid = true;

            if (!validationResults.IsValid)
            {
                foreach (ValidationResult result in validationResults)
                {
                    if (!result.Key.IsNullOrEmpty())
                    {
                        this.ShowFieldMessage(result.Key, result.Message);
                    }
                    else
                    {
                        this.ShowMessage(DialogType.Error, "Validation error", result.Message);
                    }

                    isValid = false;
                }
            }

            // Checking that required strings are not empty
            var dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(data.DataSourceId.InterfaceType);
            
            foreach (var fieldName in dataTypeDescriptor.Fields
                                                        .Where(f => !f.IsNullable 
                                                                && f.InstanceType == typeof (string)
                                                                && !(f.Inherited && f.Name == "FieldName")) // Skipping validation for inherited IPageMetaData.FieldName
                                                        .Select(f => f.Name))
            {
                string bindingName = (helper.BindingNamesPrefix ?? "").Replace('.', '_') + fieldName;
                if(validationResults.Any(r => r.Key == bindingName)) continue;

                object fieldValue = this.Bindings[bindingName];
                if (fieldValue is string 
                    && (fieldValue as string) == string.Empty
                    && !helper.BindingIsOptional(bindingName))
                {
                    this.ShowFieldMessage(bindingName, LocalizationFiles.Composite_Management.Validation_RequiredField);

                    isValid = false;
                }
            }
            

            if (errorMessages != null)
            {
                isValid = false;

                foreach (var kvp in errorMessages)
                {
                    this.ShowFieldMessage(kvp.Key, kvp.Value);
                }
            }

            return isValid;
        }
    }

    internal static class ExternalDataExchangeServiceExtensions
    {
        public static T GetService<T>(this ExternalDataExchangeService serviceContainer) where T : class
        {
            return serviceContainer.GetService(typeof (T)) as T;
        }
    }
}

