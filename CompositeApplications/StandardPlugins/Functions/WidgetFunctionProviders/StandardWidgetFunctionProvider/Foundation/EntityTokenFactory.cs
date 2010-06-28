using Composite.Security;
using Composite.Functions;
using Composite.Extensions;

namespace Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation
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

            return new StandardWidgetFunctionProviderEntityToken(_providerName, id );
        }
	}
}
