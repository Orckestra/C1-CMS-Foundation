using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading;
using System.Transactions;
using System.Web;
using System.Web.UI;
using System.Workflow.Activities;
using System.Workflow.Runtime;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Serialization;
using System.Xml.Xsl;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Users;
using Composite.C1Console.Workflow;
using Composite.C1Console.Workflow.Foundation;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Localization;
using Composite.Core.Logging;
using Composite.Core.ResourceSystem;
using Composite.Core.Threading;
using Composite.Core.WebClient;
using Composite.Core.WebClient.FlowMediators.FormFlowRendering;
using Composite.Core.WebClient.FunctionCallEditor;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Core.WebClient.State;
using Composite.Core.Xml;
using Composite.Data;
using Composite.Data.Plugins.DataProvider.Streams;
using Composite.Data.Transactions;
using Composite.Data.Types;
using Composite.Data.Validation;
using Composite.Functions;
using Composite.Functions.ManagedParameters;
using Composite.Plugins.Elements.ElementProviders.BaseFunctionProviderElementProvider;
using Composite.Plugins.Functions.FunctionProviders.XsltBasedFunctionProvider;
using Microsoft.Practices.EnterpriseLibrary.Validation;


namespace Composite.Plugins.Elements.ElementProviders.XsltBasedFunctionProviderElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditXsltFunctionWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public EditXsltFunctionWorkflow()
        {
            InitializeComponent();
        }



        private void CheckActiveLanguagesExists(object sender, ConditionalEventArgs e)
        {
            e.Result = UserSettings.ActiveLocaleCultureInfo != null;
        }



        private void CheckPageExists(object sender, ConditionalEventArgs e)
        {
            e.Result = DataFacade.GetData<IPage>().Any();
        }



        private void MissingActiveLanguageCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            ShowMessage(DialogType.Message,
                GetString("EditXsltFunctionWorkflow.MissingActiveLanguageTitle"),
                GetString("EditXsltFunctionWorkflow.MissingActiveLanguageMessage"));
        }



        private void MissingPageCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            ShowMessage(
                DialogType.Message,
                GetString("EditXsltFunctionWorkflow.MissingPageTitle"),
                GetString("EditXsltFunctionWorkflow.MissingPageMessage"));
        }



        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;
            IXsltFunction xsltFunction = (IXsltFunction)dataEntityToken.Data;
            IFile file = IFileServices.GetFile<IXsltFile>(xsltFunction.XslFilePath);
            IEnumerable<ManagedParameterDefinition> parameters = ManagedParameterManager.Load(xsltFunction.Id);
            this.Bindings.Add("CurrentXslt", dataEntityToken.Data);
            this.Bindings.Add("Parameters", parameters);

            // popular type widgets
            List<Type> popularTypes = DataFacade.GetAllInterfaces(UserType.Developer);
            var popularWidgetTypes = FunctionFacade.WidgetFunctionSupportedTypes.Where(f => f.GetGenericArguments().Any(g => popularTypes.Any(h => h.IsAssignableFrom(g))));

            IEnumerable<Type> parameterTypeOptions = FunctionFacade.FunctionSupportedTypes.Union(popularWidgetTypes).Union(FunctionFacade.WidgetFunctionSupportedTypes);

            // At the moment we don't have functions that return IEnumerable<XNode>, so we're hardcoding this type for now
            parameterTypeOptions = parameterTypeOptions.Union(new [] { typeof (IEnumerable<XNode>) });

            this.Bindings.Add("ParameterTypeOptions", parameterTypeOptions.ToList());

            string xsltDocumentString = file.ReadAllText();
            this.Bindings.Add("XslTemplate", xsltDocumentString);
            this.Bindings.Add("XslTemplateLastSaveHash", xsltDocumentString.GetHashCode());

            List<string> functionErrors;
            List<NamedFunctionCall> FunctionCalls = RenderHelper.GetValidFunctionCalls(xsltFunction.Id, out functionErrors).ToList();

            if ((functionErrors != null) && (functionErrors.Any()))
            {
                foreach (string error in functionErrors)
                {
                    this.ShowMessage(DialogType.Error, "A function call has been dropped", error);
                }
            }

            this.Bindings.Add("FunctionCalls", FunctionCalls);
            this.Bindings.Add("PageId", PageManager.GetChildrenIDs(Guid.Empty).FirstOrDefault());

            if (UserSettings.ActiveLocaleCultureInfo != null)
            {
                List<KeyValuePair<string, string>> activeCulturesDictionary = UserSettings.ActiveLocaleCultureInfos.Select(f => new KeyValuePair<string, string>(f.Name,DataLocalizationFacade.GetCultureTitle(f))).ToList();
                this.Bindings.Add("ActiveCultureName", UserSettings.ActiveLocaleCultureInfo.Name);
                this.Bindings.Add("ActiveCulturesList", activeCulturesDictionary);
            }

            this.Bindings.Add("PageDataScopeName", DataScopeIdentifier.AdministratedName);
            this.Bindings.Add("PageDataScopeList", new Dictionary<string, string> 
            { 
                { DataScopeIdentifier.AdministratedName, GetString("EditXsltFunction.LabelAdminitrativeScope") }, 
                { DataScopeIdentifier.PublicName, GetString("EditXsltFunction.LabelPublicScope") } 
            });


            // Creating a session state object
            Guid stateId = Guid.NewGuid();
            var state = new FunctionCallDesignerState { WorkflowId = WorkflowInstanceId, ConsoleIdInternal = GetCurrentConsoleId() };
            SessionStateManager.DefaultProvider.AddState<IFunctionCallEditorState>(stateId, state, DateTime.Now.AddDays(7.0));

            this.Bindings.Add("SessionStateProvider", SessionStateManager.DefaultProviderName);
            this.Bindings.Add("SessionStateId", stateId);
        }


        private void IsValidData(object sender, ConditionalEventArgs e)
        {
            IXsltFunction function = this.GetBinding<IXsltFunction>("CurrentXslt");

            if (function.Name == string.Empty)
            {
                this.ShowFieldMessage("CurrentXslt.Name", GetString("EditXsltFunctionWorkflow.EmptyMethodName"));
                e.Result = false;
                return;
            }


            if (string.IsNullOrWhiteSpace(function.Namespace))
            {
                this.ShowFieldMessage("CurrentXslt.Namespace", GetString("EditXsltFunctionWorkflow.NamespaceEmpty"));
                return;
            }


            if (!function.Namespace.IsCorrectNamespace('.'))
            {
                this.ShowFieldMessage("CurrentXslt.Namespace", GetString("EditXsltFunctionWorkflow.InvalidNamespace"));
                e.Result = false;
                return;
            }


            if (!(function.XslFilePath.StartsWith("\\") || function.XslFilePath.StartsWith("/")))
            {
                this.ShowFieldMessage("CurrentXslt.Name", GetString("EditXsltFunctionWorkflow.InvalidFileName"));
                e.Result = false;
                return;
            }


            function.XslFilePath = function.CreateXslFilePath();

            ValidationResults validationResults = ValidationFacade.Validate<IXsltFunction>(function);
            if (!validationResults.IsValid)
            {
                foreach (ValidationResult result in validationResults)
                {
                    this.ShowFieldMessage(string.Format("{0}.{1}", "CurrentXslt", result.Key), result.Message);
                }

                return;
            }


            if (!function.ValidateXslFilePath())
            {
                this.ShowFieldMessage("NewXslt.Name", GetString("AddNewXsltFunctionWorkflow.TotalNameTooLang"));
                return;
            }


            IXsltFile xsltfile = DataFacade.BuildNew<IXsltFile>();
            xsltfile.FolderPath = System.IO.Path.GetDirectoryName(function.XslFilePath);
            xsltfile.FileName = System.IO.Path.GetFileName(function.XslFilePath);

            if (!DataFacade.ValidatePath(xsltfile, "XslFileProvider"))
            {
                this.ShowFieldMessage("CurrentXslt.Name", GetString("EditXsltFunctionWorkflow.TotalNameTooLang"));
                return;
            }

            e.Result = true;
        }


        private void editPreviewActivity_ExecuteCode(object sender, EventArgs e)
        {
            Stopwatch functionCallingStopwatch = null;
            long millisecondsToken = 0;

            CultureInfo oldCurrentCulture = Thread.CurrentThread.CurrentCulture;
            CultureInfo oldCurrentUICulture = Thread.CurrentThread.CurrentUICulture;

            try
            {
                IXsltFunction xslt = this.GetBinding<IXsltFunction>("CurrentXslt");

                string xslTemplate = this.GetBinding<string>("XslTemplate");

                IFile persistemTemplateFile = IFileServices.TryGetFile<IXsltFile>(xslt.XslFilePath);
                if (persistemTemplateFile != null)
                {
                    string persistemTemplate = persistemTemplateFile.ReadAllText();

                    if (this.GetBinding<int>("XslTemplateLastSaveHash") != persistemTemplate.GetHashCode())
                    {
                        xslTemplate = persistemTemplate;
                        ConsoleMessageQueueFacade.Enqueue(new LogEntryMessageQueueItem { Level = LogLevel.Fine, Message = "XSLT file on file system was used. It has been changed by another process.", Sender = this.GetType() }, this.GetCurrentConsoleId());
                    }
                }

                List<NamedFunctionCall> namedFunctions = this.GetBinding<IEnumerable<NamedFunctionCall>>("FunctionCalls").ToList();

                // If preview is done multiple times in a row, with no postbacks an object reference to BaseFunctionRuntimeTreeNode may be held
                // If the function in the BaseFunctionRuntimeTreeNode have ben unloaded / reloaded, this preview will still run on the old instance
                // We force refresh by serializing / deserializing
                foreach (NamedFunctionCall namedFunction in namedFunctions)
                {
                    namedFunction.FunctionCall = (BaseFunctionRuntimeTreeNode)FunctionFacade.BuildTree(namedFunction.FunctionCall.Serialize());
                }


                List<ManagedParameterDefinition> parameterDefinitions = this.GetBinding<IEnumerable<ManagedParameterDefinition>>("Parameters").ToList();

                Guid pageId = this.GetBinding<Guid>("PageId");
                string dataScopeName = this.GetBinding<string>("PageDataScopeName");
                string cultureName = this.GetBinding<string>("ActiveCultureName");
                CultureInfo cultureInfo = null;
                if (cultureName != null)
                {
                    cultureInfo = CultureInfo.CreateSpecificCulture(cultureName);
                }

                IPage page;

                TransformationInputs transformationInput;
                using (new DataScope(DataScopeIdentifier.Deserialize(dataScopeName), cultureInfo))
                {
                    Thread.CurrentThread.CurrentCulture = cultureInfo;
                    Thread.CurrentThread.CurrentUICulture = cultureInfo;

                    page = DataFacade.GetData<IPage>(f => f.Id == pageId).FirstOrDefault();
                    if (page != null)
                    {
                        PageRenderer.CurrentPage = page;
                    }

                    functionCallingStopwatch = Stopwatch.StartNew();
                    transformationInput = RenderHelper.BuildInputDocument(namedFunctions, parameterDefinitions, true);
                    functionCallingStopwatch.Stop();

                    Thread.CurrentThread.CurrentCulture = oldCurrentCulture;
                    Thread.CurrentThread.CurrentUICulture = oldCurrentUICulture;
                }


                string output = "";
                string error = "";
                try
                {
                    Thread.CurrentThread.CurrentCulture = cultureInfo;
                    Thread.CurrentThread.CurrentUICulture = cultureInfo;

                    var styleSheet = XElement.Parse(xslTemplate);

                    XsltBasedFunctionProvider.ResolveImportIncludePaths(styleSheet);

                    LocalizationParser.Parse(styleSheet);

                    XDocument transformationResult = new XDocument();
                    using (XmlWriter writer = new LimitedDepthXmlWriter(transformationResult.CreateWriter()))
                    {
                        XslCompiledTransform xslTransformer = new XslCompiledTransform();
                        xslTransformer.Load(styleSheet.CreateReader(), XsltSettings.TrustedXslt, new XmlUrlResolver());

                        XsltArgumentList transformArgs = new XsltArgumentList();
                        XslExtensionsManager.Register(transformArgs);

                        if (transformationInput.ExtensionDefinitions != null)
                        {
                            foreach (IXsltExtensionDefinition extensionDef in transformationInput.ExtensionDefinitions)
                            {
                                transformArgs.AddExtensionObject(extensionDef.ExtensionNamespace.ToString(),
                                                                 extensionDef.EntensionObjectAsObject);
                            }
                        }

                        Exception exception = null;
                        HttpContext httpContext = HttpContext.Current;

                        Thread thread = new Thread(delegate()
                           {
                               Thread.CurrentThread.CurrentCulture = cultureInfo;
                               Thread.CurrentThread.CurrentUICulture = cultureInfo;

                               Stopwatch transformationStopwatch = Stopwatch.StartNew();

                               try
                               {
                                   using (ThreadDataManager.Initialize())
                                   using (new DataScope(DataScopeIdentifier.Deserialize(dataScopeName), cultureInfo))
                                   {
                                       HttpContext.Current = httpContext;

                                       var reader = transformationInput.InputDocument.CreateReader();
                                       xslTransformer.Transform(reader, transformArgs, writer);
                                   }
                               }
                               catch (ThreadAbortException ex)
                               {
                                   exception = ex;
                                   Thread.ResetAbort();
                               }
                               catch (Exception ex)
                               {
                                   exception = ex;
                               }

                               transformationStopwatch.Stop();

                               millisecondsToken = transformationStopwatch.ElapsedMilliseconds;
                           });

                        thread.Start();
                        bool res = thread.Join(1000);  // sadly, this needs to be low enough to prevent StackOverflowException from fireing.

                        if (res == false)
                        {
                            if (thread.ThreadState == System.Threading.ThreadState.Running)
                            {
                                thread.Abort();
                            }
                            throw new XslLoadException("Transformation took more than 1000 milliseconds to complete. This could be due to a never ending recursive call. Execution aborted to prevent fatal StackOverflowException.");
                        }

                        if (exception != null)
                        {
                            throw exception;
                        }
                    }

                    if (xslt.OutputXmlSubType == "XHTML")
                    {
                        XhtmlDocument xhtmlDocument = new XhtmlDocument(transformationResult);

                        output = xhtmlDocument.Root.ToString();
                    }
                    else
                    {
                        output = transformationResult.Root.ToString();
                    }
                }
                catch (Exception ex)
                {
                    output = "<error/>";
                    error = string.Format("{0}\n{1}", ex.GetType().Name, ex.Message);

                    Exception inner = ex.InnerException;

                    string indent = "";

                    while (inner != null)
                    {
                        indent = indent + " - ";
                        error = error + "\n" + indent + inner.Message;
                        inner = inner.InnerException;
                    }
                }
                finally
                {
                    Thread.CurrentThread.CurrentCulture = oldCurrentCulture;
                    Thread.CurrentThread.CurrentUICulture = oldCurrentUICulture;
                }

                Page currentPage = HttpContext.Current.Handler as Page;
                if (currentPage == null) throw new InvalidOperationException("The Current HttpContext Handler must be a System.Web.Ui.Page");

                UserControl inOutControl = (UserControl)currentPage.LoadControl(UrlUtils.ResolveAdminUrl("controls/Misc/MarkupInOutView.ascx"));
                inOutControl.Attributes.Add("in", transformationInput.InputDocument.ToString());
                inOutControl.Attributes.Add("out", output);
                inOutControl.Attributes.Add("error", error);
                inOutControl.Attributes.Add("statusmessage", string.Format("Execution times: Total {0} ms. Functions: {1} ms. XSLT: {2} ms.",
                    millisecondsToken + functionCallingStopwatch.ElapsedMilliseconds,
                    functionCallingStopwatch.ElapsedMilliseconds,
                    millisecondsToken));

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


        private IEnumerable<INamedFunctionCall> ConvertFunctionCalls(IEnumerable<NamedFunctionCall> FunctionCalls, Guid xsltId)
        {
            foreach (NamedFunctionCall namedFunctionCall in FunctionCalls)
            {
                INamedFunctionCall newNamedFunctionCall = DataFacade.BuildNew<INamedFunctionCall>();
                newNamedFunctionCall.XsltFunctionId = xsltId;
                newNamedFunctionCall.Name = namedFunctionCall.Name;
                newNamedFunctionCall.SerializedFunction = namedFunctionCall.FunctionCall.Serialize().ToString(SaveOptions.DisableFormatting);

                yield return newNamedFunctionCall;
            }
        }


        private void saveCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            try
            {
                IXsltFunction xslt = this.GetBinding<IXsltFunction>("CurrentXslt");
                IXsltFunction previousXslt = DataFacade.GetData<IXsltFunction>(f => f.Id == xslt.Id).SingleOrDefault();

                IFile persistemTemplateFile = IFileServices.TryGetFile<IXsltFile>(xslt.XslFilePath);
                if (persistemTemplateFile != null)
                {
                    string persistemTemplate = (persistemTemplateFile != null ? persistemTemplateFile.ReadAllText() : "");

                    if (this.GetBinding<int>("XslTemplateLastSaveHash") != persistemTemplate.GetHashCode())
                    {
                        this.Bindings["XslTemplate"] = persistemTemplate;
                        this.RerenderView();
                        ConsoleMessageQueueFacade.Enqueue(new LogEntryMessageQueueItem { Level = LogLevel.Fine, Message = "XSLT file on file system has been changed by another process. In-browser editor updated to reflect file on file system.", Sender = this.GetType() }, this.GetCurrentConsoleId());
                    }
                }

                string xslTemplate = this.GetBinding<string>("XslTemplate");

                var parameters = this.GetBinding<IEnumerable<ManagedParameterDefinition>>("Parameters");

                IEnumerable<NamedFunctionCall> FunctionCalls = this.GetBinding<IEnumerable<NamedFunctionCall>>("FunctionCalls");
                
                if (FunctionCalls.Select(f => f.Name).Distinct().Count() != FunctionCalls.Count())
                {                    
                    ShowMessage(DialogType.Error,
                        GetString("EditXsltFunctionWorkflow.SameLocalFunctionNameClashTitle"),
                        GetString("EditXsltFunctionWorkflow.SameLocalFunctionNameClashMessage"));
                    return;
                }


                using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
                {
                    // Renaming related file if necessary
                    string oldRelativePath = previousXslt.XslFilePath.Replace('\\', '/'); // This replace takes care of old paths having \ in them
                    string newRelativePath = xslt.CreateXslFilePath();

                    if (string.Compare(oldRelativePath, newRelativePath, true) != 0)
                    {
                        var xlsFile = IFileServices.GetFile<IXsltFile>(previousXslt.XslFilePath);
                        string systemPath = (xlsFile as FileSystemFileBase).SystemPath;
                        // Implement it in another way?
                        string xsltFilesRoot = systemPath.Substring(0, systemPath.Length - previousXslt.XslFilePath.Length);

                        string newSystemPath = (xsltFilesRoot + newRelativePath).Replace('\\', '/');

                        if ((string.Compare(systemPath, newSystemPath, true) != 0) && C1File.Exists(newSystemPath))
                        {
                            FlowControllerServicesContainer serviceContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
                            var consoleMessageService = serviceContainer.GetService<IManagementConsoleMessageService>();
                            consoleMessageService.ShowMessage(
                                DialogType.Error,
                                GetString("EditXsltFunctionWorkflow.InvalidName"),
                                GetString("EditXsltFunctionWorkflow.CannotRenameFileExists").FormatWith(newSystemPath));
                            return;
                        }

                        string directoryPath = Path.GetDirectoryName(newSystemPath);
                        if (!C1Directory.Exists(directoryPath))
                        {
                            C1Directory.CreateDirectory(directoryPath);
                        }

                        C1File.Move(systemPath, newSystemPath);

                        xslt.XslFilePath = newRelativePath;

                        // TODO: Implement removing empty Xslt directories
                    }


                    IFile file = IFileServices.GetFile<IXsltFile>(xslt.XslFilePath);
                    file.SetNewContent(xslTemplate);

                    ManagedParameterManager.Save(xslt.Id, parameters);

                    DataFacade.Update(xslt);
                    DataFacade.Update(file);

                    this.Bindings["XslTemplateLastSaveHash"] = xslTemplate.GetHashCode();


                    DataFacade.Delete<INamedFunctionCall>(f => f.XsltFunctionId == xslt.Id);
                    DataFacade.AddNew<INamedFunctionCall>(ConvertFunctionCalls(FunctionCalls, xslt.Id));

                    transactionScope.Complete();
                }

                if (previousXslt.Namespace != xslt.Namespace || previousXslt.Name != xslt.Name || previousXslt.Description != xslt.Description)
                {
                    // This is a some what nasty hack. Due to the nature of the BaseFunctionProviderElementProvider, this hack is needed
                    BaseFunctionFolderElementEntityToken entityToken = new BaseFunctionFolderElementEntityToken("ROOT:XsltBasedFunctionProviderElementProvider");
                    RefreshEntityToken(entityToken);
                }

                SetSaveStatus(true);

            }
            catch (Exception ex)
            {
                LoggingService.LogCritical("XSLT Save", ex);

                FlowControllerServicesContainer serviceContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
                var consoleMsgService = serviceContainer.GetService<IManagementConsoleMessageService>();
                consoleMsgService.ShowMessage(DialogType.Error, "Error", ex.Message);

                SetSaveStatus(false);
            }
        }

        private static string GetString(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.Plugins.XsltBasedFunction", key);
        }

        // This is for propergating error message with never ending recursive calls
        private sealed class XslLoadException : Exception
        {
            public XslLoadException(string message)
                : base(message)
            {
            }
        }

        [Serializable]
        public sealed class FunctionCallDesignerState : IFunctionCallEditorState
        {
            public Guid WorkflowId { get; set; }
            public string ConsoleIdInternal { get; set; }

            private FormData GetFormData()
            {
                var formData = WorkflowFacade.GetFormData(WorkflowId);

                Verify.IsNotNull(formData, "Failed to get form data, workflow may have been aborted!");

                return formData;
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

            public bool WidgetFunctionSelection
            {
                get { return false; }
            }

            public bool ShowLocalFunctionNames
            {
                get { return true; }
            }

            public bool AllowLocalFunctionNameEditing
            {
                get { return true; }
            }

            public bool AllowSelectingInputParameters
            {
                get { return true; }
            }

            public Type[] AllowedResultTypes
            {
                get
                {
                    return new[] {
                    typeof (XDocument), typeof (XElement), typeof (IEnumerable<XElement>),
                    typeof(bool), typeof(int), typeof(decimal), typeof(string), typeof(DateTime), typeof(Guid), typeof(CultureInfo),
                    typeof(IDataReference), typeof(IXsltExtensionDefinition)};
                }
            }

            public int MaxFunctionAllowed
            {
                get { return 1000; }
            }

            string IFunctionCallEditorState.ConsoleId
            {
                get { return ConsoleIdInternal; }
            }

            #endregion
        }
    }
}
