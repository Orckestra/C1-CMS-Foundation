using System;
using System.Collections.Generic;

namespace Composite.Data
{
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
    public sealed class KeyPropertyNameAttribute : Attribute
    {
        public KeyPropertyNameAttribute(string propertyName)
        {
            this.KeyPropertyName = propertyName;
        }


        public string KeyPropertyName
        {
            get;
            private set;
        }
    }
}
