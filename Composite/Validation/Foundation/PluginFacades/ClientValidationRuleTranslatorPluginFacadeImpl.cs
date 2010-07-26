using System;
using System.Collections.Generic;
using System.Configuration;
using Composite.Collections.Generic;
using Composite.Validation.ClientValidationRules;
using Composite.Validation.Plugins.ClientValidationRuleTranslator;
using Composite.Validation.Plugins.ClientValidationRuleTranslator.Runtime;


namespace Composite.Validation.Foundation.PluginFacades
{
    internal sealed class ClientValidationRuleTranslatorPluginFacadeImpl : IClientValidationRuleTranslatorPluginFacade
    {
        private ResourceLocker<Resources> _resourceLocker;


        public ClientValidationRuleTranslatorPluginFacadeImpl()
        {
            _resourceLocker = new ResourceLocker<Resources>(new Resources { Owner = this }, Resources.Initialize);
        }


        public IEnumerable<Type> GetSupportedAttributeTypes(string translatorName)
        {
            if (string.IsNullOrEmpty(translatorName) == true) throw new ArgumentNullException("translatorName");

                using (_resourceLocker.ReadLocker)
                {
                    IClientValidationRuleTranslator provider = GetClientValidationRuleTranslator(translatorName);

                    return provider.GetSupportedAttributeTypes();
                }
        }



        public ClientValidationRule Translate(string translatorName, Attribute attribute)
        {
            if (string.IsNullOrEmpty(translatorName) == true) throw new ArgumentNullException("translatorName");
            if (attribute == null) throw new ArgumentNullException("attribute");

                using (_resourceLocker.ReadLocker)
                {
                    IClientValidationRuleTranslator provider = GetClientValidationRuleTranslator(translatorName);

                    return provider.Translate(attribute);
                }
        }



        public void OnFlush()
        {
            _resourceLocker.ResetInitialization();
        }



        private IClientValidationRuleTranslator GetClientValidationRuleTranslator(string providerName)
        {
            using (_resourceLocker.Locker)
            {
                IClientValidationRuleTranslator provider;

                if (_resourceLocker.Resources.TranslatorCache.TryGetValue(providerName, out provider) == false)
                {
                    try
                    {
                        provider = _resourceLocker.Resources.Factory.Create(providerName);

                        _resourceLocker.Resources.TranslatorCache.Add(providerName, provider);
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
        }



        private void HandleConfigurationError(Exception ex)
        {
            OnFlush();

            throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration.", ClientValidationRuleTranslatorSettings.SectionName), ex);
        }



        private sealed class Resources
        {
            public ClientValidationRuleTranslatorFactory Factory { get; set; }
            public Dictionary<string, IClientValidationRuleTranslator> TranslatorCache { get; set; }
            public ClientValidationRuleTranslatorPluginFacadeImpl Owner { get; set; }

            public static void Initialize(Resources resources)
            {
                try
                {
                    resources.Factory = new ClientValidationRuleTranslatorFactory();
                }
                catch (NullReferenceException ex)
                {
                    resources.Owner.HandleConfigurationError(ex);
                }
                catch (ConfigurationErrorsException ex)
                {
                    resources.Owner.HandleConfigurationError(ex);
                }

                resources.TranslatorCache = new Dictionary<string, IClientValidationRuleTranslator>();
            }
        }
    }
}
