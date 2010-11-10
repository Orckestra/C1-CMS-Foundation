using System;
using System.IO;
using System.Workflow.Activities;
using Composite.C1Console.Actions;
using Composite.C1Console.Elements;
using Composite.C1Console.Events;
using Composite.C1Console.Forms.CoreUiControls;
using Composite.C1Console.Workflow;
using Composite.Core.IO;


namespace Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class UploadWebsiteFileWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
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

                e.Result = C1Directory.GetFiles(currentPath, file.FileName).Length > 0;
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

                string fullFilename = System.IO.Path.Combine(currentPath, filename);

                if (Composite.Core.IO.File.Exists(fullFilename) == true)
                {
                    FileEx.Delete(fullFilename);
                }

                using (C1FileStream fs = new C1FileStream(fullFilename, FileMode.CreateNew))
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
                "${Composite.Plugins.WebsiteFileElementProvider, UploadFile.Error.WrongTypeTitle}",
                "${Composite.Plugins.WebsiteFileElementProvider, UploadFile.Error.WrongTypeMessage}"
            );
        }



        private void finalizeCodeActivity_ShowFileExistMessage_ExecuteCode(object sender, EventArgs e)
        {
            this.ShowMessage(
                DialogType.Error,
                "${Composite.Plugins.WebsiteFileElementProvider, UploadFile.Error.FileExistTitle}",
                "${Composite.Plugins.WebsiteFileElementProvider, UploadFile.Error.FileExistMessage}"
            );
        }
    }
}
