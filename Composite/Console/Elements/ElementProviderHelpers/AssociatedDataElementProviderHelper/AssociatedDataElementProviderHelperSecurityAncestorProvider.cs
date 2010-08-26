using System;
using System.Collections.Generic;
using Composite.Data;
using Composite.C1Console.Security;


namespace Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper
{
    internal sealed class AssociatedDataElementProviderHelperSecurityAncestorProvider : ISecurityAncestorProvider
    {
        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            AssociatedDataElementProviderHelperEntityToken castedEntityToken = (AssociatedDataElementProviderHelperEntityToken)entityToken;

            EntityToken rootParent = castedEntityToken.GetData().GetDataEntityToken();

            return new EntityToken[] { rootParent };
        }
    }
}
