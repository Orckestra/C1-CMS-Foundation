using System;
using System.IO;
using System.Workflow.Runtime;
using Composite.Actions;
using Composite.ConsoleEventSystem;
using Composite.Data;
using Composite.Data.Types;
using Composite.Extensions;
using Composite.Forms.CoreUiControls;
using Composite.IO;
using Composite.Workflow;
using Composite.Workflow.Activities;
using Composite.ResourceSystem;


namespace Composite.StandardPlugins.Elements.ElementProviders.MediaFileProviderElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Never)]
    public sealed partial class UploadNewMediaFileWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public UploadNewMediaFileWorkflow()
        {
            InitializeComponent();
        }


        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            FormsWorkflow workflow = this.GetRoot<FormsWorkflow>();

            DataEntityToken token = (DataEntityToken)this.EntityToken;
            IMediaFile mediaFile = (IMediaFile)token.Data;

            UploadedFile file = new UploadedFile();

            workflow.Bindings.Add("UploadedFile", file);
            workflow.Bindings.Add("File", mediaFile);
        }




        private void uploadCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            FlowControllerServicesContainer flowControllerServicesContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
            var managementConsoleMessageService = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

            UploadedFile uploadedFile = this.GetBinding<UploadedFile>("UploadedFile");
            IMediaFile mediaFile = this.GetBinding<IMediaFile>("File");

            if (uploadedFile.HasFile)
            {
                string mimeType = MimeTypeInfo.GetCanonical(uploadedFile.ContentType);
                if (mimeType != mediaFile.MimeType)
                {
                    managementConsoleMessageService.CloseCurrentView();
                    string failure = StringResourceSystemFacade.GetString("Composite.Management", "UploadNewMediaFileWorkflow.UploadFailure");
                    string failureMessage = StringResourceSystemFacade.GetString("Composite.Management", "UploadNewMediaFileWorkflow.UploadFailureMessage");
                    managementConsoleMessageService.ShowMessage(DialogType.Message, failure, failureMessage);
                    return;
                }

                using (Stream readStream = uploadedFile.FileStream)
                {
                    using (Stream writeStream = mediaFile.GetNewWriteStream())
                    {
                        readStream.CopyTo(writeStream);
                    }
                }
                // TODO: Is it expected that Length property isn't updated here?
            }

            DataFacade.Update(mediaFile);

            SetSaveStatus(true);
        }



        private void HasUserUploaded(object sender, System.Workflow.Activities.ConditionalEventArgs e)
        {
            UploadedFile uploadedFile = this.GetBinding<UploadedFile>("UploadedFile");

            e.Result = uploadedFile.HasFile;
        }
    }
}
