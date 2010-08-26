using System.Text;
using System.Collections.Generic;

using Composite.C1Console.Security;


namespace Composite.Plugins.Elements.ElementProviders.BaseFunctionProviderElementProvider
{
    internal sealed class BaseFunctionFolderElementEntityTokenSecurityAncestorProvider : ISecurityAncestorProvider
    {
        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            BaseFunctionFolderElementEntityToken token = (BaseFunctionFolderElementEntityToken)entityToken;

            int index = token.Id.LastIndexOf('.');
            if (index != -1)
            {
                return new EntityToken[] { new BaseFunctionFolderElementEntityToken(token.Id.Remove(index)) };
            }
            else
            {
                return new EntityToken[] { };
            }
        }
    }
}
