using Composite.Security;


namespace Composite.Actions
{
    public interface IActionExecutor
    {
        FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer);
    }
}
