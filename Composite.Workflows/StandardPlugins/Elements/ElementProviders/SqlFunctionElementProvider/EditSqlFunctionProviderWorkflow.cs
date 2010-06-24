using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Workflow.Runtime;
using System.Xml.Linq;
using System.Xml.Serialization;
using Composite.Actions;
using Composite.ConsoleEventSystem;
using Composite.Data;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Functions.ManagedParameters;
using Composite.Logging;
using Composite.StandardPlugins.Functions.FunctionProviders.SqlFunctionProvider;
using Composite.WebClient;
using Composite.WebClient.FlowMediators.FormFlowRendering;
using Composite.WebClient.FunctionCallEditor;
using Composite.WebClient.State;
using Composite.Workflow;
using Composite.Workflow.Foundation;


namespace Composite.StandardPlugins.Elements.ElementProviders.SqlFunctionElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditSqlFunctionProviderWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public EditSqlFunctionProviderWorkflow()
        {
            InitializeComponent();
        }



        private void initialize_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken token = this.EntityToken as DataEntityToken;

            ISqlFunctionInfo functionInfo = (ISqlFunctionInfo)token.Data;
            IEnumerable<ManagedParameterDefinition> parameters = ManagedParameterManager.Load(functionInfo.Id);

            this.Bindings.Add("SqlQuery", functionInfo);
            this.Bindings.Add("Parameters", parameters);
            this.Bindings.Add("ParameterTypeOptions", GetParameterTypes().ToList());

            // Creating a session state object
            Guid stateId = Guid.NewGuid();
            var state = new EditSqlFunctionState { WorkflowId = WorkflowInstanceId, ConsoleIdInternal = GetCurrentConsoleId() };
            SessionStateManager.DefaultProvider.AddState<IParameterEditorState>(stateId, state, DateTime.Now.AddDays(7.0));

            this.Bindings.Add("SessionStateProvider", SessionStateManager.DefaultProviderName);
            this.Bindings.Add("SessionStateId", stateId);
        }



        private IEnumerable<Type> GetParameterTypes()
        {
            yield return typeof(string);
            yield return typeof(int);
            yield return typeof(decimal);
            yield return typeof(DateTime);
            yield return typeof(bool);
            yield return typeof(Guid);
        }


        private void saveCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            UpdateTreeRefresher updateTreeRefresher = this.CreateUpdateTreeRefresher(this.EntityToken);
            ISqlFunctionInfo info;

            try
            {
                info = this.GetBinding<ISqlFunctionInfo>("SqlQuery");
                var parameters = this.GetBinding<IEnumerable<ManagedParameterDefinition>>("Parameters");

                ManagedParameterManager.Save(info.Id, parameters);
                DataFacade.Update(info);
            }
            catch (Exception ex)
            {
                LoggingService.LogCritical("SQL Function Save", ex);

                FlowControllerServicesContainer serviceContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
                var consoleMsgService = serviceContainer.GetService<IManagementConsoleMessageService>();
                consoleMsgService.ShowMessage(DialogType.Error, "Error", ex.Message);

                SetSaveStatus(false);
                return;
            }

            updateTreeRefresher.PostRefreshMesseges(info.GetDataEntityToken());
            SetSaveStatus(true);
        }



        private void previewCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            try
            {
                ISqlFunctionInfo queryInfo = this.GetBinding<ISqlFunctionInfo>("SqlQuery");


                var parameterDefinitions = this.GetBinding<IEnumerable<ManagedParameterDefinition>>("Parameters");
                ParameterList parameters = ManagedParameterManager.GetParametersListForTest(parameterDefinitions);
                IEnumerable<ParameterProfile> parameterProfiles = ManagedParameterManager.GetParameterProfiles(parameterDefinitions);

                SqlFunction function = new SqlFunction(queryInfo, parameterProfiles);

                XElement result = function.Execute(parameters, new FunctionContextContainer()) as XElement;

                Page currentPage = HttpContext.Current.Handler as Page;
                if (currentPage == null) throw new InvalidOperationException("The Current HttpContext Handler must be a System.Web.Ui.Page");

                UserControl inOutControl = (UserControl)currentPage.LoadControl(UrlUtils.ResolveAdminUrl("controls/Misc/MarkupInOutView.ascx"));
                inOutControl.Attributes.Add("out", result.ToString());

                FlowControllerServicesContainer serviceContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
                var webRenderService = serviceContainer.GetService<IFormFlowWebRenderingService>();
                webRenderService.SetNewPageOutput(inOutControl);

            }
            catch (Exception ex)
            {
                FlowControllerServicesContainer serviceContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
                Control errOutput = new LiteralControl("<pre>" + ex.ToString() + "</pre>");
                var webRenderService = serviceContainer.GetService<IFormFlowWebRenderingService>();
                webRenderService.SetNewPageOutput(errOutput);
            }
        }

        [Serializable]
        public sealed class EditSqlFunctionState : IParameterEditorState
        {
            public Guid WorkflowId { get; set; }
            public string ConsoleIdInternal { get; set; }

            private FormData GetFormData()
            {
                return WorkflowFacade.GetFormData(WorkflowId);
            }


            [XmlIgnore]
            public List<ManagedParameterDefinition> Parameters
            {
                get { return GetFormData().Bindings["Parameters"] as List<ManagedParameterDefinition>; }
                set { GetFormData().Bindings["Parameters"] = value; }
            }

            [XmlIgnore]
            public List<Type> ParameterTypeOptions
            {
                get { return (GetFormData().Bindings["ParameterTypeOptions"] as IEnumerable<Type>).ToList(); }
                set { GetFormData().Bindings["ParameterTypeOptions"] = value.ToList(); }
            }
        }
    }
}
