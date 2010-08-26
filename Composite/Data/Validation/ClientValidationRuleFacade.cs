using System.Collections.Generic;
using Composite.Data.Validation.ClientValidationRules;


namespace Composite.Data.Validation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
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
