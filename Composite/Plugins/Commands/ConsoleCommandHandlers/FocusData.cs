using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Commands;
using Composite.C1Console.Commands.Plugins.ConsoleCommandHandler;
using Composite.C1Console.Elements;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.Core.Types;
using Composite.Core.WebClient.FlowMediators;
using Composite.Core.WebClient.Services.TreeServiceObjects;
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

            var keyProperty = type.GetKeyProperties().Single();

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
            var serializedEntityToken = EntityTokenSerializer.Serialize(entityToken, true);

            var rootEntityToken = AttachingPoint.PerspectivesRoot.EntityToken;

            var refreshInfo = TreeServicesFacade.FindEntityToken(rootEntityToken, entityToken,
                new List<RefreshChildrenParams>(new[]
                {
                    new RefreshChildrenParams
                    {
                        ProviderName = rootEntityToken.Source,
                        EntityToken = EntityTokenSerializer.Serialize(rootEntityToken, true)
                    }
                }));

            if (refreshInfo == null || refreshInfo.Count == 0)
            {
                return;
            }

            string perspectiveElementKey = refreshInfo.Count > 1 ? refreshInfo[1].ElementKey : refreshInfo[0].ElementKey;
          
            var selectItem = new SelectElementQueueItem
            {
                EntityToken = serializedEntityToken,
                PerspectiveElementKey = perspectiveElementKey
            };

            ConsoleMessageQueueFacade.Enqueue(selectItem, consoleId);
        }
    }
}
