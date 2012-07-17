using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Workflow;
using Composite.Core.Extensions;
using Composite.Core.PageTemplates;
using Composite.Core.ResourceSystem;
using Composite.Plugins.PageTemplates.MasterPages;
using Composite.Plugins.PageTemplates.Razor;
using Composite.Plugins.PageTemplates.XmlPageTemplates;


namespace Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewPageTemplateWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private static readonly string Binding_TemplateTypeOptions = "TemplateTypeOptions";
        private static readonly string Binding_TemplateTypeId = "TemplateTypeId";
        private const string TemplateType_Razor = "razor";
        private const string TemplateType_MasterPage = "masterpage";
        private const string TemplateType_XML = "xml";

        public AddNewPageTemplateWorkflow()
        {
            InitializeComponent();
        }

        private void codeActivity1_ExecuteCode(object sender, EventArgs e)
        {
            // collecting statistics
            var allTemplates = PageTemplateFacade.GetPageTemplates().ToList();

            var templateTypes = new List<Tuple<string, string, int>>();

            templateTypes.Add(new Tuple<string, string, int>(
                TemplateType_Razor,
                GetText("AddNewPageTemplate.TemplateType.Razor"),
                allTemplates.OfType<RazorPageTemplateDescriptor>().Count()));

            templateTypes.Add(new Tuple<string, string, int>(
                TemplateType_MasterPage,
                GetText("AddNewPageTemplate.TemplateType.MasterPage"),
                allTemplates.OfType<MasterPagePageTemplateDescriptor>().Count()));

            templateTypes.Add(new Tuple<string, string, int>(
                TemplateType_XML,
                GetText("AddNewPageTemplate.TemplateType.XML"),
                allTemplates.OfType<XmlPageTemplateDescriptor>().Count()));

            // Most used page template type will be first in the list and preselected
            templateTypes = templateTypes.OrderByDescending(t => t.Item3).ToList();

            List<KeyValuePair<string, string>> options = templateTypes
                .Select(t => new KeyValuePair<string, string>(t.Item1, t.Item2)).ToList();

            this.Bindings.Add(Binding_TemplateTypeOptions, options);
            this.Bindings.Add(Binding_TemplateTypeId, templateTypes[0].Item1);
        }


        private void codeActivity2_ExecuteCode(object sender, EventArgs e)
        {
            string templateType = this.GetBinding<string>(Binding_TemplateTypeId);

            Type workflowType;

            switch (templateType)
            {
                case TemplateType_Razor:
                    workflowType = typeof(AddNewRazorPageTemplateWorkflow);
                    break;
                case TemplateType_MasterPage:
                    workflowType = typeof(AddNewMasterPagePageTemplateWorkflow);
                    break;
                case TemplateType_XML:
                    workflowType = typeof(AddNewXmlPageTemplateWorkflow);
                    break;
                default:
                    throw new InvalidOperationException("Unexpected page template type '{0}'".FormatWith(templateType));
            }

            this.ExecuteAction(new PageTemplateRootEntityToken(), new WorkflowActionToken(workflowType));
        }

        private static string GetText(string stringId)
        {
            return StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateElementProvider", stringId);
        }
    }
}
