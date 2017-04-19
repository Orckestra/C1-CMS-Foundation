using System.Linq;
using Composite.C1Console.Commands;
using Composite.C1Console.Commands.Plugins.ConsoleCommandHandler;
using Composite.Core.Types;
using Composite.Data;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.Plugins.Commands.ConsoleCommandHandlers
{
    [ConfigurationElementType(typeof(NonConfigurableConsoleCommandHandler))]
    internal class FocusData : IConsoleCommandHandler
    {
        public void HandleConsoleCommand(string consoleId, string commandPayload)
        {
            string[] parts = commandPayload.Split(':');
            if (parts.Length < 2)
            {
                return;
            }

            string typeName = parts[0];
            string keyString = string.Join(":", parts.Skip(1));

            var supportedInterfaces = DataFacade.GetAllInterfaces();

            var type = supportedInterfaces.FirstOrDefault(t => t.Name == typeName || t.FullName == typeName);
            if (type == null)
            {
                return;
            }

            var keyProperty = type.GetSingleKeyProperty();

            object key = ValueTypeConverter.Convert(keyString, keyProperty.PropertyType);

            IData data;

            using (new DataConnection())
            {
                data = DataFacade.TryGetDataByUniqueKey(type, key);
                if (data == null)
                {
                    return;
                }
            }

            var entityToken = data.GetDataEntityToken();
            ConsoleCommandHelper.SelectConsoleElement(consoleId, entityToken);
        }
    }
}
