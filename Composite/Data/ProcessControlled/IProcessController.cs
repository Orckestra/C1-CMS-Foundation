using System;
using System.Collections.Generic;
using Composite.C1Console.Elements;


namespace Composite.Data.ProcessControlled
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public interface IProcessController
	{
        List<ElementAction> GetActions(IData data, Type elementProviderType);
	}
}
