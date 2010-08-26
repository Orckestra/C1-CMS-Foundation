using System;
using Composite.Data;
using Composite.C1Console.Forms.Plugins.FunctionFactory;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Forms.DataServices.Functions
{
    internal sealed class GetData : IFormFunction 
    {
        private Type _type;

        [FormsProperty()]
        public string TypeName
        {
            get { return _type.FullName; }
            set { _type = Composite.Core.Types.TypeManager.GetType( value ); }
        }

        public object Execute()
        {
            return DataFacade.GetData(_type);
        }
    }


    [ConfigurationElementType(typeof(GetDataFunctionFactoryData))]
    internal sealed class GetDataFunctionFactory : IFormFunctionFactory 
    {
        public IFormFunction CreateFunction()
        {
            return new GetData();
        }
    }



    [Assembler(typeof(NonConfigurableFunctionFactoryAssembler))]
    internal sealed class GetDataFunctionFactoryData : FunctionFactoryData
    {        
    }
}
