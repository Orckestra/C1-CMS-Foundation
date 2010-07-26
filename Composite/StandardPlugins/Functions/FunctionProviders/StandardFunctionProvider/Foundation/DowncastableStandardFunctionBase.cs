using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Functions;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation
{
    internal abstract class DowncastableStandardFunctionBase : StandardFunctionBase, IDowncastableFunction
	{
        public DowncastableStandardFunctionBase(string name, string namespaceName, Type returnType, EntityTokenFactory entityTokenFactory)
            : base(name,namespaceName, returnType, entityTokenFactory)
        {
        }



        public bool ReturnValueIsDowncastable
        {
            get 
            { 
                return true; 
            }
        }
    }
}
