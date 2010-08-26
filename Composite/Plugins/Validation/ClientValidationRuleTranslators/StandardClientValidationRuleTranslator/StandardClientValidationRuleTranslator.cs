using System;
using System.Collections.Generic;
using Composite.Core.Collections.Generic;
using Composite.Data.Validation.ClientValidationRules;
using Composite.Data.Validation.Plugins.ClientValidationRuleTranslator;
using Composite.Data.Validation.Validators;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Plugins.Validation.ClientValidationRuleTranslators.StandardClientValidationRuleTranslator
{
    [ConfigurationElementType(typeof(StandardClientValidationRuleTranslatorData))]
    internal sealed class StandardClientValidationRuleTranslator : IClientValidationRuleTranslator
    {
        private List<Type> _supportedTypes = new List<Type>
            {
                typeof(RegexValidatorAttribute),
#pragma warning disable 0612
                typeof(StringLengthValidatorAttribute),
#pragma warning restore 0612
                typeof(Microsoft.Practices.EnterpriseLibrary.Validation.Validators.NotNullValidatorAttribute)
            };



        public IEnumerable<Type> GetSupportedAttributeTypes()
        {
            return new ReadOnlyList<Type>(_supportedTypes);
        }



        public ClientValidationRule Translate(Attribute attribute)
        {
            Type type = attribute.GetType();

            if (type == typeof(RegexValidatorAttribute))
            {
                return new RegexClientValidationRule((attribute as RegexValidatorAttribute).Pattern);
            }
#pragma warning disable 0612
            else if (type == typeof(StringLengthValidatorAttribute))
            {
                return new StringLengthClientValidationRule((attribute as StringLengthValidatorAttribute).LowerBound, (attribute as StringLengthValidatorAttribute).UpperBound);
            }
#pragma warning restore 0612
            else if (type == typeof(StringSizeValidatorAttribute))
            {
                return new StringLengthClientValidationRule((attribute as StringSizeValidatorAttribute).LowerBound, (attribute as StringSizeValidatorAttribute).UpperBound);
            }

            else if (type == typeof(Microsoft.Practices.EnterpriseLibrary.Validation.Validators.NotNullValidatorAttribute))
            {
                return new NotNullClientValidationRule();
            }
            else
            {
                throw new InvalidOperationException(string.Format("The attribute type '{0}' is not supported", attribute.GetType()));
            }
        }
    }



    [Assembler(typeof(NonConfigurableClientValidationRuleTranslatorAssembler))]
    internal sealed class StandardClientValidationRuleTranslatorData : ClientValidationRuleTranslatorData
    {
    }
}
