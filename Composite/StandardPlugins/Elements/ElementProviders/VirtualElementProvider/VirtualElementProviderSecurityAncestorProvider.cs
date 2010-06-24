using System.Collections.Generic;

using Composite.Security;
using Composite.Elements;


namespace Composite.StandardPlugins.Elements.ElementProviders.VirtualElementProvider
{
    internal sealed class VirtualElementProviderSecurityAncestorProvider : ISecurityAncestorProvider
	{
        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            VirtualElementProviderEntityToken virtualEntityToken = (VirtualElementProviderEntityToken)entityToken;

            List<EntityToken> parentEntityTokens = new List<EntityToken>();

            VirtualElementProviderEntityToken parentToken = (VirtualElementProviderEntityToken)ElementFacade.GetData(new ElementProviderHandle(virtualEntityToken.Source), virtualEntityToken.Id);

            if (parentToken != null)
            {
                parentEntityTokens.Add(parentToken);
            }

            return parentEntityTokens;
        }
    }
}
