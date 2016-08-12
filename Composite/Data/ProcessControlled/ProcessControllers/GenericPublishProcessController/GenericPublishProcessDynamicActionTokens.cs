using Composite.C1Console.Actions.Data;
using Composite.Core.Application;

namespace Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController
{
    [ApplicationStartup]
    class GenericPublishProcessDynamicActionTokens
    {
        public static void OnBeforeInitialize()
        {
            DataActionTokenResolverFacade.RegisterDefault<IData>(ActionIdentifier.SendForPublication, f => new GenericPublishProcessController.AwaitingPublicationActionToken());
            DataActionTokenResolverFacade.RegisterDefault<IData>(ActionIdentifier.Publish, f => new GenericPublishProcessController.PublishActionToken());
            DataActionTokenResolverFacade.RegisterDefault<IData>(ActionIdentifier.SendForApproval, f => new GenericPublishProcessController.AwaitingApprovalActionToken());
            DataActionTokenResolverFacade.RegisterDefault<IData>(ActionIdentifier.SendToDraft, f => new GenericPublishProcessController.DraftActionToken());
            DataActionTokenResolverFacade.RegisterDefault<IData>(ActionIdentifier.Unpublish, f => new GenericPublishProcessController.UnpublishActionToken());
        }

        public static void OnInitialized()
        {

        }
    }
}
