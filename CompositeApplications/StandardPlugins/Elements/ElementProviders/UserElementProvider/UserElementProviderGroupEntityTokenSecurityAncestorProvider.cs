using Composite.Security;
using System.Collections.Generic;


namespace Composite.StandardPlugins.Elements.ElementProviders.UserElementProvider
{
    public sealed class UserElementProviderGroupEntityTokenSecurityAncestorProvider : ISecurityAncestorProvider
    {
        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            yield return new UserElementProviderEntityToken();
        }
    }
}
