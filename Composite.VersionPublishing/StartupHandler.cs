using Composite.C1Console.Elements;
using Composite.C1Console.Workflow;
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
            FormsWorkflowExtensions.Register(new EditPageWorkflowExtension());
        }

        public static void OnInitialized()
        {
        }
    }
}
