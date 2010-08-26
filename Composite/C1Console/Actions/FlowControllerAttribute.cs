using System;


namespace Composite.C1Console.Actions
{
    [AttributeUsageAttribute(AttributeTargets.Class, Inherited = true, AllowMultiple = false)]
    internal sealed class FlowControllerAttribute : Attribute
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
