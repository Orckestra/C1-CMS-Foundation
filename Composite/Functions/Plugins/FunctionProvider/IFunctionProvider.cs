using System.Collections.Generic;
using Composite.Functions.Plugins.FunctionProvider.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Functions.Plugins.FunctionProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [CustomFactory(typeof(FunctionProviderCustomFactory))]
    [ConfigurationNameMapper(typeof(FunctionProviderDefaultNameRetriever))]
	public interface IFunctionProvider
	{
        FunctionNotifier FunctionNotifier { set; }
        IEnumerable<IFunction> Functions { get; }
	}
}
