using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Activities;
using System.Workflow.Runtime;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.Extensions;
using Composite.Core.ResourceSystem;
using Composite.Data.Validation.ClientValidationRules;
using Composite.C1Console.Workflow;
using Composite.C1Console.Workflow.Activities;


namespace Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewMediaFolderWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public AddNewMediaFolderWorkflow()
        {
            InitializeComponent();
        }



        private void initializeAddNewfolderCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            FormsWorkflow workflow = this.GetRoot<FormsWorkflow>();
            string parentFolderPath;
            string storeId;
            if (this.EntityToken is MediaRootFolderProviderEntityToken)
            {
                MediaRootFolderProviderEntityToken token = (MediaRootFolderProviderEntityToken)this.EntityToken;
                storeId = token.Id;
                parentFolderPath = "/";
            }
            else
            {
                DataEntityToken token = (DataEntityToken)this.EntityToken;
                IMediaFileFolder parentFolder = (IMediaFileFolder)token.Data;
                storeId = parentFolder.StoreId;
                parentFolderPath = parentFolder.Path;
            }

            IMediaFileStore store = DataFacade.GetData<IMediaFileStore>(x => x.Id == storeId).First();
            IMediaFileFolder folder = DataFacade.BuildNew<IMediaFileFolder>();
            folder.Path = parentFolderPath;

            workflow.Bindings.Add("NewFolder", folder);
            workflow.Bindings.Add("FolderName", "");
            workflow.Bindings.Add("ProviderName", store.DataSourceId.ProviderName);
            workflow.Bindings.Add("ProvidesMetaData", false);
            
            workflow.BindingsValidationRules.Add("FolderName", new List<ClientValidationRule> { new NotNullClientValidationRule() });
        }


        private string CreateFolderPath(IMediaFileFolder folder)
        {
            string folderName = this.GetBinding<string>("FolderName");

            string folderPath = folder.Path;

            if (folderPath == "/")
            {
                folderPath = folderPath + folderName;
            }
            else
            {
                folderPath = folderPath + "/" + folderName;
            }

            return folderPath;
        }


        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            AddNewTreeRefresher addNewTreeRefresher = this.CreateAddNewTreeRefresher(this.EntityToken);

            IMediaFileFolder folder = this.GetBinding<IMediaFileFolder>("NewFolder");
            string providerName = this.GetBinding<string>("ProviderName");

            string folderPath = CreateFolderPath(folder);

            folder.Path = folderPath;

            if (folder.Title == string.Empty)
            {
                folder.Title = folderPath.GetFolderName('/');
            }

            FlowControllerServicesContainer flowControllerServicesContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
            var managementConsoleMessageService = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

            folder = DataFacade.AddNew<IMediaFileFolder>(folder, providerName);

            addNewTreeRefresher.PostRefreshMesseges(folder.GetDataEntityToken());
        }



        private void ValidateInputs(object sender, ConditionalEventArgs e)
        {
            e.Result = true;

            IMediaFileFolder folder = this.GetBinding<IMediaFileFolder>("NewFolder");
            string folderPath = CreateFolderPath(folder);

            if (DataFacade.GetData<IMediaFileFolder>(f => f.Path == folderPath).Any() == true)
            {
                e.Result = false;
                ShowFieldMessage("FolderName", StringResourceSystemFacade.GetString("Composite.Management", "Website.Forms.Administrative.AddNewMediaFolder.FolderNameAlreadyUsed"));
            }

            if (folderPath.Length > 2048)
            {
                e.Result = false;
                ShowFieldMessage("FolderName", StringResourceSystemFacade.GetString("Composite.Management", "Website.Forms.Administrative.AddNewMediaFolder.FolderNameTooLong"));
            }
        }
    }
}
