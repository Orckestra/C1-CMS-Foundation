using System;


namespace Composite.Actions
{
    [AttributeUsageAttribute(AttributeTargets.Class, Inherited = true, AllowMultiple = false)]
    public sealed class FlowControllerAttribute : Attribute
    {
        private Type _flowControllerType;


        public FlowControllerAttribute(Type flowControllerType)
        {
            _flowControllerType = flowControllerType;
        }


        public Type FlowControllerType
        {
            get { return _flowControllerType; }
        }
    }
}
