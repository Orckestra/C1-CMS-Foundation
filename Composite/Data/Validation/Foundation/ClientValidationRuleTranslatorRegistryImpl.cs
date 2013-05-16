using System;
using System.Collections.Generic;
using System.Configuration;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.Data.Validation.Foundation.PluginFacades;
using Composite.Data.Validation.Plugins.ClientValidationRuleTranslator;
using Composite.Data.Validation.Plugins.ClientValidationRuleTranslator.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Data.Validation.Foundation
{
    internal class ClientValidationRuleTranslatorRegistryImpl : IClientValidationRuleTranslatorRegistry
    {
        private ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);



        public string GetTranslatorName(Type attributeType)
        {
            if (attributeType == null) throw new ArgumentNullException("attributeType");

            using (_resourceLocker.Locker)
            {
                string name = null;

                _resourceLocker.Resources.AttributeTypeToTranslatorName.TryGetValue(attributeType, out name);

                return name;
            }
        }



        public void OnFlush()
        {
            _resourceLocker.ResetInitialization();
        }



        private sealed class Resources
        {
            public Dictionary<Type, string> AttributeTypeToTranslatorName { get; set; }

            public static void Initialize(Resources resources)
            {
                resources.AttributeTypeToTranslatorName = new Dictionary<Type, string>();

                if (ConfigurationServices.ConfigurationSource == null) throw new ConfigurationErrorsException(string.Format("No configuration source specified"));

                ClientValidationRuleTranslatorSettings settings = ConfigurationServices.ConfigurationSource.GetSection(ClientValidationRuleTranslatorSettings.SectionName) as ClientValidationRuleTranslatorSettings;
                if (settings == null) throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration.", ClientValidationRuleTranslatorSettings.SectionName));

                foreach (ClientValidationRuleTranslatorData data in settings.ClientValidationRuleTranslatorPlugins)
                {
                    IEnumerable<Type> types = ClientValidationRuleTranslatorPluginFacade.GetSupportedAttributeTypes(data.Name);

                    foreach (Type type in types)
                    {
                        if (resources.AttributeTypeToTranslatorName.ContainsKey(type)) throw new InvalidOperationException(string.Format("The attribute type '{0}' is already handle by a nother translator", type));
                        if (typeof(ValidatorAttribute).IsAssignableFrom(type) == false) throw new InvalidOperationException(string.Format("The type '{0}' is not an {1}", type, typeof(ValidatorAttribute)));

                        resources.AttributeTypeToTranslatorName.Add(type, data.Name);
                    }
                }
            }
        }
    }
}
