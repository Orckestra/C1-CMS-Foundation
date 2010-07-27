using System.Collections.Generic;


namespace Composite.Security
{
	public interface IAuxiliarySecurityAncestorProvider
    {
        /// <summary>
        /// If the entityToken do not have any parents, this method should return an entry in the dictionary with a IEnumerable
        /// with zero elements.
        /// </summary>
        /// <param name="entityTokens"></param>
        /// <returns>
        /// A dictionary with where child entity token is key and the value of this key
        /// is enumerable of the parent entity tokens - possibly empty</returns>
        Dictionary<EntityToken, IEnumerable<EntityToken>> GetParents(IEnumerable<EntityToken> entityTokens);
    }
}
