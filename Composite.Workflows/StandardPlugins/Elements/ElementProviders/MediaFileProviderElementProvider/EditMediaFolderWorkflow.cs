using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Activities;
using Composite.Actions;
using Composite.Data;
using Composite.Data.Types;
using Composite.Extensions;
using Composite.ResourceSystem;
using Composite.Validation.ClientValidationRules;
using Composite.Workflow;


namespace Composite.StandardPlugins.Elements.ElementProviders.MediaFileProviderElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditMediaFolderWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public EditMediaFolderWorkflow()
        {
            InitializeComponent();
        }



        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            IMediaFileFolder folder = this.GetDataItemFromEntityToken<IMediaFileFolder>();
            IMediaFileStore store = DataFacade.GetData<IMediaFileStore>(x => x.Id == folder.StoreId).First();
            
            this.Bindings.Add("FolderTitle", folder.Title);
            this.Bindings.Add("FolderDescription", folder.Description);
            this.Bindings.Add("FolderName", folder.Path.GetFolderName('/'));
            this.Bindings.Add("ProvidesMetaData", store.ProvidesMetadata);
            this.Bindings.Add("OldFolderPath", folder.Path);

            this.BindingsValidationRules.Add("FolderName", new List<ClientValidationRule> { new NotNullClientValidationRule() });
            this.BindingsValidationRules.Add("FolderTitle", new List<ClientValidationRule> { new StringLengthClientValidationRule(0, 256) });            
        }


        private string CreateFolderPath()
        {
            string updatedFoldername = this.GetBinding<string>("FolderName");
            string folderPath = this.GetBinding<string>("OldFolderPath");

            string currentName = folderPath.GetFolderName('/');

            folderPath = folderPath.Remove(folderPath.Length - currentName.Length);
            folderPath = folderPath + updatedFoldername;

            return folderPath;
        }


        private void saveCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            UpdateTreeRefresher updateTreeRefresher = this.CreateUpdateTreeRefresher(this.EntityToken);
            
            IMediaFileFolder folder = this.GetDataItemFromEntityToken<IMediaFileFolder>();            

            folder.Path = CreateFolderPath();
            folder.Title = this.GetBinding<string>("FolderTitle");
            folder.Description = this.GetBinding<string>("FolderDescription");

            DataFacade.Update(folder);

            SetSaveStatus(true);

            updateTreeRefresher.PostRefreshMesseges(folder.GetDataEntityToken());
        }



        private void ValidateInputs(object sender, ConditionalEventArgs e)
        {
            IMediaFileFolder folder = this.GetDataItemFromEntityToken<IMediaFileFolder>();            

            string oldFolderPath = this.GetBinding<string>("OldFolderPath");
            string folderPath = CreateFolderPath();

            if (oldFolderPath != folderPath)                 
            {
                if (DataFacade.GetData<IMediaFileFolder>(f => f.Path == folderPath).Any() == true)
                {
                    ShowFieldMessage("FolderName", StringResourceSystemFacade.GetString("Composite.Management", "Website.Forms.Administrative.AddNewMediaFolder.FolderNameAlreadyUsed"));
                    e.Result = false;
                    return;
                }

                IEnumerable<string> filenames = DataFacade.GetData<IMediaFile>().Where(f => f.FolderPath == oldFolderPath).Select(f => f.FileName);
                foreach (string filename in filenames)
                {
                    string compositePath = IMediaFileExtensions.GetCompositePath(folder.StoreId, folderPath, filename);
                    if (compositePath.Length > 2048)
                    {
                        this.ShowFieldMessage("FolderName", "${Composite.Management, Website.Forms.Administrative.EditMediaFolder.TotalFilenameToLong.Message}");
                        e.Result = false;
                        return;
                    }
                }
            }            

            e.Result = true;
        }
    }
}
