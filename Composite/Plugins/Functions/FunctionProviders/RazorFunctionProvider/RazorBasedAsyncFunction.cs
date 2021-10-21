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
            void SetParametersAction(WebPageBase webPageBase)
            {
                foreach (var param in parameters.AllParameterNames)
                {
                    var parameter = Parameters[param];

                    object parameterValue = parameters.GetParameter(param);

                    parameter.SetValue(webPageBase, parameterValue);
                }
            }

            Func<WebPageBase, Task> asyncAction = page => ((AsyncRazorFunction)page).InitializeAsync();

            try
            {
                var result = await RazorHelper
                    .ExecuteRazorPageAsync(VirtualPath, SetParametersAction, asyncAction, ReturnType, context)
                    .ConfigureAwait(false);

                return result;
            }
            catch (Exception ex)
            {
                EmbedExecutionExceptionSourceCode(ex);

                throw;
            }
        }
    }
}
