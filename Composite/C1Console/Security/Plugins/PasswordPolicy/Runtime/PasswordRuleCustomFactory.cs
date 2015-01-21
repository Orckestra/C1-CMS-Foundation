using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Security.Plugins.PasswordPolicy.Runtime
{
    internal class PasswordRuleCustomFactory : AssemblerBasedCustomFactory<IPasswordRule, PasswordRuleData>
    {
        protected override PasswordRuleData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            const string sectionName = PasswordPolicySettings.SectionName;
            var settings = (PasswordPolicySettings)configurationSource.GetSection(sectionName);

            if (settings == null)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", sectionName));
            }

            return settings.PasswordRules.Get(name);
        }
    }
}
