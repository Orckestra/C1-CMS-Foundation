using System;
using Composite.Serialization;


namespace Composite.Data.Types.Foundation
{
    /// <summary>
    /// This is for forcing the developer to implement thier own ISerializerHandler
    /// </summary>
    internal sealed class ExceptingSerializerHandler : ISerializerHandler
	{
        public string Serialize(object objectToSerialize)
        {
            throw new NotSupportedException();
        }

        public object Deserialize(string serializedObject)
        {
            throw new NotSupportedException();
        }
    }
}
