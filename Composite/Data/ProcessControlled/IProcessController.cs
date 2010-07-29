using System;
using System.Collections.Generic;
using Composite.Elements;


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
