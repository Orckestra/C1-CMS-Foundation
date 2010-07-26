using System.Collections.Generic;


namespace Composite.Functions.Plugins.FunctionProvider
{
    internal interface IDynamicTypeFunctionProvider : IFunctionProvider
	{
        IEnumerable<IFunction> DynamicTypeDependentFunctions { get; }
	}
}
