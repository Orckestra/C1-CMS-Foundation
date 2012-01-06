using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Security;
using Composite.Plugins.Elements.ElementProviders.BaseFunctionProviderElementProvider;


namespace Composite.Functions
{
    /// <summary>
    /// Use this security ancestor provider for custom functions that
    /// will be an element under the 'All Functions' section in the C1 console.
    /// This provider assumes that the full name of the function, including namespace,
    /// is stored in the Id property of the entity token.   
    /// Example:
    /// entityToken.Id = "Composite.Forms.Renderer"    
    /// NOTE: That this might have changed if someone changes this in the provider code!
    /// </summary>
    public class StandardFunctionSecurityAncestorProvider : ISecurityAncestorProvider
    {
        /// <summary>
        /// Returns a parent entity token for the given function entity token.
        /// </summary>
        /// <param name="entityToken"></param>
        /// <returns></returns>
        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            string fullname = entityToken.Id;
            string providerName = entityToken.Source;

            if (fullname.Contains('.'))
            {
                fullname = fullname.Remove(fullname.LastIndexOf('.'));
            }

            string id = BaseFunctionProviderElementProvider.CreateId(fullname, "AllFunctionsElementProvider");

            yield return new BaseFunctionFolderElementEntityToken(id);
        }
    }
}
