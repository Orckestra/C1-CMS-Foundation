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
using Composite.Plugins.PageTemplates.XmlPageTemplates;


namespace Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewPageTemplateWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private static string _defaultTemplateMarkup = string.Format(
@"<?xml version=""1.0"" encoding=""UTF-8""?>
<html xmlns=""http://www.w3.org/1999/xhtml"" xmlns:f=""http://www.composite.net/ns/function/1.0"" xmlns:lang=""{0}"" xmlns:rendering=""http://www.composite.net/ns/rendering/1.0"" xmlns:asp=""http://www.composite.net/ns/asp.net/controls"">
<f:function name=""Composite.Web.Html.Template.LangAttribute"" />
    <head>
        <title>
            <rendering:page.title />
        </title>
        <f:function name=""Composite.Web.Html.Template.CommonMetaTags"" />
        <rendering:page.metatag.description />
        <link rel=""stylesheet"" type=""text/css"" href=""~/Frontend/Styles/VisualEditor.common.css"" />
    </head>
    <body>
        <div style=""float:right; width:10em"">
            <f:function name=""Composite.Pages.QuickSitemap"" />
        </div>
        <h1><rendering:page.title /></h1>
        <h2><rendering:page.description /></h2>
        <div id=""main"">
            <rendering:placeholder id=""content"" title=""Content"" default=""true"" />
        </div>
    </body>
</html>
", LocalizationXmlConstants.XmlNamespace);

        public AddNewPageTemplateWorkflow()
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

            templatesOptions.Insert(0, new KeyValuePair<Guid, string>(Guid.Empty, StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateElementProvider", "AddNewPageTemplateStep1.LabelCopyFromEmptyOption")));

            this.Bindings.Add("CopyOfOptions", templatesOptions);
            this.Bindings.Add("CopyOfId", Guid.Empty);
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

            this.ExecuteAction(newPageTemplate.GetDataEntityToken(), new WorkflowActionToken(typeof(EditPageTemplateWorkflow)));
        }



        private void IsTitleUsed(object sender, ConditionalEventArgs e)
        {
            IXmlPageTemplate newPageTemplate = this.GetBinding<IXmlPageTemplate>("NewPageTemplate");

            e.Result = DataFacade.GetData<IXmlPageTemplate>().ToList()
                                 .Any(f => f.Title.Equals(newPageTemplate.Title, StringComparison.InvariantCultureIgnoreCase));
        }



        private void ValidateFilePath(object sender, ConditionalEventArgs e)
        {
            IXmlPageTemplate newPageTemplate = this.GetBinding<IXmlPageTemplate>("NewPageTemplate");

            IPageTemplateFile pageTemplateFile = DataFacade.BuildNew<IPageTemplateFile>();
            pageTemplateFile.FolderPath = "/";
            pageTemplateFile.FileName = string.Format("{0}.xml", PathUtil.CleanFileName(newPageTemplate.Title, true) ?? newPageTemplate.Id.ToString());

            if (!DataFacade.ValidatePath<IPageTemplateFile>(pageTemplateFile, "PageTemplateFileProvider"))
            {
                ShowFieldMessage("NewPageTemplate.Title", StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateElementProvider", "AddNewPageTemplateStep1.TitleTooLong"));
                e.Result = false;
                return;
            }

            e.Result = true;
        }



        private void showFieldErrorCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            ShowFieldMessage("NewPageTemplate.Title", StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateElementProvider", "AddNewPageTemplateStep1.TitleInUseTitle"));
        }        
    }
}
