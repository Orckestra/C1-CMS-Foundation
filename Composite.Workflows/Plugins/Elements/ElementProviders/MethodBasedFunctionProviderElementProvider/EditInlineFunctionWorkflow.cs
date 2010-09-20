using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Transactions;
using System.Web;
using System.Web.UI;
using System.Workflow.Runtime;
using System.Xml.Linq;
using System.Xml.Serialization;
using Composite.C1Console.Actions;
using Composite.C1Console.Workflow;
using Composite.C1Console.Workflow.Foundation;
using Composite.Core.Linq;
using Composite.Core.ResourceSystem;
using Composite.Core.Types;
using Composite.Core.WebClient.FlowMediators.FormFlowRendering;
using Composite.Core.WebClient.FunctionCallEditor;
using Composite.Core.WebClient.State;
using Composite.Data;
using Composite.Data.Transactions;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Functions.Inline;
using Composite.Functions.ManagedParameters;
using Composite.Core.WebClient.Renderings.Page;
using Composite.C1Console.Users;
using System.Globalization;
using System.Threading;


namespace Composite.Workflows.Plugins.Elements.ElementProviders.MethodBasedFunctionProviderElementProvider
{
    [EntityTokenLock]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditInlineFunctionWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public EditInlineFunctionWorkflow()
        {
            InitializeComponent();
        }



