using Composite.Functions;

using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using System.Web;
using System;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Server
{
    internal sealed class ApplicationPath : StandardFunctionBase
    {
        public ApplicationPath(EntityTokenFactory entityTokenFactory)
            : base("ApplicationPath", "Composite.Web.Server", typeof(string), entityTokenFactory)
        {
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            if (HttpContext.Current != null && HttpContext.Current.Request != null)
            {
                string appPath = HttpContext.Current.Request.ApplicationPath;
                return appPath + (appPath.EndsWith("/") ? "" : "/");
            }
            else
            {
                throw new InvalidOperationException("Unable to access 'HttpContext.Current.Request' - object is null");
            }
        }
    }
}
