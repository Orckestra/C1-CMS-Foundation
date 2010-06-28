using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Composite.Functions;
using System.Web;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Client
{
	internal sealed class IsMobileDeviceFunction  :  StandardFunctionBase
	{
        public IsMobileDeviceFunction(EntityTokenFactory entityTokenFactory)
            : base("IsMobileDevice", "Composite.Web.Client", typeof(bool), entityTokenFactory)
        {
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            if (HttpContext.Current != null && HttpContext.Current.Request != null)
            {
                return HttpContext.Current.Request.Browser.IsMobileDevice;
            }

            return false;
        }
	}
}
