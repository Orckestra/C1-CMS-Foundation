using System;
using System.IO;
using System.Workflow.Activities;
using Composite.Actions;
using Composite.ConsoleEventSystem;
using Composite.Elements;
using Composite.Extensions;
using Composite.Forms.CoreUiControls;
using Composite.Workflow;
using Composite.IO;


namespace Composite.StandardPlugins.Elements.ElementProviders.WebsiteFileElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class UploadWebsiteFileWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public UploadWebsiteFileWorkflow()
        {
            InitializeComponent();
        }


        private string GetCurrentPath()
        {
            if (this.EntityToken is WebsiteFileElementProviderRootEntityToken)
            {
                string rootPath = (string)ElementFacade.GetData(new ElementProviderHandle(this.EntityToken.Source), "RootPath");

                return rootPath;
            }
            else if (this.EntityToken is WebsiteFileElementProviderEntityToken)
            {
                return (this.EntityToken as WebsiteFileElementProviderEntityToken).Path;
            }
            else
            {
                throw new NotImplementedException();
            }
        }



        private void IsUploadTypeOk(object sender, ConditionalEventArgs e)
        {
            e.Result = true;
        }



        private void FileExist(object sender, ConditionalEventArgs e)
        {
            UploadedFile file = this.GetBinding<UploadedFile>("UploadedFile");

            if (file.HasFile == true)
            {
                string currentPath = GetCurrentPath();

                e.Result = Directory.GetFiles(currentPath, file.FileName).Length > 0;
            }
            else
            {
                e.Result = false;
            }
        }



        private void initializeCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            UploadedFile file = new UploadedFile();

            this.Bindings.Add("UploadedFile", file);
        }



        private void finalizeCodeActivity_SaveFile_ExecuteCode(object sender, EventArgs e)
        {
            UploadedFile uploadedFile = this.GetBinding<UploadedFile>("UploadedFile");

            if (uploadedFile.HasFile)
            {
                string currentPath = GetCurrentPath();
                string filename = uploadedFile.FileName;

                string fullFilename = Path.Combine(currentPath, filename);

                if (File.Exists(fullFilename) == true)
                {
                    FileEx.Delete(fullFilename);
                }

                using (FileStream fs = new FileStream(fullFilename, FileMode.CreateNew))
                {
                    uploadedFile.FileStream.CopyTo(fs);
                }

                SpecificTreeRefresher specificTreeRefresher = this.CreateSpecificTreeRefresher();
                specificTreeRefresher.PostRefreshMesseges(this.EntityToken);
            }
        }



        private void finalizeCodeActivity_ShowErrorMessage_ExecuteCode(object sender, EventArgs e)
        {
            this.ShowMessage(
                DialogType.Error,
                "${Composite.StandardPlugins.WebsiteFileElementProvider, UploadFile.Error.WrongTypeTitle}",
                "${Composite.StandardPlugins.WebsiteFileElementProvider, UploadFile.Error.WrongTypeMessage}"
            );
        }



        private void finalizeCodeActivity_ShowFileExistMessage_ExecuteCode(object sender, EventArgs e)
        {
            this.ShowMessage(
                DialogType.Error,
                "${Composite.StandardPlugins.WebsiteFileElementProvider, UploadFile.Error.FileExistTitle}",
                "${Composite.StandardPlugins.WebsiteFileElementProvider, UploadFile.Error.FileExistMessage}"
            );
        }
    }
}
