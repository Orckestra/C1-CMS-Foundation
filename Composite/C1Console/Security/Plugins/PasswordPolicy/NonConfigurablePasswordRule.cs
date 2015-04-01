using System;

using Microsoft.Practices.ObjectBuilder;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Security.Plugins.PasswordPolicy
{
    /// <exclude />
    [Assembler(typeof(NonConfigurablePasswordRuleAssembler))]
    public sealed class NonConfigurablePasswordRule : PasswordRuleData
    {
    }

    internal sealed class NonConfigurablePasswordRuleAssembler : IAssembler<IPasswordRule, PasswordRuleData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IPasswordRule Assemble(IBuilderContext context, PasswordRuleData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IPasswordRule)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
