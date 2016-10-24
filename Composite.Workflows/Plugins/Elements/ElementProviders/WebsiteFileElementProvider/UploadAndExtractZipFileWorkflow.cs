using System;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Workflow.Activities;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Forms.CoreUiControls;
using Composite.C1Console.Workflow;
using Composite.C1Console.Workflow.Activities;
using Composite.Core;
using Composite.Core.IO;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Plugins_WebsiteFileElementProvider;

namespace Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Never)]
    public sealed partial class UploadAndExtractZipFileWorkflow : FormsWorkflow
    {
        [NonSerialized]
        bool _zipHasBeenUploaded = false;

        public UploadAndExtractZipFileWorkflow()
        {
            InitializeComponent();
        }



        private void InitializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            FormsWorkflow workflow = this.GetRoot<FormsWorkflow>();

            string parentFolderPath;

            if (this.EntityToken is WebsiteFileElementProviderRootEntityToken)
            {
                parentFolderPath = PathUtil.Resolve("~/");
            }
            else
            {
                var token = (WebsiteFileElementProviderEntityToken)this.EntityToken;
                parentFolderPath = token.Path;
            }

            UploadedFile file = new UploadedFile();

            workflow.Bindings.Add("UploadedFile", file);
            workflow.Bindings.Add("OverwriteExisting", false);
            workflow.Bindings.Add("ParentFolderPath", parentFolderPath);
        }



        private void HandleFinish_ExecuteCode(object sender, EventArgs e)
        {
            UploadedFile uploadedFile = this.GetBinding<UploadedFile>("UploadedFile");
            bool overwrite = this.GetBinding<bool>("OverwriteExisting");
            string parentFolderPath = this.GetBinding<string>("ParentFolderPath");

            if (uploadedFile.HasFile)
            {
                using (System.IO.Stream readStream = uploadedFile.FileStream)
                {
                    ZipArchive zipArchive;

                    try
                    {
                        zipArchive = new ZipArchive(readStream);
                    }
                    catch (Exception)
                    {
                        ShowUploadError(Texts.UploadAndExtractZipFile_NotZip);
                        return;
                    }

                    try
                    {
                        foreach (var entry in zipArchive.Entries)
                        {
                            string fullPath = Path.Combine(parentFolderPath, entry.FullName);
                            if (File.Exists(fullPath))
                            {
                                string websiteFilePath = PathUtil.GetWebsitePath(fullPath);

                                if (!overwrite)
                                {
                                    ShowUploadError(Texts.UploadAndExtractZipFile_FileExistsError(websiteFilePath));
                                    return;
                                }

                                var fileInfo = new FileInfo(fullPath);

                                if (fileInfo.IsReadOnly)
                                {
                                    ShowUploadError(Texts.UploadAndExtractZipFile_ExistingFileReadOnly(websiteFilePath));
                                    return;
                                }
                            }
                        }

                        foreach (var entry in zipArchive.Entries.Where(f => !string.IsNullOrWhiteSpace(f.Name)))
                        {
                            using (var zipStream = entry.Open())
                            {
                                string fullPath = Path.Combine(parentFolderPath, entry.FullName);

                                DirectoryUtils.EnsurePath(fullPath);

                                using (var newFile = File.Create(fullPath, 4096))
                                {
                                    zipStream.CopyTo(newFile);
                                }
                            }
                        }

                        _zipHasBeenUploaded = true;
                    }
                    catch (Exception ex)
                    {
                        Log.LogError(nameof(UploadAndExtractZipFileWorkflow), ex);
                        ShowUploadError(Texts.UploadAndExtractZipFile_UnexpectedError);
                    }
                }
            }
        }



        private void ZipWasUploaded(object sender, ConditionalEventArgs e)
        {
            e.Result = _zipHasBeenUploaded;
        }



        private void FinalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            AddNewTreeRefresher addNewTreeRefresher = this.CreateAddNewTreeRefresher(this.EntityToken);


            addNewTreeRefresher.PostRefreshMesseges(this.EntityToken);
        }



        private void HasUserUploaded(object sender, System.Workflow.Activities.ConditionalEventArgs e)
        {
            UploadedFile uploadedFile = this.GetBinding<UploadedFile>("UploadedFile");

            if (!uploadedFile.HasFile)
            {
                ShowUploadError(Texts.UploadAndExtractZipFile_FileNotUploaded);
                e.Result = false;
                return;
            }

            e.Result = true;
        }

        private void ShowUploadError(string message)
        {
            this.ShowMessage(DialogType.Error,
                Texts.UploadAndExtractZipFile_ErrorDialogLabel,
                message);
        }
    }
}
