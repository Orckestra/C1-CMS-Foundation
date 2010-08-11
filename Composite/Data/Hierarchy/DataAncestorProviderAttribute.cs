using System;

namespace Composite.Data.Hierarchy
{
#warning RELEASE: Missing documentation
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsageAttribute(AttributeTargets.Interface, Inherited = true, AllowMultiple = false)]
    public sealed class DataAncestorProviderAttribute : Attribute
    {
        private Type _dataAncestorProviderType;


        public DataAncestorProviderAttribute(Type dataAncestorProviderType)
        {
            _dataAncestorProviderType = dataAncestorProviderType;
        }


        public Type DataAncestorProviderType
        {
            get { return _dataAncestorProviderType; }
        }
    }
}
