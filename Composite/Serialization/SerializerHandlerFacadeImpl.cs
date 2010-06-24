using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Types;


namespace Composite.Serialization
{
    public sealed class SerializerHandlerFacadeImpl : ISerializerHandlerFacade
	{
        private Dictionary<Type, ISerializerHandler> _serializeHandlers = new Dictionary<Type, ISerializerHandler>();
        private readonly object _lock = new object();



        public bool TrySerialize(object objectToSerialize, out string serializedObject, out string errorMessage)
        {
            if (objectToSerialize == null) throw new ArgumentNullException("objectToSerialize");

            serializedObject = null;

            IEnumerable<SerializerHandlerAttribute> serializerHandlerAttributes = objectToSerialize.GetType().GetCustomAttributesRecursively<SerializerHandlerAttribute>();
            if (serializerHandlerAttributes.Count() == 0)
            {
                errorMessage = string.Format("The type '{0}' has no '{1}' defined in its inherit tree", objectToSerialize.GetType(), typeof(SerializerHandlerAttribute));
                return false;
            }

            SerializerHandlerAttribute serializerHandlerAttribute = serializerHandlerAttributes.First();
            if (serializerHandlerAttribute.SerializerHandlerType == null)
            {
                errorMessage = string.Format("The type '{0}' has specified a null argument to the '{1}'", objectToSerialize.GetType(), typeof(SerializerHandlerAttribute));
                return false;
            }

            if (typeof(ISerializerHandler).IsAssignableFrom(serializerHandlerAttribute.SerializerHandlerType) == false)
            {
                errorMessage = string.Format("The type '{0}' has specified a type that does not implement the '{1}' argument to the '{2}'", objectToSerialize.GetType(), typeof(ISerializerHandler), typeof(SerializerHandlerAttribute));
                return false;
            }

            Type serializeHandlerType = serializerHandlerAttribute.SerializerHandlerType;

            ISerializerHandler serializerHandler;
            lock (_lock)
            {
                if (_serializeHandlers.TryGetValue(serializeHandlerType, out serializerHandler) == false)
                {
                    serializerHandler = (ISerializerHandler)Activator.CreateInstance(serializeHandlerType);

                    _serializeHandlers.Add(serializeHandlerType, serializerHandler);
                }
            }

            string serializedObj = serializerHandler.Serialize(objectToSerialize);

            StringBuilder sb = new StringBuilder();
            StringConversionServices.SerializeKeyValuePair(sb, "SerializerHandlerType", TypeManager.SerializeType(serializerHandler.GetType()));
            StringConversionServices.SerializeKeyValuePair(sb, "SerializedObject", serializedObj);

            errorMessage = null;
            serializedObject = sb.ToString();
            return true;
        }



        public object Deserialize(string serializedObject)
        {
            if (serializedObject == null) throw new ArgumentNullException("serializedObject");

            Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(serializedObject);

            if ((dic.ContainsKey("SerializerHandlerType") == false) || (dic.ContainsKey("SerializedObject") == false)) throw new InvalidOperationException("serializedObject is of wrong format");

            string serilizerHandlerTypeString = StringConversionServices.DeserializeValueString(dic["SerializerHandlerType"]);
            Type serilizerHandlerType = TypeManager.GetType(serilizerHandlerTypeString);

            ISerializerHandler serializerHandler;
            lock (_lock)
            {
                if (_serializeHandlers.TryGetValue(serilizerHandlerType, out serializerHandler) == false)
                {
                    serializerHandler = (ISerializerHandler)Activator.CreateInstance(serilizerHandlerType);

                    _serializeHandlers.Add(serilizerHandlerType, serializerHandler);
                }
            }

            string serializedObjectString = StringConversionServices.DeserializeValueString(dic["SerializedObject"]);
            object resultObject = serializerHandler.Deserialize(serializedObjectString);

            return resultObject;
        }



        public void OnFlush()
        {
            _serializeHandlers = new Dictionary<Type, ISerializerHandler>();
        }
	}
}
