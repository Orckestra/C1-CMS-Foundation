using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.C1Console.Commands.Plugins.ConsoleCommandHandler.Runtime
{
    internal class ConsoleCommandHandlerCustomFactory : AssemblerBasedCustomFactory<IConsoleCommandHandler, ConsoleCommandHandlerData>
    {
        protected override ConsoleCommandHandlerData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            const string sectionName = ConsoleCommandHandlerSettings.SectionName;
            var settings = (ConsoleCommandHandlerSettings)configurationSource.GetSection(sectionName);

            if (settings == null)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", sectionName));
            }

            return settings.ConsoleCommandHandlers.Get(name);
        }
    }
}
