using System;
using System.Collections.Generic;


namespace Composite.Security.SecurityAncestorProviders
{
    internal sealed class NoAncestorSecurityAncestorProvider : ISecurityAncestorProvider
	{
        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            if (entityToken == null) throw new ArgumentNullException("entityToken");

            return new EntityToken[] { };
        }
    }
}
