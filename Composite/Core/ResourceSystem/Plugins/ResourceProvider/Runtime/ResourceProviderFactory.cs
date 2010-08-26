using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.ResourceSystem.Plugins.ResourceProvider.Runtime
{
    internal sealed class ResourceProviderFactory : NameTypeFactoryBase<IResourceProvider>
	{
        public ResourceProviderFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
	}
}
