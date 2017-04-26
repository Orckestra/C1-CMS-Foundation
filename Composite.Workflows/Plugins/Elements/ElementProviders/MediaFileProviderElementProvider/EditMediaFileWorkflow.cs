using System;
using System.Linq;
using Composite.C1Console.Actions;
using Composite.Data;
using Composite.Data.Types;
using Composite.C1Console.Workflow;
using System.Workflow.Activities;
using System.Collections.Generic;
using Composite.Data.Validation.ClientValidationRules;
using Composite.Data.Validation;


namespace Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditMediaFileWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public EditMediaFileWorkflow()
        {
            InitializeComponent();
        }



        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken token = (DataEntityToken)this.EntityToken;
            IMediaFile file = (IMediaFile)token.Data;
            IMediaFileStore store = DataFacade.GetData<IMediaFileStore>(x => x.Id == file.StoreId).First();
            var mediaURL = Composite.Core.Routing.MediaUrls.BuildUrl(file);

            this.Bindings.Add("FileDataFileName", file.FileName);
            this.Bindings.Add("FileDataTitle", file.Title);
            this.Bindings.Add("FileDataURL", mediaURL);
            this.Bindings.Add("FileDataDescription", file.Description);
            this.Bindings.Add("FileDataTags", file.Tags);
            this.Bindings.Add("ProvidesMetaData", store.ProvidesMetadata);

            this.BindingsValidationRules.Add("FileDataTitle", new List<ClientValidationRule> { new StringLengthClientValidationRule(0, 256) });
        }



        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            UpdateTreeRefresher updateTreeRefresher = this.CreateUpdateTreeRefresher(this.EntityToken);

            DataEntityToken token = (DataEntityToken)this.EntityToken;
            IMediaFile file = (IMediaFile)token.Data;
            IMediaFileStore store = DataFacade.GetData<IMediaFileStore>(x => x.Id == file.StoreId).First();

            file.FileName = this.GetBinding<string>("FileDataFileName");
            file.Title = this.GetBinding<string>("FileDataTitle");
            file.Description = this.GetBinding<string>("FileDataDescription");
            file.Tags = this.GetBinding<string>("FileDataTags");

            DataFacade.Update(file);

            SetSaveStatus(true);

            updateTreeRefresher.PostRefreshMesseges(file.GetDataEntityToken());
        }



        private void ValidateInputs(object sender, ConditionalEventArgs e)
        {
            IMediaFile file = this.GetDataItemFromEntityToken<IMediaFile>();

            string filename = this.GetBinding<string>("FileDataFileName");

            string compositePath = IMediaFileExtensions.GetCompositePath(file.StoreId, file.FolderPath, filename);
            if (compositePath.Length > 2048)
            {
                this.ShowFieldMessage("FileDataFileName", "${Composite.Management, Website.Forms.Administrative.EditMediaFile.TotalFilenameToLong.Message}");
                e.Result = false;
                return;
            }

            Guid mediaFileId = file.Id;
            if(DataFacade.GetData<IMediaFile>()
                .Any(mediaFile => string.Compare(mediaFile.CompositePath, compositePath, StringComparison.InvariantCultureIgnoreCase) == 0
                                  && mediaFile.Id != mediaFileId))
            {
                this.ShowFieldMessage("FileDataFileName", "${Composite.Management, Website.Forms.Administrative.EditMediaFile.FileExists.Message}");
                e.Result = false;
                return;
            }

            e.Result = true;
        }
    }
}
