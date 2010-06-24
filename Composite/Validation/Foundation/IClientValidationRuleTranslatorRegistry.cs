using System;


namespace Composite.Validation.Foundation
{
	internal interface IClientValidationRuleTranslatorRegistry
	{
        string GetTranslatorName(Type attributeType);
        void OnFlush();
	}
}
