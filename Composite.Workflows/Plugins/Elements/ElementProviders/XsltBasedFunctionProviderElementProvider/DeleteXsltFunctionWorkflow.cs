using System;
using System.Linq;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Workflow;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Logging;
using Composite.Core.ResourceSystem;
using Composite.Data;
using Composite.Data.Plugins.DataProvider.Streams;
using Composite.Data.Types;
using Composite.Plugins.Elements.ElementProviders.Common;


namespace Composite.Plugins.Elements.ElementProviders.XsltBasedFunctionProviderElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeleteXsltFunctionWorkflow : BaseFunctionWorkflow
    {
        public DeleteXsltFunctionWorkflow()
        {
            InitializeComponent();
        }

        private void DeleteFile(IFile file)
        {
            FileSystemFileBase baseFile = file as FileSystemFileBase;
            if(baseFile == null) return;

            string filePath = baseFile.SystemPath;
            try
            {
                C1File.Delete(filePath);
            }
            catch
            {
                LoggingService.LogWarning(typeof(DeleteXsltFunctionWorkflow).Name, "Failed to delete file '{0}'".FormatWith(filePath));
            }
        }

        private void codeActivity1_ExecuteCode(object sender, EventArgs e)
        {            
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

            IXsltFunction xsltFunction = (IXsltFunction)dataEntityToken.Data;

            if (DataFacade.WillDeleteSucceed<IXsltFunction>(xsltFunction) == true)
            {
                DeleteTreeRefresher deleteTreeRefresher = this.CreateDeleteTreeRefresher(this.EntityToken);


                IFile file = IFileServices.TryGetFile<IXsltFile>(xsltFunction.XslFilePath);
                DataFacade.Delete<IParameter>(f => f.OwnerId == xsltFunction.Id);
                DataFacade.Delete<INamedFunctionCall>(f => f.XsltFunctionId == xsltFunction.Id);
                DataFacade.Delete(xsltFunction);

                DeleteFile(file);

                int count =
                    (from info in DataFacade.GetData<IXsltFunction>()
                     where info.Namespace == xsltFunction.Namespace
                     select info).Count();

                if (count == 0)
                {
                    RefreshFunctionTree();
                }
                else
                {
                    deleteTreeRefresher.PostRefreshMesseges();
                }
            }
            else
            {
                this.ShowMessage(
                        DialogType.Error,
                        StringResourceSystemFacade.GetString("Composite.Plugins.XsltBasedFunction", "DeleteXsltFunctionWorkflow.CascadeDeleteErrorTitle"),
                        StringResourceSystemFacade.GetString("Composite.Plugins.XsltBasedFunction", "DeleteXsltFunctionWorkflow.CascadeDeleteErrorMessage")
                    );
            }
        }
    }
}
