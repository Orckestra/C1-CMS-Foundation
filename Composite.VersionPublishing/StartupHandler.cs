using Composite.C1Console.Elements;
using Composite.Core.Application;

namespace Composite.VersionPublishing
{
    [ApplicationStartup]
    public class StartupHandler
    {
        public static void OnBeforeInitialize()
        {
            VersionPublishingFacade.RegisterDefaultVersioningService(VersioningServiceSettings.MostRelevant());
            UrlToEntityTokenFacade.Register(new VersionedDataUrlToEntityTokenMapper());
        }

        public static void OnInitialized()
        {
        }
    }
}
