using System.Collections.Generic;
using Composite.C1Console.Security;


namespace Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider
{
    internal sealed class MediaFileProviderEntityTokenSecurityAncestorProvider : ISecurityAncestorProvider
	{
        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            // ok since the only hook is on the root folder
            return null;
        }
    }
}
