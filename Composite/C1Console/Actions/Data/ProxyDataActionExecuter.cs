using System;
using Composite.C1Console.Security;
using Composite.Core;
using Composite.Data;

namespace Composite.C1Console.Actions.Data
{
    /// <exclude />
    public class ProxyDataActionExecuter : IActionExecutorSerializedParameters
    {
        /// <exclude />
        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            return Execute(EntityTokenSerializer.Serialize(entityToken), ActionTokenSerializer.Serialize(actionToken), actionToken, flowControllerServicesContainer);
        }

        /// <exclude />
        public FlowToken Execute(string serializedEntityToken, string serializedActionToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            DataEntityToken dataEntityToken = (DataEntityToken)EntityTokenSerializer.Deserialize(serializedEntityToken);

            IData data = dataEntityToken.Data;

            Verify.IsNotNull(data, "Failed to get the data from an entity token");

            var actionIdentifier = ((ProxyDataActionToken)actionToken).ActionIdentifier;
            var action = DataActionTokenResolverFacade.Resolve(data, actionIdentifier);

            if (action == null)
            {
                throw new InvalidOperationException($"Failed to resolve action '{actionToken?.ToString() ?? "null"}'");
            }

            return ActionExecutorFacade.Execute(dataEntityToken, action, flowControllerServicesContainer);
        }
    }
}