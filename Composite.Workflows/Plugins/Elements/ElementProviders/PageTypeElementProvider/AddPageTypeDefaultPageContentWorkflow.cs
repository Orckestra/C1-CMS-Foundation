using System;
using System.Linq;
using System.Collections.Generic;
using System.Workflow.Activities;
using Composite.Data;
using Composite.Data.Types;
using Composite.C1Console.Elements;
using Composite.C1Console.Trees;
using Composite.C1Console.Workflow;
using Composite.Core.Linq;
using System.Xml.Linq;
using Composite.Core.Xml;
using Composite.Core.ResourceSystem;


namespace Composite.Plugins.Elements.ElementProviders.PageTypeElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddPageTypeDefaultPageContentWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
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
                ShowMessage(C1Console.Events.DialogType.Message,
                    string.Format(StringResourceSystemFacade.GetString("Composite.Plugins.PageTypeElementProvider", "PageType.AddPageTypeDefaultPageContentWorkflow.NonExistingPlaceholderId.Title"), defaultPageContent.PlaceHolderId),
                    string.Format(StringResourceSystemFacade.GetString("Composite.Plugins.PageTypeElementProvider", "PageType.AddPageTypeDefaultPageContentWorkflow.NonExistingPlaceholderId.Message"), defaultPageContent.PlaceHolderId));
            }

            this.ExecuteWorklow(defaultPageContent.GetDataEntityToken(), WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PageTypeElementProvider.EditPageTypeDefaultPageContentWorkflow"));
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

                XName elementName = Namespaces.Rendering10 + Composite.Core.WebClient.Renderings.RenderingElementNames.PlaceHolder.LocalName;

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

