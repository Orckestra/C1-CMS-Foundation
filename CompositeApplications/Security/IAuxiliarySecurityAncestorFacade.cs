using System;
using System.Collections.Generic;


namespace Composite.Security
{
    internal interface IAuxiliarySecurityAncestorFacade
    {
        IEnumerable<EntityToken> GetParents(EntityToken entityToken);

        void AddAuxiliaryAncestorProvider(Type entityTokenType, IAuxiliarySecurityAncestorProvider auxiliarySecurityAncestorProvider);
        void RemoveAuxiliaryAncestorProvider(Type entityTokenType, IAuxiliarySecurityAncestorProvider auxiliarySecurityAncestorProvider);
        IEnumerable<IAuxiliarySecurityAncestorProvider> GetAuxiliaryAncestorProviders(Type entityTokenType);

        void Flush();
    }
}
