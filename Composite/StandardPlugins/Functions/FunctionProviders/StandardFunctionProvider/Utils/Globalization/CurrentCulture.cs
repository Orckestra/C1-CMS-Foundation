using System;
using Composite.Functions;

using System.Collections.Generic;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using System.Globalization;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Globalization
{
    internal sealed class CurrentCulture : StandardFunctionBase
    {
        public CurrentCulture(EntityTokenFactory entityTokenFactory)
            : base("CurrentCulture", "Composite.Utils.Globalization", typeof(CultureInfo), entityTokenFactory)
        {
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            return System.Threading.Thread.CurrentThread.CurrentCulture;
        }
    }
}
