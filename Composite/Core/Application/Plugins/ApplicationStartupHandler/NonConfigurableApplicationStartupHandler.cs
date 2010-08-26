using System;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Core.Application.Plugins.ApplicationStartupHandler
{
    [Assembler(typeof(NonConfigurableApplicationStartupHandlerAssembler))]
    internal sealed class NonConfigurableApplicationStartupHandler : ApplicationStartupHandlerData
    {
    }

    internal sealed class NonConfigurableApplicationStartupHandlerAssembler : IAssembler<IApplicationStartupHandler, ApplicationStartupHandlerData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IApplicationStartupHandler Assemble(IBuilderContext context, ApplicationStartupHandlerData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IApplicationStartupHandler)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
