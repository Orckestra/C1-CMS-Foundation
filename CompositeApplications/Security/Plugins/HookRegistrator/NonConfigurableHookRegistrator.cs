using System;

using Microsoft.Practices.ObjectBuilder;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Security.Plugins.HookRegistrator
{
    [Assembler(typeof(NonConfigurableHookRegistratorAssembler))]
    public sealed class NonConfigurableHookRegistrator : HookRegistratorData
    {
    }

    public sealed class NonConfigurableHookRegistratorAssembler : IAssembler<IHookRegistrator, HookRegistratorData>
	{
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IHookRegistrator Assemble(IBuilderContext context, HookRegistratorData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IHookRegistrator)Activator.CreateInstance(objectConfiguration.Type);
        }
	}
}
