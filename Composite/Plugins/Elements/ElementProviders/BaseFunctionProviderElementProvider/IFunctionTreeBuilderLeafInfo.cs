using Composite.C1Console.Security;
using Composite.Core.Collections;


namespace Composite.Plugins.Elements.ElementProviders.BaseFunctionProviderElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IFunctionTreeBuilderLeafInfo : INamespaceTreeBuilderLeafInfo
	{
        EntityToken EntityToken { get; }
	}
}
