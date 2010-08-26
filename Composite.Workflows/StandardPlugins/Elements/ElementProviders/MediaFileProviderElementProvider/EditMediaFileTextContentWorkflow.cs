using System;
using Composite.Data;
using Composite.Data.Types;
using Composite.C1Console.Workflow;


namespace Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditMediaFileTextContentWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public EditMediaFileTextContentWorkflow()
        {
            InitializeComponent();
        }


        
        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken token = (DataEntityToken)this.EntityToken;
            IMediaFile file = (IMediaFile)token.Data;

            string content = file.ReadAllText();

            this.Bindings.Add("FileContent", content);
            this.Bindings.Add("FileName", file.FileName);
            this.Bindings.Add("FileMimeType", file.MimeType);
        }



        private void saveCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken token = (DataEntityToken)this.EntityToken;
            IMediaFile file = (IMediaFile)token.Data;

            string content = this.GetBinding<string>("FileContent");

            file.SetNewContent(content);
            DataFacade.Update(file);

            SetSaveStatus(true);
        }
    }
}
