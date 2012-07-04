using System;
using System.Collections.Generic;
using System.Reflection;
using System.Web;
using System.Web.Compilation;
using System.Web.UI;
using System.Web.Util;
using Composite.Plugins.Functions.FunctionProviders.FileBasedFunctionProvider;

namespace Composite.Plugins.Functions.FunctionProviders.UserControlFunctionProvider
{
    internal class UserControlBasedFunction : FileBasedFunction<UserControlBasedFunction>
    {
        public UserControlBasedFunction(string ns, string name, string description,
                                        IDictionary<string, FunctionParameterHolder> parameters, Type returnType,
                                        string virtualPath, FileBasedFunctionProvider<UserControlBasedFunction> provider)
            : base(ns, name, description, parameters, returnType, virtualPath, provider)
        {
        }

        public override object Execute(Composite.Functions.ParameterList parameters,
                                       Composite.Functions.FunctionContextContainer context)
        {
            var httpContext = HttpContext.Current;
            Verify.IsNotNull(httpContext, "HttpContext.Current is null");

            Page currentPage = httpContext.Handler as Page;
            Verify.IsNotNull(currentPage, "The Current HttpContext Handler must be a " + typeof (Page).FullName);

            var userControl = currentPage.LoadControl(VirtualPath);


            foreach (var param in parameters.AllParameterNames)
            {
                var value = parameters.GetParameter(param);
                Parameters[param].SetValue(userControl, value);
            }

            return userControl;
        }
    }
}
