using System;
using System.Linq;
using System.Reflection;
using System.Xml.Linq;
using Composite.Core.Types;


namespace Composite.Core.Serialization
{
    internal sealed class CompositeCollectionValueXmlSerializer : IValueXmlSerializer
    {
        public bool TrySerialize(Type objectToSerializeType, object objectToSerialize, IXmlSerializer xmlSerializer, out XElement serializedObject)
        {
            if (objectToSerializeType == null) throw new ArgumentNullException("objectToSerializeType");
            if (xmlSerializer == null) throw new ArgumentNullException("xmlSerializer");

            serializedObject = null;

            MethodInfo methodInfo;
            if (objectToSerializeType.IsGenericType == true)
            {
                Type genericType = objectToSerializeType.GetGenericTypeDefinition();

                string methodName;
                if (genericType == typeof(Pair<,>))
                {
                    methodName = "SerializePair";
                }

                else
                {
                    return false;
                }

                methodInfo = typeof(CompositeCollectionValueXmlSerializer).GetMethod(methodName, BindingFlags.NonPublic | BindingFlags.Static);
                methodInfo = methodInfo.MakeGenericMethod(objectToSerializeType.GetGenericArguments());
            }
            else
            {
                string methodName;
                if (objectToSerializeType == typeof(KeyValuePair))
                {
                    methodName = "SerializeKeyValuePair";
                }
                else
                {
                    return false;
                }

                methodInfo = typeof(CompositeCollectionValueXmlSerializer).GetMethod(methodName, BindingFlags.NonPublic | BindingFlags.Static);
            }


            XElement result = methodInfo.Invoke(null, new object[] { objectToSerialize, xmlSerializer }) as XElement;
            string serializedType = TypeManager.SerializeType(objectToSerializeType);

            result.Add(new XAttribute("type", serializedType));
            serializedObject = result;
            return true;
        }



        public bool TryDeserialize(XElement serializedObject, IXmlSerializer xmlSerializer, out object deserializedObject)
        {
            if (serializedObject == null) throw new ArgumentNullException("serializedObject");
            if (xmlSerializer == null) throw new ArgumentNullException("xmlSerializer");

            deserializedObject = null;

            XAttribute typeAttribute = serializedObject.Attribute("type");
            if (typeAttribute == null) return false;

            Type type = TypeManager.GetType(typeAttribute.Value);

            MethodInfo methodInfo;
            if (type.IsGenericType == true)
            {
                Type genericType = type.GetGenericTypeDefinition();

                string methodName;
                if (genericType == typeof(Pair<,>))
                {
                    methodName = "DeserializePair";
                }
                else
                {
                    return false;
                }

                methodInfo = typeof(CompositeCollectionValueXmlSerializer).GetMethod(methodName, BindingFlags.NonPublic | BindingFlags.Static);
                methodInfo = methodInfo.MakeGenericMethod(type.GetGenericArguments());
            }
            else
            {
                string methodName;
                if (type == typeof(KeyValuePair))
                {
                    methodName = "DeserializeKeyValuePair";
                }
                else
                {
                    return false;
                }

                methodInfo = typeof(CompositeCollectionValueXmlSerializer).GetMethod(methodName, BindingFlags.NonPublic | BindingFlags.Static);
            }

            try
            {
                object result = methodInfo.Invoke(null, new object[] { serializedObject, xmlSerializer });
                if (result != null)
                {
                    deserializedObject = result;
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }



        private static XElement SerializePair<TKey, TValue>(Pair<TKey, TValue> pairToSerialize, IXmlSerializer xmlSerializer)
        {
            XElement result = new XElement("Pair");

            XElement serializedKey = xmlSerializer.Serialize(typeof(TKey), pairToSerialize.First);
            XElement serializedValue = xmlSerializer.Serialize(typeof(TValue), pairToSerialize.Second);

            result.Add(new XElement("First", serializedKey));
            result.Add(new XElement("Second", serializedValue));

            return result;
        }



        private static Pair<TKey, TValue> DeserializePair<TKey, TValue>(XElement serializedObject, IXmlSerializer xmlSerializer)
        {
            if (serializedObject.Name.LocalName != "Pair") throw new InvalidOperationException();

            XElement keyElement = serializedObject.Element("First");
            if (keyElement == null) throw new InvalidOperationException();
            object keyValue = xmlSerializer.Deserialize(keyElement.Elements().Single());

            XElement valueElement = serializedObject.Element("Second");
            if (valueElement == null) throw new InvalidOperationException();
            object valueValue = xmlSerializer.Deserialize(valueElement.Elements().Single());

            Pair<TKey, TValue> result = new Pair<TKey, TValue>((TKey)keyValue, (TValue)valueValue);

            return result;
        }



        private static XElement SerializeKeyValuePair(KeyValuePair KeyValuePairToSerialize, IXmlSerializer xmlSerializer)
        {
            XElement result = new XElement("KeyValuePair");

            XElement serializedKey = xmlSerializer.Serialize(typeof(string), KeyValuePairToSerialize.Key);
            XElement serializedValue = xmlSerializer.Serialize(typeof(string), KeyValuePairToSerialize.Value);

            result.Add(new XElement("Key", serializedKey));
            result.Add(new XElement("Value", serializedValue));

            return result;
        }



        private static KeyValuePair DeserializeKeyValuePair(XElement serializedObject, IXmlSerializer xmlSerializer)
        {
            if (serializedObject.Name.LocalName != "KeyValuePair") throw new InvalidOperationException();

            XElement keyElement = serializedObject.Element("Key");
            if (keyElement == null) return null;
            object keyValue = xmlSerializer.Deserialize(keyElement.Elements().Single());

            XElement valueElement = serializedObject.Element("Value");
            if (valueElement == null) return null;
            object valueValue = xmlSerializer.Deserialize(valueElement.Elements().Single());

            KeyValuePair result = new KeyValuePair((string)keyValue, (string)valueValue);

            return result;
        }
    }
}
