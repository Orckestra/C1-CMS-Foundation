using Composite.Actions;
using Composite.PackageSystem;
using Composite.Security;


namespace Composite.StandardPlugins.Elements.ElementProviders.PackageElementProvider
{
    public sealed class ClearServerCacheActionExecutor : IActionExecutor
    {
        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            PackageServerFacade.ClearServerCache();

            return null;
        }
    }
}
