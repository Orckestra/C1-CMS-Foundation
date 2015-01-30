using Composite.C1Console.Security.Plugins.PasswordPolicy;
using Composite.Core.ResourceSystem;
using Composite.Data.Types;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.Plugins.Security.PasswordRules.DifferentCharacterGroups
{
    [ConfigurationElementType(typeof(NonConfigurablePasswordRule))]
    internal class DifferentCharacterGroupsPasswordRule : IPasswordRule
    {
        public bool ValidatePassword(IUser user, string password)
        {
            bool lowerCaseLetters = false, upperCaseLetters = false, digits = false, otherCharacters = false;

            foreach (var ch in password)
            {
                if (char.IsLower(ch))
                {
                    lowerCaseLetters = true;
                    continue;
                }

                if (char.IsUpper(ch))
                {
                    upperCaseLetters = true;
                    continue;
                }

                if (char.IsDigit(ch))
                {
                    digits = true;
                    continue;
                }

                otherCharacters = true;
            }

            int points = 0;
            if (lowerCaseLetters) points++;
            if (upperCaseLetters) points++;
            if (digits) points++;
            if (otherCharacters) points++;

            return points >= 3;
        }

        public string GetRuleDescription()
        {
            return LocalizationFiles.Composite_C1Console_Users.PasswordRules_DifferentCharacterGroups;
        }
    }
}
