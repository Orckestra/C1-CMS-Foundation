using System.Collections.Generic;
using Composite.C1Console.Security;
using Composite.Plugins.Elements.ElementProviders.BaseFunctionProviderElementProvider;


namespace Composite.Plugins.Elements.ElementProviders.AllFunctionsElementProvider
{
    internal class StandardFunctionAuxiliarySecurityAncestorProvider : IAuxiliarySecurityAncestorProvider
    {
        private readonly string _providerName;


        public StandardFunctionAuxiliarySecurityAncestorProvider(string providerName)
        {
            _providerName = providerName;
        }


        public Dictionary<EntityToken, IEnumerable<EntityToken>> GetParents(IEnumerable<EntityToken> entityTokens)
        {
            Dictionary<EntityToken, IEnumerable<EntityToken>> result = new Dictionary<EntityToken, IEnumerable<EntityToken>>();

            foreach (EntityToken entityToken in entityTokens)
            {
                string functionName = entityToken.Id;

                int index = functionName.LastIndexOf('.');

                string folderName = functionName.Remove(index);
                string id = BaseFunctionProviderElementProvider.BaseFunctionProviderElementProvider.CreateId(folderName, _providerName);

                EntityToken resultEntityToken = new BaseFunctionFolderElementEntityToken(id);


                if (!result.TryGetValue(entityToken, out IEnumerable<EntityToken> resultEntityTokens))
                {
                    resultEntityTokens = new List<EntityToken>();
                    result.Add(entityToken, resultEntityTokens);
                }

                (resultEntityTokens as List<EntityToken>).Add(resultEntityToken);
            }

            return result;
        }
    }
}
