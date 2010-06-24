using Composite.Data.ProcessControlled.ProcessControllers.GenericLocalizeProcessController;


namespace Composite.Data.ProcessControlled
{    
	public interface ILocalizeProcessController : IProcessController
	{
        bool OnAfterBuildNew(IData data);
	}
}
