using Composite.C1Console.Commands.Foundation.PluginFacades;

namespace Composite.C1Console.Commands
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class ConsoleCommandFacade
    {

        /// <summary>
        /// Handles a console command.
        /// </summary>
        /// <param name="consoleId">The console Id.</param>
        /// <param name="commandName">The command name.</param>
        /// <param name="commandPayload">The command payload.</param>
        public static void HandleConsoleCommand(string consoleId, string commandName, string commandPayload)
        {
            Verify.ArgumentNotNullOrEmpty(consoleId, "consoleId");
            Verify.ArgumentNotNullOrEmpty(commandName, "commandName");

            if (!ConsoleCommandHandlerPluginFacade.HasConfiguration())
            {
                return;
            }

            var handler = ConsoleCommandHandlerPluginFacade.GetConsoleCommandHandler(commandName);
            if (handler == null)
            {
                return;
            }

            handler.HandleConsoleCommand(consoleId, commandPayload);
        }
    }
}
