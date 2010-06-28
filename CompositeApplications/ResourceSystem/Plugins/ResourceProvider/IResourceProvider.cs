using Composite.ResourceSystem.Plugins.ResourceProvider.Runtime;


using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.ResourceSystem.Plugins.ResourceProvider
{
    [CustomFactory(typeof(ResourceProviderCustomFactory))]
    [ConfigurationNameMapper(typeof(ResourceProviderDefaultNameRetriever))]
	internal interface IResourceProvider
	{
	}
}
