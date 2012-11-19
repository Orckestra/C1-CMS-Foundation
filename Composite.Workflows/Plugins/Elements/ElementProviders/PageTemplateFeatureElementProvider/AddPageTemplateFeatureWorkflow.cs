using System;
using System.Collections.Generic;
using System.IO;
using Composite.C1Console.Workflow;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.ResourceSystem;
using Composite.Core.Xml;
using Composite.Core.WebClient.Renderings.Template;


namespace Composite.Plugins.Elements.ElementProviders.PageTemplateFeatureElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddPageTemplateFeatureWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public AddPageTemplateFeatureWorkflow()
        {
            InitializeComponent();
        }



        private void initializeCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            this.Bindings.Add("Name", "");
            this.Bindings.Add("EditorType", "xhtml");

            Dictionary<string, string> editorOptions = new Dictionary<string, string>();
            editorOptions.Add("xhtml", StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateFeatureElementProvider", "AddWorkflow.LabelTemplateFeatureEditorType.xhtml"));
            editorOptions.Add("xml", StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateFeatureElementProvider", "AddWorkflow.LabelTemplateFeatureEditorType.xml"));

            this.Bindings.Add("EditorTypeOptions", editorOptions);
        }



        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            string name = this.GetBinding<string>("Name");
            string editorType = this.GetBinding<string>("EditorType");

            string filename = PageTemplateFeatureFacade.GetNewPageTemplateFeaturePath(name, editorType);

            XhtmlDocument template = new XhtmlDocument();
            template.Head.Add("");
            template.Body.Add("");

            C1File.WriteAllText(filename, template.ToString());

            this.CloseCurrentView();
            this.RefreshRootEntityToken();

            this.ExecuteAction(PageTemplateFeatureEntityToken.BuildFeatureEntityToken(name),
                new WorkflowActionToken(typeof(EditPageTemplateFeatureWorkflow)));
        }



        private void IfFeatureNameFree(object sender, System.Workflow.Activities.ConditionalEventArgs e)
        {
            string name = this.GetBinding<string>("Name");

            if (name.Length > 50)
            {
                e.Result = false;
                this.ShowFieldMessage("Name", StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateFeatureElementProvider", "AddWorkflow.NameTooLong"));
                return;
            }

            if (!C1Directory.Exists(PathUtil.Resolve(GlobalSettingsFacade.PageTemplateFeaturesDirectory)))
            {
                try
                {
                    C1Directory.CreateDirectory(PathUtil.Resolve(GlobalSettingsFacade.PageTemplateFeaturesDirectory));
                }
                catch (Exception)
                {
                    e.Result = false;
                    this.ShowFieldMessage("Name", string.Format("Can not create directory '{0}'", GlobalSettingsFacade.PageTemplateFeaturesDirectory));
                }
            }

            string xmlFilename = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.PageTemplateFeaturesDirectory), name + ".xml");
            string xhtmlFilename = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.PageTemplateFeaturesDirectory), name + ".xhtml");

            e.Result = !C1File.Exists(xmlFilename) && !C1File.Exists(xhtmlFilename);

            if (e.Result == false)
            {
                this.ShowFieldMessage("Name", StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateFeatureElementProvider", "AddWorkflow.NameInUse"));
                return;
            }

            try
            {
                C1File.WriteAllText(xmlFilename, "tmp");
                C1File.Delete(xmlFilename);
            }
            catch (Exception)
            {
                e.Result = false;
                this.ShowFieldMessage("Name", StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateFeatureElementProvider", "AddWorkflow.NameNotValidInFilename"));
            }
        }
    }
}
