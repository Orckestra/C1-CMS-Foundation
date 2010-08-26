using Composite.C1Console.Forms.Plugins.FunctionFactory.Runtime;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Forms.Plugins.FunctionFactory
{
    [CustomFactory(typeof(FunctionFactoryCustomFactory))]
    [ConfigurationNameMapper(typeof(FunctionFactoryDefaultNameRetriever))]
    internal interface IFormFunctionFactory
    {
        IFormFunction CreateFunction();
    }
}
