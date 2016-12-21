using Composite.Core.Application;
using Microsoft.Extensions.DependencyInjection;

namespace Composite.Core.WebClient.Services.WampRouter
{
    [ApplicationStartup]
    internal class WampRouterResolverRegistry
    {
        public void ConfigureServices(IServiceCollection serviceCollection)
        {
            serviceCollection.Add(ServiceDescriptor.Singleton(new WampRouter()));
        }
    }
}