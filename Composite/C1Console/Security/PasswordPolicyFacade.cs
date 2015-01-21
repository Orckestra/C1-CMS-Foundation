using System.Collections.Generic;
using Composite.C1Console.Security.Foundation.PluginFacades;

namespace Composite.C1Console.Security
{
    /// <summary>
    /// Facade for calling password rule plugings.
    /// </summary>
    public static class PasswordPolicyFacade
    {
        /// <summary>
        /// Returns password expiration time in days. <value>0</value> will be returned if no expiration set.
        /// </summary>
        public static int PasswordExpirationTimeInDays
        {
            get { return PasswordRulePluginFacade.PasswordExpirationTimeInDays; }
        }

        /// <summary>
        /// Validates the password against the rules defined in the configuration.
        /// </summary>
        /// <param name="password"></param>
        /// <param name="validationMessages"></param>
        /// <returns></returns>
        public static bool ValidatePassword(string password, out IList<string> validationMessages)
        {
            return PasswordRulePluginFacade.ValidatePassword(password, out validationMessages);
        }
    }
}
