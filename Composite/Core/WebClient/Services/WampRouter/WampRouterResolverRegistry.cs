using Microsoft.Extensions.DependencyInjection;

namespace Composite.Core.WebClient.Services.WampRouter
{
    internal static class WampRouterResolverRegistry
    {
        internal static void Register(IServiceCollection serviceCollection)
        {
            serviceCollection.Add(ServiceDescriptor.Singleton(new WampRouter()));
        }
    }
}