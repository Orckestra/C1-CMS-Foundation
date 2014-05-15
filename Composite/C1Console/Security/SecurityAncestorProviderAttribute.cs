using System;


namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsageAttribute(AttributeTargets.Class, Inherited = true, AllowMultiple = false)]
    public sealed class SecurityAncestorProviderAttribute : Attribute
    {
        private readonly Type _securityAncestorProviderType;


        /// <exclude />
        public SecurityAncestorProviderAttribute(Type securityAncestorProviderType)
        {
            _securityAncestorProviderType = securityAncestorProviderType;
        }


        /// <exclude />
        public Type SecurityAncestorProviderType
        {
            get { return _securityAncestorProviderType; }
        }
    }
}
