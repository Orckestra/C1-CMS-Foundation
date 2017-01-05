using System.Collections.Generic;
using Composite.Functions;

namespace Composite.Plugins.Functions.FunctionProviders.FileBasedFunctionProvider
{
    /// <exclude />
    public interface IParameterWidgetsProvider
    {
        /// <exclude />
        IDictionary<string, WidgetFunctionProvider> GetParameterWidgets();
    }
}
