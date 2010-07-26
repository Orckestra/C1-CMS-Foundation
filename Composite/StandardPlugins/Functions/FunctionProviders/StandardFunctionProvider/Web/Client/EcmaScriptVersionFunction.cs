using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Composite.Functions;
using System.Web;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Client
{
	internal sealed class EcmaScriptVersionFunction  :  StandardFunctionBase
	{
        public EcmaScriptVersionFunction(EntityTokenFactory entityTokenFactory)
            : base("EcmaScriptVersion", "Composite.Web.Client", typeof(string), entityTokenFactory)
        {
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            if (HttpContext.Current != null && HttpContext.Current.Request != null)
            {
                return HttpContext.Current.Request.Browser.EcmaScriptVersion;
            }

            return null;
        }
	}
}
