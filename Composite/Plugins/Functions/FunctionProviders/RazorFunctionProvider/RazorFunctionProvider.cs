using System;
using System.Web.WebPages;
using Composite.AspNet.Razor;
using Composite.Core;
using Composite.Core.WebClient;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.FileBasedFunctionProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.Plugins.Functions.FunctionProviders.RazorFunctionProvider
{
    [ConfigurationElementType(typeof(RazorFunctionProviderData))]
    internal class RazorFunctionProvider : FileBasedFunctionProvider<RazorBasedFunction>
    {
        protected override string FileExtension => "cshtml";

        protected override string DefaultFunctionNamespace => "Razor";


        public RazorFunctionProvider(string name, string folder) : base(name, folder) { }


        protected override IFunction InstantiateFunction(string virtualPath, string @namespace, string name)
        {
            WebPageBase razorPage;
            using (BuildManagerHelper.DisableUrlMetadataCachingScope())
            {
                razorPage = WebPage.CreateInstanceFromVirtualPath(virtualPath);
            }

            if (!(razorPage is RazorFunction razorFunction))
            {
                Log.LogWarning(nameof(RazorFunctionProvider),
                    $"Razor page '{virtualPath}' does not inherit from the base class for razor functions '{typeof(RazorFunction).FullName}' and will be ignored");
                return null;
            }

            try
            {
                var functionParameters = FunctionBasedFunctionProviderHelper.GetParameters(
                    razorFunction, typeof(RazorFunction), virtualPath);

                return new RazorBasedFunction(@namespace, name, razorFunction.FunctionDescription, functionParameters,
                    razorFunction.FunctionReturnType, virtualPath, this);
            }
            finally
            {
                razorFunction.Dispose();
            }
        }

        protected override IFunction InstantiateFunctionFromCache(string virtualPath, string @namespace, string name, Type returnType, string cachedDescription)
        {
            if (returnType != null)
            {
                return new RazorBasedFunction(@namespace, name, cachedDescription, returnType, virtualPath, this);
            }

            return InstantiateFunction(virtualPath, @namespace, name);
        }

        protected override bool HandleChange(string path)
        {
            return path.EndsWith(FileExtension);
        }
    }
}
