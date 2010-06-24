using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Composite.Workflow;
using Composite.Actions;
using Composite.StandardPlugins.Elements.ElementProviders.PackageElementProvider;
using Composite.Workflow.Foundation;
using Composite.Data.Types;
using Composite.StandardPlugins.Elements.ElementProviders.PageTemplateElementProvider;

namespace Composite.Spikes.MRJ.Automation
{
    public partial class AddPageTemplate : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            WorkflowActionExecutor workflowActionExecutor = new WorkflowActionExecutor();

            FlowControllerServicesContainer flowControllerServicesContainer = new FlowControllerServicesContainer();
            flowControllerServicesContainer.AddService(new DummyManagementConsoleMessageService());
            flowControllerServicesContainer.AddService(new DummyFormFlowRenderingService());


            WorkflowFlowToken flowToken = (WorkflowFlowToken)workflowActionExecutor.Execute(
                new PageTemplateRootEntityToken(),
                new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.PageTemplateElementProvider.AddNewPageTemplateWorkflow")),
                flowControllerServicesContainer
            );

            FlowControllerFacade.GetCurrentUiDefinition(flowToken, flowControllerServicesContainer);
            FormData formData = WorkflowFacade.GetFormData(flowToken.WorkflowInstanceId);

            IPageTemplate newPageTemplate = (IPageTemplate)formData.Bindings["NewPageTemplate"];
            newPageTemplate.Title = "Hans";

            WorkflowFacade.FireFinishEvent(flowToken.WorkflowInstanceId, formData.Bindings);
            WorkflowFacade.SetFlowControllerServicesContainer(flowToken.WorkflowInstanceId, flowControllerServicesContainer);
            WorkflowFacade.RunWorkflow(flowToken.WorkflowInstanceId);
            FlowControllerFacade.GetCurrentUiDefinition(flowToken, flowControllerServicesContainer);
        }
    }
}