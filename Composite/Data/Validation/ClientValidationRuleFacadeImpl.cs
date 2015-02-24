using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.Core.Types;
using Composite.Data.Validation.ClientValidationRules;
using Composite.Data.Validation.Foundation;
using Composite.Data.Validation.Foundation.PluginFacades;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Data.Validation
{
    internal sealed class ClientValidationRuleFacadeImpl : IClientValidationRuleFacade
    {
        public List<ClientValidationRule> GetClientValidationRules(Type type, string propertyName)
        {
            Verify.ArgumentNotNull(type, "type");
            Verify.ArgumentNotNullOrEmpty(propertyName, "propertyName");

            PropertyInfo propertyInfo = type.GetProperty(propertyName);

            Verify.IsNotNull(propertyInfo, "The property named '{0}' not found on the type '{1}'", propertyName, type);

            List<ValidatorAttribute> attributes = propertyInfo.GetCustomAttributesRecursively<ValidatorAttribute>().ToList();

            var rules = new List<ClientValidationRule>();
            foreach (ValidatorAttribute attribute in attributes)
            {
                string translatorName = ClientValidationRuleTranslatorRegistry.GetTranslatorName(attribute.GetType());

                if (translatorName != null)
                {
                    ClientValidationRule rule = ClientValidationRuleTranslatorPluginFacade.Translate(translatorName, attribute);

                    rules.Add(rule);
                }
            }

            return rules;
        }
    }
}
