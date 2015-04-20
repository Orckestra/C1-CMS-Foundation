using Composite.C1Console.Security;
using Composite.C1Console.Security.Plugins.PasswordPolicy;
using Composite.Core.ResourceSystem;
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

            return !UserFormLoginManager.PasswordFoundInHistory(user, password);
        }

        public string GetRuleDescription()
        {
            return LocalizationFiles.Composite_C1Console_Users.PasswordRules_EnforcePasswordHistory(PasswordPolicyFacade.PasswordHistoryLength + 1);
        }
    }
}
