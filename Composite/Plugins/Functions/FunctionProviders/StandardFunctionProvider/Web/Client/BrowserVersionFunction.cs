using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Composite.Functions;
using System.Web;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Client
{
	internal sealed class BrowserVersionFunction  :  StandardFunctionBase
	{
        public BrowserVersionFunction(EntityTokenFactory entityTokenFactory)
            : base("BrowserVersion", "Composite.Web.Client", typeof(string), entityTokenFactory)
        {
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            if (HttpContext.Current != null && HttpContext.Current.Request != null)
            {
                return HttpContext.Current.Request.Browser.Version;
            }

            return null;
        }
	}
}
