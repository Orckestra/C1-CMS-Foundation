using Composite.C1Console.Forms.Plugins.FunctionFactory.Runtime;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Forms.Plugins.FunctionFactory
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [CustomFactory(typeof(FunctionFactoryCustomFactory))]
    [ConfigurationNameMapper(typeof(FunctionFactoryDefaultNameRetriever))]
    public interface IFormFunctionFactory
    {
        /// <exclude />
        IFormFunction CreateFunction();
    }
}
