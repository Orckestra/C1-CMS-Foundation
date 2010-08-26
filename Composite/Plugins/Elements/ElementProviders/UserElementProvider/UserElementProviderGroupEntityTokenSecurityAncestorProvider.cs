using Composite.C1Console.Security;
using System.Collections.Generic;


namespace Composite.Plugins.Elements.ElementProviders.UserElementProvider
{
    internal sealed class UserElementProviderGroupEntityTokenSecurityAncestorProvider : ISecurityAncestorProvider
    {
        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            yield return new UserElementProviderEntityToken();
        }
    }
}
