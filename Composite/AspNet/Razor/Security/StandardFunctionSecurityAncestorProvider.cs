using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Security;
using Composite.Plugins.Elements.ElementProviders.BaseFunctionProviderElementProvider;

namespace Composite.AspNet.RazorFunctions.Security
{
	internal class StandardFunctionSecurityAncestorProvider : ISecurityAncestorProvider
	{
		public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
		{
			string fullname = entityToken.Id;

			if (fullname.Contains('.'))
			{
				fullname = fullname.Remove(fullname.LastIndexOf('.'));
			}

			string id = BaseFunctionProviderElementProvider.CreateId(fullname, "AllFunctionsElementProvider");

			yield return new BaseFunctionFolderElementEntityToken(id);
		}
	}
}
