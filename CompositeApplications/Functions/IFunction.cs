using System;
using System.Collections.Generic;
using System.Collections.Specialized;


namespace Composite.Functions
{    
    public interface IFunction : IMetaFunction
	{
        object Execute(ParameterList parameters, FunctionContextContainer context);
	}


    public static class IFunctionOverloads
    {
        public static T Execute<T>(this IFunction function, NameValueCollection parameters)
        {
            return FunctionFacade.Execute<T>(function, parameters); ;
        }
    }
}
