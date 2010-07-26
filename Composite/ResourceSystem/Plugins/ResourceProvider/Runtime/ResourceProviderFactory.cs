using Composite.ConfigurationSystem;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.ResourceSystem.Plugins.ResourceProvider.Runtime
{
    internal sealed class ResourceProviderFactory : NameTypeFactoryBase<IResourceProvider>
	{
        public ResourceProviderFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
	}
}
