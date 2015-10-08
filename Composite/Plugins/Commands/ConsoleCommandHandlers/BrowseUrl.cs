using Composite.C1Console.Commands;
using Composite.C1Console.Commands.Plugins.ConsoleCommandHandler;
using Composite.C1Console.Elements;
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

            var entityToken = UrlToEntityTokenFacade.TryGetEntityToken(url);

            if (entityToken == null)
            {
                PageUrlData pageUrlData = PageUrls.ParseUrl(url);

                var page = pageUrlData?.GetPage();
                if (page == null)
                {
                    return;
                }

                entityToken = page.GetDataEntityToken();
            }
            
            ConsoleCommandHelper.SelectConsoleElement(consoleId, entityToken);
        }
    }
}
