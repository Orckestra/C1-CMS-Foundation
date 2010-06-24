using System;
using Composite.Actions;
using Composite.ConsoleEventSystem;
using Composite.ResourceSystem;
using Composite.Security;
using Composite.WebClient;
using Composite.StandardPlugins.Elements.ElementProviders.BaseFunctionProviderElementProvider;
using Composite.Collections;


namespace Composite.StandardPlugins.Elements.ElementProviders.AllFunctionsElementProvider
{
    public sealed class AllFunctionsProviderActionExecutor : IActionExecutor
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
                    Label = StringResourceSystemFacade.GetString("Composite.Management", "LogElementProvider.RootLabel")
                }, currentConsoleId);

            return null;
        }
    }
}
