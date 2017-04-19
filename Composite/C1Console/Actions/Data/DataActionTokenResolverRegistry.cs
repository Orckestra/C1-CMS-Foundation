using Microsoft.Extensions.DependencyInjection;

namespace Composite.C1Console.Actions.Data
{
    internal static class DataActionTokenResolverRegistry
    {
        internal static void AddDataActionTokenResolver(this IServiceCollection serviceCollection)
        {
            serviceCollection.Add(ServiceDescriptor.Singleton(new DataActionTokenResolver()));
        }
    }
}
