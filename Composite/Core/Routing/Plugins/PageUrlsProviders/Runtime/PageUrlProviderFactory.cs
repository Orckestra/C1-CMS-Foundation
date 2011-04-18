using Composite.Core.Configuration;
using Composite.Core.Routing.Plugins.PageUrlsProviders;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.Core.Routing.Plugins.PageUrlsProviders.Runtime
{
    internal sealed class PageUrlProviderFactory : NameTypeFactoryBase<IPageUrlProvider>
    {
        public PageUrlProviderFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}