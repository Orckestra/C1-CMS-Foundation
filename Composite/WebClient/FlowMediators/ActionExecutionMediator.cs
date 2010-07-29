using Composite.Actions;
using Composite.ConsoleEventSystem;
using Composite.Elements;
using Composite.Security;


namespace Composite.WebClient.FlowMediators
{
    internal static class ActionExecutionMediator
    {
        public static void ExecuteElementAction(ElementHandle elementHandle, ActionHandle actionHandle, string consoleId)
        {
            FlowControllerServicesContainer flowServicesContainer = new FlowControllerServicesContainer();
            flowServicesContainer.AddService(new ManagementConsoleMessageService(consoleId));
            flowServicesContainer.AddService(new ElementDataExchangeService(elementHandle.ProviderName));
            flowServicesContainer.AddService(new ActionExecutionService(elementHandle.ProviderName, consoleId));
            flowServicesContainer.AddService(new ElementInformationService(elementHandle));

            FlowToken flowToken = ActionExecutorFacade.Execute(elementHandle.EntityToken, actionHandle.ActionToken, flowServicesContainer);

            IFlowUiDefinition uiDefinition = FlowControllerFacade.GetCurrentUiDefinition(flowToken, flowServicesContainer);

            ActionResult result = new ActionResult();

            if (typeof(FlowUiDefinitionBase).IsAssignableFrom(uiDefinition.GetType()) == true)
            {
                string serializedEntityToken = EntityTokenSerializer.Serialize(elementHandle.EntityToken, true);
                ViewTransitionHelper.HandleNew(consoleId, elementHandle.ProviderName, serializedEntityToken, flowToken, (FlowUiDefinitionBase)uiDefinition);
            }
        }



        public static bool ExecuteElementDraggedAndDropped(ElementHandle draggedElementHandle, ElementHandle newParentdElementHandle, int dropIndex, string consoleId, bool isCopy)
        {
            FlowControllerServicesContainer flowServicesContainer = new FlowControllerServicesContainer();
            flowServicesContainer.AddService(new ManagementConsoleMessageService(consoleId));
            flowServicesContainer.AddService(new ElementDataExchangeService(draggedElementHandle.ProviderName));
            flowServicesContainer.AddService(new ActionExecutionService(draggedElementHandle.ProviderName, consoleId));

            return ElementFacade.ExecuteElementDraggedAndDropped(draggedElementHandle, newParentdElementHandle, dropIndex, isCopy, flowServicesContainer);
        }
    }
}
