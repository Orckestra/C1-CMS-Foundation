using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Web.WebPages;
using Composite.AspNet.Razor;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.FileBasedFunctionProvider;

namespace Composite.Plugins.Functions.FunctionProviders.RazorFunctionProvider
{
    [DebuggerDisplay("Razor async function: {Namespace + '.' + Name}")]
    internal class RazorBasedAsyncFunction : RazorBasedFunction, IAsyncFunction
	{
        public RazorBasedAsyncFunction(string ns, string name, string description,
            IDictionary<string, FunctionParameter> parameters, Type returnType, string virtualPath,
            bool preventCaching,
            FileBasedFunctionProvider<RazorBasedFunction> provider)
            : base(ns, name, description, parameters, returnType, virtualPath, preventCaching, provider)
        {
        }

        public RazorBasedAsyncFunction(string ns, string name, string description, Type returnType, string virtualPath, bool preventCaching, FileBasedFunctionProvider<RazorBasedFunction> provider)
            : base(ns, name, description, returnType, virtualPath, preventCaching, provider)
        {
            PreventFunctionOutputCaching = preventCaching;
        }

        public async Task<object> ExecuteAsync(ParameterList parameters, FunctionContextContainer context)
        {
            Action<WebPageBase> setParametersAction = page => SetParameters(page, parameters);
            Func<WebPageBase, Task> asyncAction = page => ((AsyncRazorFunction)page).InitializeAsync();

            try
            {
                return await RazorHelper.ExecuteRazorPageAsync(VirtualPath, setParametersAction, asyncAction, ReturnType, context);
            }
            catch (Exception ex)
            {
                EmbedExecutionExceptionSourceCode(ex);

                throw;
            }
        }
    }
}
