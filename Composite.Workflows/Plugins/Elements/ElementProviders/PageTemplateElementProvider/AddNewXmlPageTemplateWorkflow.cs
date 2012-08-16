using System;
using System.Linq;
using Composite.C1Console.Actions;
using Composite.Core.PageTemplates;
using Composite.Core.PageTemplates.Foundation;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.IO;
using Composite.C1Console.Workflow;
using Composite.Core.Localization;
using System.Workflow.Activities;
using Composite.Core.ResourceSystem;
using System.Collections.Generic;
using Composite.Core.WebClient.Renderings.Template;
using System.Xml.Linq;
using Composite.Plugins.Elements.ElementProviders.Common;
using Composite.Plugins.PageTemplates.XmlPageTemplates;


namespace Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewXmlPageTemplateWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private static readonly string _defaultTemplateMarkup =
            string.Format(PageTemplateHelper.LoadDefaultTemplateFile("XmlPageTemplate.xml"),
                          LocalizationXmlConstants.XmlNamespace);


        public AddNewXmlPageTemplateWorkflow()
        {
            InitializeComponent();
        }


        private void codeActivity1_ExecuteCode(object sender, EventArgs e)
        {
            IXmlPageTemplate newPageTemplate = DataFacade.BuildNew<IXmlPageTemplate>();

            newPageTemplate.Id = Guid.NewGuid();
            newPageTemplate.Title = "";

            this.Bindings.Add("NewPageTemplate", newPageTemplate);

            List<KeyValuePair<Guid, string>> templatesOptions =
                (from template in PageTemplateFacade.GetPageTemplates()
                 where template is XmlPageTemplateDescriptor && template.IsValid
                 orderby template.Title
                 select new KeyValuePair<Guid, string>(template.Id, template.Title)).ToList();

            templatesOptions.Insert(0, new KeyValuePair<Guid, string>(
                Guid.Empty, GetText("AddNewXmlPageTemplate.LabelCopyFromEmptyOption")));

            Guid mostUsedTemplate = PageTemplateHelper.GetTheMostUsedTemplate(templatesOptions.Select(p => p.Key));

            this.Bindings.Add("CopyOfOptions", templatesOptions);
            this.Bindings.Add("CopyOfId", mostUsedTemplate);
        }



        private void codeActivity2_ExecuteCode(object sender, EventArgs e)
        {
            AddNewTreeRefresher addNewTreeRefresher = this.CreateAddNewTreeRefresher(this.EntityToken);

            IXmlPageTemplate newPageTemplate = this.GetBinding<IXmlPageTemplate>("NewPageTemplate");

            string newPageTemplateMarkup = null;
            Guid copyOfId = this.GetBinding<Guid>("CopyOfId");
            if (copyOfId == Guid.Empty)
            {
                newPageTemplateMarkup = _defaultTemplateMarkup.Replace("    ", "\t");
            }
            else
            {
                XDocument copyDocument = TemplateInfo.GetTemplateDocument(copyOfId);
                newPageTemplateMarkup = copyDocument.ToString();
            }

            IPageTemplateFile pageTemplateFile = DataFacade.BuildNew<IPageTemplateFile>();
            pageTemplateFile.FolderPath = "/";
            pageTemplateFile.FileName = string.Format("{0}.xml", PathUtil.CleanFileName(newPageTemplate.Title, true) ?? newPageTemplate.Id.ToString());
            //if (FileNameAlreadyUsed(pageTemplateFile) == true) pageTemplateFile.FileName = newPageTemplate.Id.ToString() + pageTemplateFile.FileName;
            pageTemplateFile.SetNewContent(newPageTemplateMarkup);

            DataFacade.AddNew<IPageTemplateFile>(pageTemplateFile, "PageTemplateFileProvider");

            newPageTemplate.PageTemplateFilePath = "/" + pageTemplateFile.FileName;
            newPageTemplate = DataFacade.AddNew<IXmlPageTemplate>(newPageTemplate);

            PageTemplateProviderRegistry.FlushTemplates();

            addNewTreeRefresher.PostRefreshMesseges(newPageTemplate.GetDataEntityToken());

            this.ExecuteAction(newPageTemplate.GetDataEntityToken(), new WorkflowActionToken(typeof(EditXmlPageTemplateWorkflow)));
        }



        private void IsTitleUsed(object sender, ConditionalEventArgs e)
        {
            IXmlPageTemplate newPageTemplate = this.GetBinding<IXmlPageTemplate>("NewPageTemplate");

            e.Result = PageTemplateFacade.GetPageTemplates()
                                 .Any(f => f.Title.Equals(newPageTemplate.Title, StringComparison.InvariantCultureIgnoreCase));
        }



        private void ValidateFilePath(object sender, ConditionalEventArgs e)
        {
            IXmlPageTemplate newPageTemplate = this.GetBinding<IXmlPageTemplate>("NewPageTemplate");

            IPageTemplateFile pageTemplateFile = DataFacade.BuildNew<IPageTemplateFile>();
            pageTemplateFile.FolderPath = "/";
            pageTemplateFile.FileName = GetTemplateFileName(newPageTemplate);

            if (!DataFacade.ValidatePath<IPageTemplateFile>(pageTemplateFile, "PageTemplateFileProvider"))
            {
                ShowFieldMessage("NewPageTemplate.Title", GetText("AddNewXmlPageTemplateWorkflow.TitleTooLong"));
                e.Result = false;
                return;
            }

            e.Result = true;
        }


        private string GetTemplateFileName(IXmlPageTemplate xmlTemplateFile)
        {
            string name = PathUtil.CleanFileName(xmlTemplateFile.Title, true) ?? xmlTemplateFile.Id.ToString();
            return name + ".xml";
        }


        private void showFieldErrorCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            ShowFieldMessage("NewPageTemplate.Title", GetText("AddNewXmlPageTemplateWorkflow.TitleInUseTitle"));
        }        

        private static string GetText(string stringId)
        {
            return StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateElementProvider", stringId);
        }
    }
}
