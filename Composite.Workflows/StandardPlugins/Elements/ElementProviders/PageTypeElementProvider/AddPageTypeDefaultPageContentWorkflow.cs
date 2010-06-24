using System;
using System.Collections.Generic;
using Composite.Data;
using Composite.Data.Types;
using Composite.Elements;
using Composite.Trees;
using Composite.Workflow;


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
            this.ExecuteWorklow(defaultPageContent.GetDataEntityToken(), WorkflowFacade.GetWorkflowType("Composite.Workflows.StandardPlugins.Elements.ElementProviders.PageTypeElementProvider.EditPageTypeDefaultPageContentWorkflow"));
        }
    }
}
