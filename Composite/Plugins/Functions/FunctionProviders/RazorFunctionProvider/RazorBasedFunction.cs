using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Web.WebPages;
using Composite.AspNet.Razor;
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
