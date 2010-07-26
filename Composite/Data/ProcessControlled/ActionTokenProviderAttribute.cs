using System;

namespace Composite.Data.ProcessControlled
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
    internal sealed class ActionTokenProviderAttribute : Attribute
    {
        public ActionTokenProviderAttribute(string actionTypeName, Type actionTokenProviderType)
        {
            this.ActionTypeName = actionTypeName;
            this.ActionTokenProviderType = actionTokenProviderType;
        }


        public string ActionTypeName
        {
            get;
            private set;
        }


        public Type ActionTokenProviderType
        {
            get;
            private set;
        }
    }
}
