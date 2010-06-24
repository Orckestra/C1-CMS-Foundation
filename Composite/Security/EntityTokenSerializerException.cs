using System;

namespace Composite.Security
{
    public class EntityTokenSerializerException : Exception
    {
        public EntityTokenSerializerException(string message) : base(message)
        {
        }

        public EntityTokenSerializerException(string message, Exception innerException) : base( message, innerException)
        {
        }
    }
}
