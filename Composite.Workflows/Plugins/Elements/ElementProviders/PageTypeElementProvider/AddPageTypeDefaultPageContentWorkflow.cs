using System;
using System.Linq;
using System.Collections.Generic;
using Composite.Core.PageTemplates;
using Composite.Data;
using Composite.Data.Types;
using Composite.C1Console.Elements;
using Composite.C1Console.Trees;
using Composite.C1Console.Workflow;
using RS = Composite.Core.ResourceSystem.StringResourceSystemFacade;


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

            var duplicate = DataFacade.GetData<IPageTypeDefaultPageContent>(f => f.PageTypeId == parentPageType.Id && f.PlaceHolderId == defaultPageContent.PlaceHolderId).FirstOrDefault();

            if (duplicate == null)
            {
                defaultPageContent.PageTypeId = parentPageType.Id;
                defaultPageContent.Content = " ";

                defaultPageContent = DataFacade.AddNew<IPageTypeDefaultPageContent>(defaultPageContent);
            }
            else
            {
                defaultPageContent = duplicate;
            }

            this.CloseCurrentView();
            this.RefreshCurrentEntityToken();

            if (!AnyTemplatesContainingPlaceholderId())
            {
                ShowMessage(C1Console.Events.DialogType.Message,
                    string.Format(RS.GetString("Composite.Plugins.PageTypeElementProvider", "PageType.AddPageTypeDefaultPageContentWorkflow.NonExistingPlaceholderId.Title"), defaultPageContent.PlaceHolderId),
                    string.Format(RS.GetString("Composite.Plugins.PageTypeElementProvider", "PageType.AddPageTypeDefaultPageContentWorkflow.NonExistingPlaceholderId.Message"), defaultPageContent.PlaceHolderId));
            }

            this.ExecuteWorklow(defaultPageContent.GetDataEntityToken(), WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PageTypeElementProvider.EditPageTypeDefaultPageContentWorkflow"));
        }


        private bool AnyTemplatesContainingPlaceholderId()
        {
            IPageTypeDefaultPageContent defaultPageContent = this.GetBinding<IPageTypeDefaultPageContent>("DefaultPageContent");

            foreach (var templateDescriptor in PageTemplateFacade.GetPageTemplates())
            {
                if(templateDescriptor.PlaceholderDescriptions
                                     .Any(placholder => placholder.Id == defaultPageContent.PlaceHolderId))
                {
                    return true;
                }
            }

            return false;
        }        
    }
}

