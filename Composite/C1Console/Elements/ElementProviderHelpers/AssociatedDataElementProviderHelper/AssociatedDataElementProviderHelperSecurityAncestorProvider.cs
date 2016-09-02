using System.Collections.Generic;
using System.Linq;
using Composite.Data;
using Composite.C1Console.Security;


namespace Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper
{
    internal sealed class AssociatedDataElementProviderHelperSecurityAncestorProvider : ISecurityAncestorProvider
    {
        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            var castedEntityToken = (AssociatedDataElementProviderHelperEntityToken)entityToken;

            var dataItem = castedEntityToken.GetDataList().FirstOrDefault();

            // Data item may not exist in current language
            return dataItem != null ? new[] { dataItem.GetDataEntityToken() } : Enumerable.Empty<EntityToken>();
        }
    }
}
