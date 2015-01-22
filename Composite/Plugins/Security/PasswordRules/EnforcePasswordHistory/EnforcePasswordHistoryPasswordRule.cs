using Composite.C1Console.Security;
using Composite.C1Console.Security.Plugins.PasswordPolicy;
using Composite.Core.Extensions;
using Composite.Data.Types;
using Composite.Plugins.Security.LoginProviderPlugins.DataBasedFormLoginProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.Plugins.Security.PasswordRules.EnforcePasswordHistory
{
    [ConfigurationElementType(typeof(NonConfigurablePasswordRule))]
    internal class EnforcePasswordHistoryPasswordRule : IPasswordRule
    {
        public bool ValidatePassword(IUser user, string password)
        {
            if (PasswordPolicyFacade.PasswordHistoryLength <= 0) return true;

            return !UserPasswordManager.PasswordFoundInHistory(user, password);
        }

        public string GetRuleDescription()
        {
            // TODO: localize
            return "Password should not match any of the previously used {0} passwords.".FormatWith(PasswordPolicyFacade.PasswordHistoryLength);
        }
    }
}
