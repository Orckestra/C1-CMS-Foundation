using System;
using Composite.C1Console.Workflow;


namespace Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditWebsiteFileTextContentWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public EditWebsiteFileTextContentWorkflow()
        {
            InitializeComponent();
        }


        
        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            WebsiteFileElementProviderEntityToken entityToken = (WebsiteFileElementProviderEntityToken)this.EntityToken;

            WebsiteFile websiteFile = new WebsiteFile(entityToken.Path);


            this.Bindings.Add("FileContent", websiteFile.ReadAllText());
            this.Bindings.Add("FileName", websiteFile.FileName);
            this.Bindings.Add("FileMimeType", websiteFile.MimeType);
        }



        private void saveCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            WebsiteFileElementProviderEntityToken entityToken = (WebsiteFileElementProviderEntityToken)this.EntityToken;

            WebsiteFile websiteFile = new WebsiteFile(entityToken.Path);

            string content = this.GetBinding<string>("FileContent");

            websiteFile.WriteAllText(content);

            SetSaveStatus(true);
        }
    }
}
