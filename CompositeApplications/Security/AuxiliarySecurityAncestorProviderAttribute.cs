using System;


namespace Composite.Security
{
    [AttributeUsageAttribute(AttributeTargets.Class, Inherited = true, AllowMultiple = false)]
    internal sealed class AuxiliarySecurityAncestorProviderAttribute : Attribute
    {
        private Type _auxiliarySecurityAncestorProviderType;


        public AuxiliarySecurityAncestorProviderAttribute(Type auxiliarySecurityAncestorProviderType)
        {
            _auxiliarySecurityAncestorProviderType = auxiliarySecurityAncestorProviderType;
        }


        public Type AuxiliarySecurityAncestorProviderType
        {
            get { return _auxiliarySecurityAncestorProviderType; }
        }
    }
}
