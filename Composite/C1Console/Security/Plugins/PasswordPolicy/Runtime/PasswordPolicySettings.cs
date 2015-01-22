using System.Configuration;
using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.C1Console.Security.Plugins.PasswordPolicy.Runtime
{
    internal class PasswordPolicySettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.C1Console.Security.Plugins.PasswordPolicy";

        /// <summary>
        /// Password expiraton time in days. After password expires, the user will be asked to
        /// </summary>
        private const string _attr_passwordExpirationTimeInDays = "passwordExpirationTimeInDays";
        [ConfigurationProperty(_attr_passwordExpirationTimeInDays, IsRequired = false, DefaultValue = 0)]
        public int PasswordExpirationTimeInDays
        {
            get { return (int)base[_attr_passwordExpirationTimeInDays]; }
            set { base[_attr_passwordExpirationTimeInDays] = value; }
        }

        /// <summary>
        /// Number of old passwords to be preserved for every user.
        /// </summary>
        private const string _attr_passwordHistoryLength = "passwordHistoryLength";
        [ConfigurationProperty(_attr_passwordHistoryLength, IsRequired = false, DefaultValue = 0)]
        public int PasswordHistoryLength
        {
            get { return (int)base[_attr_passwordHistoryLength]; }
            set { base[_attr_passwordHistoryLength] = value; }
        }

        

        private const string _elem_PasswordRules = "PasswordRules";
        [ConfigurationProperty(_elem_PasswordRules)]
        public NameTypeManagerTypeConfigurationElementCollection<PasswordRuleData> PasswordRules
        {
            get
            {
                return (NameTypeManagerTypeConfigurationElementCollection<PasswordRuleData>) base[_elem_PasswordRules];
            }
        }
    }
}
