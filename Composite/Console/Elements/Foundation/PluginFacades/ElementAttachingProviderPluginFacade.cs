using System;
using System.Collections.Generic;
using System.Configuration;
using Composite.Core.Collections.Generic;
using Composite.C1Console.Elements.Plugins.ElementAttachingProvider;
using Composite.C1Console.Elements.Plugins.ElementAttachingProvider.Runtime;
using Composite.C1Console.Events;
using Composite.C1Console.Security;


namespace Composite.C1Console.Elements.Foundation.PluginFacades
{
    internal static class ElementAttachingProviderPluginFacade
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);


        static ElementAttachingProviderPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static bool HaveCustomChildElements(string providerName, EntityToken parentEntityToken, Dictionary<string, string> piggybag)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");

            IElementAttachingProvider elementAttachingProvider = GetElementAttachingProvider(providerName);

            bool result = elementAttachingProvider.HaveCustomChildElements(parentEntityToken, piggybag);

            return result;
        }



        public static ElementAttachingProviderResult GetAlternateElementList(string providerName, EntityToken parentEntityToken, Dictionary<string, string> piggybag)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");

            IElementAttachingProvider elementAttachingProvider = GetElementAttachingProvider(providerName);

            ElementAttachingProviderResult result = elementAttachingProvider.GetAlternateElementList(parentEntityToken, piggybag);

            return result;
        }



        public static IEnumerable<ElementAttachingProviderResult> GetAlternateElementLists(string providerName, EntityToken parentEntityToken, Dictionary<string, string> piggybag)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");

            IMultibleResultElementAttachingProvider elementAttachingProvider = (IMultibleResultElementAttachingProvider)GetElementAttachingProvider(providerName);

            IEnumerable<ElementAttachingProviderResult> result = elementAttachingProvider.GetAlternateElementLists(parentEntityToken, piggybag);

            return result;
        }



        public static IEnumerable<Element> GetChildren(string providerName, EntityToken parentEntityToken, Dictionary<string, string> piggybag)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");

            IElementAttachingProvider elementAttachingProvider = GetElementAttachingProvider(providerName);

            IEnumerable<Element> result = elementAttachingProvider.GetChildren(parentEntityToken, piggybag);

            return result;
        }



        public static bool IsMultibleResultElementAttachingProvider(string providerName)
        {
            return GetElementAttachingProvider(providerName) is IMultibleResultElementAttachingProvider;
        }



        private static IElementAttachingProvider GetElementAttachingProvider(string providerName)
        {
            IElementAttachingProvider provider;

            if (_resourceLocker.Resources.ProviderCache.TryGetValue(providerName, out provider) == false)
            {
                try
                {
                    provider = _resourceLocker.Resources.Factory.Create(providerName);

                    provider.Context = new ElementProviderContext(providerName);

                    using (_resourceLocker.Locker)
                    {
                        if (_resourceLocker.Resources.ProviderCache.ContainsKey(providerName) == false)
                        {
                            _resourceLocker.Resources.ProviderCache.Add(providerName, provider);
                        }
                    }

                }
                catch (ArgumentException ex)
                {
                    HandleConfigurationError(ex);
                }
                catch (ConfigurationErrorsException ex)
                {
                    HandleConfigurationError(ex);
                }
            }

            return provider;
        }



        private static void Flush()
        {
            _resourceLocker.ResetInitialization();
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }



        private static void HandleConfigurationError(Exception ex)
        {
            Flush();

            throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration.", ElementAttachingProviderSettings.SectionName), ex);
        }



        private sealed class Resources
        {
            public ElementAttachingProviderFactory Factory { get; set; }
            public Dictionary<string, IElementAttachingProvider> ProviderCache { get; set; }

            public static void Initialize(Resources resources)
            {
                try
                {
                    resources.Factory = new ElementAttachingProviderFactory();
                }
                catch (NullReferenceException ex)
                {
                    HandleConfigurationError(ex);
                }
                catch (ConfigurationErrorsException ex)
                {
                    HandleConfigurationError(ex);
                }

                resources.ProviderCache = new Dictionary<string, IElementAttachingProvider>();
            }
        }
    }
}
