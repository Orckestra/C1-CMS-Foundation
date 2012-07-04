using System;
using System.Web.UI;
using Composite.AspNet;
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

        protected override Type BaseType
        {
            get { return typeof(UserControlFunction); }
        }

        protected override string GetDescription(object obj)
        {
            if(obj is UserControlFunction)
            {
                return (obj as UserControlFunction).FunctionDescription;
            }

            return null;
        }

        protected override Type GetReturnType(object obj)
        {
            return typeof (UserControl);
        }

        protected override object InstantiateFile(string virtualPath)
        {
            return CompileFile(virtualPath);
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
    }
}
