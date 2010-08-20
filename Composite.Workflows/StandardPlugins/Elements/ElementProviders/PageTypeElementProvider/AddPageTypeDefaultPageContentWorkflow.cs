using System;
using System.Linq;
using System.Collections.Generic;
using System.Workflow.Activities;
using Composite.Data;
using Composite.Data.Types;
using Composite.Elements;
using Composite.Trees;
using Composite.Workflow;
using Composite.Linq;
using System.Xml.Linq;
using Composite.Xml;
using Composite.ResourceSystem;


namespace Composite.Workflows.StandardPlugins.Elements.ElementProviders.PageTypeElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddPageTypeDefaultPageContentWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public AddPageTypeDefaultPageContentWorkflow()
        {
            InitializeComponent();
        }



        private void initializeCodeActivity_UpdateBindings_ExecuteCode(object sender, EventArgs e)
        {
            IPageTypeDefaultPageContent defaultPageContent = DataFacade.BuildNew<IPageTypeDefaultPageContent>();
            defaultPageContent.Id = Guid.NewGuid();

            this.Bindings.Add("DefaultPageContent", defaultPageContent);
        }



        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            IPageTypeDefaultPageContent defaultPageContent = this.GetBinding<IPageTypeDefaultPageContent>("DefaultPageContent");

            Dictionary<string, string> piggybag = PiggybagSerializer.Deserialize(this.ExtraPayload);

            DataEntityToken dataEntityToken = piggybag.GetParentEntityTokens().FindDataEntityToken(typeof(IPageType));
            IPageType parentPageType = (IPageType)dataEntityToken.Data;

            defaultPageContent.PageTypeId = parentPageType.Id;
            defaultPageContent.Content = " ";

            defaultPageContent = DataFacade.AddNew<IPageTypeDefaultPageContent>(defaultPageContent);

            this.CloseCurrentView();
            this.RefreshCurrentEntityToken();

            if (!AnyTemplatesContainingId())
            {
                ShowMessage(ConsoleEventSystem.DialogType.Message,
                    string.Format(StringResourceSystemFacade.GetString("Composite.StandardPlugins.PageTypeElementProvider", "PageType.AddPageTypeDefaultPageContentWorkflow.NonExistingPlaceholderId.Title"), defaultPageContent.PlaceHolderId),
                    string.Format(StringResourceSystemFacade.GetString("Composite.StandardPlugins.PageTypeElementProvider", "PageType.AddPageTypeDefaultPageContentWorkflow.NonExistingPlaceholderId.Message"), defaultPageContent.PlaceHolderId));
            }

            this.ExecuteWorklow(defaultPageContent.GetDataEntityToken(), WorkflowFacade.GetWorkflowType("Composite.Workflows.StandardPlugins.Elements.ElementProviders.PageTypeElementProvider.EditPageTypeDefaultPageContentWorkflow"));
        }


        private bool AnyTemplatesContainingId()
        {
            IPageTypeDefaultPageContent defaultPageContent = this.GetBinding<IPageTypeDefaultPageContent>("DefaultPageContent");

            IEnumerable<IPageTemplate> templates = DataFacade.GetData<IPageTemplate>().Evaluate();
            foreach (IPageTemplate template in templates)
            {
                IPageTemplateFile file = IFileServices.TryGetFile<IPageTemplateFile>(template.PageTemplateFilePath);
                string fileContent = file.ReadAllText();

                XDocument doc = XDocument.Parse(fileContent);

                XName elementName = Namespaces.Rendering10 + Composite.Renderings.RenderingElementNames.PlaceHolder.LocalName;

                bool contained = doc.Descendants(elementName).Where(
                    f => f.Attribute("id") != null &&
                         f.Attribute("id").Value == defaultPageContent.PlaceHolderId).
                    Any();

                if (contained)
                {
                    return true;
                }
            }

            return false;
        }        
    }
}

