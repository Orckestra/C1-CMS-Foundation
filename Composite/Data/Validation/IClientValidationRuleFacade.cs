using System.Collections.Generic;
using Composite.Data.Validation.ClientValidationRules;


namespace Composite.Data.Validation
{
	internal interface IClientValidationRuleFacade
	{
        List<ClientValidationRule> GetClientValidationRules(object objectForValidation, string propertyName);
	}
}
