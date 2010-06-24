using Composite.Forms.Plugins.FunctionFactory.Runtime;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Forms.Plugins.FunctionFactory
{
    [CustomFactory(typeof(FunctionFactoryCustomFactory))]
    [ConfigurationNameMapper(typeof(FunctionFactoryDefaultNameRetriever))]
    public interface IFormFunctionFactory
    {
        IFormFunction CreateFunction();
    }
}
