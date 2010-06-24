using System.Collections.Generic;


namespace Composite.Functions.Plugins.FunctionProvider
{
    public interface IDynamicTypeFunctionProvider : IFunctionProvider
	{
        IEnumerable<IFunction> DynamicTypeDependentFunctions { get; }
	}
}
