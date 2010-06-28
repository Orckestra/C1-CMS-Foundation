using System;


namespace Composite.Actions
{
    [AttributeUsageAttribute(AttributeTargets.Class, Inherited = true, AllowMultiple = false)]
    internal sealed class ActionExecutorAttribute : Attribute
    {
        private Type _actionExecutorType;


        public ActionExecutorAttribute(Type actionExecutorType)
        {
            _actionExecutorType = actionExecutorType;
        }


        public Type ActionExecutorType
        {
            get { return _actionExecutorType; }
        }
    }
}
