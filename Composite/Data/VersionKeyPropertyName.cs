using System;

namespace Composite.Data
{
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
    public sealed class VersionKeyPropertyNameAttribute : Attribute
    {
        public VersionKeyPropertyNameAttribute(string propertyName)
        {
            this.VersionKeyPropertyName = propertyName;
        }

        public string VersionKeyPropertyName { get; }
    }
}
