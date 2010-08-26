using Composite.C1Console.Actions;
using Composite.Core.PackageSystem;
using Composite.C1Console.Security;


namespace Composite.Plugins.Elements.ElementProviders.PackageElementProvider
{
    internal sealed class ClearServerCacheActionExecutor : IActionExecutor
    {
        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            PackageServerFacade.ClearServerCache();

            return null;
        }
    }
}
