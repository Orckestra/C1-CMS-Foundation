using Composite.C1Console.Security;
using Composite.Functions;
using Composite.Core.Extensions;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation
{
	internal sealed class EntityTokenFactory
	{
        private string _providerName;

        internal EntityTokenFactory(string providerName)
        {
            _providerName = providerName;
        }

        internal EntityToken CreateEntityToken(IMetaFunction function)
        {
            string id = StringExtensionMethods.CreateNamespace(function.Namespace, function.Name, '.');

            return new StandardFunctionProviderEntityToken(_providerName, id );
        }
	}
}
