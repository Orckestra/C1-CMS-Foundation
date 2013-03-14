using System;
using System.Web.WebPages;
using Composite.AspNet.Razor;
using Composite.Core.WebClient;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.FileBasedFunctionProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.Plugins.Functions.FunctionProviders.RazorFunctionProvider
{
	[ConfigurationElementType(typeof(RazorFunctionProviderData))]
    internal class RazorFunctionProvider : FileBasedFunctionProvider.FileBasedFunctionProvider<RazorBasedFunction>
	{
		protected override string FileExtension
		{
			get { return "cshtml"; }
		}

        protected override string DefaultFunctionNamespace
        {
            get { return "Razor"; }
        }


		public RazorFunctionProvider(string name, string folder) : base(name, folder) { }


		override protected IFunction InstantiateFunction(string virtualPath, string @namespace, string name)
		{
		    WebPageBase razorPage;
            using(BuildManagerHelper.DisableUrlMetadataCachingScope())
            {
                razorPage = WebPage.CreateInstanceFromVirtualPath(virtualPath);
            }

            if(!(razorPage is RazorFunction))
            {
                return null;
            }

		    RazorFunction razorFunction = razorPage as RazorFunction;

		    var functionParameters = FunctionBasedFunctionProviderHelper.GetParameters(razorFunction, typeof(RazorFunction), virtualPath);

            return new RazorBasedFunction(@namespace, name, razorFunction.FunctionDescription, functionParameters, razorFunction.FunctionReturnType, virtualPath, this);
		}

		protected override bool HandleChange(string path)
		{
            return path.EndsWith(FileExtension);
		}
    }
}
