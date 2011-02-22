using System;
using System.Collections.Generic;


namespace Composite.C1Console.Security
{
    internal interface IAuxiliarySecurityAncestorFacade
    {
        IEnumerable<EntityToken> GetParents(EntityToken entityToken);

        void AddAuxiliaryAncestorProvider(Type entityTokenType, IAuxiliarySecurityAncestorProvider auxiliarySecurityAncestorProvider, bool flushPersistent);
        void RemoveAuxiliaryAncestorProvider(Type entityTokenType, IAuxiliarySecurityAncestorProvider auxiliarySecurityAncestorProvider);
        IEnumerable<IAuxiliarySecurityAncestorProvider> GetAuxiliaryAncestorProviders(Type entityTokenType);

        void Flush();
    }
}
