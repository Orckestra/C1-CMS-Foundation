using System.Collections.Generic;
using Composite.Functions;
using Composite.Functions.Plugins.FunctionProvider;

namespace Composite.Plugins.Functions.FunctionProviders.ServiceFunctionProvider
{
    internal class ServiceFunctionProvider : IFunctionProvider
    {
        private static FunctionNotifier _functionNotifier;

        public FunctionNotifier FunctionNotifier
        {
            set => _functionNotifier = value;
        }

        public IEnumerable<IFunction> Functions => ServiceFunctionRegistry.Functions;

        public static void Reload()
        {
            // Can be called before function provider initialization
            _functionNotifier?.FunctionsUpdated();
        }
    }
}
