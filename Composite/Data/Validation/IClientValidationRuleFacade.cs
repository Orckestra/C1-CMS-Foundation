using System;
using System.Collections.Generic;
using Composite.Data.Validation.ClientValidationRules;


namespace Composite.Data.Validation
{
	internal interface IClientValidationRuleFacade
	{
        List<ClientValidationRule> GetClientValidationRules(Type type, string propertyName);
	}
}
