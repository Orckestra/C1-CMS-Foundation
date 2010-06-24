using System.Collections.Generic;


namespace Composite.Security
{
    public interface ISecurityAncestorProvider
    {
        /// <summary>
        /// If the entityToken does not exists, this method should return null.
        /// If the entityToken do not have any parents, this method should return an IEnumerable
        /// with zero elements.
        /// </summary>
        /// <param name="entityToken"></param>
        /// <returns></returns>
        IEnumerable<EntityToken> GetParents(EntityToken entityToken);
    }
}
