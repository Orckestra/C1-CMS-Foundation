using System.Collections.Generic;
using System.Linq;
using Composite.Data;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Functions.Inline;
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

            DataEventSystemFacade.SubscribeToDataAfterAdd<IInlineFunction>(OnDataChanged);
            DataEventSystemFacade.SubscribeToDataDeleted<IInlineFunction>(OnDataChanged);
            DataEventSystemFacade.SubscribeToDataAfterUpdate<IInlineFunction>(OnDataChanged);
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


                IEnumerable<IInlineFunction> editableMethodBasedFunctionInfos =
                    from item in DataFacade.GetData<IInlineFunction>()
                    select item;

                foreach (IInlineFunction info in editableMethodBasedFunctionInfos)
                {
                    InlineFunction inlineFunction = InlineFunction.Create(info);

                    if (inlineFunction == null) continue;

                    result.Add(inlineFunction);
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
