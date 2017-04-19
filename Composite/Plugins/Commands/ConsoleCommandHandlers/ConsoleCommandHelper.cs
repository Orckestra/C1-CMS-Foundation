using System.Collections.Generic;
using Composite.C1Console.Elements;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.Core.WebClient.FlowMediators;
using Composite.Core.WebClient.Services.TreeServiceObjects;

namespace Composite.Plugins.Commands.ConsoleCommandHandlers
{
    static class ConsoleCommandHelper
    {
        /// <summary>
        /// Selects the specified element in the console
        /// </summary>
        /// <param name="consoleId">The console id.</param>
        /// <param name="entityToken">The entity token.</param>
        public static void SelectConsoleElement(string consoleId, EntityToken entityToken)
        {
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

        /// <summary>
        /// Selects the specified element in the console, doesn't change the perspective
        /// </summary>
        /// <param name="consoleId">The console id.</param>
        /// <param name="entityToken">The entity token.</param>
        public static void SelectConsoleElementWithoutPerspectiveChange(string consoleId, EntityToken entityToken)
        {
            var serializedEntityToken = EntityTokenSerializer.Serialize(entityToken, true);

            var selectItem = new SelectElementQueueItem
            {
                EntityToken = serializedEntityToken,
            };

            ConsoleMessageQueueFacade.Enqueue(selectItem, consoleId);
        }
    }
}
