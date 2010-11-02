using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Runtime;
using System.Xml.Linq;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Workflow;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.ResourceSystem;
using Composite.Core.Xml;
using Composite.Data;
using Composite.Data.Plugins.DataProvider.Streams;
using Composite.Data.Types;
using Composite.Functions;


namespace Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditPageTemplateWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public EditPageTemplateWorkflow()
        {
            InitializeComponent();
        }


        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

            this.Bindings.Add("PageTemplate", dataEntityToken.Data);
            this.Bindings.Add("OldTitle", ((IPageTemplate)dataEntityToken.Data).Title);

            string templatePath = ((IPageTemplate)dataEntityToken.Data).PageTemplateFilePath;
            IPageTemplateFile file = IFileServices.TryGetFile<IPageTemplateFile>(templatePath);

            this.Bindings.Add("PageTemplateMarkup", file.ReadAllText());
        }


        private void codeActivity1_ExecuteCode(object sender, EventArgs e)
        {
            IPageTemplate pageTemplate = this.GetBinding<IPageTemplate>("PageTemplate");
            string pageTemplateMarkup = this.GetBinding<string>("PageTemplateMarkup");

            bool xhtmlParseable = true;
            string parseError = null;
            try
            {
                XDocument parsedElement = XDocument.Parse(pageTemplateMarkup);

                ValidatePageTemplate(parsedElement);
            }
            catch (Exception ex)
            {
                xhtmlParseable = false;
                parseError = ex.Message;
            }

            if (!xhtmlParseable)
            {
                FlowControllerServicesContainer serviceContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
                var consoleMessageService = serviceContainer.GetService<IManagementConsoleMessageService>();
                consoleMessageService.ShowMessage(
                    DialogType.Error,
                    GetString("EditPageTemplateWorkflow.InvalidXmlTitle"),
                    GetString("EditPageTemplateWorkflow.InvalidXmlMessage").FormatWith(parseError));
                return;
            }

            // Renaming related file if necessary
            string fileName = pageTemplate.Title + ".xml";
            if (System.IO.Path.GetFileName(pageTemplate.PageTemplateFilePath) != fileName)
            {
                IPageTemplateFile file = IFileServices.GetFile<IPageTemplateFile>(pageTemplate.PageTemplateFilePath);
                string systemPath = (file as FileSystemFileBase).SystemPath;
                string newSystemPath = System.IO.Path.Combine(System.IO.Path.GetDirectoryName(systemPath), fileName);

                if (string.Compare(systemPath, newSystemPath, true) != 0
                    && File.Exists(newSystemPath))
                {
                    FlowControllerServicesContainer serviceContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
                    var consoleMessageService = serviceContainer.GetService<IManagementConsoleMessageService>();
                    consoleMessageService.ShowMessage(
                        DialogType.Error,
                        GetString("EditPageTemplateWorkflow.InvalidXmlTitle"),
                        GetString("EditPageTemplateWorkflow.CannotRenameFileExists").FormatWith(newSystemPath));
                    return;
                }

                File.Move(systemPath, newSystemPath);

                string newRelativePath = System.IO.Path.Combine(System.IO.Path.GetDirectoryName(pageTemplate.PageTemplateFilePath), fileName);
                pageTemplate.PageTemplateFilePath = newRelativePath;
            }

            IPageTemplateFile templateFile = IFileServices.GetFile<IPageTemplateFile>(pageTemplate.PageTemplateFilePath);
            templateFile.SetNewContent(pageTemplateMarkup);
            DataFacade.Update(templateFile);

            DataFacade.Update(pageTemplate);

            UpdateTreeRefresher updateTreeRefresher = this.CreateUpdateTreeRefresher(this.EntityToken);
            updateTreeRefresher.PostRefreshMesseges(pageTemplate.GetDataEntityToken());

            SetSaveStatus(true);
        }

        private static string GetString(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateElementProvider", key);
        }

        private void ValidatePageTemplate(XDocument xDocument)
        {
            // check unique id's
            List<XAttribute> valueOrderedIdAttributes = xDocument.Descendants().Attributes("id").OrderBy(f => f.Value).ToList();

            XElement rootElement = xDocument.Root;
            if (rootElement.Name.LocalName.ToLower() == "html")
            {
                if (rootElement.Name.Namespace != Namespaces.Xhtml)
                {
                    throw new InvalidOperationException(string.Format("Root element 'html' must belong to the namespace '{0}'. Change the \"<html>\" tag to \"<html xmlns='{0}'>\"", Namespaces.Xhtml));
                }

                if (rootElement.Name.LocalName != rootElement.Name.LocalName.ToLower())
                {
                    throw new InvalidOperationException("Root element 'html' must be written in lower case.");
                }
            }

            for (int i = 0; i < valueOrderedIdAttributes.Count - 1; i++)
            {
                if (valueOrderedIdAttributes[i].Value == valueOrderedIdAttributes[i + 1].Value)
                {
                    throw new InvalidOperationException(string.Format("The id '{0}' is used on multiple elements ('{1}' and '{2}'). Element id values must be unique.", valueOrderedIdAttributes[i].Value, valueOrderedIdAttributes[i].Parent.Name.LocalName, valueOrderedIdAttributes[i + 1].Parent.Name.LocalName));
                }
            }

            foreach (XElement element in xDocument.Descendants().Where(f => f.Name.Namespace == Namespaces.AspNetControls))
            {
                switch (element.Name.LocalName)
                {
                    case "form":
                    case "placeholder":
                        break;
                    default:
                        throw new InvalidOperationException(string.Format("Unknown element '{0}' in namespace '{1}'.", element.Name.LocalName, Namespaces.AspNetControls));
                }
            }

            foreach (XElement element in xDocument.Descendants().Where(f => f.Name.Namespace == Namespaces.Rendering10))
            {
                switch (element.Name.LocalName)
                {
                    case "page.title":
                    case "page.description":
                    case "page.metatag.description":
                    case "placeholder":
                        break;
                    default:
                        throw new InvalidOperationException(string.Format("Unknown element '{0}' in namespace '{1}'.", element.Name.LocalName, Namespaces.Rendering10));
                }
            }

            if (1 < xDocument.Descendants(Namespaces.Rendering10 + "placeholder").Attributes("default").Where(f => f.Value == "true").Count())
            {
                throw new InvalidOperationException(string.Format("Multiple '{0}' elements are set to be default. Only one element may be default.", "placeholder"));
            }

            foreach (XElement element in xDocument.Descendants(Namespaces.Function10 + "function"))
            {
                FunctionFacade.BuildTree(element);
            }
        }



        private void IsTitleUsed(object sender, System.Workflow.Activities.ConditionalEventArgs e)
        {
            IPageTemplate newPageTemplate = this.GetBinding<IPageTemplate>("PageTemplate");

            if (this.GetBinding<string>("OldTitle") == newPageTemplate.Title)
            {
                e.Result = false;
                return;
            }

            e.Result = DataFacade.GetData<IPageTemplate>(f => f.Title == newPageTemplate.Title).Any();
        }



        private void ShowMessageCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            ShowFieldMessage("PageTemplate.Title", StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateElementProvider", "EditPageTemplateWorkflow.TitleInUseTitle"));
        }
    }
}
