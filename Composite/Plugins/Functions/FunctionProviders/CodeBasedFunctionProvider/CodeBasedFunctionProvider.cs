using System.Collections.Generic;
using Composite.Functions;
using Composite.Functions.Plugins.FunctionProvider;

namespace Composite.Plugins.Functions.FunctionProviders.CodeBasedFunctionProvider
{
    internal class CodeBasedFunctionProvider : IFunctionProvider
    {
        private static FunctionNotifier _functionNotifier;

        public FunctionNotifier FunctionNotifier
        {
            set => _functionNotifier = value;
        }

        public IEnumerable<IFunction> Functions => CodeBasedFunctionRegistry.Functions;

        internal static void Reload()
        {
            // Can be called before function provider initialization
            _functionNotifier?.FunctionsUpdated();
        }
    }
}