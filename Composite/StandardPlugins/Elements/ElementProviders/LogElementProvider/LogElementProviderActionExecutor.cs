using System;
using Composite.Actions;
using Composite.ConsoleEventSystem;
using Composite.ResourceSystem;
using Composite.Security;
using Composite.WebClient;


namespace Composite.StandardPlugins.Elements.ElementProviders.LogElementProvider
{
    public sealed class LogElementProviderActionExecutor : IActionExecutor
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
