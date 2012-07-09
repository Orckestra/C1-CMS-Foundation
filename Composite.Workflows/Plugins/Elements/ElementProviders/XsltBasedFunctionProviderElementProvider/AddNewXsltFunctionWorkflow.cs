using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Workflow.Activities;
using System.Workflow.Runtime;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Users;
using Composite.C1Console.Workflow;
using Composite.Core.Extensions;
using Composite.Core.Localization;
using Composite.Core.ResourceSystem;
using Composite.Core.Xml;
using Composite.Data;
using Composite.Data.Transactions;
using Composite.Data.Types;
using Composite.Plugins.Elements.ElementProviders.BaseFunctionProviderElementProvider;
using Composite.Plugins.Functions.FunctionProviders.XsltBasedFunctionProvider;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using Composite.Data.Validation;


namespace Composite.Plugins.Elements.ElementProviders.XsltBasedFunctionProviderElementProvider
{


    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewXsltFunctionWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private static readonly string Binding_CopyFromFunctionId = "CopyFromFunctionId";
        private static readonly string Binding_CopyFromOptions = "CopyFromOptions";

        private static string _newXsltMarkup = string.Format(@"<?xml version=""1.0"" encoding=""UTF-8""?>
<xsl:stylesheet version=""1.0"" xmlns:xsl=""http://www.w3.org/1999/XSL/Transform""
	xmlns:in=""{0}""
	xmlns:lang=""{1}""
	xmlns:f=""{2}""
	xmlns=""http://www.w3.org/1999/xhtml""
	exclude-result-prefixes=""xsl in lang f"">

	<xsl:template match=""/"">
		<html>
			<head>
				<!-- markup placed here will be shown in the head section of the rendered page -->
			</head>

			<body>
				<!-- markup placed here will be the output of this rendering -->
				<div>
					Value of input parameter 'TestParam': 
					<xsl:value-of select=""/in:inputs/in:param[@name='Input parameter name']"" />
				</div>
				<div>
					Value of function call 'TestCall': 
					<xsl:value-of select=""/in:inputs/in:result[@name='Function call local name']"" />
				</div>
			</body>
		</html>
	</xsl:template>

</xsl:stylesheet>
", RenderHelper.XsltInput10, LocalizationXmlConstants.XmlNamespace, Namespaces.Function10);


        public AddNewXsltFunctionWorkflow()
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
                GetText("AddNewXsltFunctionWorkflow.MissingActiveLanguageTitle"),
                GetText("AddNewXsltFunctionWorkflow.MissingActiveLanguageMessage"));
        }



        private void MissingPageCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            ShowMessage(
                DialogType.Message,
                GetText("AddNewXsltFunctionWorkflow.MissingPageTitle"),
                GetText("AddNewXsltFunctionWorkflow.MissingPageMessage"));
        }



        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            IXsltFunction xsltFunction = DataFacade.BuildNew<IXsltFunction>();
            xsltFunction.Id = Guid.NewGuid();
            xsltFunction.Name = "";
            xsltFunction.OutputXmlSubType = "XHTML";
            xsltFunction.Description = "";

            BaseFunctionFolderElementEntityToken folderToken = (BaseFunctionFolderElementEntityToken)this.EntityToken;
            xsltFunction.Namespace = folderToken.FunctionNamespace ?? UserSettings.LastSpecifiedNamespace;

            this.Bindings.Add("NewXslt", xsltFunction);

            var copyOfOptions = new List<KeyValuePair<Guid, string>>();

            copyOfOptions.Add(new KeyValuePair<Guid, string>(Guid.Empty, GetText("AddNewXsltFunctionStep1.LabelCopyFromEmptyOption")));

            foreach (IXsltFunction function in DataFacade.GetData<IXsltFunction>())
            {
                string fullName = function.Namespace + "." + function.Name;
                copyOfOptions.Add(new KeyValuePair<Guid, string>(function.Id, fullName));
            }

            this.Bindings.Add(Binding_CopyFromFunctionId, Guid.Empty);
            this.Bindings.Add(Binding_CopyFromOptions, copyOfOptions);
        }



        private void IsValidData(object sender, ConditionalEventArgs e)
        {
            IXsltFunction function = this.GetBinding<IXsltFunction>("NewXslt");

            e.Result = false;

            if (function.Name == string.Empty)
            {
                this.ShowFieldMessage("NewXslt.Name", GetText("AddNewXsltFunctionWorkflow.MethodEmpty"));
                return;
            }

            if (string.IsNullOrWhiteSpace(function.Namespace))
            {
                this.ShowFieldMessage("NewXslt.Namespace", GetText("AddNewXsltFunctionWorkflow.NamespaceEmpty"));
                return;
            }

            if (!function.Namespace.IsCorrectNamespace('.'))
            {
                this.ShowFieldMessage("NewXslt.Namespace", GetText("AddNewXsltFunctionWorkflow.InvalidNamespace"));
                return;
            }

            string functionName = function.Name;
            string functionNamespace = function.Namespace;
            bool nameIsReserved = DataFacade.GetData<IXsltFunction>()
                .Where(func => string.Compare(func.Name, functionName, true) == 0
                            && string.Compare(func.Namespace, functionNamespace, true) == 0)
                .Any();

            if (nameIsReserved)
            {
                this.ShowFieldMessage("NewXslt.Name", GetText("AddNewXsltFunctionWorkflow.DuplicateName"));
                return;
            }

            function.XslFilePath = function.CreateXslFilePath();

            ValidationResults validationResults = ValidationFacade.Validate<IXsltFunction>(function);
            if (!validationResults.IsValid)
            {
                foreach (ValidationResult result in validationResults)
                {
                    this.ShowFieldMessage(string.Format("{0}.{1}", "NewXslt", result.Key), result.Message);
                }

                return;
            }


            if (!function.ValidateXslFilePath())
            {
                this.ShowFieldMessage("NewXslt.Name", GetText("AddNewXsltFunctionWorkflow.TotalNameTooLang"));
                return;
            }


            IXsltFile xsltfile = DataFacade.BuildNew<IXsltFile>();
            xsltfile.FolderPath = System.IO.Path.GetDirectoryName(function.XslFilePath);
            xsltfile.FileName = System.IO.Path.GetFileName(function.XslFilePath);

            if (!DataFacade.ValidatePath(xsltfile, "XslFileProvider"))
            {
                this.ShowFieldMessage("NewXslt.Name", GetText("AddNewXsltFunctionWorkflow.TotalNameTooLang"));
                return;
            }

            e.Result = true;
        }



        private void finalizecodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            AddNewTreeRefresher addNewTreeRefresher = this.CreateAddNewTreeRefresher(this.EntityToken);

            IXsltFunction xslt = this.GetBinding<IXsltFunction>("NewXslt");
            Guid copyFromFunctionId = this.GetBinding<Guid>(Binding_CopyFromFunctionId);

            IXsltFunction copyFromFunction = null;
            if(copyFromFunctionId != Guid.Empty)
            {
                copyFromFunction = DataFacade.GetData<IXsltFunction>().First(f => f.Id == copyFromFunctionId);
            }

            xslt.XslFilePath = xslt.CreateXslFilePath();

            IFile file = IFileServices.TryGetFile<IXsltFile>(xslt.XslFilePath);

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                if (file == null)
                {
                    IXsltFile xsltfile = DataFacade.BuildNew<IXsltFile>();

                    xsltfile.FolderPath = System.IO.Path.GetDirectoryName(xslt.XslFilePath);
                    xsltfile.FileName = System.IO.Path.GetFileName(xslt.XslFilePath);

                    string xslTemplate = _newXsltMarkup;
                    if (copyFromFunction != null)
                    {
                        IFile copyFromFile = IFileServices.GetFile<IXsltFile>(copyFromFunction.XslFilePath);
                        xslTemplate = copyFromFile.ReadAllText();
                    }

                    xsltfile.SetNewContent(xslTemplate);
                    
                    DataFacade.AddNew<IXsltFile>(xsltfile, "XslFileProvider");
                }

                xslt = DataFacade.AddNew<IXsltFunction>(xslt);

                UserSettings.LastSpecifiedNamespace = xslt.Namespace;

                
                if (copyFromFunction != null)
                {
                    CloneFunctionParameters(copyFromFunction, xslt);
                    CloneFunctionCalls(copyFromFunction, xslt);
                }

                transactionScope.Complete();
            }
            addNewTreeRefresher.PostRefreshMesseges(xslt.GetDataEntityToken());

            FlowControllerServicesContainer container = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
            var executionService = container.GetService<IActionExecutionService>();
            executionService.Execute(xslt.GetDataEntityToken(), new WorkflowActionToken(typeof(EditXsltFunctionWorkflow)), null);
        }

        private void CloneFunctionParameters(IXsltFunction sourceFunction, IXsltFunction copyTo)
        {
            var parameters = DataFacade.GetData<IParameter>(p => p.OwnerId == sourceFunction.Id).ToList();
            foreach (IParameter parameter in parameters)
            {
                var clonedFunctionParameter = DataFacade.BuildNew<IParameter>();
                clonedFunctionParameter.OwnerId = copyTo.Id;

                clonedFunctionParameter.ParameterId = Guid.NewGuid();
                clonedFunctionParameter.Name = parameter.Name;
                clonedFunctionParameter.TypeManagerName = parameter.TypeManagerName;
                clonedFunctionParameter.HelpText = parameter.HelpText;
                clonedFunctionParameter.Label = parameter.Label;
                clonedFunctionParameter.DefaultValueFunctionMarkup = parameter.DefaultValueFunctionMarkup;
                clonedFunctionParameter.Position = parameter.Position;
                clonedFunctionParameter.TestValueFunctionMarkup = parameter.TestValueFunctionMarkup;
                clonedFunctionParameter.WidgetFunctionMarkup = parameter.WidgetFunctionMarkup;

                DataFacade.AddNew(clonedFunctionParameter);
            }
        }

        private void CloneFunctionCalls(IXsltFunction sourceFunction, IXsltFunction copyTo)
        {
            var namedFunctionCalls = DataFacade.GetData<INamedFunctionCall>(nfc => nfc.XsltFunctionId == sourceFunction.Id).ToList();
            foreach (INamedFunctionCall namedFunctionCall in namedFunctionCalls)
            {
                var clonedFunctionCall = DataFacade.BuildNew<INamedFunctionCall>();
                clonedFunctionCall.XsltFunctionId = copyTo.Id;
                clonedFunctionCall.Name = namedFunctionCall.Name;
                clonedFunctionCall.SerializedFunction = namedFunctionCall.SerializedFunction;

                DataFacade.AddNew(clonedFunctionCall);
            }
        }

        private static string GetText(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.Plugins.XsltBasedFunction", key);
        }
    }
}
