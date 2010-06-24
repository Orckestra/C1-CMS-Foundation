using System;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Application.Plugins.ApplicationStartupHandler
{
    [Assembler(typeof(NonConfigurableApplicationStartupHandlerAssembler))]
    public sealed class NonConfigurableApplicationStartupHandler : ApplicationStartupHandlerData
    {
    }

    public sealed class NonConfigurableApplicationStartupHandlerAssembler : IAssembler<IApplicationStartupHandler, ApplicationStartupHandlerData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IApplicationStartupHandler Assemble(IBuilderContext context, ApplicationStartupHandlerData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IApplicationStartupHandler)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
