using System;
using System.Web.UI;
using Composite.Actions;
using Composite.ConsoleEventSystem;
using Composite.Elements;
using Composite.Forms;
using Composite.Forms.Flows;
using Composite.Forms.WebChannel;
using Composite.WebClient.FlowMediators.FormFlowRendering;


namespace Composite.WebClient.FlowMediators
{
    public static class WebFlowUiMediator
    {
        public static Control GetFlowUi(FlowHandle flowHandle, string elementProviderName, string consoleId, out string uiContainerName)
        {
            uiContainerName = null;

            try
            {
                Control webControl = null;
                string viewId = ViewTransitionHelper.MakeViewId(flowHandle.Serialize());

                FlowControllerServicesContainer flowServicesContainer = new FlowControllerServicesContainer();
                flowServicesContainer.AddService(new ActionExecutionService(elementProviderName, consoleId));
                flowServicesContainer.AddService(new ManagementConsoleMessageService(consoleId, viewId));
                flowServicesContainer.AddService(new ElementDataExchangeService(elementProviderName));

                FlowToken flowToken = flowHandle.FlowToken;
                IFlowUiDefinition flowUiDefinition = FlowControllerFacade.GetCurrentUiDefinition(flowToken, flowServicesContainer);

                if (typeof(FormFlowUiDefinition).IsAssignableFrom(flowUiDefinition.GetType()))
                {
                    FormFlowUiDefinition formFlowUiDefinition = (FormFlowUiDefinition)flowUiDefinition;
                    uiContainerName = formFlowUiDefinition.UiContainerType.ContainerName;

                    IUiControl uiForm = FormFlowUiDefinitionRenderer.Render(consoleId, elementProviderName, flowToken, formFlowUiDefinition, WebManagementChannel.Identifier, false, flowServicesContainer);
                    IWebUiControl webForm = (IWebUiControl)uiForm;
                    webControl = webForm.BuildWebControl();

                    if (string.IsNullOrEmpty(webControl.ID) == true) webControl.ID = "FlowUI";
                }

                return webControl;
            }
            catch (Exception ex)
            {
                ErrorServices.DocumentAdministrativeError(ex);
                ErrorServices.RedirectUserToErrorPage(uiContainerName, ex);
            }

            return new LiteralControl("ERROR");
        }
    }
}
