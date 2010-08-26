namespace Composite.Core.Serialization
{
	internal interface ISerializerHandler
	{
        string Serialize(object objectToSerialize);
        object Deserialize(string serializedObject);
	}
}
