using System;
using System.Xml;
using System.Collections.Generic;
using Composite.Actions;
using Composite.Forms.Flows;
using Composite.Validation.ClientValidationRules;


namespace Composite.Workflow.Foundation
{
    internal sealed class FormsWorkflowActivityService : IFormsWorkflowActivityService
    {
        public void DeliverFormData(Guid instanceId, string containerLabel, IFlowUiContainerType containerType, string formDefinition, Dictionary<string, object> bindings)
        {
            FormData formData;

            if (WorkflowFacade.TryGetFormData(instanceId, out formData) == false)
            {
                formData = new FormData();
                WorkflowFacade.AddFormData(instanceId, formData);
            }

            formData.ContainerLabel = containerLabel;
            formData.ContainerType = containerType;
            formData.FormDefinition = formDefinition;
            formData.FormMarkupProvider = null;
            formData.Bindings = bindings;
        }



        public void DeliverFormData(Guid instanceId, string containerLabel, IFlowUiContainerType containerType, IFormMarkupProvider formMarkupProvider, Dictionary<string, object> bindings)
        {
            FormData formData;

            if (WorkflowFacade.TryGetFormData(instanceId, out formData) == false)
            {
                formData = new FormData();
                WorkflowFacade.AddFormData(instanceId, formData);
            }

            formData.ContainerLabel = containerLabel;
            formData.ContainerType = containerType;
            formData.FormDefinition = null;
            formData.FormMarkupProvider = formMarkupProvider;
            formData.Bindings = bindings;
        }



        public void DeliverFormData(Guid instanceId, string containerLabel, IFlowUiContainerType containerType, string formDefinition, Dictionary<string, object> bindings, Dictionary<string, List<ClientValidationRule>> bindingsValidationRules)
        {
            FormData formData;

            if (WorkflowFacade.TryGetFormData(instanceId, out formData) == false)
            {
                formData = new FormData();
                WorkflowFacade.AddFormData(instanceId, formData);
            }

            formData.ContainerLabel = containerLabel;
            formData.ContainerType = containerType;            
            formData.FormDefinition = formDefinition;
            formData.FormMarkupProvider = null;
            formData.Bindings = bindings;
            formData.BindingsValidationRules = bindingsValidationRules;
        }



        public void DeliverFormData(Guid instanceId, string containerLabel, IFlowUiContainerType containerType, IFormMarkupProvider formMarkupProvider, Dictionary<string, object> bindings, Dictionary<string, List<ClientValidationRule>> bindingsValidationRules)
        {
            FormData formData;

            if (WorkflowFacade.TryGetFormData(instanceId, out formData) == false)
            {
                formData = new FormData();
                WorkflowFacade.AddFormData(instanceId, formData);
            }

            formData.ContainerLabel = containerLabel;
            formData.ContainerType = containerType;
            formData.FormDefinition = null;
            formData.FormMarkupProvider = formMarkupProvider;
            formData.Bindings = bindings;
            formData.BindingsValidationRules = bindingsValidationRules;
        }

 

        public FlowControllerServicesContainer GetFlowServicesContainer(Guid instanceId)
        {
            throw new Exception("The method or operation is not implemented.");
        }

        public void DeliverCustomToolbarDefinition(Guid instanceId, string customToolbarDefinition)
        {
            if (string.IsNullOrEmpty(customToolbarDefinition) == true) throw new ArgumentNullException("customToolbarDefinition");
            FormData formData;

            if (WorkflowFacade.TryGetFormData(instanceId, out formData) == false)
            {
                formData = new FormData();
                WorkflowFacade.AddFormData(instanceId, formData);
            }

            formData.CustomToolbarDefinition = customToolbarDefinition;
        }

        public void DeliverCustomToolbarDefinition(Guid instanceId, IFormMarkupProvider customToolbarMarkupProvider)
        {
            FormData formData;

            if (WorkflowFacade.TryGetFormData(instanceId, out formData) == false)
            {
                formData = new FormData();
                WorkflowFacade.AddFormData(instanceId, formData);
            }

            formData.CustomToolbarMarkupProvider = customToolbarMarkupProvider;
        }

    }
}
