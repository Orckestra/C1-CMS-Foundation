using System.Collections.Generic;
using Composite.C1Console.Commands;
using Composite.C1Console.Commands.Plugins.ConsoleCommandHandler;
using Composite.C1Console.Elements;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.Core.WebClient.FlowMediators;
using Composite.Core.WebClient.Services.TreeServiceObjects;
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
