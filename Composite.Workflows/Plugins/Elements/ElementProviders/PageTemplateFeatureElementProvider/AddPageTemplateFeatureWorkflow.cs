using System;
using System.Collections.Generic;
using System.IO;
using Composite.C1Console.Workflow;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.ResourceSystem;
using Composite.Core.Xml;
using Composite.Core.WebClient.Renderings.Template;
using System.Xml.Linq;


using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Plugins_PageTemplateFeatureElementProvider;

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
            this.Bindings.Add("EditorType", "html");

            var editorOptions = new Dictionary<string, string>
            {
                { "html", Texts.AddWorkflow_LabelTemplateFeatureEditorType_html },
                { "xml", Texts.AddWorkflow_LabelTemplateFeatureEditorType_xml }
            };

            this.Bindings.Add("EditorTypeOptions", editorOptions);
        }



        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            string name = this.GetBinding<string>("Name");
            string editorType = this.GetBinding<string>("EditorType");

            string filename = PageTemplateFeatureFacade.GetNewPageTemplateFeaturePath(name, editorType);

            var template = new XhtmlDocument();
            template.Head.Add("");
            template.Body.Add(new XElement(Namespaces.Xhtml + "p", ""));

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
            string htmlFilename = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.PageTemplateFeaturesDirectory), name + ".html");

            e.Result = !C1File.Exists(xmlFilename) && !C1File.Exists(htmlFilename);

            if (!e.Result)
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
