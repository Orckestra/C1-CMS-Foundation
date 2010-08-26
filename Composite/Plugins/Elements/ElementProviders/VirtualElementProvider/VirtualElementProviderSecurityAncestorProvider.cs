using System.Collections.Generic;

using Composite.C1Console.Security;
using Composite.C1Console.Elements;


namespace Composite.Plugins.Elements.ElementProviders.VirtualElementProvider
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
