using System;
using System.Collections.Generic;
using Composite.Security;
using Composite.Types;


namespace Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    internal sealed class GeneratedDataTypesElementProviderSecurityAncestorProvider : ISecurityAncestorProvider
    {
        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            if (entityToken is GeneratedDataTypesElementProviderRootEntityToken)
            {
                yield break;
            }
            else if (entityToken is GeneratedDataTypesElementProviderTypeEntityToken)
            {
                GeneratedDataTypesElementProviderTypeEntityToken castedToken = entityToken as GeneratedDataTypesElementProviderTypeEntityToken;

                Type type = TypeManager.TryGetType(castedToken.SerializedTypeName);

                if (type != null)
                {
                    yield return new GeneratedDataTypesElementProviderRootEntityToken(entityToken.Source, castedToken.Id);
                }
                else
                {
                    yield return null;
                }
            }            
            else
            {
                throw new NotImplementedException();
            }
        }
    }
}
