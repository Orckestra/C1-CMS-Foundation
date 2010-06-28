using Composite.Security;


namespace Composite.Data.ProcessControlled
{
	internal interface IActionTokenProvider
	{
        ActionToken GetActionToken(string actionTypeName, IData data);
	}
}
