using System;
using System.Workflow.Runtime;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Forms.CoreUiControls;
using Composite.C1Console.Workflow;
using Composite.C1Console.Workflow.Activities;
using Composite.Core.IO;
using Composite.Core.ResourceSystem;
using Composite.Data;
using Composite.Data.Types;


namespace Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Never)]
    public sealed partial class UploadNewMediaFileWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
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
                string mimeType = MimeTypeInfo.GetMimeType(uploadedFile);
                if (mimeType != mediaFile.MimeType)
                {
                    managementConsoleMessageService.CloseCurrentView();
                    string failure = StringResourceSystemFacade.GetString("Composite.Management", "UploadNewMediaFileWorkflow.UploadFailure");
                    string failureMessage = StringResourceSystemFacade.GetString("Composite.Management", "UploadNewMediaFileWorkflow.UploadFailureMessage");
                    managementConsoleMessageService.ShowMessage(DialogType.Message, failure, failureMessage);
                    return;
                }

                using (System.IO.Stream readStream = uploadedFile.FileStream)
                {
                    using (System.IO.Stream writeStream = mediaFile.GetNewWriteStream())
                    {
                        readStream.CopyTo(writeStream);
                    }
                }
                // TODO: Is it expected that Length property isn't updated here?
            }

            DataFacade.Update(mediaFile);

            SetSaveStatus(true);

            SelectElement(mediaFile.GetDataEntityToken());
        }



        private void HasUserUploaded(object sender, System.Workflow.Activities.ConditionalEventArgs e)
        {
            UploadedFile uploadedFile = this.GetBinding<UploadedFile>("UploadedFile");

            e.Result = uploadedFile.HasFile;
        }
    }
}
