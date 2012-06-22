using System;
using Composite.Core.Xml;

namespace Composite.AspNet.Razor
{
    /// <summary>
    /// Base class for c1 functions based on razor 
    /// </summary>
    public abstract class RazorFunction : CompositeC1WebPage
    {
        /// <summary>
        /// Gets the function description.
        /// </summary>
        public virtual string FunctionDescription
        {
            get { return string.Empty; }
        }

        /// <summary>
        /// Returns default value for a C1 function
        /// </summary>
        public virtual Type FunctionReturnType
        {
            get { return typeof (XhtmlDocument); }
        }
    }
}
