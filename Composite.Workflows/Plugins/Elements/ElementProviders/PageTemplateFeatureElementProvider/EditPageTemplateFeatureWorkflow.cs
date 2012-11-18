using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml.Linq;
using Composite.C1Console.Events;
using Composite.C1Console.Workflow;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Plugins.Elements.ElementProviders.PageTemplateFeatureElementProvider;
using Composite.Core.Xml;



namespace Composite.Plugins.Elements.ElementProviders.PageTemplateFeatureElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditPageTemplateFeatureWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public EditPageTemplateFeatureWorkflow()
        {
            InitializeComponent();
        }



        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            string markup;

            if (C1File.Exists(this.FilePath))
            {
                markup = C1File.ReadAllText(this.FilePath);
            }
            else
            {
                // someone deleted the feature file, but that won't stop us!
                XhtmlDocument template = new XhtmlDocument();
                template.Head.Add("");
                template.Body.Add("");
                markup = template.ToString();
            }

            this.Bindings.Add("FeatureName", this.FeatureName);
            this.Bindings.Add("Markup", markup);

            if (Path.GetExtension(this.FilePath)==".xhtml")
            {
                this.documentFormActivity1.FormDefinitionFileName = @"\Administrative\PageTemplateFeature\EditVisual.xml";
            }
            else
            {
                this.documentFormActivity1.FormDefinitionFileName = @"\Administrative\PageTemplateFeature\EditMarkup.xml";
            }
        }



        private void saveStateCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            string content = this.GetBinding<string>("Markup");

            FileUtils.RemoveReadOnly(this.FilePath);

            C1File.WriteAllText(this.FilePath, content);

            this.SetSaveStatus(true);
        }


        private string FeatureName
        {
            get
            {
                PageTemplateFeatureEntityToken castedEntityToken = (PageTemplateFeatureEntityToken)this.EntityToken;
                return castedEntityToken.FeatureName;
            }
        }

        private string FilePath
        {
            get
            {
                PageTemplateFeatureEntityToken castedEntityToken = (PageTemplateFeatureEntityToken)this.EntityToken;

                string extensionlessPath = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.PageTemplateFeaturesDirectory), castedEntityToken.FeatureName);

                if (C1File.Exists(extensionlessPath + ".xhtml"))
                {
                    return extensionlessPath + ".xhtml";
                }
                else
                {
                    return extensionlessPath + ".xml";
                }
            }
        }



        private void IsMarkupValid(object sender, System.Workflow.Activities.ConditionalEventArgs e)
        {
            PageTemplateFeatureEntityToken castedEntityToken = (PageTemplateFeatureEntityToken)this.EntityToken;

            string content = this.GetBinding<string>("Markup");
            
            this.UpdateBinding("Errors", "");

            XhtmlDocument document = null;
            try
            {
                document = XhtmlDocument.Parse(content);
            }
            catch (Exception ex)
            {
                this.UpdateBinding("Errors", ex.Message);
                e.Result = false;
                return;
            }

            e.Result = true;
        }




        private void editCodeActivity_ShowErrorMessage_ExecuteCode(object sender, EventArgs e)
        {
            
            this.ShowMessage(DialogType.Error, "Error", this.GetBinding<string>("Errors")); 
        }
    }
}
