using System.Collections.Generic;
using Composite.Validation.ClientValidationRules;


namespace Composite.Validation
{
    public static class ClientValidationRuleFacade
    {
        private static IClientValidationRuleFacade _implementation = new ClientValidationRuleFacadeImpl();

        internal static IClientValidationRuleFacade Implementation { get { return _implementation; } set { _implementation = value; } }


        public static List<ClientValidationRule> GetClientValidationRules(object objectForValidation, string propertyName)
        {
            return _implementation.GetClientValidationRules(objectForValidation, propertyName);
        }
    }
}