        private void initializeCodeActivity_InitBindings_ExecuteCode(object sender, EventArgs e)
        {
            IInlineFunction functionInfo = this.GetDataItemFromEntityToken<IInlineFunction>();

            this.Bindings.Add("Function", functionInfo);

            List<KeyValuePair<Guid, string>> pages = PageStructureInfo.PageListInDocumentOrder().ToList();
            if (pages.Count > 0)
            {
                this.Bindings.Add("PageId", pages.First().Key);
            }
            else
            {
                this.Bindings.Add("PageId", Guid.Empty);
            }

            this.Bindings.Add("PageList", pages);


            if (UserSettings.ActiveLocaleCultureInfo != null)
            {
                List<KeyValuePair<string, string>> activeCulturesDictionary = UserSettings.ActiveLocaleCultureInfos.Select(f => new KeyValuePair<string, string>(f.Name, StringResourceSystemFacade.GetString("Composite.Cultures", f.Name))).ToList();
                this.Bindings.Add("ActiveCultureName", UserSettings.ActiveLocaleCultureInfo.Name);
                this.Bindings.Add("ActiveCulturesList", activeCulturesDictionary);
            }

            this.Bindings.Add("PageDataScopeName", DataScopeIdentifier.AdministratedName);
            this.Bindings.Add("PageDataScopeList", new Dictionary<string, string> 
            { 
                { DataScopeIdentifier.AdministratedName, StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", "EditInlineFunctionWorkflow.AdminitrativeScope.Label") }, 
                { DataScopeIdentifier.PublicName, StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", "EditInlineFunctionWorkflow.PublicScope.Label") } 
            });


            this.Bindings.Add("FunctionCode", functionInfo.GetFunctionCode());

            List<KeyValuePair> assemblies = new List<KeyValuePair>();
            foreach (string assembly in InlineFunctionHelper.GetReferencableAssemblies())
            {
                assemblies.Add(new KeyValuePair(assembly.ToLower(), Path.GetFileName(assembly)));
            }

            assemblies.Sort(delegate(KeyValuePair kvp1, KeyValuePair kvp2) { return kvp1.Value.CompareTo(kvp2.Value); });

            this.Bindings.Add("Assemblies", assemblies);

            List<string> selectedAssemblies =
                DataFacade.GetData<IInlineFunctionAssemblyReference>().
                Where(f => f.Function == functionInfo.Id).
                Evaluate().
                Select(f => InlineFunctionHelper.GetAssemblyFullPath(f.Name, f.Location).ToLower()).
                ToList();

            this.Bindings.Add("SelectedAssemblies", selectedAssemblies);


            List<ManagedParameterDefinition> parameters = ManagedParameterManager.Load(functionInfo.Id).ToList(); ;
            this.Bindings.Add("Parameters", parameters);


            IEnumerable<Type> popularWidgetTypes = FunctionFacade.WidgetFunctionSupportedTypes.Where(f => f.GetGenericArguments().Any(g => DataFacade.GetAllInterfaces(UserType.Developer).Any(h => h.IsAssignableFrom(g))));
            List<Type> parameterTypeOptions = FunctionFacade.FunctionSupportedTypes.Union(popularWidgetTypes).Union(FunctionFacade.WidgetFunctionSupportedTypes).ToList();
            this.Bindings.Add("ParameterTypeOptions", parameterTypeOptions);

            Guid stateId = Guid.NewGuid();
            ParameterEditorState parameterEditorState = new ParameterEditorState { WorkflowId = WorkflowInstanceId };
            SessionStateManager.DefaultProvider.AddState<IParameterEditorState>(stateId, parameterEditorState, DateTime.Now.AddDays(7.0));

            this.Bindings.Add("SessionStateProvider", SessionStateManager.DefaultProviderName);
            this.Bindings.Add("SessionStateId", stateId);
        }



        private void saveCodeActivity_Save_ExecuteCode(object sender, EventArgs e)
        {
            IInlineFunction function = this.GetBinding<IInlineFunction>("Function");
            string code = this.GetBinding<string>("FunctionCode");
            List<string> selectedAssemblies = this.GetBinding<List<string>>("SelectedAssemblies");

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                IEnumerable<IInlineFunctionAssemblyReference> assemblyReferences =
                    DataFacade.GetData<IInlineFunctionAssemblyReference>(f => f.Function == function.Id).Evaluate();

                foreach (string selectedAssembly in selectedAssemblies)
                {
                    string name = Path.GetFileName(selectedAssembly).ToLower();
                    string location = InlineFunctionHelper.GetAssemblyLocation(selectedAssembly).ToLower();

                    if (assemblyReferences.Where(f => f.Name.ToLower() == name && f.Location.ToLower() == location).Any() == false)
                    {
                        IInlineFunctionAssemblyReference assemblyReference = DataFacade.BuildNew<IInlineFunctionAssemblyReference>();
                        assemblyReference.Id = Guid.NewGuid();
                        assemblyReference.Function = function.Id;
                        assemblyReference.Name = name;
                        assemblyReference.Location = location;

                        DataFacade.AddNew(assemblyReference);
                    }
                }


                foreach (IInlineFunctionAssemblyReference assemblyReference in assemblyReferences)
                {
                    string fullPath = InlineFunctionHelper.GetAssemblyFullPath(assemblyReference.Name, assemblyReference.Location).ToLower();

                    if (selectedAssemblies.Where(f => f.ToLower() == fullPath).Any() == false)
                    {
                        DataFacade.Delete(assemblyReference);
                    }
                }


                IInlineFunction oldFunction = DataFacade.GetData<IInlineFunction>(f => f.Id == function.Id).Single();
                if ((oldFunction.Name != function.Name) || (oldFunction.Namespace != function.Namespace))
                {
                    InlineFunctionHelper.FunctionRenamed(function, oldFunction);
                }


                List<ManagedParameterDefinition> parameters = this.GetBinding<List<ManagedParameterDefinition>>("Parameters");
                ManagedParameterManager.Save(function.Id, parameters);

                DataFacade.Update(function);
                InlineFunctionHelper.SetFunctinoCode(function, code);
            }

            SetSaveStatus(true);
        }



        private void editCodeActivity_Preview_ExecuteCode(object sender, EventArgs e)
        {
            IInlineFunction functionInfo = this.GetBinding<IInlineFunction>("Function");
            string code = this.GetBinding<string>("FunctionCode");

            StringInlineFunctionCreateMethodErrorHandler handler = new StringInlineFunctionCreateMethodErrorHandler();

            MethodInfo methodInfo = InlineFunctionHelper.Create(functionInfo, code, handler);

            FlowControllerServicesContainer serviceContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
            IFormFlowWebRenderingService formFlowWebRenderingService = serviceContainer.GetService<IFormFlowWebRenderingService>();

            if (handler.HasErrors)
            {
                StringBuilder sb = new StringBuilder();

                if (string.IsNullOrWhiteSpace(handler.MissingContainerType) == false)
                {
                    sb.AppendLine("<pre>" + handler.MissingContainerType + "</pre>");
                }

                if (string.IsNullOrWhiteSpace(handler.NamespaceMismatch) == false)
                {
                    sb.AppendLine("<pre>" + handler.NamespaceMismatch + "</pre>");
                }

                if (string.IsNullOrWhiteSpace(handler.MissionMethod) == false)
                {
                    sb.AppendLine("<pre>" + handler.MissionMethod + "</pre>");
                }

                foreach (Tuple<int, string, string> compileError in handler.CompileErrors)
                {
                    sb.AppendLine("<pre>" + string.Format("{0} : {1} : {2}", compileError.Item1, compileError.Item2, compileError.Item3 + "</pre>"));
                }

                formFlowWebRenderingService.SetNewPageOutput(new LiteralControl(sb.ToString()));

                return;
            }


            List<ManagedParameterDefinition> parameters = this.GetBinding<List<ManagedParameterDefinition>>("Parameters");

            List<object> parameterValues = new List<object>();
            bool parameterErrors = false;
            StringBuilder parameterErrorMessages = new StringBuilder();
            foreach (ParameterInfo parameterInfo in methodInfo.GetParameters())
            {
                ManagedParameterDefinition parameter = parameters.Where(f => f.Name == parameterInfo.Name).FirstOrDefault();
                if (parameter == null)
                {
                    string message = string.Format(StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", "CSharpInlineFunction.MissingParameterTestValue"), parameterInfo.Name);

                    parameterErrors = true;
                    parameterErrorMessages.AppendLine("<pre>" + message + "</pre>");
                }
                else if (parameter.Type != parameterInfo.ParameterType)
                {
                    string message = string.Format(StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", "CSharpInlineFunction.WrongParameterTestValueType"), parameterInfo.Name, parameterInfo.ParameterType, parameter.Type);

                    parameterErrors = true;
                    parameterErrorMessages.AppendLine("<pre>" + message + "</pre>");
                }
                else
                {
                    BaseRuntimeTreeNode treeNode = FunctionFacade.BuildTree(XElement.Parse(parameter.TestValueFunctionMarkup));

                    object value = treeNode.GetValue();

                    parameterValues.Add(value);
                }
            }

            if (parameterErrors == true)
            {
                formFlowWebRenderingService.SetNewPageOutput(new LiteralControl("<pre>" + parameterErrorMessages + "</pre>"));
                return;
            }

            CultureInfo oldCurrentCulture = Thread.CurrentThread.CurrentCulture;
            CultureInfo oldCurrentUICulture = Thread.CurrentThread.CurrentUICulture;

            try
            {
                Guid pageId = this.GetBinding<Guid>("PageId");
                string dataScopeName = this.GetBinding<string>("PageDataScopeName");
                string cultureName = this.GetBinding<string>("ActiveCultureName");
                CultureInfo cultureInfo = null;
                if (cultureName != null)
                {
                    cultureInfo = CultureInfo.CreateSpecificCulture(cultureName);
                }

                using (new DataScope(DataScopeIdentifier.Deserialize(dataScopeName), cultureInfo))
                {
                    Thread.CurrentThread.CurrentCulture = cultureInfo;
                    Thread.CurrentThread.CurrentUICulture = cultureInfo;

                    IPage page = DataFacade.GetData<IPage>(f => f.Id == pageId).FirstOrDefault();
                    if (page != null)
                    {
                        PageRenderer.CurrentPage = page;
                    }

                    object result = methodInfo.Invoke(null, parameterValues.ToArray());

                    Control output = new LiteralControl("<pre>" + HttpUtility.HtmlEncode(result.ToString()) + "</pre>");
                    formFlowWebRenderingService.SetNewPageOutput(output);

                    Thread.CurrentThread.CurrentCulture = oldCurrentCulture;
                    Thread.CurrentThread.CurrentUICulture = oldCurrentUICulture;
                }                
            }
            catch (TargetInvocationException ex)
            {
                Control output = new LiteralControl("<pre>" + HttpUtility.HtmlEncode(ex.InnerException.ToString()) + "</pre>");
                formFlowWebRenderingService.SetNewPageOutput(output);
            }
            finally
            {
                Thread.CurrentThread.CurrentCulture = oldCurrentCulture;
                Thread.CurrentThread.CurrentUICulture = oldCurrentUICulture;
            }
        }
    }





    [Serializable]
    public sealed class ParameterEditorState : IParameterEditorState
    {
        public Guid WorkflowId { get; set; }

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
