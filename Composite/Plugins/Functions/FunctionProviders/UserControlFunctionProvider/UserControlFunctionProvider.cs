using System;
using System.Web.UI;
using Composite.AspNet;
using Composite.Core.WebClient;
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

            using(BuildManagerHelper.DisableUrlMetadataCachingScope())
            {
                return page.LoadControl(virtualPath) as UserControl;
            }
        }

        protected override IFunction InstantiateFunction(string virtualPath, string @namespace, string name)
        {
            UserControl userControl = CompileFile(virtualPath);

            if(!(userControl is UserControl))
            {
                return null;
            }

            Type baseControlType = userControl is UserControlFunction ? typeof(UserControlFunction) : typeof(UserControl);

            string description = userControl is UserControlFunction 
                ? (userControl as UserControlFunction).FunctionDescription 
                : "";

            var parameters = FunctionBasedFunctionProviderHelper.GetParameters(userControl, baseControlType, virtualPath);

            return new UserControlBasedFunction(@namespace, name, description, parameters, typeof(UserControl), virtualPath, this);
        }

        protected override IFunction InstantiateFunctionFromCache(string virtualPath, string @namespace, string name, Type returnType, string cachedDescription, bool preventCaching)
        {
            return new UserControlBasedFunction(@namespace, name, cachedDescription, virtualPath, this);
        }

    }
}
