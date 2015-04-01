using System;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;

namespace Composite.C1Console.Commands.Plugins.ConsoleCommandHandler
{
    [Assembler(typeof(NonConfigurableConsoleCommandHandlerAssembler))]
    internal sealed class NonConfigurableConsoleCommandHandler : ConsoleCommandHandlerData
    {
    }

    internal sealed class NonConfigurableConsoleCommandHandlerAssembler : IAssembler<IConsoleCommandHandler, ConsoleCommandHandlerData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IConsoleCommandHandler Assemble(IBuilderContext context, ConsoleCommandHandlerData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IConsoleCommandHandler)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
