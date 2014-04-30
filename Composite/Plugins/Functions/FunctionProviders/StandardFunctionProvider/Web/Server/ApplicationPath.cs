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
            var httpContext = HttpContext.Current;
            if (httpContext == null || httpContext.Request == null)
            {
                throw new InvalidOperationException("Unable to access 'HttpContext.Current.Request' - object is null");
            }

            string appPath = httpContext.Request.ApplicationPath;
            if (appPath.EndsWith("/"))
            {
                appPath = appPath.Substring(0, appPath.Length - 1);
            }
            return appPath;
            
        }
    }
}
