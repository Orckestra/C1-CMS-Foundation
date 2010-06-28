using Composite.Security;


namespace Composite.Actions
{
	internal interface IActionExecutorSerializedParameters : IActionExecutor
	{
        FlowToken Execute(string serializedEntityToken, string serializedActionToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer);
	}
}
