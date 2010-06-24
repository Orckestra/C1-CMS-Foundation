using System.Collections.Generic;


namespace Composite.Functions.Plugins.WidgetFunctionProvider
{
    public interface IDynamicTypeWidgetFunctionProvider : IWidgetFunctionProvider
	{
        IEnumerable<IWidgetFunction> DynamicTypeDependentFunctions { get; }
	}
}
