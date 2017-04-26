using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Activities;
using Composite.C1Console.Actions;
using Composite.C1Console.Forms.CoreUiControls;
using Composite.C1Console.Workflow;
using Composite.Core.IO;
using Composite.Data;
using Composite.Data.Types;
using Composite.Data.Validation.ClientValidationRules;
using Composite.Data.Transactions;
using System.Transactions;


namespace Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Never)]
    public sealed partial class AddNewMediaFileWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private static readonly string LogTitle = typeof (AddNewMediaFileWorkflow).Name;

        public AddNewMediaFileWorkflow()
        {
            InitializeComponent();
        }



        private void Initialize()
        {
            if (this.EntityToken is MediaRootFolderProviderEntityToken)
            {
                MediaRootFolderProviderEntityToken token = (MediaRootFolderProviderEntityToken)this.EntityToken;
                _storeId = token.Id;
                _folderPath = "/";
            }
            else
            {
                DataEntityToken token = (DataEntityToken)this.EntityToken;
                IMediaFileFolder parentFolder = (IMediaFileFolder)token.Data;
                _storeId = parentFolder.StoreId;
                _folderPath = parentFolder.Path;
            }
        }


        [NonSerialized]
        private string _folderPath = null;
        internal string FolderPath
        {
            get
            {
                if (_folderPath == null)
                {
                    Initialize();
                }

                return _folderPath;
            }
        }



        [NonSerialized]
        private string _storeId = null;
        internal string StoreId
        {
            get
            {
                if (_storeId == null)
                {
                    Initialize();
                }

                return _storeId;
            }
        }



        private IMediaFile GetExistingFile(string folderPath, string filename)
        {
            IMediaFile existingFile =
                    (from file in DataFacade.GetData<IMediaFile>()
                     where (string.Compare(file.FolderPath, folderPath, StringComparison.OrdinalIgnoreCase) == 0) &&
                           (string.Compare(file.FileName, filename, StringComparison.OrdinalIgnoreCase) == 0)
                     select file).FirstOrDefault();

            return existingFile;
        }



        private void initializeCodeActivity_InitializeBindings_ExecuteCode(object sender, EventArgs e)
        {
            UploadedFile file = new UploadedFile();

            this.Bindings.Add("UploadedFile", file);
            this.Bindings.Add("AllowOverwrite", false);
            this.Bindings.Add("Title", "");
            this.Bindings.Add("Description", "");
            this.Bindings.Add("Tags", "");
        }



        private void ValidateStep1Bindings_Next(object sender, ConditionalEventArgs e)
        {
            UploadedFile uploadedFile = this.GetBinding<UploadedFile>("UploadedFile");

            if (uploadedFile.HasFile == false)
            {
                this.ShowFieldMessage("UploadedFile", "${Composite.Management, Website.Forms.Administrative.AddNewMediaFile.MissingUploadedFile.Message}");
                e.Result = false;
                return;
            }

            e.Result = true;
        }



        private void ValidateStep1Bindings_Finish(object sender, ConditionalEventArgs e)
        {
            ValidateStep1Bindings_Next(sender, e);
            if (e.Result == false) return;

            UploadedFile uploadedFile = this.GetBinding<UploadedFile>("UploadedFile");
            string filename = uploadedFile.FileName;

            bool allowOverwrite = this.GetBinding<bool>("AllowOverwrite");

            IMediaFile existingFile = GetExistingFile(this.FolderPath, filename);
            if ((existingFile != null) && (allowOverwrite == false))
            {
                this.ShowFieldMessage("UploadedFile", "${Composite.Management, Website.Forms.Administrative.AddNewMediaFile.FileExists.Message}");
                e.Result = false;
                return;
            }

            string compositePath = IMediaFileExtensions.GetCompositePath(this.StoreId, this.FolderPath, filename);
            if (compositePath.Length > 2048)
            {
                this.ShowFieldMessage("UploadedFile", "${Composite.Management, Website.Forms.Administrative.AddNewMediaFile.TotalFilenameToLong.Message}");
                e.Result = false;
                return;
            }

            e.Result = true;
        }



        private void step2CodeActivity_UpdateBindings_ExecuteCode(object sender, EventArgs e)
        {            
            if (this.BindingExist("Filename") == false)
            {
                UploadedFile uploadedFile = this.GetBinding<UploadedFile>("UploadedFile");
                this.Bindings.Add("Filename", uploadedFile.FileName);

                this.BindingsValidationRules.Add("Title", new List<ClientValidationRule> { new StringLengthClientValidationRule(0, 256) });
            }            
        }



        private void ValidateStep2Bindings(object sender, ConditionalEventArgs e)
        {            
            string filename = this.GetBinding<string>("Filename");

            bool allowOverwrite = this.GetBinding<bool>("AllowOverwrite");

            IMediaFile existingFile = GetExistingFile(this.FolderPath, filename);
            if ((existingFile != null) && (allowOverwrite == false))
            {
                this.ShowFieldMessage("Filename", "${Composite.Management, Website.Forms.Administrative.AddNewMediaFile.FileExists.Message}");
                e.Result = false;
                return;
            }

            string compositePath = IMediaFileExtensions.GetCompositePath(this.StoreId, this.FolderPath, filename);
            if (compositePath.Length > 2048)
            {
                this.ShowFieldMessage("Filename", "${Composite.Management, Website.Forms.Administrative.AddNewMediaFile.TotalFilenameToLong.Message}");
                e.Result = false;
                return;
            }

            e.Result = true;
        }



        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            AddNewTreeRefresher addNewTreeRefresher = this.CreateAddNewTreeRefresher(this.EntityToken);

            UploadedFile uploadedFile = this.GetBinding<UploadedFile>("UploadedFile");
            string filename;
            if (this.BindingExist("Filename"))
            {
                filename = this.GetBinding<string>("Filename");
            }
            else 
            {
                filename = uploadedFile.FileName;
            }

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                IMediaFileStore store = DataFacade.GetData<IMediaFileStore>(x => x.Id == this.StoreId).First();

                IMediaFile existingFile = GetExistingFile(this.FolderPath, filename);

                if (existingFile == null)
                {
                    WorkflowMediaFile mediaFile = new WorkflowMediaFile();
                    mediaFile.FileName = System.IO.Path.GetFileName(filename);
                    mediaFile.FolderPath = this.FolderPath;
                    mediaFile.Title = this.GetBinding<string>("Title");
                    mediaFile.Description = this.GetBinding<string>("Description");
                    mediaFile.Tags = this.GetBinding<string>("Tags");
                    mediaFile.Culture = C1Console.Users.UserSettings.ActiveLocaleCultureInfo.Name;
                    mediaFile.Length = uploadedFile.ContentLength;
                    mediaFile.MimeType = MimeTypeInfo.GetMimeType(uploadedFile);

                    using (System.IO.Stream readStream = uploadedFile.FileStream)
                    {
                        using (System.IO.Stream writeStream = mediaFile.GetNewWriteStream())
                        {
                            readStream.CopyTo(writeStream);
                        }
                    }

                    IMediaFile addedFile = DataFacade.AddNew<IMediaFile>(mediaFile, store.DataSourceId.ProviderName);

                    addNewTreeRefresher.PostRefreshMesseges(addedFile.GetDataEntityToken());

                    SelectElement(addedFile.GetDataEntityToken());
                }
                else
                {
                    Guid fileId = existingFile.Id;
                    IMediaFileData fileData = DataFacade.GetData<IMediaFileData>(file => file.Id == fileId).FirstOrDefault();

                    fileData.Title = this.GetBinding<string>("Title");
                    fileData.Description = this.GetBinding<string>("Description");
                    fileData.Tags = this.GetBinding<string>("Tags");
                    fileData.MimeType = MimeTypeInfo.GetMimeType(uploadedFile);
                    fileData.Length = uploadedFile.ContentLength;

                    using (System.IO.Stream readStream = uploadedFile.FileStream)
                    {
                        using (System.IO.Stream writeStream = existingFile.GetNewWriteStream())
                        {
                            readStream.CopyTo(writeStream);
                        }
                    }

                    DataFacade.Update(existingFile);
                    DataFacade.Update(fileData);

                    addNewTreeRefresher.PostRefreshMesseges(existingFile.GetDataEntityToken());

                    SelectElement(existingFile.GetDataEntityToken());
                }

                transactionScope.Complete();
            }
        }        
    }
}
