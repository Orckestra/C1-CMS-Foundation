using Composite.Security;
using Composite.Collections;


namespace Composite.StandardPlugins.Elements.ElementProviders.BaseFunctionProviderElementProvider
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
