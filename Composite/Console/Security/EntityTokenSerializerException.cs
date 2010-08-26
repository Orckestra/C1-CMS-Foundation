using System;

namespace Composite.C1Console.Security
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
