using System;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Security;
using Composite.Core.WebClient;
using Composite.Plugins.Elements.ElementProviders.BaseFunctionProviderElementProvider;
using Composite.Core.Collections;


namespace Composite.Plugins.Elements.ElementProviders.AllFunctionsElementProvider
{
    internal sealed class AllFunctionsProviderActionExecutor : IActionExecutor
    {
        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            string functionNamePrefix = "";
            if (entityToken.Id.IndexOf('.') > -1)
            {
                functionNamePrefix = entityToken.Id.Substring(entityToken.Id.IndexOf('.') + 1);
            }

            bool widgets = entityToken.Id.ToLower().Contains("widget");

            string currentConsoleId = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>().CurrentConsoleId;
            string url = UrlUtils.ResolveAdminUrl(string.Format("content/views/functiondoc/FunctionDocumentation.aspx?functionPrefix={0}&widgets={1}", functionNamePrefix, widgets)); 

            ConsoleMessageQueueFacade.Enqueue(new OpenViewMessageQueueItem
                {
                    Url = url,
                    EntityToken = EntityTokenSerializer.Serialize(entityToken, true),
                    ViewId = Guid.NewGuid().ToString(),
                    ViewType = ViewType.Main,
                    Label = "Documentation"
                }, currentConsoleId);

            return null;
        }
    }
}
