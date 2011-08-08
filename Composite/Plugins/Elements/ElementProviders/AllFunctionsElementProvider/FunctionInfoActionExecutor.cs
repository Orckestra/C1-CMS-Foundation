using System;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.Core.WebClient;


namespace Composite.Plugins.Elements.ElementProviders.AllFunctionsElementProvider
{
    internal sealed class FunctionInfoActionExecutor : IActionExecutor
    {
        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            FunctionInfoActionToken urlActionToken = (FunctionInfoActionToken)actionToken;

            string currentConsoleId = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>().CurrentConsoleId;


            string url = UrlUtils.ResolveAdminUrl(@"content/views/functioninfo/ShowFunctionInfo.aspx");
            url += "?Name=" + urlActionToken.FunctionName + "&IsWidget=" + urlActionToken.IsWidgetFunction;

            ConsoleMessageQueueFacade.Enqueue(new OpenViewMessageQueueItem
            {
                Url = url,
                Label = urlActionToken.FunctionName,
                ViewId = Guid.NewGuid().ToString(),
                ViewType = ViewType.Main
            }, currentConsoleId);

            return null;
        }
    }
}
