using System;
using Composite.Functions;
using System.Collections.Generic;
using System.Data.SqlTypes;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Date
{
    public sealed class NowFunction : StandardFunctionBase
    {
        public NowFunction(EntityTokenFactory entityTokenFactory)
            : base("Now", "Composite.Utils.Date", typeof(DateTime), entityTokenFactory)
        {
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            return DateTime.Now;
        }
    }
}
