using Composite.C1Console.Security;


namespace Composite.C1Console.Actions
{
	internal interface IActionExecutorSerializedParameters : IActionExecutor
	{
        FlowToken Execute(string serializedEntityToken, string serializedActionToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer);
	}
}
