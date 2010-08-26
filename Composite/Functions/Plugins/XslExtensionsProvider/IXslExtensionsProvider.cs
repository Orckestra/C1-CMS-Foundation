using System.Collections.Generic;
using Composite.Functions.Plugins.FunctionProvider.Runtime;
using Composite.Functions.Plugins.XslExtensionsProvider.Runtime;
using Composite.Core.Types;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.Functions.Plugins.XslExtensionsProvider
{
    [CustomFactory(typeof(XslExtensionsProviderCustomFactory))]
    [ConfigurationNameMapper(typeof(FunctionProviderDefaultNameRetriever))]
	internal interface IXslExtensionsProvider
	{
	    List<Pair<string, object>> CreateExtensions();
	}
}
