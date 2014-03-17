using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Transactions;
using System.Web;
using System.Web.UI;
using System.Workflow.Runtime;
using System.Xml.Linq;
using System.Xml.Serialization;
using Composite.C1Console.Actions;
using Composite.C1Console.Users;
using Composite.C1Console.Workflow;
using Composite.C1Console.Workflow.Foundation;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using Composite.Core.ResourceSystem;
using Composite.Core.Types;
using Composite.Core.WebClient.FlowMediators.FormFlowRendering;
using Composite.Core.WebClient.FunctionCallEditor;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Core.WebClient.State;
using Composite.Data;
using Composite.Data.Transactions;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Functions.Inline;
using Composite.Functions.ManagedParameters;
using Composite.Core.Serialization;


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
                { DataScopeIdentifier.AdministratedName, GetText("EditInlineFunctionWorkflow.AdminitrativeScope.Label") }, 
                { DataScopeIdentifier.PublicName, GetText("EditInlineFunctionWorkflow.PublicScope.Label") } 
            });


            this.Bindings.Add("FunctionCode", functionInfo.GetFunctionCode());

            List<KeyValuePair> assemblies = new List<KeyValuePair>();
            foreach (string assembly in InlineFunctionHelper.GetReferencableAssemblies())
            {
                assemblies.Add(new KeyValuePair(assembly.ToLowerInvariant(), System.IO.Path.GetFileName(assembly)));
            }

            assemblies.Sort(delegate(KeyValuePair kvp1, KeyValuePair kvp2) { return kvp1.Value.CompareTo(kvp2.Value); });

            this.Bindings.Add("Assemblies", assemblies);


            List<string> selectedAssemblies =
                DataFacade.GetData<IInlineFunctionAssemblyReference>().
                Where(f => f.Function == functionInfo.Id).
                OrderBy(f => f.Name).
                Evaluate().
                Select(f => InlineFunctionHelper.GetAssemblyFullPath(f.Name, f.Location).ToLowerInvariant()).
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
                    string name = System.IO.Path.GetFileName(selectedAssembly).ToLowerInvariant();
                    string location = InlineFunctionHelper.GetAssemblyLocation(selectedAssembly).ToLowerInvariant();

                    if (assemblyReferences
                        .Any(f => (string.Compare(f.Name, name, StringComparison.InvariantCultureIgnoreCase) == 0)
                               && (string.Compare(f.Location, location, StringComparison.InvariantCultureIgnoreCase) == 0)) == false)
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
                    string fullPath = InlineFunctionHelper.GetAssemblyFullPath(assemblyReference.Name, assemblyReference.Location);

                    if (selectedAssemblies.Any(f => string.Compare(f, fullPath, StringComparison.InvariantCultureIgnoreCase) == 0) == false)
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

                transactionScope.Complete();
            }

            SetSaveStatus(true);

            UpdateTreeRefresher updateTreeRefresher = this.CreateUpdateTreeRefresher(this.EntityToken);

            updateTreeRefresher.PostRefreshMesseges(function.GetDataEntityToken());
        }



        private void editCodeActivity_Preview_ExecuteCode(object sender, EventArgs e)
        {
            IInlineFunction functionInfo = this.GetBinding<IInlineFunction>("Function");
            string code = this.GetBinding<string>("FunctionCode");
            List<string> selectedAssemblies = this.GetBinding<List<string>>("SelectedAssemblies");

            StringInlineFunctionCreateMethodErrorHandler handler = new StringInlineFunctionCreateMethodErrorHandler();

            MethodInfo methodInfo = InlineFunctionHelper.Create(functionInfo, code, handler, selectedAssemblies);

            FlowControllerServicesContainer serviceContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
            IFormFlowWebRenderingService formFlowWebRenderingService = serviceContainer.GetService<IFormFlowWebRenderingService>();

            if (handler.HasErrors)
            {
                StringBuilder sb = new StringBuilder();

                if (!string.IsNullOrWhiteSpace(handler.MissingContainerType))
                {
                    AddFormattedTextBlock(sb, handler.MissingContainerType);
                }

                if (!string.IsNullOrWhiteSpace(handler.NamespaceMismatch))
                {
                    AddFormattedTextBlock(sb, handler.NamespaceMismatch);
                }

                if (!string.IsNullOrWhiteSpace(handler.MissionMethod))
                {
                    AddFormattedTextBlock(sb, handler.MissionMethod);
                }

                if (handler.LoadingException != null)
                {
                    AddFormattedTextBlock(sb, handler.LoadingException.ToString());
                }

                foreach (Tuple<int, string, string> compileError in handler.CompileErrors)
                {
                    AddFormattedTextBlock(sb, "{0} : {1} : {2}".FormatWith(compileError.Item1, compileError.Item2, compileError.Item3));
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
                ManagedParameterDefinition parameter = parameters.FirstOrDefault(f => f.Name == parameterInfo.Name);
                if (parameter == null)
                {
                    string message = string.Format(GetText("CSharpInlineFunction.MissingParameterDefinition"), parameterInfo.Name);

                    parameterErrors = true;
                    AddFormattedTextBlock(parameterErrorMessages, message);
                }
                else if (parameter.Type != parameterInfo.ParameterType)
                {
                    string message = string.Format(GetText("CSharpInlineFunction.WrongParameterTestValueType"), parameterInfo.Name, parameterInfo.ParameterType, parameter.Type);

                    parameterErrors = true;
                    AddFormattedTextBlock(parameterErrorMessages, message);
                }
                else
                {
                    string previewValueFunctionMarkup = (string.IsNullOrEmpty(parameter.TestValueFunctionMarkup) ? parameter.DefaultValueFunctionMarkup : parameter.TestValueFunctionMarkup);

                    if (string.IsNullOrEmpty(previewValueFunctionMarkup))
                    {
                        string message = string.Format(GetText("CSharpInlineFunction.MissingParameterTestOrDefaultValue"), parameterInfo.Name, parameterInfo.ParameterType, parameter.Type);

                        parameterErrors = true;
                        AddFormattedTextBlock(parameterErrorMessages, message);
                    }
                    else
                    {
                        try
                        {
                            BaseRuntimeTreeNode treeNode = FunctionFacade.BuildTree(XElement.Parse(previewValueFunctionMarkup));
                            object value = treeNode.GetValue();
                            object typedValue = ValueTypeConverter.Convert(value, parameter.Type);
                            parameterValues.Add(typedValue);
                        }
                        catch (Exception ex)
                        {
                            string message = string.Format("Error setting '{0}'. {1}", parameterInfo.Name, ex.Message);

                            parameterErrors = true;
                            AddFormattedTextBlock(parameterErrorMessages, message);
                        }
                    }
                }
            }

            if (parameterErrors)
            {
                formFlowWebRenderingService.SetNewPageOutput(new LiteralControl(parameterErrorMessages.ToString()));
                return;
            }

            CultureInfo oldCurrentCulture = Thread.CurrentThread.CurrentCulture;
            CultureInfo oldCurrentUICulture = Thread.CurrentThread.CurrentUICulture;

            try
            {
                Guid pageId;
                if (this.GetBinding<object>("PageId") == null)
                {
                    pageId = Guid.Empty;
                }
                else
                {
                    pageId = this.GetBinding<Guid>("PageId");
                }
                string dataScopeName = this.GetBinding<string>("PageDataScopeName");
                string cultureName = this.GetBinding<string>("ActiveCultureName");
                CultureInfo cultureInfo = null;
                if (cultureName != null)
                {
                    cultureInfo = CultureInfo.CreateSpecificCulture(cultureName);
                }

                using (new DataScope(DataScopeIdentifier.Deserialize(dataScopeName), cultureInfo))
                {
                    Thread.CurrentThread.CurrentCulture = Thread.CurrentThread.CurrentUICulture = cultureInfo;

                    IPage page = DataFacade.GetData<IPage>(f => f.Id == pageId).FirstOrDefault();
                    if (page != null)
                    {
                        PageRenderer.CurrentPage = page;
                    }

                    object result = methodInfo.Invoke(null, parameterValues.ToArray());

                    string resultString; 
                    
                    try
                    {
                        resultString = PrettyPrinter.Print(result);
                    }
                    catch(Exception ex)
                    {
                        throw new TargetInvocationException(ex);
                    }

                    SetOutput(formFlowWebRenderingService, resultString);
                }
            }
            catch (TargetInvocationException ex)
            {
                SetOutput(formFlowWebRenderingService, ex.InnerException.ToString());
            }
            finally
            {
                Thread.CurrentThread.CurrentCulture = oldCurrentCulture;
                Thread.CurrentThread.CurrentUICulture = oldCurrentUICulture;
            }
        }

        private void AddFormattedTextBlock(StringBuilder sb, string text) {
            sb.Append("<pre>");
            sb.Append(HttpUtility.HtmlEncode(text));
            sb.AppendLine("</pre>");
        }


        private void SetOutput(IFormFlowWebRenderingService formFlowWebRenderingService, string text)
        {
            Control output = new LiteralControl("<pre>" + HttpUtility.HtmlEncode(text) + "</pre>");
            formFlowWebRenderingService.SetNewPageOutput(output);
        }

        private string GetText(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", key);
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
