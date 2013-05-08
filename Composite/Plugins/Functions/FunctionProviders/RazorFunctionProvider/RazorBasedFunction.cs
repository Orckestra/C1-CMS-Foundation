using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Web.WebPages;
using Composite.AspNet.Razor;
using Composite.Core.Extensions;
using Composite.Core.WebClient;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.FileBasedFunctionProvider;

namespace Composite.Plugins.Functions.FunctionProviders.RazorFunctionProvider
{
    [DebuggerDisplay("Razor function: {Namespace + '.' + Name}")]
    internal class RazorBasedFunction : FileBasedFunction<RazorBasedFunction>
	{
		public RazorBasedFunction(string ns, string name, string description, IDictionary<string, FunctionParameter> parameters, Type returnType, string virtualPath, FileBasedFunctionProvider<RazorBasedFunction> provider)
			: base(ns, name, description, parameters, returnType, virtualPath, provider)
		{
		}

        public RazorBasedFunction(string ns, string name, string description, Type returnType, string virtualPath, FileBasedFunctionProvider<RazorBasedFunction> provider)
            : base(ns, name, description, returnType, virtualPath, provider)
        {
        }

        protected override void InitializeParameters()
        {
            base.InitializeParameters();

            WebPageBase razorPage;

            using (BuildManagerHelper.DisableUrlMetadataCachingScope())
            {
                razorPage = WebPage.CreateInstanceFromVirtualPath(VirtualPath);
            }

            if (!(razorPage is RazorFunction))
            {
                throw new InvalidOperationException("Failed to initialize function from cache. Path: '{0}'".FormatWith(VirtualPath));
            }

            Parameters = FunctionBasedFunctionProviderHelper.GetParameters(razorPage as RazorFunction, typeof(RazorFunction), VirtualPath);
        }

		public override object Execute(ParameterList parameters, FunctionContextContainer context)
		{
		    Action<WebPageBase> setParametersAction = webPageBase =>
		    {
                    foreach (var param in parameters.AllParameterNames)
			        {
				        var value = parameters.GetParameter(param);

				        Parameters[param].SetValue(webPageBase, value);
			        }
		    };

		    return RazorHelper.ExecuteRazorPage(VirtualPath, setParametersAction, ReturnType, context);
		}
	}
}
