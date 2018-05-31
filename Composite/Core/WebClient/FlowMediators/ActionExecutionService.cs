using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.C1Console.Tasks;


namespace Composite.Core.WebClient.FlowMediators
{
    internal sealed class ActionExecutionService : IActionExecutionService
    {
        public ActionExecutionService(string elementProviderName, string consoleId)
        {
            this.ElementProviderName = elementProviderName;
            this.ConsoleId = consoleId;
        }

        private string ElementProviderName { get; }
        private string ConsoleId { get; }

        public void Execute(EntityToken entityToken, ActionToken actionToken, TaskManagerEvent taskManagerEvent)
        {
            var flowServicesContainer = new FlowControllerServicesContainer(
                new ManagementConsoleMessageService(this.ConsoleId),
                new ElementDataExchangeService(this.ElementProviderName),
                this
            );

            FlowToken flowToken = ActionExecutorFacade.Execute(entityToken, actionToken, flowServicesContainer, taskManagerEvent);

            IFlowUiDefinition uiDefinition = FlowControllerFacade.GetCurrentUiDefinition(flowToken, flowServicesContainer);

            if (uiDefinition is FlowUiDefinitionBase flowUiDefinition)
            {
                string serializedEntityToken = EntityTokenSerializer.Serialize(entityToken, true);
                ViewTransitionHelper.HandleNew(this.ConsoleId, this.ElementProviderName, serializedEntityToken, flowToken, flowUiDefinition);
            }
        }
    }
}
