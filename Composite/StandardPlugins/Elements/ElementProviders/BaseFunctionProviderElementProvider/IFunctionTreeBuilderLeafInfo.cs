using Composite.Security;
using Composite.Collections;


namespace Composite.StandardPlugins.Elements.ElementProviders.BaseFunctionProviderElementProvider
{
    public interface IFunctionTreeBuilderLeafInfo : INamespaceTreeBuilderLeafInfo
	{
        EntityToken EntityToken { get; }
	}
}
