using System.Configuration;
using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.C1Console.Commands.Plugins.ConsoleCommandHandler.Runtime
{
    internal class ConsoleCommandHandlerSettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.C1Console.Commands.Plugins.ConsoleCommandHandlerConfiguration";

        private const string _elem_ConsoleCommandHandlers = "ConsoleCommandHandlers";
        [ConfigurationProperty(_elem_ConsoleCommandHandlers)]
        public NameTypeManagerTypeConfigurationElementCollection<ConsoleCommandHandlerData> ConsoleCommandHandlers
        {
            get
            {
                return (NameTypeManagerTypeConfigurationElementCollection<ConsoleCommandHandlerData>)base[_elem_ConsoleCommandHandlers];
            }
        }
    }
}
