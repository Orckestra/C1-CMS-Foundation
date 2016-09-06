using System;
using Composite.Data.Types;
using Composite.Data;
using System.Workflow.Activities;
using Composite.C1Console.Workflow;


namespace Composite.Plugins.Elements.ElementProviders.PageTypeElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewPageTypeWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public AddNewPageTypeWorkflow()
        {
            InitializeComponent();
        }



        private void initializeCodeActivity_UpdateBindings_ExecuteCode(object sender, EventArgs e)
        {
            IPageType pageType = DataFacade.BuildNew<IPageType>();
            pageType.Id = Guid.NewGuid();
            pageType.Available = true;
            pageType.PresetMenuTitle = true;
            pageType.HomepageRelation = nameof(PageTypeHomepageRelation.NoRestriction);
            pageType.DefaultTemplateId = Guid.Empty;
            pageType.DefaultChildPageType = Guid.Empty;

            this.Bindings.Add("NewPageType", pageType);
        }



        private void ValidateBindings(object sender, ConditionalEventArgs e)
        {
            e.Result = true;
        }



        private void finalizeCodeActivity_SavePageType_ExecuteCode(object sender, EventArgs e)
        {
            IPageType pageType = this.GetBinding<IPageType>("NewPageType");

            pageType = DataFacade.AddNew<IPageType>(pageType);

            this.RefreshCurrentEntityToken();

            this.CloseCurrentView();
            this.RefreshCurrentEntityToken();
            this.ExecuteWorklow(pageType.GetDataEntityToken(), WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PageTypeElementProvider.EditPageTypeWorkflow"));
        }
    }
}
