using System;
using Composite.C1Console.Security.Plugins.PasswordPolicy;
using Composite.Core.ResourceSystem;
using Composite.Data.Types;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.Plugins.Security.PasswordRules.DoNotUseUserName
{
    [ConfigurationElementType(typeof(NonConfigurablePasswordRule))]
    internal class DoNotUseUserNamePasswordRule : IPasswordRule
    {
        public bool ValidatePassword(IUser user, string password)
        {
            return password.IndexOf(user.Username, StringComparison.InvariantCultureIgnoreCase) == -1;
        }

        public string GetRuleDescription()
        {
            return LocalizationFiles.Composite_C1Console_Users.PasswordRules_DoNotUseUserName;
        }
    }
}
