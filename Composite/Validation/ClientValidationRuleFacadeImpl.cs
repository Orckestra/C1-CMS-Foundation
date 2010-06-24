using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.Types;
using Composite.Validation.ClientValidationRules;
using Composite.Validation.Foundation;
using Composite.Validation.Foundation.PluginFacades;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Validation
{
    public sealed class ClientValidationRuleFacadeImpl : IClientValidationRuleFacade
    {
        public List<ClientValidationRule> GetClientValidationRules(object objectForValidation, string propertyName)
        {
            if (objectForValidation == null) throw new ArgumentNullException("objectForValidation");
            if (string.IsNullOrEmpty(propertyName)) throw new ArgumentNullException("propertyName");

            PropertyInfo propertyInfo = objectForValidation.GetType().GetProperty(propertyName);

            if (propertyInfo == null) throw new InvalidOperationException(string.Format("The property named '{0}' not found on the type '{1}'", propertyName, objectForValidation.GetType()));

            List<ValidatorAttribute> attributes = propertyInfo.GetCustomAttributesRecursively<ValidatorAttribute>().ToList();

            List<ClientValidationRule> rules = new List<ClientValidationRule>();
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
