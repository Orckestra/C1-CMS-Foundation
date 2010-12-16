using System;
using System.Collections.Generic;


namespace Composite.C1Console.Security.SecurityAncestorProviders
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class NoAncestorSecurityAncestorProvider : ISecurityAncestorProvider
	{
        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            if (entityToken == null) throw new ArgumentNullException("entityToken");

            return new EntityToken[] { };
        }
    }
}
