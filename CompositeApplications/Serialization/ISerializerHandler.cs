namespace Composite.Serialization
{
	public interface ISerializerHandler
	{
        string Serialize(object objectToSerialize);
        object Deserialize(string serializedObject);
	}
}
