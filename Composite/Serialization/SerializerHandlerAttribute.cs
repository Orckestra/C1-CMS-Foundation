using System;


namespace Composite.Serialization
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface, Inherited = false)]
    public sealed class SerializerHandlerAttribute : Attribute
    {
        public SerializerHandlerAttribute(Type serializerHandlerType)
        {
            this.SerializerHandlerType = serializerHandlerType;
        }


        public Type SerializerHandlerType { get; private set; }
    }
}
