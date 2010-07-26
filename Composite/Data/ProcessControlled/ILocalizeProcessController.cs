using Composite.Data.ProcessControlled.ProcessControllers.GenericLocalizeProcessController;


namespace Composite.Data.ProcessControlled
{    
	internal interface ILocalizeProcessController : IProcessController
	{
        bool OnAfterBuildNew(IData data);
	}
}
