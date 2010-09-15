using System.Collections.Generic;
using System.Linq;
using Composite.Data;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Functions.Plugins.FunctionProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Plugins.Functions.FunctionProviders.MethodBasedFunctionProvider
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

            DataEventSystemFacade.SubscribeToDataAfterAdd<ICSharpFunction>(OnDataChanged);
            DataEventSystemFacade.SubscribeToDataDeleted<ICSharpFunction>(OnDataChanged);
            DataEventSystemFacade.SubscribeToDataAfterUpdate<ICSharpFunction>(OnDataChanged);
        }



        public FunctionNotifier FunctionNotifier
        {
            set { _functionNotifier = value; }
        }



        public IEnumerable<IFunction> Functions
        {
            get 
            {
                IList<IFunction> result = new List<IFunction>();


                IEnumerable<IMethodBasedFunctionInfo> methodBasedFunctionInfos = 
                    from item in DataFacade.GetData<IMethodBasedFunctionInfo>()
                    select item;
                
                foreach (IMethodBasedFunctionInfo info in methodBasedFunctionInfos)
                {
                    MethodBasedFunction methodBasedFunction = MethodBasedFunction.Create(info);

                    if (methodBasedFunction == null) continue;
                    
                    result.Add(methodBasedFunction);                    
                }


                IEnumerable<ICSharpFunction> editableMethodBasedFunctionInfos =
                    from item in DataFacade.GetData<ICSharpFunction>()
                    select item;

                foreach (ICSharpFunction info in editableMethodBasedFunctionInfos)
                {
                    EditableMethodBasedFunction editableMethodBasedFunction = EditableMethodBasedFunction.Create(info);

                    if (editableMethodBasedFunction == null) continue;

                    result.Add(editableMethodBasedFunction);
                }

                return result;
            }
        }



        private void OnDataChanged(object sender, DataEventArgs dataEventArgs)
        {
            _functionNotifier.FunctionsUpdated();
        }
    }




    [Assembler(typeof(NonConfigurableFunctionProviderAssembler))]
    internal sealed class MethodBasedFunctionProviderData : FunctionProviderData
    {
    }
}
