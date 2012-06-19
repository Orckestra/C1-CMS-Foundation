using System;
using System.Linq;
using Composite.C1Console.Workflow;
using Composite.Core.IO;
using Composite.Core.PageTemplates;
using Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider;

namespace Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditSharedCodeFileWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private string GetFilePath()
        {
            var entityToken = (SharedCodeFileEntityToken)this.EntityToken;

            string relativeFilePath = entityToken.VirtualPath;

            // Security check that validates that the file is a Shared code file 
            var sharedFiles = PageTemplateFacade.GetSharedFiles();

            Verify.That(sharedFiles.Any(sf => string.Compare(sf.RelativeFilePath, relativeFilePath, StringComparison.OrdinalIgnoreCase) == 0),
                        "There's no page template provider that would claim ownership over shared code file '{0}'");

            return PathUtil.Resolve(relativeFilePath);
        }

        public EditSharedCodeFileWorkflow()
        {
            InitializeComponent();
        }

        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            string filePath = GetFilePath();

            WebsiteFile websiteFile = new WebsiteFile(filePath);

            this.Bindings.Add("FileContent", websiteFile.ReadAllText());
            this.Bindings.Add("FileName", websiteFile.FileName);
            this.Bindings.Add("FileMimeType", websiteFile.MimeType);
        }


        private void saveCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            string filePath = GetFilePath();

            WebsiteFile websiteFile = new WebsiteFile(filePath);

            string content = this.GetBinding<string>("FileContent");

            websiteFile.WriteAllText(content);

            SetSaveStatus(true);
        }
    }
}
