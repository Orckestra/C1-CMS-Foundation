using System;
using System.Collections.Generic;
using Composite.C1Console.Elements;


namespace Composite.Data.ProcessControlled
{
    /// <summary>    
    /// Providers element actions for data types that have attributes inherited from <see cref="Composite.Data.ProcessControllerTypeAttribute"/>
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public interface IProcessController
	{
        /// <exclude />
        List<ElementAction> GetActions(IData data, Type elementProviderType);
	}
}
