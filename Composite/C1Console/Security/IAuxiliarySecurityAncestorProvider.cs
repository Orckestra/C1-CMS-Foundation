using System.Collections.Generic;


namespace Composite.C1Console.Security
{
    /// <summary>    
    /// To add a see <see cref="Composite.C1Console.Security.AuxiliarySecurityAncestorFacade"/>.
    /// Typically added from a element provider
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
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
