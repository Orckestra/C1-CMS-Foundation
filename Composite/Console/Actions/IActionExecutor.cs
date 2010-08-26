using Composite.C1Console.Security;


namespace Composite.C1Console.Actions
{
    internal interface IActionExecutor
    {
        FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer);
    }
}
