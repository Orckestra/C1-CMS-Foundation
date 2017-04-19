namespace Composite.Core.Serialization
{
    /// <summary>
    /// Handler to serialize and deserialize data for use in Workflows during ie. postbacks.
    /// </summary>
	public interface ISerializerHandler
	{
        /// <summary>
        /// Returns a string representation of an object
        /// </summary>
        /// <param name="objectToSerialize"></param>
        /// <returns></returns>
        string Serialize(object objectToSerialize);

        /// <summary>
        /// Returns the constructed object deserialized from the passed string
        /// </summary>
        /// <param name="serializedObject"></param>
        /// <returns></returns>
        object Deserialize(string serializedObject);
	}
}
