using System;
using Composite.C1Console.Workflow;
using Composite.Core.IO;
using Composite.Plugins.Elements.ElementProviders.PageTemplateFeatureElementProvider;
using System.IO;
using Composite.Core.Configuration;


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

                string extensionlessPath = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.PageTemplateFeaturesDirectory), castedEntityToken.FeatureName);

                if (C1File.Exists(extensionlessPath + ".xhtml"))
                {
                    return extensionlessPath + ".xhtml";
                }
                else
                {
                    return extensionlessPath + ".xml";
                }
            }
        }

    }
}
