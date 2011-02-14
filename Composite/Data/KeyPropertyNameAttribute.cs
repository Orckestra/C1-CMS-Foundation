using System;
using System.Collections.Generic;

namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
    public sealed class KeyPropertyNameAttribute : Attribute
    {
        /// <exclude />
        public KeyPropertyNameAttribute(string propertyName)
        {
            this.KeyPropertyName = propertyName;
        }


        /// <exclude />
        public string KeyPropertyName
        {
            get;
            private set;
        }
    }
}
