using System;
using System.Collections.Generic;
using Composite.Elements;


namespace Composite.Data.ProcessControlled
{
	public interface IProcessController
	{
        List<ElementAction> GetActions(IData data, Type elementProviderType);
	}
}
