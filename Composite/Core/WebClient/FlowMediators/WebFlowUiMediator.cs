using System;
using System.Web.UI;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Elements;
using Composite.C1Console.Forms;
using Composite.C1Console.Forms.Flows;
using Composite.C1Console.Forms.WebChannel;
using Composite.Core.WebClient.FlowMediators.FormFlowRendering;
using System.Linq;
using System.Web.UI.HtmlControls;

namespace Composite.Core.WebClient.FlowMediators
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class WebFlowUiMediator
    {
        /// <exclude />
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

                var formFlowUiDefinition = flowUiDefinition as FormFlowUiDefinition;
                if (formFlowUiDefinition != null)
                {
                    uiContainerName = formFlowUiDefinition.UiContainerType.ContainerName;

                    IUiControl uiForm = FormFlowUiDefinitionRenderer.Render(consoleId, elementProviderName, flowToken, formFlowUiDefinition, WebManagementChannel.Identifier, false, flowServicesContainer);
                    IWebUiControl webForm = (IWebUiControl)uiForm;
                    webControl = webForm.BuildWebControl();

                    if (string.IsNullOrEmpty(webControl.ID)) webControl.ID = "FlowUI";

                    if (RuntimeInformation.IsTestEnvironment)
                    {
                        var testAutomationLocatorInformation = formFlowUiDefinition.MarkupProvider as ITestAutomationLocatorInformation;
                        if (testAutomationLocatorInformation != null) {
                            var htmlform = webControl.Controls.OfType<HtmlForm>().FirstOrDefault();
                            if (htmlform != null) {
                                htmlform.Attributes.Add("data-qa", testAutomationLocatorInformation.TestAutomationLocator);
                            }
                        }
                    }
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
