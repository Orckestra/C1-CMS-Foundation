using System;
using System.Linq;
using System.IO;
using System.Transactions;
using System.Workflow.Activities;
using System.Workflow.Runtime;
using Composite.C1Console.Actions;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.Extensions;
using Composite.C1Console.Forms.Flows;
using Composite.Core.ResourceSystem;
using Composite.Plugins.Elements.ElementProviders.BaseFunctionProviderElementProvider;
using Composite.Data.Transactions;
using Composite.C1Console.Users;
using Composite.C1Console.Workflow;
using Composite.Core.Localization;
using Composite.Core.Xml;
using Composite.Plugins.Functions.FunctionProviders.XsltBasedFunctionProvider;
using Composite.C1Console.Events;


namespace Composite.Plugins.Elements.ElementProviders.XsltBasedFunctionProviderElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewXsltFunctionWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
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

            BaseFunctionFolderElementEntityToken token = (BaseFunctionFolderElementEntityToken)this.EntityToken;
            xsltFunction.Namespace = token.Id;
            string prefix = "ROOT:XsltBasedFunctionProviderElementProvider";

            if (xsltFunction.Namespace == prefix)
            {
                xsltFunction.Namespace = UserSettings.LastSpecifiedNamespace;
            }
            else if (xsltFunction.Namespace.StartsWith(prefix + "."))
            {
                xsltFunction.Namespace = xsltFunction.Namespace.Substring(prefix.Length + 1);
            }

            this.Bindings.Add("NewXslt", xsltFunction);
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

            if (!function.Namespace.IsCorrectNamespace('.'))
            {
                this.ShowFieldMessage("NewXslt.Namespace", GetText("AddNewXsltFunctionWorkflow.InvalidNamespace"));
                return;
            }

            string functionName = function.Name;
            string functionNamespace = function.Namespace;
            bool nameIsReserved  = DataFacade.GetData<IXsltFunction>()
                .Where(func => string.Compare(func.Name, functionName, true) == 0
                            && string.Compare(func.Namespace, functionNamespace, true) == 0)
                .Any();

            if(nameIsReserved)
            {
                this.ShowFieldMessage("NewXslt.Name",  GetText("AddNewXsltFunctionWorkflow.DuplicateName"));
                return;
            }

            e.Result = true;
        }



        private void finalizecodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            AddNewTreeRefresher addNewTreeRefresher = this.CreateAddNewTreeRefresher(this.EntityToken);

            IXsltFunction xslt = this.GetBinding<IXsltFunction>("NewXslt");

            xslt.XslFilePath = CreateXslFilePath(xslt);

            IFile file = IFileServices.TryGetFile<IXsltFile>(xslt.XslFilePath);

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                if (file == null)
                {
                    IXsltFile xsltfile = DataFacade.BuildNew<IXsltFile>();

                    xsltfile.FolderPath = Path.GetDirectoryName(xslt.XslFilePath);
                    xsltfile.FileName = Path.GetFileName(xslt.XslFilePath);


                    xsltfile.SetNewContent(_newXsltMarkup);
                    DataFacade.AddNew<IXsltFile>(xsltfile, "XslFileProvider");
                }

                xslt = DataFacade.AddNew<IXsltFunction>(xslt);

                UserSettings.LastSpecifiedNamespace = xslt.Namespace;

                transactionScope.Complete();
            }
            addNewTreeRefresher.PostRefreshMesseges(xslt.GetDataEntityToken());

            FlowControllerServicesContainer container = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
            var executionService = container.GetService<IActionExecutionService>();
            executionService.Execute(xslt.GetDataEntityToken(), new WorkflowActionToken(typeof(EditXsltFunctionWorkflow)), null);
        }

        private static string GetText(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.Plugins.XsltBasedFunction", key);
        }

        internal static string CreateXslFilePath(IXsltFunction xsltFunction)
        {
            return string.Format("/{0}/{1}.xsl", xsltFunction.Namespace.Replace(".", "/"), xsltFunction.Name).Replace("//", "/");
        }
    }
}
