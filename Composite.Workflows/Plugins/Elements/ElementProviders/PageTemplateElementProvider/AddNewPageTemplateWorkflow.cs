using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Workflow;
using Composite.Core.Extensions;
using Composite.Core.PageTemplates;
using Composite.Core.ResourceSystem;


namespace Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewPageTemplateWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private static readonly string Binding_TemplateTypeOptions = "TemplateTypeOptions";
        private static readonly string Binding_TemplateTypeId = "TemplateTypeId";

        public AddNewPageTemplateWorkflow()
        {
            InitializeComponent();
        }

        private void codeActivity1_ExecuteCode(object sender, EventArgs e)
        {
            var templateTypes = new List<Tuple<string, string, int>>();

            foreach (var providerInfo in PageTemplateFacade.GetProviders())
            {
                var provider = providerInfo.Value;

                if (provider.AddNewTemplateWorkflow == null) continue;

                templateTypes.Add(new Tuple<string, string, int>(
                    providerInfo.Key, !provider.AddNewTemplateLabel.IsNullOrEmpty()
                        ? StringResourceSystemFacade.ParseString(provider.AddNewTemplateLabel) 
                        : providerInfo.Key,
                    provider.GetPageTemplates().Count()));
            }
            
            Verify.That(templateTypes.Any(), "No page templates supporting adding new templates defined in configuration");

            // Most used page template type will be first in the list and preselected
            string preseceltedTemplate = templateTypes.OrderByDescending(t => t.Item3).Select(t => t.Item1).First();

            List<KeyValuePair<string, string>> options = templateTypes
                .OrderBy(t => t.Item2) // Sorting alphabetically by label 
                .Select(t => new KeyValuePair<string, string>(t.Item1, t.Item2)).ToList();

            this.Bindings.Add(Binding_TemplateTypeOptions, options);
            this.Bindings.Add(Binding_TemplateTypeId, preseceltedTemplate);
        }


        private void codeActivity2_ExecuteCode(object sender, EventArgs e)
        {
            string providerName = this.GetBinding<string>(Binding_TemplateTypeId);

            Type workflowType = PageTemplateFacade.GetProviders()
                                                  .First(p => p.Key == providerName)
                                                  .Value.AddNewTemplateWorkflow;

            this.ExecuteAction(new PageTemplateRootEntityToken(), new WorkflowActionToken(workflowType));
        }
    }
}
