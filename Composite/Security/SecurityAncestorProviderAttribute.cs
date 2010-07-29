using System;


namespace Composite.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsageAttribute(AttributeTargets.Class, Inherited = true, AllowMultiple = false)]
    public sealed class SecurityAncestorProviderAttribute : Attribute
    {
        private Type _securityAncestorProviderType;


        public SecurityAncestorProviderAttribute(Type securityAncestorProviderType)
        {
            _securityAncestorProviderType = securityAncestorProviderType;
        }


        public Type SecurityAncestorProviderType
        {
            get { return _securityAncestorProviderType; }
        }
    }
}
