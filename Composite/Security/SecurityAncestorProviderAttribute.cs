using System;


namespace Composite.Security
{
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
