using Composite.Actions;
using Composite.ConsoleEventSystem;
using Composite.Elements;
using Composite.Security;
using Composite.Tasks;


namespace Composite.WebClient.FlowMediators
{
    public sealed class ActionExecutionService : IActionExecutionService
    {
        public ActionExecutionService(string elementProviderName, string consoleId)
        {
            this.ElementProviderName = elementProviderName;
            this.ConsoleId = consoleId;
        }

        private string ElementProviderName { get; set; }
        private string ConsoleId { get; set; }

        public void Execute(EntityToken entityToken, ActionToken actionToken, TaskManagerEvent taskManagerEvent)
        {
            FlowControllerServicesContainer flowServicesContainer = new FlowControllerServicesContainer();
            flowServicesContainer.AddService(new ManagementConsoleMessageService(this.ConsoleId));
            flowServicesContainer.AddService(new ElementDataExchangeService(this.ElementProviderName));
            flowServicesContainer.AddService(this);

            FlowToken flowToken = ActionExecutorFacade.Execute(entityToken, actionToken, flowServicesContainer, taskManagerEvent);

            IFlowUiDefinition uiDefinition = FlowControllerFacade.GetCurrentUiDefinition(flowToken, flowServicesContainer);

            ActionResult result = new ActionResult();

            if (typeof(FlowUiDefinitionBase).IsAssignableFrom(uiDefinition.GetType()) == true)
            {
                string serializedEntityToken = EntityTokenSerializer.Serialize(entityToken, true);
                ViewTransitionHelper.HandleNew(this.ConsoleId, this.ElementProviderName, serializedEntityToken, flowToken, (FlowUiDefinitionBase)uiDefinition);
            }
        }
    }
}
