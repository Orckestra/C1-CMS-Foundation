using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using Composite.Core.Configuration;
using Composite.Core.ResourceSystem.Plugins.ResourceProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;

namespace Composite.Plugins.ResourceSystem.AggregationLocalizationProvider
{
    /// <summary>
    /// ILocalizationProvider that aggrages multiple IStringResourceProviders. To be used for backward compatibility.
    /// </summary>
    [ConfigurationElementType(typeof(AggregationLocalizationProviderData))]
    internal class AggregationLocalizationProvider: ILocalizationProvider
    {
        private readonly Dictionary<string, IStringResourceProvider> _providers;
        private CultureInfo[] _supportedCultures;

        public AggregationLocalizationProvider(Dictionary<string, IStringResourceProvider> providers)
        {
            _providers = providers;
        }

        public IEnumerable<string> GetSections()
        {
            return _providers.Keys;
        }

        public string GetString(string section, string stringId, CultureInfo cultureInfo)
        {
            IStringResourceProvider stringResourceProvider;

            if (!_providers.TryGetValue(section, out stringResourceProvider))
            {
                return null;
            }

            return stringResourceProvider.GetStringValue(stringId, cultureInfo);
        }

        public IDictionary<string, string> GetAllStrings(string section, CultureInfo cultureInfo)
        {
            IStringResourceProvider stringResourceProvider;

            if (!_providers.TryGetValue(section, out stringResourceProvider))
            {
                return null;
            }

            return stringResourceProvider.GetAllStrings(cultureInfo);
        }

        public IEnumerable<CultureInfo> GetSupportedCultures()
        { 
            if(_supportedCultures == null)
            {
                var result = new List<CultureInfo>();

                foreach(var provider in _providers.Values)
                {
                    result.AddRange(provider.GetSupportedCultures());
                }

                _supportedCultures = result.Distinct().ToArray();
            }

            return _supportedCultures;
        }


        #region Configuration

        [Assembler(typeof(AggregationLocalizationProviderAssembler))]
        internal sealed class AggregationLocalizationProviderData : ResourceProviderData
        {
            private const string _providersProperty = "Providers";
            [ConfigurationProperty(_providersProperty)]
            public NameTypeManagerTypeConfigurationElementCollection<ResourceProviderData> Providers
            {
                get
                {
                    return (NameTypeManagerTypeConfigurationElementCollection<ResourceProviderData>)base[_providersProperty];
                }
            }
        }

        internal sealed class AggregationLocalizationProviderAssembler : IAssembler<IResourceProvider, ResourceProviderData>
        {
            public IResourceProvider Assemble(IBuilderContext context, ResourceProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
            {
                var data = (AggregationLocalizationProviderData)objectConfiguration;

                var stringResourceProviders = new Dictionary<string, IStringResourceProvider>();

                // TODO: rewrite using proper Object builder API
                foreach(var configRecord in data.Providers)
                {
                    var type = configRecord.Type;
                    var configTypeAttr = type.GetCustomAttributes(typeof (ConfigurationElementTypeAttribute), true).FirstOrDefault() as ConfigurationElementTypeAttribute;
                    Verify.IsNotNull(configTypeAttr, "Attribute not defined: " + typeof(ConfigurationElementTypeAttribute).FullName);

                    Type configType = configTypeAttr.ConfigurationType;
                    var assemblerAttr = configType.GetCustomAttributes(typeof(AssemblerAttribute), true).FirstOrDefault() as AssemblerAttribute;
                    Verify.IsNotNull(configTypeAttr, "Attribute not defined: " + typeof(AssemblerAttribute).FullName);

                    var assemblerType = assemblerAttr.AssemblerType;

                    var assembler = assemblerType.GetConstructor(new Type[0]).Invoke(new object[0]) as IAssembler<IResourceProvider, ResourceProviderData>;

                    IResourceProvider resourceProvider = assembler.Assemble(context, configRecord, configurationSource, reflectionCache);
                    Verify.That(resourceProvider is IStringResourceProvider, "Provider should inherit " + typeof(IStringResourceProvider).FullName);

                    stringResourceProviders.Add(configRecord.Name, resourceProvider as IStringResourceProvider);
                }

                return new AggregationLocalizationProvider(stringResourceProviders);
            }
        }

        #endregion Configuration
    }
}
