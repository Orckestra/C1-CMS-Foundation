using System;

namespace Composite.Data.ProcessControlled
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
    public sealed class ActionPermissionTypeProviderAttribute : Attribute
    {
        public ActionPermissionTypeProviderAttribute(string actionTypeName, Type actionPermissionTypeProviderType)
        {
            this.ActionTypeName = actionTypeName;
            this.ActionPermissionTypeProviderType = actionPermissionTypeProviderType;
        }


        public string ActionTypeName
        {
            get;
            private set;
        }


        public Type ActionPermissionTypeProviderType
        {
            get;
            private set;
        }
    }
}
