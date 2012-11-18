using System;
using System.IO;
using Composite.C1Console.Workflow;
using Composite.Core.Configuration;
using Composite.Core.IO;


namespace Composite.Plugins.Elements.ElementProviders.PageTemplateFeatureElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class TogglePageTemplateFeatureEditorWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public TogglePageTemplateFeatureEditorWorkflow()
        {
            InitializeComponent();
        }



        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            string oldPath = this.FilePath;
            if (C1File.Exists(oldPath))
            {
                string newPath = Path.Combine(Path.GetDirectoryName(oldPath), Path.GetFileNameWithoutExtension(oldPath));

                if (Path.GetExtension(oldPath) == ".xhtml")
                {
                    newPath += ".xml";
                }
                else
                {
                    newPath += ".xhtml";
                }

                C1File.Move(oldPath, newPath);

                this.RefreshRootEntityToken();
            }
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
