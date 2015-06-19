using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;
using System.Web.WebPages;
using Composite.AspNet.Razor;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Routing;
using Composite.Core.Routing.Pages;
using Composite.Core.WebClient;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Core.Xml;
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
                    var parameter = Parameters[param];

                    object parameterValue = parameters.GetParameter(param);

                    if (parameterValue == null)
                    {
                        parameterValue = TryCreateParameterValue(parameter.Type);
                    }

                    parameter.SetValue(webPageBase, parameterValue);
			    }
		    };

            try
            {
                return RazorHelper.ExecuteRazorPage(VirtualPath, setParametersAction, ReturnType, context);
            }
            catch (Exception ex)
            {
                EmbedExecutionExceptionSourceCode(ex);

                throw;
            }
		}

        private object TryCreateParameterValue(Type type)
        {
            // TODO: move logic to a function parameter value provider
            if (typeof (IRoutedData).IsAssignableFrom(type))
            {
                return CreateRoutedData(type);
            }

            return null;
        }

        private object CreateRoutedData(Type type)
        {
            // TODO: cache constructor
            var defaultConstructor = type.GetConstructor(new Type[0]);
            Verify.IsNotNull(defaultConstructor, "Type '{0}' does not have a default constructor", type.FullName);

            var routedData = (IRoutedData) defaultConstructor.Invoke(null);

            var urlMapper = routedData.GetUrlMapper();
            if (urlMapper != null)
            {
                // // TODO: un-comment when DataUrlMapper logic is implemented
                // DataUrls.RegisterDynamicDataUrlMapper(PageRenderer.CurrentPage, type, new RoutedDataUrlMapperAdapter(urlMapper)); 

                var pageUrlData = C1PageRoute.PageUrlData;

                var model = urlMapper.GetRouteDataModel(pageUrlData);
                routedData.SetModel(model);

                if (!string.IsNullOrEmpty(pageUrlData.PathInfo) && model.IsRouteResolved)
                {
                    C1PageRoute.RegisterPathInfoUsage();
                } 
            }

            return routedData;
        }

        private void EmbedExecutionExceptionSourceCode(Exception ex)
        {
            if (ex is ThreadAbortException
                   || ex is StackOverflowException
                   || ex is OutOfMemoryException
                   || ex is ThreadInterruptedException)
            {
                return;
            }

            var stackTrace = new StackTrace(ex, true);

            string fullFilePath = PathUtil.Resolve(VirtualPath);

            foreach (var frame in stackTrace.GetFrames())
            {
                string fileName = frame.GetFileName();

                if (fileName != null && fileName.StartsWith(fullFilePath, StringComparison.InvariantCultureIgnoreCase))
                {
                    var sourceCode = C1File.ReadAllLines(fileName);

                    XhtmlErrorFormatter.EmbedSourceCodeInformation(ex, sourceCode, frame.GetFileLineNumber());
                    return;
                }
            }
        }
	}
}
