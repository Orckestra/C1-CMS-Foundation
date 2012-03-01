using Composite.C1Console.Elements.Foundation.PluginFacades;


namespace Composite.C1Console.Elements.Foundation
{
    internal static class ElementProviderLoader
    {
        public static void LoadAllProviders()
        {
            LoadAllElementProviders();
            LoadAllAttachingProviders();
        }


        private static void LoadAllElementProviders()
        {
            var rootProvider = ElementProviderPluginFacade.GetElementProvider(ElementProviderRegistry.RootElementProviderName);

            foreach (string name in ElementProviderRegistry.ElementProviderNames)
            {
                var provider = ElementProviderPluginFacade.GetElementProvider(name);
            }
        }



        private static void LoadAllAttachingProviders()
        {
            foreach (string name in ElementAttachingProviderRegistry.ElementAttachingProviderNames)
            {
                var provider = ElementAttachingProviderPluginFacade.GetElementAttachingProvider(name);
            }
        }
    }
}
