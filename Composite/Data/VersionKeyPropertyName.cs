using System;

namespace Composite.Data
{
    /// <exclude />
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
    public sealed class VersionKeyPropertyNameAttribute : Attribute
    {
        /// <exclude />
        public VersionKeyPropertyNameAttribute(string propertyName)
        {
            this.VersionKeyPropertyName = propertyName;
        }

        /// <exclude />
        public string VersionKeyPropertyName { get; }
    }
}
