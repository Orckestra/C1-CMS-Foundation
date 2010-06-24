using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Workflow.Activities;
using Composite.Actions;
using Composite.Elements;
using Composite.Workflow;


namespace Composite.StandardPlugins.Elements.ElementProviders.WebsiteFileElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewWebsiteFileWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public AddNewWebsiteFileWorkflow()
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



        private void FileExists(object sender, ConditionalEventArgs e)
        {
            string currentPath = GetCurrentPath();
            string newFileName = this.GetBinding<string>("NewFileName");

            e.Result = File.Exists(Path.Combine(currentPath, newFileName));
        }



        private void initializeCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            this.Bindings.Add("NewFileName", "");
        }



        private void step1CodeActivity_ShowError_ExecuteCode(object sender, EventArgs e)
        {
            this.ShowFieldMessage("NewFileName", "${Composite.StandardPlugins.WebsiteFileElementProvider, AddNewFile.Error.FileExist}");
        }



        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            string currentPath = GetCurrentPath();
            string newFileName = this.GetBinding<string>("NewFileName");

            using (FileStream fs = File.Create(Path.Combine(currentPath, newFileName)))
            { }

            SpecificTreeRefresher specificTreeRefresher = this.CreateSpecificTreeRefresher();
            specificTreeRefresher.PostRefreshMesseges(this.EntityToken);
        }
    }
}
