using Composite.Data;

namespace Composite.VersionPublishing
{
    public static class VersionPublishingFacade
    {
        public static void RegisterDefaultVersioningService(VersioningServiceSettings versioningServiceSettings)
        {
            DataScopeServicesFacade.RegisterDefaultService(versioningServiceSettings);
        }
    }
}
