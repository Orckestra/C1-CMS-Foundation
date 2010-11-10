using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml.Linq;
using Composite.C1Console.Events;
using Composite.C1Console.Workflow;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Plugins.Elements.ElementProviders.DeveloperApplicationProvider;



namespace Composite.C1Console.Trees.Workflows
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditTreeDefinitionWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public EditTreeDefinitionWorkflow()
        {
            InitializeComponent();
        }



        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            string path = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.TreeDefinitionsDirectory), this.Filename);

            this.Bindings.Add("TreeId", Path.GetFileNameWithoutExtension(this.Filename));
            this.Bindings.Add("TreeDefinitionMarkup", C1File.ReadAllText(path));
        }



        private void saveStateCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            string content = this.GetBinding<string>("TreeDefinitionMarkup");

            string path = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.TreeDefinitionsDirectory), this.Filename);

            FileEx.RemoveReadOnly(path);

            C1File.WriteAllText(path, content);

            this.SetSaveStatus(true);

            this.RefreshCurrentEntityToken();
        }



        private string Filename
        {
            get
            {
                DeveloperApplicationProviderEntityToken castedEntityToken = (DeveloperApplicationProviderEntityToken)this.EntityToken;

                return castedEntityToken.FullTreePath;
            }
        }



        private void IsMarkupValid(object sender, System.Workflow.Activities.ConditionalEventArgs e)
        {
            DeveloperApplicationProviderEntityToken castedEntityToken = (DeveloperApplicationProviderEntityToken)this.EntityToken;

            string content = this.GetBinding<string>("TreeDefinitionMarkup");
            
            this.UpdateBinding("Errors", "");

            XDocument document = null;
            try
            {
                document = XDocument.Parse(content);
            }
            catch (Exception ex)
            {
                this.UpdateBinding("Errors", ex.Message);
                e.Result = false;
                return;
            }


            Tree tree = TreeFacade.LoadTreeFromDom(castedEntityToken.Filename, document);

            ValidationError validationError = tree.BuildResult.ValidationErrors.FirstOrDefault();
            if (validationError != null)
            {
                StringBuilder sb = new StringBuilder();
                if (string.IsNullOrEmpty(validationError.XPath) == false)
                {
                    sb.Append(validationError.Message);
                    sb.Append(" at XPath: ");
                    sb.Append(validationError.XPath);
                }
                else
                {
                    sb.Append(validationError.Message);
                }

                this.UpdateBinding("Errors", sb.ToString());
            }            

            e.Result = tree.BuildResult.ValidationErrors.Count() == 0;
        }




        private void editCodeActivity_ShowErrorMessage_ExecuteCode(object sender, EventArgs e)
        {
            
            this.ShowMessage(DialogType.Error, "Error", this.GetBinding<string>("Errors")); 
        }
    }
}
