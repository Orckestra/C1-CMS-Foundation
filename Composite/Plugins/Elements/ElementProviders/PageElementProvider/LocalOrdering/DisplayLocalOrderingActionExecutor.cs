using System;
using System.Web;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Security;


namespace Composite.Plugins.Elements.ElementProviders.PageElementProvider.LocalOrdering
{
    internal sealed class DisplayLocalOrderingActionExecutor : IActionExecutor
	{
        private static string BaseUrl = "/Website/Spikes/PageLocalOrdering/ShowLocalOrdering.aspx";

        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            string currentConsoleId = flowControllerServicesContainer.GetService<Composite.C1Console.Events.IManagementConsoleMessageService>().CurrentConsoleId;

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
