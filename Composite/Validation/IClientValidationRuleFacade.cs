using System.Collections.Generic;
using Composite.Validation.ClientValidationRules;


namespace Composite.Validation
{
	internal interface IClientValidationRuleFacade
	{
        List<ClientValidationRule> GetClientValidationRules(object objectForValidation, string propertyName);
	}
}
