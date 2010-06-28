using System.Collections.Generic;
using System.Linq;
using Composite.Data;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Functions.Plugins.FunctionProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.StandardPlugins.Functions.FunctionProviders.MethodBasedFunctionProvider
{
    [ConfigurationElementType(typeof(MethodBasedFunctionProviderData))]
    internal sealed class MethodBasedFunctionProvider : IFunctionProvider
    {
        private FunctionNotifier _functionNotifier;


        public MethodBasedFunctionProvider()
        {
            DataEventSystemFacade.SubscribeToDataAfterAdd<IMethodBasedFunctionInfo>(OnDataChanged);
            DataEventSystemFacade.SubscribeToDataDeleted<IMethodBasedFunctionInfo>(OnDataChanged);
            DataEventSystemFacade.SubscribeToDataAfterUpdate<IMethodBasedFunctionInfo>(OnDataChanged);
        }



        public FunctionNotifier FunctionNotifier
        {
            set { _functionNotifier = value; }
        }



        public IEnumerable<IFunction> Functions
        {
            get 
            {
                var infos = from item in DataFacade.GetData<IMethodBasedFunctionInfo>()
                            select item;

                IList<IFunction> result = new List<IFunction>();
                foreach (IMethodBasedFunctionInfo info in infos)
                {
                    MethodBasedFunction methodBasedFunction = MethodBasedFunction.Create(info);

                    if (methodBasedFunction != null)
                    {
                        result.Add(methodBasedFunction);
                    }
                }
                return result;
            }
        }



        private void OnDataChanged(DataEventArgs dataEventArgs)
        {
            _functionNotifier.FunctionsUpdated();
        }
    }




    [Assembler(typeof(NonConfigurableFunctionProviderAssembler))]
    internal sealed class MethodBasedFunctionProviderData : FunctionProviderData
    {
    }
}
