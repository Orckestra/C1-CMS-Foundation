using System;
using System.Web.UI;
using Composite.AspNet;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.FileBasedFunctionProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.Plugins.Functions.FunctionProviders.UserControlFunctionProvider
{
    [ConfigurationElementType(typeof(UserControlFunctionProviderData))]
    internal class UserControlFunctionProvider : FileBasedFunctionProvider.FileBasedFunctionProvider<UserControlBasedFunction>
    {
        public UserControlFunctionProvider(string name, string folder) : base(name, folder) { }

        protected override string FileExtension
        {
            get { return "ascx"; }
        }

        protected override string DefaultFunctionNamespace
        {
            get { return "UserControls"; }
        }

        protected override bool HandleChange(string path)
        {
            return path.EndsWith(".ascx") || path.EndsWith(".ascx.cs");
        }

        public static UserControl CompileFile(string virtualPath)
        { 
            var page = new Page();
            return page.LoadControl(virtualPath) as UserControl;
        }

        protected override IFunction InstantiateFunction(string virtualPath, string @namespace, string name)
        {
            UserControl userControl = CompileFile(virtualPath);
            
            if(!(userControl is UserControlFunction))
            {
                return null;
            }

            var userControlFunction = userControl as UserControlFunction;
            var parameters = FunctionBasedFunctionProviderHelper.GetParameters(userControlFunction, typeof (UserControlFunction));

            return new UserControlBasedFunction(@namespace, name, userControlFunction.FunctionDescription, parameters, typeof(UserControl), virtualPath, this);
        }
    }
}
