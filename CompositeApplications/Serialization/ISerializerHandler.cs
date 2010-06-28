namespace Composite.Serialization
{
	internal interface ISerializerHandler
	{
        string Serialize(object objectToSerialize);
        object Deserialize(string serializedObject);
	}
}
