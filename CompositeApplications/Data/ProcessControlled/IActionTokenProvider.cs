using Composite.Security;


namespace Composite.Data.ProcessControlled
{
	public interface IActionTokenProvider
	{
        ActionToken GetActionToken(string actionTypeName, IData data);
	}
}
