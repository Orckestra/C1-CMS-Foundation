using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Activities;
using Composite.C1Console.Forms.CoreUiControls;
using Composite.C1Console.Workflow;
using Composite.Core.IO;
using Composite.Data;
using Composite.Data.Types;
using Composite.Data.Validation.ClientValidationRules;
using Composite.Data.Transactions;


namespace Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Never)]
    public sealed partial class AddNewMediaFileWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public AddNewMediaFileWorkflow()
        {
            InitializeComponent();
        }



        private void Initialize()
        {
            if (this.EntityToken is MediaRootFolderProviderEntityToken token)
            {
                _storeId = token.Id;
                _folderPath = "/";
            }
            else
            {
                var dataEntityToken = (DataEntityToken)this.EntityToken;
                var parentFolder = (IMediaFileFolder)dataEntityToken.Data;
                _storeId = parentFolder.StoreId;
                _folderPath = parentFolder.Path;
            }
        }


        [NonSerialized]
        private string _folderPath;
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
        private string _storeId;
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
            return DataFacade.GetData<IMediaFile>().FirstOrDefault(file =>
                string.Compare(file.FolderPath, folderPath, StringComparison.OrdinalIgnoreCase) == 0 &&
                string.Compare(file.FileName, filename, StringComparison.OrdinalIgnoreCase) == 0);
        }



        private void initializeCodeActivity_InitializeBindings_ExecuteCode(object sender, EventArgs e)
        {
            this.Bindings.Add("UploadedFile", new UploadedFile());
            this.Bindings.Add("AllowOverwrite", false);
            this.Bindings.Add("Title", "");
            this.Bindings.Add("Description", "");
            this.Bindings.Add("Tags", "");
        }



        private void ValidateStep1Bindings_Next(object sender, ConditionalEventArgs e)
        {
            UploadedFile uploadedFile = this.GetBinding<UploadedFile>("UploadedFile");

            if (!uploadedFile.HasFile)
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
            if (!e.Result) return;

            UploadedFile uploadedFile = this.GetBinding<UploadedFile>("UploadedFile");
            string filename = uploadedFile.FileName;

            bool allowOverwrite = this.GetBinding<bool>("AllowOverwrite");

            IMediaFile existingFile = GetExistingFile(this.FolderPath, filename);
            if (existingFile != null && !allowOverwrite)
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
            if (!this.BindingExist("Filename"))
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
            if (existingFile != null && !allowOverwrite)
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
            var addNewTreeRefresher = this.CreateAddNewTreeRefresher(this.EntityToken);
            DataEntityToken focusEntityToken;

            UploadedFile uploadedFile = this.GetBinding<UploadedFile>("UploadedFile");
            var filename = this.BindingExist("Filename")
                ? this.GetBinding<string>("Filename")
                : uploadedFile.FileName;

            using (var transactionScope = TransactionsFacade.CreateNewScope())
            {
                IMediaFileStore store = DataFacade.GetData<IMediaFileStore>(x => x.Id == this.StoreId).First();

                IMediaFile existingFile = GetExistingFile(this.FolderPath, filename);

                if (existingFile == null)
                {
                    var mediaFile = new WorkflowMediaFile
                    {
                        FileName = System.IO.Path.GetFileName(filename),
                        FolderPath = this.FolderPath,
                        Title = this.GetBinding<string>("Title"),
                        Description = this.GetBinding<string>("Description"),
                        Tags = this.GetBinding<string>("Tags"),
                        Culture = C1Console.Users.UserSettings.ActiveLocaleCultureInfo.Name,
                        Length = uploadedFile.ContentLength,
                        MimeType = MimeTypeInfo.GetMimeType(uploadedFile)
                    };

                    using (var readStream = uploadedFile.FileStream)
                    {
                        using (var writeStream = mediaFile.GetNewWriteStream())
                        {
                            readStream.CopyTo(writeStream);
                        }
                    }

                    IMediaFile addedFile = DataFacade.AddNew<IMediaFile>(mediaFile, store.DataSourceId.ProviderName);

                    focusEntityToken = addedFile.GetDataEntityToken();
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

                    using (var readStream = uploadedFile.FileStream)
                    {
                        using (var writeStream = existingFile.GetNewWriteStream())
                        {
                            readStream.CopyTo(writeStream);
                        }
                    }

                    DataFacade.Update(existingFile);
                    DataFacade.Update(fileData);

                    focusEntityToken = existingFile.GetDataEntityToken();
                }

                transactionScope.Complete();
            }

            addNewTreeRefresher.PostRefreshMesseges(focusEntityToken);
            SelectElement(focusEntityToken);
        }
    }
}
