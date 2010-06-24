using System;
using System.Collections.Generic;
using System.IO;
using Composite.Actions;
using Composite.ConsoleEventSystem;
using Composite.Data.Plugins.DataProvider.Streams;
using Composite.IO;
using Composite.Logging;
using Composite.ResourceSystem;
using Composite.StringExtensions;
using Composite.Workflow;
using Composite.Data;
using Composite.Data.Types;
using Composite.Data.ProcessControlled;


namespace Composite.StandardPlugins.Elements.ElementProviders.PageTemplateElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeletePageTemplateWorkflow : Composite.Workflow.Activities.FormsWorkflow
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
                        StringResourceSystemFacade.GetString("Composite.StandardPlugins.PageTemplateElementProvider", "DeletePageTemplateWorkflow.CascadeDeleteErrorTitle"),
                        StringResourceSystemFacade.GetString("Composite.StandardPlugins.PageTemplateElementProvider", "DeletePageTemplateWorkflow.CascadeDeleteErrorMessage")
                    );
            }
        }
    }
}
