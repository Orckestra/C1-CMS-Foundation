using Composite.Security;


namespace Composite.Actions
{
    internal interface IActionExecutor
    {
        FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer);
    }
}
