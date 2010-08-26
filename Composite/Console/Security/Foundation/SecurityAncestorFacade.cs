using System;
using System.Collections.Generic;


namespace Composite.C1Console.Security.Foundation
{
    internal static class SecurityAncestorFacade
    {
        public static IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            if (entityToken == null) throw new ArgumentNullException("entityToken");

            ISecurityAncestorProvider provider = SecurityAncestorProviderCache.GetSecurityAncestorProvider(entityToken);

            IEnumerable<EntityToken> result = provider.GetParents(entityToken);

            return result;
        }
    }
}
