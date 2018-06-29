using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;


namespace Composite.Core.WebClient.FlowMediators
{
    internal static class ActionExecutionMediator
    {
        public static void ExecuteElementAction(ElementHandle elementHandle, ActionHandle actionHandle, string consoleId)
        {
            var flowServicesContainer = new FlowControllerServicesContainer(
                new ManagementConsoleMessageService(consoleId),
                new ElementDataExchangeService(elementHandle.ProviderName),
                new ActionExecutionService(elementHandle.ProviderName, consoleId),
                new ElementInformationService(elementHandle)
            );

            FlowToken flowToken = ActionExecutorFacade.Execute(elementHandle.EntityToken, actionHandle.ActionToken, flowServicesContainer);

            IFlowUiDefinition uiDefinition = FlowControllerFacade.GetCurrentUiDefinition(flowToken, flowServicesContainer);

            if (uiDefinition is FlowUiDefinitionBase flowUiDefinition)
            {
                string serializedEntityToken = EntityTokenSerializer.Serialize(elementHandle.EntityToken, true);
                ViewTransitionHelper.HandleNew(consoleId, elementHandle.ProviderName, serializedEntityToken, flowToken, flowUiDefinition);
            }
        }



        public static bool ExecuteElementDraggedAndDropped(ElementHandle draggedElementHandle, ElementHandle newParentdElementHandle, int dropIndex, string consoleId, bool isCopy)
        {
            var flowServicesContainer = new FlowControllerServicesContainer(
                new ManagementConsoleMessageService(consoleId),
                new ElementDataExchangeService(draggedElementHandle.ProviderName),
                new ActionExecutionService(draggedElementHandle.ProviderName, consoleId)
            );

            return ElementFacade.ExecuteElementDraggedAndDropped(draggedElementHandle, newParentdElementHandle, dropIndex, isCopy, flowServicesContainer);
        }
    }
}
