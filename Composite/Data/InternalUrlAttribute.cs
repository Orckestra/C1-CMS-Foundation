using System;

namespace Composite.Data
{
    /// <summary>
    /// When specified, defines a short type name for generating internal urls.
    /// F.e.: [InternalUrl("news")] for "~/news(id)" internal links.
    /// </summary>
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = false, Inherited = false)]
    public class InternalUrlAttribute : Attribute
    {
        /// <summary>
        /// Specify a short type name, to be used in internal urls.
        /// </summary>
        /// <param name="internalUrlPrefix">The internal url prefix.</param>
        public InternalUrlAttribute(string internalUrlPrefix)
        {
            Verify.ArgumentNotNullOrEmpty(internalUrlPrefix, "InternalUrlPrefix");

            InternalUrlPrefix = internalUrlPrefix;
        }

        /// <exclude />
        public string InternalUrlPrefix { get; set; }
    }
}
