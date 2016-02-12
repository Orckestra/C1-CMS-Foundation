using Composite.C1Console.Actions.Data;
using Composite.Core.Application;

namespace Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController
{
    [ApplicationStartup]
    class GenericPublishProcessDynamicActionTokens
    {
        public static void OnBeforeInitialize()
        {
            DataActionTokenResolverFacade.RegisterDefault<IData>(ActionIdentifier.SendForPublication, new GenericPublishProcessController.AwaitingPublicationActionToken());
            DataActionTokenResolverFacade.RegisterDefault<IData>(ActionIdentifier.Publish,new GenericPublishProcessController.PublishActionToken());
            DataActionTokenResolverFacade.RegisterDefault<IData>(ActionIdentifier.SendForApproval, new GenericPublishProcessController.AwaitingApprovalActionToken());
            DataActionTokenResolverFacade.RegisterDefault<IData>(ActionIdentifier.SendToDraft, new GenericPublishProcessController.DraftActionToken());
            DataActionTokenResolverFacade.RegisterDefault<IData>(ActionIdentifier.Unpublish, new GenericPublishProcessController.UnpublishActionToken());
        }

        public static void OnInitialized()
        {

        }
    }
}
