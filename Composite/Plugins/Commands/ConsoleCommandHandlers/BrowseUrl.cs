using System.Collections.Generic;
using System.Web;
using Composite.C1Console.Commands;
using Composite.C1Console.Commands.Plugins.ConsoleCommandHandler;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.Core.Extensions;
using Composite.Core.Routing;
using Composite.Data;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.Plugins.Commands.ConsoleCommandHandlers
{
    [ConfigurationElementType(typeof(NonConfigurableConsoleCommandHandler))]
    internal class BrowseUrl : IConsoleCommandHandler
    {
        public void HandleConsoleCommand(string consoleId, string commandPayload)
        {
            string url = commandPayload;

            PageUrlData pageUrlData = PageUrls.ParseUrl(url);
            if (pageUrlData == null)
            {
                return;
            }

            var entityToken = pageUrlData.GetPage().GetDataEntityToken();
            string serializedEntityToken = EntityTokenSerializer.Serialize(entityToken, true);

            string previewUrl = GetPagePreviewUrl(pageUrlData);

            var arguments = new Dictionary<string, string> { { "URL", previewUrl } };

            var browserUrlCommand = new OpenHandledViewMessageQueueItem(serializedEntityToken, "Composite.Management.Browser", arguments);
            ConsoleMessageQueueFacade.Enqueue(browserUrlCommand, consoleId);
        }

        private static string GetPagePreviewUrl(PageUrlData pageUrlData)
        {
            var httpContext = HttpContext.Current;

            var urlSpace = new UrlSpace();
            if (HostnameBindingsFacade.GetBindingForCurrentRequest() != null
                || HostnameBindingsFacade.GetAliasBinding(httpContext) != null)
            {
                urlSpace.ForceRelativeUrls = true;
            }

            return PageUrls.BuildUrl(pageUrlData, UrlKind.Public, urlSpace)
                      ?? PageUrls.BuildUrl(pageUrlData, UrlKind.Renderer, urlSpace);
        }
    }
}
