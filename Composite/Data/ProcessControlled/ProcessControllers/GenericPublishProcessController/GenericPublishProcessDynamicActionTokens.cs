using Composite.C1Console.Actions.Data;
using Composite.Core.Application;

namespace Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController
{
    [ApplicationStartup]
    class GenericPublishProcessDynamicActionTokens
    {
        public static void OnBeforeInitialize()
        {
        }

        public static void OnInitialized(DataActionTokenResolver resolver)
        {
            resolver.RegisterDefault<IData>(ActionIdentifier.SendForPublication, f => new GenericPublishProcessController.AwaitingPublicationActionToken());
            resolver.RegisterDefault<IData>(ActionIdentifier.Publish, f => new GenericPublishProcessController.PublishActionToken());
            resolver.RegisterDefault<IData>(ActionIdentifier.SendForApproval, f => new GenericPublishProcessController.AwaitingApprovalActionToken());
            resolver.RegisterDefault<IData>(ActionIdentifier.SendToDraft, f => new GenericPublishProcessController.DraftActionToken());
            resolver.RegisterDefault<IData>(ActionIdentifier.Unpublish, f => new GenericPublishProcessController.UnpublishActionToken());
        }
    }
}
