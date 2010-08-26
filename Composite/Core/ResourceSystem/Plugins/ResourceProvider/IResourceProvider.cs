using Composite.Core.ResourceSystem.Plugins.ResourceProvider.Runtime;


using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.ResourceSystem.Plugins.ResourceProvider
{
    [CustomFactory(typeof(ResourceProviderCustomFactory))]
    [ConfigurationNameMapper(typeof(ResourceProviderDefaultNameRetriever))]
	internal interface IResourceProvider
	{
	}
}
