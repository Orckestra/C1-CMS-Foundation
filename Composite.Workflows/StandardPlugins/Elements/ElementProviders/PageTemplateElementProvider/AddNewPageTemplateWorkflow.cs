using System;
using System.Linq;
using Composite.Actions;
using Composite.Data;
using Composite.Data.Types;
using Composite.IO;
using Composite.Workflow;
using Composite.Localization;
using System.Workflow.Activities;
using Composite.ResourceSystem;


namespace Composite.StandardPlugins.Elements.ElementProviders.PageTemplateElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewPageTemplateWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        private static string _defaultTemplateMarkup = string.Format(
@"<?xml version=""1.0"" encoding=""UTF-8""?>
<html xmlns=""http://www.w3.org/1999/xhtml"" xmlns:f=""http://www.composite.net/ns/function/1.0"" xmlns:lang=""{0}"" xmlns:rendering=""http://www.composite.net/ns/rendering/1.0"" xmlns:asp=""http://www.composite.net/ns/asp.net/controls"">
    <head>
        <title>
            <rendering:page.title />
        </title>
        <rendering:page.metatag.description />
    </head>
    <body>
        <asp:form>
            <div style=""float:right; width:10em"">
                <f:function name=""Composite.Pages.QuickSitemap"" />
            </div>
            <h1><rendering:page.title /></h1>
            <h2><rendering:page.abstract /></h2>
            <div id=""content"">
                <rendering:placeholder id=""contentplaceholder"" title=""Content"" default=""true"" />
            </div>
        </asp:form>
    </body>
</html>
", LocalizationXmlConstants.XmlNamespace);

        public AddNewPageTemplateWorkflow()
        {
            InitializeComponent();
        }



        private void codeActivity1_ExecuteCode(object sender, EventArgs e)
        {
            IPageTemplate newPageTemplate = DataFacade.BuildNew<IPageTemplate>();

            newPageTemplate.Id = Guid.NewGuid();
            newPageTemplate.Title = "";

            this.Bindings.Add("NewPageTemplate", newPageTemplate);
        }



        private void codeActivity2_ExecuteCode(object sender, EventArgs e)
        {
            AddNewTreeRefresher addNewTreeRefresher = this.CreateAddNewTreeRefresher(this.EntityToken);

            IPageTemplate newPageTemplate = this.GetBinding<IPageTemplate>("NewPageTemplate");

            string newPageTemplateMarkup = _defaultTemplateMarkup.Replace("    ", "\t");

            IPageTemplateFile pageTemplateFile = DataFacade.BuildNew<IPageTemplateFile>();
            pageTemplateFile.FolderPath = "/";
            pageTemplateFile.FileName = string.Format("{0}.xml", PathUtil.CleanFileName(newPageTemplate.Title) ?? newPageTemplate.Id.ToString());
            //if (FileNameAlreadyUsed(pageTemplateFile) == true) pageTemplateFile.FileName = newPageTemplate.Id.ToString() + pageTemplateFile.FileName;
            pageTemplateFile.SetNewContent(newPageTemplateMarkup);

            DataFacade.AddNew<IPageTemplateFile>(pageTemplateFile, "PageTemplateFileProvider");

            newPageTemplate.PageTemplateFilePath = "/" + pageTemplateFile.FileName;
            newPageTemplate = DataFacade.AddNew<IPageTemplate>(newPageTemplate);

            addNewTreeRefresher.PostRefreshMesseges(newPageTemplate.GetDataEntityToken());

            this.ExecuteAction(newPageTemplate.GetDataEntityToken(), new WorkflowActionToken(typeof(EditPageTemplateWorkflow)));
        }



        private void IsTitleUsed(object sender, ConditionalEventArgs e)
        {
            IPageTemplate newPageTemplate = this.GetBinding<IPageTemplate>("NewPageTemplate");

            e.Result = DataFacade.GetData<IPageTemplate>(f => f.Title == newPageTemplate.Title).Any();
        }



        private void showFieldErrorCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            ShowFieldMessage("NewPageTemplate.Title", StringResourceSystemFacade.GetString("Composite.StandardPlugins.PageTemplateElementProvider", "AddNewPageTemplateStep1.TitleInUseTitle"));
        }
    }
}
