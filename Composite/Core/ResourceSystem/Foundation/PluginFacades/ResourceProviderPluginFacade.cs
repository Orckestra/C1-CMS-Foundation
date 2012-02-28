using System;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.Globalization;
using System.Linq;
using Composite.Core.Collections.Generic;
using Composite.C1Console.Events;
using Composite.Core.ResourceSystem.Plugins.ResourceProvider;
using Composite.Core.ResourceSystem.Plugins.ResourceProvider.Runtime;
using Composite.C1Console.Users;


namespace Composite.Core.ResourceSystem.Foundation.PluginFacades
{
    internal static class ResourceProviderPluginFacade
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize, false);

        static ResourceProviderPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }


        #region IIconResourceProvider methods
        public static IEnumerable<string> GetIconNames(string providerName)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");

            IIconResourceProvider provider = GetResourceProvider<IIconResourceProvider>(providerName);

            return provider.GetIconNames();
        }



        public static Bitmap GetIcon(string providerName, string name, IconSize iconSize, CultureInfo cultureInfo)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");
            if (string.IsNullOrEmpty(name) == true) throw new ArgumentNullException("stringId");
            if (cultureInfo == null) throw new ArgumentNullException("cultureInfo");

            IIconResourceProvider provider = GetResourceProvider<IIconResourceProvider>(providerName);

            return provider.GetIcon(name, iconSize, cultureInfo);
        }
        #endregion



        #region IStringResourceProvider methods
        public static string GetStringValue(string providerName, string stringId)
        {
            return GetStringValue(providerName, stringId, UserSettings.C1ConsoleUiLanguage);
        }

        public static string GetStringValue(string providerName, string stringId, CultureInfo cultureInfo)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");
            Verify.ArgumentNotNullOrEmpty(stringId, "stringId");

            var provider = GetResourceProvider<IStringResourceProvider>(providerName);

            return provider.GetStringValue(stringId, cultureInfo);
        }



        public static IEnumerable<CultureInfo> GetSupportedStringCultures()
        {
            List<CultureInfo> cultures = new List<CultureInfo>();

            foreach (string providerName in ResourceProviderRegistry.StringResourceProviderNames)
            {
                IStringResourceProvider provider = GetResourceProvider<IStringResourceProvider>(providerName);

                cultures.AddRange(provider.GetSupportedCultures());
            }

            return cultures.Distinct();
        }



        public static IDictionary<string, string> GetAllStrings(string providerName)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");

            IStringResourceProvider provider = GetResourceProvider<IStringResourceProvider>(providerName);

            return provider.GetAllStrings(UserSettings.C1ConsoleUiLanguage);
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
            T provider;

            provider = GetResourceProvider(providerName) as T;

            if (provider == null) throw new ArgumentException(string.Format("The Resource Provider identified by the specified provider name ('{0}') does not implement the interface {1}", providerName, typeof(T)));

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



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
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
