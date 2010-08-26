using System;


namespace Composite.Data.Validation.Foundation
{
	internal interface IClientValidationRuleTranslatorRegistry
	{
        string GetTranslatorName(Type attributeType);
        void OnFlush();
	}
}
