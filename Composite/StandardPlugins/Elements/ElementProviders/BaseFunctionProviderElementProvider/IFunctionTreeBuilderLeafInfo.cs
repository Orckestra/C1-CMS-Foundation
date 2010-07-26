using Composite.Security;
using Composite.Collections;


namespace Composite.StandardPlugins.Elements.ElementProviders.BaseFunctionProviderElementProvider
{
    internal interface IFunctionTreeBuilderLeafInfo : INamespaceTreeBuilderLeafInfo
	{
        EntityToken EntityToken { get; }
	}
}
