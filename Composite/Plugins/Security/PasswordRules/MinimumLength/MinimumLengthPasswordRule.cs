using System.Configuration;
using Composite.C1Console.Security.Plugins.PasswordPolicy;
using Composite.Core.ResourceSystem;
using Composite.Data.Types;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;

namespace Composite.Plugins.Security.PasswordRules.MinimumLength
{
    [ConfigurationElementType(typeof(MinimumLengthPasswordRuleData))]
    internal class MinimumLengthPasswordRule : IPasswordRule
    {
        public MinimumLengthPasswordRule(int minLength)
        {
            Verify.That(minLength > 0, "The minimum length of a password should be at least 1 character.");

            _minLength = minLength;
        }

        private readonly int _minLength;

        public bool ValidatePassword(IUser user, string password)
        {
            return password.Length >= _minLength;
        }

        public string GetRuleDescription()
        {
            return LocalizationFiles.Composite_C1Console_Users.PasswordRules_MinimumLength(_minLength);
        }
    }

    [Assembler(typeof(MinimumLengthPasswordRuleAssembler))]
    internal class MinimumLengthPasswordRuleData : PasswordRuleData
    {
        [ConfigurationProperty("minLength", IsRequired = true)]
        public int MinLength
        {
            get { return (int)base["minLength"]; }
            set { base["minLength"] = value; }
        }
    }

    internal class MinimumLengthPasswordRuleAssembler : IAssembler<IPasswordRule, PasswordRuleData>
    {
        IPasswordRule IAssembler<IPasswordRule, PasswordRuleData>.Assemble(IBuilderContext context, PasswordRuleData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            var data = (MinimumLengthPasswordRuleData) objectConfiguration;
            return new MinimumLengthPasswordRule(data.MinLength);
        }
    }
}
