using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Web;
using System.Xml.Linq;
using Composite.Core.Xml;
using Composite.C1Console.Security;


namespace Composite.Functions.Foundation.PluginFacades
{
    internal sealed class AsyncFunctionWrapper : FunctionWrapper, IAsyncFunction
    {
        private static readonly string LogTitle = nameof(AsyncFunctionWrapper);

        private readonly IAsyncFunction _asyncFunction;

        internal AsyncFunctionWrapper(IAsyncFunction functionToWrap): base(functionToWrap)
        {
            _asyncFunction = functionToWrap;
        }

        public async Task<object> ExecuteAsync(ParameterList parameters, FunctionContextContainer context)
        {
            try
            {
                return await _asyncFunction.ExecuteAsync(parameters, context);
            }
            catch (Exception ex)
            {
                var doc = GetErrorDocument(context, ex);
                if (doc != null) return doc;

                throw;
            }
        }
    }

    /// <summary>
    /// This class is used for catching exceptions from plugins and handling them correctly
    /// </summary>
    [DebuggerDisplay("Name = {Name}, Namespace = {Namespace}")]
    internal class FunctionWrapper : IDowncastableFunction, ICompoundFunction, IFunctionInitializationInfo, IDynamicFunction
    {
        private static readonly string LogTitle = nameof(FunctionWrapper);
        protected readonly IFunction _functionToWrap;


        internal FunctionWrapper(IFunction functionToWrap)
        {
            _functionToWrap = functionToWrap;
        }


        public IFunction InnerFunction => _functionToWrap;


        public string Name => _functionToWrap.Name;


        public string Namespace => _functionToWrap.Namespace;


        public string Description => _functionToWrap.Description;


        public Type ReturnType => _functionToWrap.ReturnType;


        public IEnumerable<ParameterProfile> ParameterProfiles => _functionToWrap.ParameterProfiles ?? Array.Empty<ParameterProfile>();


        public object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            try
            {
                var dynamicMethod = DynamicMethodHelper.GetDynamicMethod("<C1 function> " + _functionToWrap.CompositeName());

                return dynamicMethod(() => _functionToWrap.Execute(parameters, context));
            }
            catch (Exception ex)
            {
                var doc = GetErrorDocument(context, ex);
                if (doc != null) return doc;
                
                throw;
            }
        }

        protected XhtmlDocument GetErrorDocument(FunctionContextContainer context, Exception ex)
        {
            if (_functionToWrap.ReturnType == typeof(XhtmlDocument) || (_functionToWrap.ReturnType == typeof(void) && ex is HttpCompileException))
            {
                if (context.ProcessException(_functionToWrap.CompositeName(), ex, LogTitle, out XElement errorBoxHtml))
                {
                    var errorInfoDocument = new XhtmlDocument();
                    errorInfoDocument.Body.Add(errorBoxHtml);
                    return errorInfoDocument;
                }
            }

            return null;
        }

        public EntityToken EntityToken => _functionToWrap.EntityToken;

        public bool ReturnValueIsDowncastable =>
            _functionToWrap is IDowncastableFunction df
            && df.ReturnValueIsDowncastable;


        public bool AllowRecursiveCall =>
            _functionToWrap is ICompoundFunction compoundFunction
            && compoundFunction.AllowRecursiveCall;


        bool IFunctionInitializationInfo.FunctionInitializedCorrectly =>
            !(_functionToWrap is IFunctionInitializationInfo funcInfo)
            || funcInfo.FunctionInitializedCorrectly;

        public bool PreventFunctionOutputCaching => _functionToWrap is IDynamicFunction df && df.PreventFunctionOutputCaching;
    }
}
