using System;
using System.IO;
using System.Linq;
using Composite.Actions;
using Composite.Data;
using Composite.Data.Types;
using Composite.Forms.CoreUiControls;
using Composite.Workflow;
using Composite.Workflow.Activities;


namespace Composite.StandardPlugins.Elements.ElementProviders.MediaFileProviderElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Never)]
    public sealed partial class AddMediaZipFileWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public AddMediaZipFileWorkflow()
        {
            InitializeComponent();
        }



        private void InitializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            FormsWorkflow workflow = this.GetRoot<FormsWorkflow>();

            string parentFolderPath;
            string storeId;
            if (this.EntityToken is MediaRootFolderProviderEntityToken)
            {
                MediaRootFolderProviderEntityToken token = (MediaRootFolderProviderEntityToken)this.EntityToken;
                parentFolderPath = "/";
                storeId = token.Id;
            }
            else
            {
                DataEntityToken token = (DataEntityToken)this.EntityToken;
                IMediaFileFolder parentFolder = (IMediaFileFolder)token.Data;
                parentFolderPath = parentFolder.Path;
                storeId = parentFolder.StoreId;
            }

            string providerName = DataFacade.GetData<IMediaFileStore>().Where(x => x.Id == storeId).First().DataSourceId.ProviderName;

            UploadedFile file = new UploadedFile();

            workflow.Bindings.Add("UploadedFile", file);
            workflow.Bindings.Add("RecreateFolders", true);
            workflow.Bindings.Add("OverwriteExisting", false);
            workflow.Bindings.Add("ParentFolderPath", parentFolderPath);
            workflow.Bindings.Add("ProviderName", providerName);
        }



        private void HandleFinish_ExecuteCode(object sender, EventArgs e)
        {
            UploadedFile uploadedFile = this.GetBinding<UploadedFile>("UploadedFile");
            bool recreateFolders = this.GetBinding<bool>("RecreateFolders");
            bool overwrite = this.GetBinding<bool>("OverwriteExisting");
            string parentFolderPath = this.GetBinding<string>("ParentFolderPath");
            string providerName = this.GetBinding<string>("ProviderName");

            if (uploadedFile.HasFile)
            {
                using (Stream readStream = uploadedFile.FileStream)
                {
                    ZipMediaFileExtractor.AddZip(providerName, parentFolderPath, readStream, recreateFolders, overwrite);
                }
            }
        }



        private void FinalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            AddNewTreeRefresher addNewTreeRefresher = this.CreateAddNewTreeRefresher(this.EntityToken);


            addNewTreeRefresher.PostRefreshMesseges(this.EntityToken);
        }



        private void HasUserUploaded(object sender, System.Workflow.Activities.ConditionalEventArgs e)
        {
            UploadedFile uploadedFile = this.GetBinding<UploadedFile>("UploadedFile");

            if (uploadedFile.HasFile == false)
            {
                this.ShowFieldMessage("UploadedFile", "${Composite.Management, Website.Forms.Administrative.AddZipMediaFile.MissingUploadedFile.Message}");
                e.Result = false;
                return;
            }



            e.Result = true;
        }
    }
}
