using System;


namespace Composite.Data
{
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = false, Inherited = true)]
    public sealed class BuildNewHandlerAttribute : Attribute
    {
        public BuildNewHandlerAttribute(Type buildNewHandlerType)
        {
            this.BuildNewHandlerType = buildNewHandlerType;
        }


        public Type BuildNewHandlerType
        {
            get;
            private set;
        }
    }
}
