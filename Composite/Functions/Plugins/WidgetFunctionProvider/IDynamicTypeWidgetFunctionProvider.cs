using System.Collections.Generic;


namespace Composite.Functions.Plugins.WidgetFunctionProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IDynamicTypeWidgetFunctionProvider : IWidgetFunctionProvider
	{
        IEnumerable<IWidgetFunction> DynamicTypeDependentFunctions { get; }
	}
}
