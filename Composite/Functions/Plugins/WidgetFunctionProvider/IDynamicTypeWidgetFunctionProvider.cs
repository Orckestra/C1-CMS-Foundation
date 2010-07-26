using System.Collections.Generic;


namespace Composite.Functions.Plugins.WidgetFunctionProvider
{
    internal interface IDynamicTypeWidgetFunctionProvider : IWidgetFunctionProvider
	{
        IEnumerable<IWidgetFunction> DynamicTypeDependentFunctions { get; }
	}
}
