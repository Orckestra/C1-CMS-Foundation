using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Workflow.Runtime;
using System.Xml.Serialization;
using Composite.C1Console.Actions;
using Composite.C1Console.Workflow;
using Composite.C1Console.Workflow.Foundation;
using Composite.Core.Serialization;
using Composite.Core.WebClient.FlowMediators.FormFlowRendering;
using Composite.Core.WebClient.FunctionCallEditor;
using Composite.Core.WebClient.State;
using Composite.Functions;
using Composite.Functions.ManagedParameters;
using Composite.Core.WebClient.Renderings.Page;
using Composite.C1Console.Users;
using Composite.Data;
using Composite.Core.ResourceSystem;
using System.Globalization;
using System.Threading;
using Composite.Data.Types;


namespace Composite.Workflows.Plugins.Elements.ElementProviders.AllFunctionsElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class FunctionTesterWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public FunctionTesterWorkflow()
        {
            InitializeComponent();
        }



        private void initalizeStateCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            List<NamedFunctionCall> namedFunctionCalls = new List<NamedFunctionCall>();

            if (Payload != "")
            {
                IFunction function = FunctionFacade.GetFunction(Payload);

                BaseRuntimeTreeNode baseRuntimeTreeNode = FunctionFacade.BuildTree(function, new Dictionary<string, object>());

                NamedFunctionCall namedFunctionCall = new NamedFunctionCall("", (BaseFunctionRuntimeTreeNode)baseRuntimeTreeNode);

                namedFunctionCalls.Add(namedFunctionCall);

                string layoutLabel = string.Format(StringResourceSystemFacade.GetString("Composite.Plugins.AllFunctionsElementProvider", "FunctionTesterWorkflow.Layout.Label"), function.Name);
                this.Bindings.Add("LayoutLabel", layoutLabel);
            }

            this.Bindings.Add("FunctionCalls", namedFunctionCalls);
            this.Bindings.Add("Parameters", new List<ManagedParameterDefinition>());
            this.Bindings.Add("PageId", PageManager.GetChildrenIDs(Guid.Empty).FirstOrDefault());

            if (UserSettings.ActiveLocaleCultureInfo != null)
            {
                List<KeyValuePair<string, string>> activeCulturesDictionary = UserSettings.ActiveLocaleCultureInfos.Select(f => new KeyValuePair<string, string>(f.Name, DataLocalizationFacade.GetCultureTitle(f))).ToList();
                this.Bindings.Add("ActiveCultureName", UserSettings.ActiveLocaleCultureInfo.Name);
                this.Bindings.Add("ActiveCulturesList", activeCulturesDictionary);
            }

            this.Bindings.Add("PageDataScopeName", DataScopeIdentifier.AdministratedName);
            this.Bindings.Add("PageDataScopeList", new Dictionary<string, string> 
            { 
                { DataScopeIdentifier.AdministratedName, StringResourceSystemFacade.GetString("Composite.Plugins.AllFunctionsElementProvider", "FunctionTesterWorkflow.AdminitrativeScope.Label") }, 
                { DataScopeIdentifier.PublicName, StringResourceSystemFacade.GetString("Composite.Plugins.AllFunctionsElementProvider", "FunctionTesterWorkflow.PublicScope.Label") } 
            });


            Guid stateId = Guid.NewGuid();
            var state = new FunctionCallDesignerState { WorkflowId = WorkflowInstanceId, ConsoleIdInternal = GetCurrentConsoleId() };
            SessionStateManager.DefaultProvider.AddState<IFunctionCallEditorState>(stateId, state, DateTime.Now.AddDays(7.0));

            this.Bindings.Add("SessionStateProvider", SessionStateManager.DefaultProviderName);
            this.Bindings.Add("SessionStateId", stateId);
        }



        private void editCodeActivity_Preview_ExecuteCode(object sender, EventArgs e)
        {
            Guid pageId;
            if (this.GetBinding<object>("PageId") == null) pageId = Guid.Empty;
            else pageId = this.GetBinding<Guid>("PageId");

            string dataScopeName = this.GetBinding<string>("PageDataScopeName");
            string cultureName = this.GetBinding<string>("ActiveCultureName");            
            

            // Setting debug page
            IPage oldPage = PageRenderer.CurrentPage;            
            IPage page = DataFacade.GetData<IPage>(f => f.Id == pageId).FirstOrDefault();
            if (page != null) PageRenderer.CurrentPage = page;


            // Setting debug culture
            CultureInfo oldCurrentCulture = Thread.CurrentThread.CurrentCulture;
            CultureInfo oldCurrentUICulture = Thread.CurrentThread.CurrentUICulture;
            CultureInfo cultureInfo = null;
            if (cultureName != null) cultureInfo = CultureInfo.CreateSpecificCulture(cultureName);
            if (cultureInfo != null)
            {
                Thread.CurrentThread.CurrentCulture = cultureInfo;
                Thread.CurrentThread.CurrentUICulture = cultureInfo;
            }

            List<NamedFunctionCall> namedFunctionCalls = GetBinding<List<NamedFunctionCall>>("FunctionCalls");

            StringBuilder output = new StringBuilder();
            foreach (NamedFunctionCall namedFunctionCall in namedFunctionCalls)
            {
                output.AppendLine(namedFunctionCall.FunctionCall.GetCompositeName() + " result:");

                object functionResult;
                try
                {
                    // Setting debug data scope
                    using (new DataScope(DataScopeIdentifier.Deserialize(dataScopeName), cultureInfo))
                    {
                        functionResult = namedFunctionCall.FunctionCall.GetValue();
                    }
                }
                catch(Exception ex)
                {
                    StringBuilder sb = new StringBuilder();
                    while (ex != null)
                    {
                        sb.AppendLine(ex.ToString());
                        ex = ex.InnerException;
                    }

                    functionResult = sb.ToString();
                }
               
                
                output.AppendLine(PrettyPrinter.Print(functionResult));

                output.AppendLine();
            }

            // Restore culture
            Thread.CurrentThread.CurrentCulture = oldCurrentCulture;
            Thread.CurrentThread.CurrentUICulture = oldCurrentUICulture;            

            // Page should not be restored

            FlowControllerServicesContainer serviceContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
            IFormFlowWebRenderingService formFlowWebRenderingService = serviceContainer.GetService<IFormFlowWebRenderingService>();

            Control outputControl = new LiteralControl("<pre>" + HttpUtility.HtmlEncode(output) + "</pre>");
            formFlowWebRenderingService.SetNewPageOutput(outputControl);
        }



        [Serializable]
        public sealed class FunctionCallDesignerState : IFunctionCallEditorState
        {
            public Guid WorkflowId { get; set; }
            public string ConsoleIdInternal { get; set; }

            private FormData GetFormData()
            {
                return WorkflowFacade.GetFormData(WorkflowId);
            }

            #region IFunctionCallEditorState Members

            [XmlIgnore]
            public List<NamedFunctionCall> FunctionCalls
            {
                get { return GetFormData().Bindings["FunctionCalls"] as List<NamedFunctionCall>; }
                set { GetFormData().Bindings["FunctionCalls"] = value; }
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


            public string ConsoleId
            {
                get { return ConsoleIdInternal; }
            }


            public bool StartInSourceMode
            {
                get { return true; }
            }

            public bool ShowLocalFunctionNames { get { return false; } }
            public bool AllowLocalFunctionNameEditing { get { return false; } }

            public bool WidgetFunctionSelection { get { return false; } }

            public bool AllowSelectingInputParameters { get { return true; } }

            public Type[] AllowedResultTypes { get { return new[] { typeof(object) }; } }

            public int MaxFunctionAllowed { get { return 1000; } }

            #endregion
        }        
    }
}
