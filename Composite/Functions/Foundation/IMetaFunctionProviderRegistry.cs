using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace Composite.Functions.Foundation
{
    internal interface IMetaFunctionProviderRegistry
    {
        List<string> FunctionNames { get; }
        List<string> WidgetFunctionNames { get; }
        IEnumerable<string> FunctionNamesByProviderName(string providerName);
        IEnumerable<string> WidgetFunctionNamesByProviderName(string providerName);
        IEnumerable<string> GetFunctionNamesByType(Type supportedType);
        IEnumerable<string> GetWidgetFunctionNamesByType(Type supportedType);
        IFunction GetFunction(string name);
        IWidgetFunction GetWidgetFunction(string name);
        IEnumerable<Type> FunctionSupportedTypes { get; }
        IEnumerable<Type> WidgetFunctionSupportedTypes { get; }

        void ReinitializeFunctionFromProvider(string providerName);
        void ReinitializeWidgetFunctionFromProvider(string providerName);

        void Initialize_PostStaticTypes();
        void Initialize_PostDynamicTypes();
        void Flush();
    }
}
