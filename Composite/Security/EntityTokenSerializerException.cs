using System;

namespace Composite.Security
{
    internal class EntityTokenSerializerException : Exception
    {
        public EntityTokenSerializerException(string message) : base(message)
        {
        }

        public EntityTokenSerializerException(string message, Exception innerException) : base( message, innerException)
        {
        }
    }
}
