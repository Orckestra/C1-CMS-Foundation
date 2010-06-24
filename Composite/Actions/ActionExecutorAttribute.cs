using System;


namespace Composite.Actions
{
    [AttributeUsageAttribute(AttributeTargets.Class, Inherited = true, AllowMultiple = false)]
    public sealed class ActionExecutorAttribute : Attribute
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
