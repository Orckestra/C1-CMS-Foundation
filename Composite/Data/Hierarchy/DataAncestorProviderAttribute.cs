using System;

namespace Composite.Data.Hierarchy
{
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
