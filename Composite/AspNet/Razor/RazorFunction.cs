using System;
using System.Collections.Generic;
using Composite.Core.Xml;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.FileBasedFunctionProvider;

namespace Composite.AspNet.Razor
{
    /// <summary>
    /// Base class for c1 functions based on razor 
    /// </summary>
    public abstract class RazorFunction : CompositeC1WebPage, IParameterWidgetsProvider
    {
        /// <summary>
        /// Gets the function description. Override this to make a custom description.
        /// </summary>
        /// <example>
        ///public override string FunctionDescription
        ///{
        ///    get { return "Will show recent Twitter activity for a given keyword."; }
        ///}
        /// </example>
        public virtual string FunctionDescription => string.Empty;

        /// <summary>
        /// Gets the return type. By default this is XhtmlDocument (html). Override this to set another return type, like string or XElement.
        /// </summary>
        /// <example>
        ///public override Type FunctionReturnType
	    ///{
        ///    get { return typeof(string); }
        ///}
        /// </example>
        public virtual Type FunctionReturnType => typeof (XhtmlDocument);

        /// <summary>
        /// Determines whether the function output can be cached.
        /// </summary>
        public virtual bool PreventFunctionOutputCaching => false;

        /// <exclude />
        public virtual IDictionary<string, WidgetFunctionProvider> GetParameterWidgets()
        {
            return null;
        }

    }
}
