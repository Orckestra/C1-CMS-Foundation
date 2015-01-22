using System.Collections.Generic;
using Composite.C1Console.Security.Foundation.PluginFacades;
using Composite.Data.Types;

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
        /// 
        /// </summary>
        public static int PasswordHistoryLength
        {
            get { return PasswordRulePluginFacade.PasswordHistoryLength; }
        }
        

        /// <summary>
        /// Validates the password against the rules defined in the configuration.
        /// </summary>
        /// <param name="user">The user information.</param>
        /// <param name="password">The new password that has to be validated.</param>
        /// <param name="validationMessages">The list of password rules that password did not satisfy.</param>
        /// <returns></returns>
        public static bool ValidatePassword(IUser user, string password, out IList<string> validationMessages)
        {
            return PasswordRulePluginFacade.ValidatePassword(user, password, out validationMessages);
        }
    }
}
