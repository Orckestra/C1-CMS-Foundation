using Composite.C1Console.Commands;
using Composite.C1Console.Commands.Plugins.ConsoleCommandHandler;
using Composite.C1Console.Security;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.Plugins.Commands.ConsoleCommandHandlers
{
    [ConfigurationElementType(typeof(NonConfigurableConsoleCommandHandler))]
    internal class FocusElement : IConsoleCommandHandler
    {
        public void HandleConsoleCommand(string consoleId, string commandPayload)
        {
            var serializedEntityToken = commandPayload.Replace("%5C", "\\");

            var entityToken = EntityTokenSerializer.Deserialize(serializedEntityToken);

            ConsoleCommandHelper.SelectConsoleElement(consoleId, entityToken);
        }
    }
}
