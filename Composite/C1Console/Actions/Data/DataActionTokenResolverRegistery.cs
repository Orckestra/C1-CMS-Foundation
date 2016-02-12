using Microsoft.Extensions.DependencyInjection;

namespace Composite.C1Console.Actions.Data
{
    /// <exclude />
    public static class DataActionTokenResolverRegistery
    {
        internal static void Register(IServiceCollection serviceCollection)
        {
            serviceCollection.Add(ServiceDescriptor.Instance(typeof(DataActionTokenResolver), new DataActionTokenResolver()));
        }
    }
}
