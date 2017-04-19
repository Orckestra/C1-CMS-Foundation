using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Threading;
using Composite.C1Console.Events;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.ResourceSystem.Plugins.ResourceProvider;
using Composite.Core.ResourceSystem.Plugins.ResourceProvider.Runtime;


namespace Composite.Core.ResourceSystem.Foundation.PluginFacades
{
    internal static class ResourceProviderPluginFacade
    {
        const string ApplicationNameReference = "{applicationname}";

        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize, false);

        static ResourceProviderPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => Flush());
        }


        #region ILocalizationProvider methods

        private static IEnumerable<ILocalizationProvider> GetLocalizationProviders()
        {
            foreach (string localizationProviderName in ResourceProviderRegistry.LocalizationProviderNames)
            {
                yield return GetResourceProvider<ILocalizationProvider>(localizationProviderName);
            }
        }

        public static bool LocalizationSectionDefined(string section)
        {
            return GetLocalizationProviders().Any(p => p.GetSections().Contains(section));
        }


        public static IEnumerable<string> GetLocalizationSectionNames()
        {
            return GetLocalizationProviders().SelectMany(p => p.GetSections()).Distinct().ToList();
        } 

        
        public static string GetStringValue(string section, string stringId)
        {
            return GetStringValue(section, stringId, Thread.CurrentThread.CurrentUICulture);
        }


        public static string GetStringValue(string section, string stringId, CultureInfo cultureInfo)
        {
            Verify.ArgumentNotNullOrEmpty(section, "section");
            Verify.ArgumentNotNullOrEmpty(stringId, "stringId");

            foreach(var provider in GetLocalizationProviders())
            {
                var result = provider.GetString(section, stringId, cultureInfo);
                if(result != null)
                {
                    return ReplaceReferences(result);
                }
            }

            return null;
        }


        private static string ReplaceReferences(string localizedString)
        {
            if (localizedString == null) return null;

            if (localizedString.IndexOf(ApplicationNameReference, 0, StringComparison.Ordinal) > -1)
            {
                localizedString = localizedString.Replace(ApplicationNameReference, GlobalSettingsFacade.ApplicationName);
            }

            return localizedString;
        }


        public static IEnumerable<CultureInfo> GetSupportedStringCultures()
        {
            List<CultureInfo> cultures = new List<CultureInfo>();

            foreach (string providerName in ResourceProviderRegistry.LocalizationProviderNames)
            {
                ILocalizationProvider provider = GetResourceProvider<ILocalizationProvider>(providerName);

                cultures.AddRange(provider.GetSupportedCultures());
            }

            return cultures.Distinct();
        }



        public static IDictionary<string, string> GetAllStrings(string section)
        {
            Verify.ArgumentNotNullOrEmpty(section, "section");

            var currentCulture = Thread.CurrentThread.CurrentUICulture;

            IDictionary<string, string> result = null;

            foreach (var localizationProvider in GetLocalizationProviders())
            {
                var strings = localizationProvider.GetAllStrings(section, currentCulture);
                if (strings == null) continue;

                result = result ?? new Dictionary<string, string>();
                foreach(var kvp in strings)
                {
                    if(!result.ContainsKey(kvp.Key))
                    {
                        result.Add(kvp.Key, ReplaceReferences(kvp.Value));
                    }
                }
            }

            return result;
        }


        #endregion



        public static Type GetProviderType(string providerName)
        {
            IResourceProvider resourceProvider = GetResourceProvider(providerName);

            return resourceProvider.GetType();
        }



        private static T GetResourceProvider<T>(string providerName)
            where T : class, IResourceProvider
        {
            T provider = GetResourceProvider(providerName) as T;

            Verify.IsNotNull(provider, "The Resource Provider identified by the specified provider name ('{0}') does not implement the interface {1}"
                                       .FormatWith(providerName, typeof(T)));

            return provider;
        }



        private static IResourceProvider GetResourceProvider(string providerName)
        {
            IResourceProvider provider;

            if (_resourceLocker.Resources.ProviderCache.TryGetValue(providerName, out provider) == false)
            {
                try
                {
                    provider = _resourceLocker.Resources.Factory.Create(providerName);

                    using (_resourceLocker.Locker)
                    {
                        if (_resourceLocker.Resources.ProviderCache.ContainsKey(providerName) == false)
                            _resourceLocker.Resources.ProviderCache.Add(providerName, provider);
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


        private static void HandleConfigurationError(Exception ex)
        {
            Flush();

            throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration.", ResourceProviderSettings.SectionName), ex);
        }



        private sealed class Resources
        {
            public ResourceProviderFactory Factory { get; set; }
            public Dictionary<string, IResourceProvider> ProviderCache { get; set; }

            public static void Initialize(Resources resources)
            {
                try
                {
                    resources.Factory = new ResourceProviderFactory();
                }
                catch (NullReferenceException ex)
                {
                    HandleConfigurationError(ex);
                }
                catch (ConfigurationErrorsException ex)
                {
                    HandleConfigurationError(ex);
                }

                resources.ProviderCache = new Dictionary<string, IResourceProvider>();
            }
        }
    }
}
