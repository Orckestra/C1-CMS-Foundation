using System;
using System.Collections.Generic;

namespace Composite.Data
{
#warning RELEASE: Missing documentation
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
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
