using System;
using System.Configuration;
using Composite.Core.Collections.Generic;
using Composite.Core.Extensions;
using Composite.Core.PageTemplates.Plugins.Runtime;
using Composite.C1Console.Events;

namespace Composite.Core.PageTemplates.Foundation.PluginFacade
{
    internal static class PageTemplateProviderPluginFacade
    {
        private static readonly ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);

        static PageTemplateProviderPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => Flush());
        }

        public static IPageTemplateProvider GetProvider(string providerName) {
            var resources  = _resourceLocker;

            IPageTemplateProvider result = resources.Resources.ProviderCache[providerName];

            if (result == null)
            {
                using (resources.Locker)
                {
                    result = resources.Resources.ProviderCache[providerName];
                    if (result == null)
                    {
                        result = resources.Resources.Factory.Create(providerName);
                        resources.Resources.ProviderCache.Add(providerName, result);
                    }
                }
            }

            return result;
        }


        internal static void Flush()
        {
            _resourceLocker.ResetInitialization();
        }


        private static void HandleConfigurationError(Exception ex)
        {
            Flush();

            const string sectionName = PageTemplateProviderSettings.SectionName;

            throw new ConfigurationErrorsException(
                "Failed to load the configuration section '{0}' from the configuration.".FormatWith(sectionName), 
                ex);
        }      


        private sealed class Resources
        {
            public PageTemplateProviderFactory Factory { get; set; }
            public Hashtable<string, IPageTemplateProvider> ProviderCache { get; set; }

            public static void Initialize(Resources resources)
            {
                try
                {
                    resources.Factory = new PageTemplateProviderFactory();
                }
                catch (NullReferenceException ex)
                {
                    HandleConfigurationError(ex);
                }
                catch (ConfigurationErrorsException ex)
                {
                    HandleConfigurationError(ex);
                }

                resources.ProviderCache = new Hashtable<string, IPageTemplateProvider>();
            }
        }
    }
}
