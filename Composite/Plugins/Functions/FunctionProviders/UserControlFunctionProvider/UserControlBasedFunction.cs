using System;
using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Web.UI;
using Composite.AspNet;
using Composite.Core.IO;
using Composite.Plugins.Functions.FunctionProviders.FileBasedFunctionProvider;

namespace Composite.Plugins.Functions.FunctionProviders.UserControlFunctionProvider
{
    internal class UserControlBasedFunction : FileBasedFunction<UserControlBasedFunction>
    {
        public UserControlBasedFunction(
            string @namespace, 
            string name, 
            string description,
            IDictionary<string, FunctionParameter> parameters, 
            Type returnType,
            string virtualPath, 
            FileBasedFunctionProvider<UserControlBasedFunction> provider)
            : base(@namespace, name, description, parameters, returnType, virtualPath, provider)
        {
        }

        public UserControlBasedFunction(
            string @namespace, 
            string name, 
            string description, 
            string virtualPath, 
            FileBasedFunctionProvider<UserControlBasedFunction> provider)
            : base(@namespace, name, description, typeof(UserControl), virtualPath, provider)
        {
        }

        protected override void InitializeParameters()
        {
            UserControl userControl = UserControlFunctionProvider.CompileFile(VirtualPath);

            Verify.IsNotNull(userControl, "Failed to get UserControl from '{0}'", VirtualPath);

            Type baseControlType = userControl is UserControlFunction ? typeof(UserControlFunction) : typeof(UserControl);

            Parameters = FunctionBasedFunctionProviderHelper.GetParameters(userControl, baseControlType, PathUtil.Resolve(VirtualPath));
        }

        public override object Execute(Composite.Functions.ParameterList parameters,
                                       Composite.Functions.FunctionContextContainer context)
        {
            var httpContext = HttpContext.Current;
            Verify.IsNotNull(httpContext, "HttpContext.Current is null");

            Page currentPage = httpContext.Handler as Page;
            Verify.IsNotNull(currentPage, "The Current HttpContext Handler must be a " + typeof (Page).FullName);

            var directory = Path.GetDirectoryName(VirtualPath);
            var function = Path.GetFileNameWithoutExtension(VirtualPath);
            var virtualPath = DisplayModesFileResolver.ResolveFileInInDirectory(directory, function, ".ascx", new HttpContextWrapper(httpContext));

            var userControl = currentPage.LoadControl(virtualPath);


            foreach (var param in parameters.AllParameterNames)
            {
                var value = parameters.GetParameter(param);
                Parameters[param].SetValue(userControl, value);
            }

            var userControlFunction = userControl as UserControlFunction;
            if (userControlFunction != null)
            {
                userControlFunction.FunctionContextContainer = context;
            }

            return userControl;
        }
    }
}
