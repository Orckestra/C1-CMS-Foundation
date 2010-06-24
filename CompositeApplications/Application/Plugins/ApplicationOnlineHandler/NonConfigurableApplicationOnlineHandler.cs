using System;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Application.Plugins.ApplicationOnlineHandler
{
    [Assembler(typeof(NonConfigurableApplicationOnlineHandlerAssembler))]
    public class NonConfigurableApplicationOnlineHandler : ApplicationOnlineHandlerData
	{
	}

    public sealed class NonConfigurableApplicationOnlineHandlerAssembler : IAssembler<IApplicationOnlineHandler, ApplicationOnlineHandlerData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IApplicationOnlineHandler Assemble(IBuilderContext context, ApplicationOnlineHandlerData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IApplicationOnlineHandler)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
