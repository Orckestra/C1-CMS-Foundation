using System;
using Composite.C1Console.Workflow;
using Composite.Core.IO;
using Composite.Core.WebClient.Renderings.Template;


namespace Composite.Plugins.Elements.ElementProviders.PageTemplateFeatureElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeletePageTemplateFeatureWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public DeletePageTemplateFeatureWorkflow()
        {
            InitializeComponent();
        }



        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            FileUtils.Delete(this.FilePath);

            this.RefreshRootEntityToken();
        }

        private string FilePath
        {
            get
            {
                PageTemplateFeatureEntityToken castedEntityToken = (PageTemplateFeatureEntityToken)this.EntityToken;
                return PageTemplateFeatureFacade.GetPageTemplateFeaturePath(castedEntityToken.FeatureName);
            }
        }

    }
}
