using System;
using System.Collections.Generic;
using Composite.Data;
using Composite.Security;


namespace Composite.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper
{
    public sealed class AssociatedDataElementProviderHelperSecurityAncestorProvider : ISecurityAncestorProvider
    {
        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            AssociatedDataElementProviderHelperEntityToken castedEntityToken = (AssociatedDataElementProviderHelperEntityToken)entityToken;

            EntityToken rootParent = castedEntityToken.GetData().GetDataEntityToken();

            return new EntityToken[] { rootParent };
        }
    }
}
