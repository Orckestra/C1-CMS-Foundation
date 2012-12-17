using System;
using System.IO;
using Composite.C1Console.Workflow;
using Composite.Core.IO;
using Composite.Core.WebClient.Renderings.Template;


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
            if (oldPath != null && C1File.Exists(oldPath))
            {
                string newPath = Path.Combine(Path.GetDirectoryName(oldPath), Path.GetFileNameWithoutExtension(oldPath));

                if (Path.GetExtension(oldPath) == ".html")
                {
                    newPath += ".xml";
                }
                else
                {
                    newPath += ".html";
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
                return PageTemplateFeatureFacade.GetPageTemplateFeaturePath(castedEntityToken.FeatureName);
            }
        }


    }
}
