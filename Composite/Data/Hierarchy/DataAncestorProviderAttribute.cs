using System;

namespace Composite.Data.Hierarchy
{
    /// <summary> 
    /// This attribute is requried if data items of this type is used as elements in a tree view.
    /// This attribute points to a type that can resolve parent relations. 
    /// See <see cref="Composite.Data.Hierarchy.IDataAncestorProvider"/> for more information on parent relations.
    /// In case that the data items do not have natural parents, use the default implementaion <see cref="Composite.Data.Hierarchy.DataAncestorProviders.NoAncestorDataAncestorProvider"/>
    /// </summary>
    [AttributeUsageAttribute(AttributeTargets.Interface, Inherited = true, AllowMultiple = false)]
    public sealed class DataAncestorProviderAttribute : Attribute
    {
        private Type _dataAncestorProviderType;


        /// <summary>
        /// Create a instance of <see cref="DataAncestorProviderAttribute"/> given the <paramref name="dataAncestorProviderType"/> type.
        /// </summary>
        /// <param name="dataAncestorProviderType">The type that can resolve parent relations. See <see cref="Composite.Data.Hierarchy.IDataAncestorProvider"/>.</param>
        public DataAncestorProviderAttribute(Type dataAncestorProviderType)
        {
            _dataAncestorProviderType = dataAncestorProviderType;
        }



        /// <summary>
        /// The type that can resolve parent relations. See <see cref="Composite.Data.Hierarchy.IDataAncestorProvider"/>.
        /// </summary>
        public Type DataAncestorProviderType
        {
            get { return _dataAncestorProviderType; }
        }
    }
}
