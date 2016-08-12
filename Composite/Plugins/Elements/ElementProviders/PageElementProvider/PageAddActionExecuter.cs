using Composite.C1Console.Actions;
using Composite.C1Console.Actions.Data;
using Composite.C1Console.Security;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Plugins.Elements.ElementProviders.PageElementProvider
{
    /// <exclude />
    public class PageAddActionExecuter : IActionExecutorSerializedParameters
    {
        /// <exclude />
        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            return Execute(EntityTokenSerializer.Serialize(entityToken), ActionTokenSerializer.Serialize(actionToken), actionToken, flowControllerServicesContainer);
        }
        /// <exclude />
        public FlowToken Execute(string serializedEntityToken, string serializedActionToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            PageAddActionToken pageAddActionToken = (PageAddActionToken)actionToken;

            var newPage = DataFacade.BuildNew<IPage>();
            newPage.PageTypeId = pageAddActionToken.PageTypeId;

            var action = DataActionTokenResolverFacade.Resolve(newPage, ((PageAddActionToken)actionToken).ActionIdentifier);

            return ActionExecutorFacade.Execute(EntityTokenSerializer.Deserialize(serializedEntityToken), action, flowControllerServicesContainer);
        }
    }
}
