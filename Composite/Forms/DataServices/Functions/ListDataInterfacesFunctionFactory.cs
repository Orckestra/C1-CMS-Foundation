using Composite.Data;
using Composite.Forms.Plugins.FunctionFactory;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Forms.DataServices.Functions
{
    internal sealed class ListDataInterfacesFunction : IFormFunction
    {
        public object Execute()
        {
            return DataFacade.GetAllInterfaces();
        }

    }


    [ConfigurationElementType(typeof(ListDataInterfacesFunctionFactoryData))]
    internal sealed class ListDataInterfacesFunctionFactory : IFormFunctionFactory
    {
        public IFormFunction CreateFunction()
        {
            return new ListDataInterfacesFunction();
        }
    }

    [Assembler(typeof(NonConfigurableFunctionFactoryAssembler))]
    internal sealed class ListDataInterfacesFunctionFactoryData : FunctionFactoryData
    {
    }
}
