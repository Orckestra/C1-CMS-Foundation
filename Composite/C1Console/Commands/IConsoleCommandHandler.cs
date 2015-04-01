using Composite.C1Console.Commands.Plugins.ConsoleCommandHandler.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.C1Console.Commands
{
    /// <summary>
    /// Handles hash based deep links to Composite C1 console (/Composite/top.aspx#&lt;command name&gt;;&lt;command payload&gt; )
    /// </summary>
    [CustomFactory(typeof(ConsoleCommandHandlerCustomFactory))]
    public interface IConsoleCommandHandler
    {
        /// <summary>
        /// Executes certain actions on console load
        /// </summary>
        /// <param name="consoleId">The console id.</param>
        /// <param name="commandPayload">The command payplod.</param>
        void HandleConsoleCommand(string consoleId, string commandPayload);
    } 
}
