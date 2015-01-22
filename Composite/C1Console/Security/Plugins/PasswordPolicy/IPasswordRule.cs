using Composite.C1Console.Security.Plugins.PasswordPolicy.Runtime;
using Composite.Data.Types;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.C1Console.Security.Plugins.PasswordPolicy
{
    /// <summary>
    /// Represents a password validaiton rule.
    /// </summary>
    [CustomFactory(typeof(PasswordRuleCustomFactory))]
    public interface IPasswordRule
    {
        /// <summary>
        /// Checks if the password satisfies the rule.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="password">A password string.</param>
        /// <returns><value>true</value> is password matches the rule, otherwise - <value>false</value></returns>
        bool ValidatePassword(IUser user, string password);

        /// <summary>
        /// Returns rule description to be shown in UI if password didn't pass the validation.
        /// </summary>
        /// <returns></returns>
        string GetRuleDescription();
    }
}