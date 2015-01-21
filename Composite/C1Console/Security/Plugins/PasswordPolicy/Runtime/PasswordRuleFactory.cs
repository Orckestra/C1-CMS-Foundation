using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Security.Plugins.PasswordPolicy.Runtime
{
    internal sealed class PasswordRuleFactory : NameTypeFactoryBase<IPasswordRule>
    {
        public PasswordRuleFactory() : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
