using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.C1Console.Actions;
using Composite.C1Console.Elements;
using Composite.C1Console.Forms.Flows;
using Composite.Data.Validation.ClientValidationRules;


namespace Composite.C1Console.Workflow.Foundation
{
    internal sealed class FormsWorkflowActivityService : IFormsWorkflowActivityService
    {
        public void DeliverFormData(Guid instanceId, string containerLabel, IFlowUiContainerType containerType, string formDefinition, Dictionary<string, object> bindings)
        {
            var formData = GetOrAddFormData(instanceId);

            formData.ContainerLabel = containerLabel;
            formData.ContainerType = containerType;
            formData.FormDefinition = formDefinition;
            formData.FormMarkupProvider = null;
            formData.Bindings = bindings;
        }



        public void DeliverFormData(Guid instanceId, string containerLabel, IFlowUiContainerType containerType, IFormMarkupProvider formMarkupProvider, Dictionary<string, object> bindings)
        {
            var formData = GetOrAddFormData(instanceId);

            formData.ContainerLabel = containerLabel;
            formData.ContainerType = containerType;
            formData.FormDefinition = null;
            formData.FormMarkupProvider = formMarkupProvider;
            formData.Bindings = bindings;
        }



        public void DeliverFormData(Guid instanceId, string containerLabel, IFlowUiContainerType containerType, string formDefinition, Dictionary<string, object> bindings, Dictionary<string, List<ClientValidationRule>> bindingsValidationRules)
        {
            var formData = GetOrAddFormData(instanceId);

            formData.ContainerLabel = containerLabel;
            formData.ContainerType = containerType;
            formData.FormDefinition = formDefinition;
            formData.FormMarkupProvider = null;
            formData.Bindings = bindings;
            formData.BindingsValidationRules = bindingsValidationRules;
        }



        public void DeliverFormData(Guid instanceId, string containerLabel, IFlowUiContainerType containerType, IFormMarkupProvider formMarkupProvider, Dictionary<string, object> bindings, Dictionary<string, List<ClientValidationRule>> bindingsValidationRules)
        {
            var formData = GetOrAddFormData(instanceId);

            formData.ContainerLabel = containerLabel;
            formData.ContainerType = containerType;
            formData.FormDefinition = null;
            formData.FormMarkupProvider = formMarkupProvider;
            formData.Bindings = bindings;
            formData.BindingsValidationRules = bindingsValidationRules;
        }


        public void AddCustomToolbarItem(Guid instanceId, string itemId, XDocument markup, ActionGroupPriority priority)
        {
            Verify.ArgumentNotNull(itemId, nameof(itemId));
            Verify.ArgumentNotNull(markup, nameof(markup));

            var formData = GetOrAddFormData(instanceId);

            if (formData.CustomToolbarItems == null)
            {
                formData.CustomToolbarItems = new List<Tuple<string, XDocument, ActionGroupPriority>>();
            }
            else
            {
                var existingItem = formData.CustomToolbarItems.FirstOrDefault(i => i.Item1 == itemId);
                if (existingItem != null)
                {
                    formData.CustomToolbarItems.Remove(existingItem);
                }
            }
            
            formData.CustomToolbarItems.Add(new Tuple<string, XDocument, ActionGroupPriority>(
                itemId, markup, priority));
        }

        public FlowControllerServicesContainer GetFlowServicesContainer(Guid instanceId)
        {
            throw new NotImplementedException();
        }

        public void DeliverCustomToolbarDefinition(Guid instanceId, string customToolbarDefinition)
        {
            Verify.ArgumentNotNullOrEmpty(customToolbarDefinition, nameof(customToolbarDefinition));

            AddCustomToolbarItem(instanceId, "default", 
                XDocument.Parse(customToolbarDefinition), ActionGroupPriority.TargetedAppendMedium);
        }

        public void DeliverCustomToolbarDefinition(Guid instanceId, IFormMarkupProvider customToolbarMarkupProvider)
        {
            Verify.ArgumentNotNull(customToolbarMarkupProvider, nameof(customToolbarMarkupProvider));

            var doc = XDocument.Load(customToolbarMarkupProvider.GetReader());

            AddCustomToolbarItem(instanceId, "default", doc, ActionGroupPriority.TargetedAppendMedium);
        }


        private FormData GetOrAddFormData(Guid instanceId)
        {
            FormData formData;

            if (!WorkflowFacade.TryGetFormData(instanceId, out formData))
            {
                formData = new FormData();
                WorkflowFacade.AddFormData(instanceId, formData);
            }

            return formData;
        }

    }
}
