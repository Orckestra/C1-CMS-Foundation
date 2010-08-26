using System;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Security;
using Composite.Core.WebClient;


namespace Composite.Plugins.Elements.ElementProviders.LogElementProvider
{
    internal sealed class LogElementProviderActionExecutor : IActionExecutor
    {
        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            string currentConsoleId = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>().CurrentConsoleId;

            string url = UrlUtils.ResolveAdminUrl("content/views/log/log.aspx");  // string.Format("/Website/Composite/content/views/log/log.aspx");

            ConsoleMessageQueueFacade.Enqueue(new OpenViewMessageQueueItem
                {
                    EntityToken = EntityTokenSerializer.Serialize(entityToken, true),
                    Url = url,
                    ViewId = Guid.NewGuid().ToString(),
                    ViewType = ViewType.Main,
                    Label = StringResourceSystemFacade.GetString("Composite.Management", "LogElementProvider.RootLabel")
                }, currentConsoleId);

            return null;
        }
    }
}
