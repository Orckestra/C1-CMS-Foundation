using System.Collections.Generic;
using Composite.Data;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Functions.Plugins.FunctionProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.StandardPlugins.Functions.FunctionProviders.SqlFunctionProvider
{
    [ConfigurationElementType(typeof(SqlFunctionProviderData))]
    public sealed class SqlFunctionProvider : IFunctionProvider
    {
        private FunctionNotifier _functionNotifier;


        public SqlFunctionProvider()
        {
            DataEventSystemFacade.SubscribeToDataAfterAdd<ISqlFunctionInfo>(OnDataChanged);
            DataEventSystemFacade.SubscribeToDataDeleted<ISqlFunctionInfo>(OnDataChanged);
            DataEventSystemFacade.SubscribeToDataAfterUpdate<ISqlFunctionInfo>(OnDataChanged);
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



        private void OnDataChanged(DataEventArgs dataEventArgs)
        {
            _functionNotifier.FunctionsUpdated();
        }
    }



    [Assembler(typeof(SqlFunctionProviderAssembler))]
    public sealed class SqlFunctionProviderData : FunctionProviderData
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
