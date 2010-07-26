using Composite.ConfigurationSystem;
using Composite.Functions.Plugins.XslExtensionsProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.Functions.Foundation.PluginFacades.Runtime
{
    internal sealed class XslExtensionsProviderFactory : NameTypeFactoryBase<IXslExtensionsProvider>
    {
        public XslExtensionsProviderFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
	}
}
