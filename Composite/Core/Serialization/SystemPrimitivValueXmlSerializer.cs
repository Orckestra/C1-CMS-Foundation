using System;
using System.Xml.Linq;
using Composite.Core.Types;


namespace Composite.Core.Serialization
{
    internal sealed class SystemPrimitivValueXmlSerializer : IValueXmlSerializer
    {
        public bool TrySerialize(Type objectToSerializeType, object objectToSerialize, IXmlSerializer xmlSerializer, out XElement serializedObject)
        {
            if (objectToSerializeType == null) throw new ArgumentNullException("objectToSerializeType");

            if ((objectToSerializeType != typeof(int)) &&
                (objectToSerializeType != typeof(long)) &&
                (objectToSerializeType != typeof(bool)) &&
                (objectToSerializeType != typeof(string)) &&
                (objectToSerializeType != typeof(double)) &&
                (objectToSerializeType != typeof(decimal)) &&
                (objectToSerializeType != typeof(Guid)) &&
                (objectToSerializeType != typeof(DateTime)))
            {
                serializedObject = null;
                return false;
            }

            serializedObject = new XElement("Value");

            string serializedType = TypeManager.SerializeType(objectToSerializeType);

            serializedObject.Add(new XAttribute("type", serializedType));

            if (objectToSerialize != null)
            {
                serializedObject.Add(new XAttribute("value", objectToSerialize));
            }

            return true;
        }



        public bool TryDeserialize(XElement serializedObject, IXmlSerializer xmlSerializer, out object deserializedObject)
        {
            if (serializedObject == null) throw new ArgumentNullException("serializedObject");

            deserializedObject = null;

            if (serializedObject.Name.LocalName != "Value") return false;

            XAttribute typeAttribute = serializedObject.Attribute("type");
            if (typeAttribute == null) return false;

            XAttribute valueAttribute = serializedObject.Attribute("value");
            if (valueAttribute == null) return true;

            Type type = TypeManager.GetType(typeAttribute.Value);

            if (type == typeof(int)) deserializedObject = (int)valueAttribute;
            else if (type == typeof(long)) deserializedObject = (long)valueAttribute;
            else if (type == typeof(bool)) deserializedObject = (bool)valueAttribute;
            else if (type == typeof(string)) deserializedObject = (string)valueAttribute;
            else if (type == typeof(double)) deserializedObject = (double)valueAttribute;
            else if (type == typeof(decimal)) deserializedObject = (decimal)valueAttribute;
            else if (type == typeof(Guid)) deserializedObject = (Guid)valueAttribute;
            else if (type == typeof(DateTime)) deserializedObject = (DateTime)valueAttribute;
            else
            {
                return false;
            }

            return true;
        }
    }
}
