using System;
using System.Collections.Generic;
using System.Configuration;
using Composite.Collections.Generic;
using Composite.ConfigurationSystem;
using Composite.Validation.Foundation.PluginFacades;
using Composite.Validation.Plugins.ClientValidationRuleTranslator;
using Composite.Validation.Plugins.ClientValidationRuleTranslator.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Validation.Foundation
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
                        if (resources.AttributeTypeToTranslatorName.ContainsKey(type) == true) throw new InvalidOperationException(string.Format("The attribute type '{0}' is already handle by a nother translator", type));
                        if (typeof(ValidatorAttribute).IsAssignableFrom(type) == false) throw new InvalidOperationException(string.Format("The type '{0}' is not an {1}", type, typeof(ValidatorAttribute)));

                        resources.AttributeTypeToTranslatorName.Add(type, data.Name);
                    }
                }
            }
        }
    }
}
