using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.C1Console.Commands.Plugins.ConsoleCommandHandler.Runtime
{
    internal sealed class ConsoleCommandHandlerFactory : NameTypeFactoryBase<IConsoleCommandHandler>
    {
        public ConsoleCommandHandlerFactory(): base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
