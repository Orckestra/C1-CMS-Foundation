using System;

namespace Composite.Core.Serialization
{
    /// <summary>
    /// Defines which <see cref="ISerializerHandler" /> is used to serialize and deserialize this class
    /// </summary>
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface, Inherited = false)]
    public sealed class SerializerHandlerAttribute : Attribute
    {
        /// <summary>
        /// Defines which <see cref="ISerializerHandler" /> is used to serialize and deserialize this class
        /// </summary>
        /// <param name="serializerHandlerType"></param>
        public SerializerHandlerAttribute(Type serializerHandlerType)
        {
            this.SerializerHandlerType = serializerHandlerType;
        }

        /// <summary>
        /// The <see cref="ISerializerHandler" /> type which is used to serialize and deserialize the class the attribute is added to
        /// </summary>
        public Type SerializerHandlerType { get; private set; }
    }
}
