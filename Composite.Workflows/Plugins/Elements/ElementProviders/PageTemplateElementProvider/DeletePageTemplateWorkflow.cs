using System;
using System.Collections.Generic;
using Composite.Core.NewIO;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.Data.Plugins.DataProvider.Streams;
using Composite.Core.IO;
using Composite.Core.Logging;
using Composite.Core.ResourceSystem;
using Composite.Core.Extensions;
using Composite.C1Console.Workflow;
using Composite.Data;
using Composite.Data.Types;
using Composite.Data.ProcessControlled;


namespace Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeletePageTemplateWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private static readonly string LogTitle = "DeletePageTemplateWorkflow";

        public DeletePageTemplateWorkflow()
        {
            InitializeComponent();
        }

      


        private void codeActivity2_ExecuteCode(object sender, EventArgs e)
        {            
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;
            IPageTemplate pageTemplateToDelete = (IPageTemplate)dataEntityToken.Data;

            IFile file = IFileServices.GetFile<IPageTemplateFile>(pageTemplateToDelete.PageTemplateFilePath);

            if (DataFacade.WillDeleteSucceed(pageTemplateToDelete) == true)
            {
                DeleteTreeRefresher deleteTreeRefresher = this.CreateDeleteTreeRefresher(this.EntityToken);

                ProcessControllerFacade.FullDelete(pageTemplateToDelete);

                if(file != null && file is FileSystemFileBase)
                {
                    FileSystemFileBase baseFile = file as FileSystemFileBase;
                    File.Delete(baseFile.SystemPath);

                    try
                    {
                        File.Delete(baseFile.SystemPath);
                    }
                    catch
                    {
                        LoggingService.LogWarning(LogTitle, "Failed to delete page template file: '{0}'".FormatWith(baseFile.SystemPath));
                    }
                }

                deleteTreeRefresher.PostRefreshMesseges();
            }
            else
            {
                this.ShowMessage(
                        DialogType.Error,
                        StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateElementProvider", "DeletePageTemplateWorkflow.CascadeDeleteErrorTitle"),
                        StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateElementProvider", "DeletePageTemplateWorkflow.CascadeDeleteErrorMessage")
                    );
            }
        }
    }
}
