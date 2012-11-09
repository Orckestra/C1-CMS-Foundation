using System.Collections.Generic;
using Composite.Data;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Functions.Plugins.FunctionProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Plugins.Functions.FunctionProviders.SqlFunctionProvider
{
    [ConfigurationElementType(typeof(SqlFunctionProviderData))]
    internal sealed class SqlFunctionProvider : IFunctionProvider
    {
        private FunctionNotifier _functionNotifier;


        public SqlFunctionProvider()
        {
            DataEventSystemFacade.SubscribeToStoreChanged<ISqlFunctionInfo>(OnDataChanged, false);
        }



        public FunctionNotifier FunctionNotifier
        {
            set { _functionNotifier = value; }
        }



        public IEnumerable<IFunction> Functions
        {
            get 
            {
                IEnumerable<ISqlFunctionInfo> functionInfos = DataFacade.GetData<ISqlFunctionInfo>();

                IList<IFunction> functions = new List<IFunction>();
                foreach (ISqlFunctionInfo function in functionInfos)
                {
                    functions.Add(new SqlFunction(function));
                }
                return functions;
            }
        }



        private void OnDataChanged(object sender, StoreEventArgs storeEventArgs)
        {
            _functionNotifier.FunctionsUpdated();
        }
    }



    [Assembler(typeof(SqlFunctionProviderAssembler))]
    internal sealed class SqlFunctionProviderData : FunctionProviderData
    {
    }



    internal sealed class SqlFunctionProviderAssembler : IAssembler<IFunctionProvider, FunctionProviderData>
    {
        public IFunctionProvider Assemble(IBuilderContext context, FunctionProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new SqlFunctionProvider();
        }
    }
}
