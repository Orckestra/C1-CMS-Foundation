using System;
using System.Web;
using Composite.Actions;
using Composite.ConsoleEventSystem;
using Composite.Security;


namespace Composite.StandardPlugins.Elements.ElementProviders.PageElementProvider.LocalOrdering
{
    internal sealed class DisplayLocalOrderingActionExecutor : IActionExecutor
	{
        private static string BaseUrl = "/Website/Spikes/PageLocalOrdering/ShowLocalOrdering.aspx";

        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            string currentConsoleId = flowControllerServicesContainer.GetService<Composite.ConsoleEventSystem.IManagementConsoleMessageService>().CurrentConsoleId;

            DisplayLocalOrderingActionToken castedActionToken = (DisplayLocalOrderingActionToken)actionToken;

            string url = string.Format("{0}?ParentPageId={1}", BaseUrl, HttpUtility.UrlEncode(castedActionToken.ParentPageId.ToString()));

            ConsoleMessageQueueFacade.Enqueue(
                new OpenViewMessageQueueItem 
                    { 
                        EntityToken = EntityTokenSerializer.Serialize(entityToken, true),
                        Url = url, 
                        ViewId = Guid.NewGuid().ToString(), 
                        ViewType = ViewType.Main, 
                        Label = "Pages local orderings" 
                    }, 
                currentConsoleId);

            return null;
        }
	}
}
