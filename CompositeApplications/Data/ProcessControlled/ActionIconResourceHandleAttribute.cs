using System;
using Composite.ResourceSystem;

namespace Composite.Data.ProcessControlled
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
    internal sealed class ActionResourceHandleAttribute : Attribute
    {
        public ActionResourceHandleAttribute(string actionTypeName, string resourceNamespace, string resourceName)
        {
            this.ActionTypeName = actionTypeName;
            this.ActionResourceHandle = new ResourceHandle(resourceNamespace, resourceName);
        }


        public string ActionTypeName
        {
            get;
            private set;
        }


        public ResourceHandle ActionResourceHandle
        {
            get;
            private set;
        }
    }
}
