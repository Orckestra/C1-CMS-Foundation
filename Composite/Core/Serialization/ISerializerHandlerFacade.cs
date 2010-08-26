

namespace Composite.Core.Serialization
{
    internal interface ISerializerHandlerFacade
	{
        bool TrySerialize(object objectToSerialize, out string serializedObject, out string errorMessage);
        object Deserialize(string serializedObject);
        void OnFlush();
	}
}
