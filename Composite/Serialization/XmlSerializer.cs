using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;


namespace Composite.Serialization
{
    public sealed class XmlSerializer : IXmlSerializer
    {
        IEnumerable<IValueXmlSerializer> _valueXmlSerializers;



        public XmlSerializer(IEnumerable<IValueXmlSerializer> valueXmlSerializers)
        {
            if (valueXmlSerializers == null) throw new ArgumentNullException("valueXmlSerializers");

            _valueXmlSerializers = valueXmlSerializers.ToList();
        }



        public static IXmlSerializer CreateStandardSerializer()
        {
            return new XmlSerializer(new IValueXmlSerializer[]
                {
                    new SystemPrimitivValueXmlSerializer(),
                    new SystemCollectionValueXmlSerializer()
                });
        }



        public XElement Serialize(Type objectToSerializeType, object objectToSerialize)
        {
            if (objectToSerializeType == typeof(object)) 
            {
                if (objectToSerialize != null)
                {
                    objectToSerializeType = objectToSerialize.GetType();
                }
                else
                {
                    return new XElement("Null");
                }
            }


            XElement serializedObject;
            foreach (IValueXmlSerializer valueXmlSerializer in _valueXmlSerializers)
            {
                if (valueXmlSerializer.TrySerialize(objectToSerializeType, objectToSerialize, this, out serializedObject) == true)
                {
                    return serializedObject;
                }
            }

            throw new InvalidOperationException(string.Format("Could not serialize object of type '{0}'", objectToSerializeType));
        }



        public object Deserialize(XElement serializedObject)
        {
            if (serializedObject.Name.LocalName == "Null")
            {
                return null;
            }

            object deserializedObject;
            foreach (IValueXmlSerializer valueXmlSerializer in _valueXmlSerializers)
            {
                if (valueXmlSerializer.TryDeserialize(serializedObject, this, out deserializedObject) == true)
                {
                    return deserializedObject;
                }
            }

            string serializedObjectStr = serializedObject.ToString();


            // If necessary, cutting the size, since otherwise it may lead to megabyte long exception text
            if(serializedObjectStr.Length > 10000)
            {
                serializedObjectStr = serializedObjectStr.Substring(0, 10000);
            }
            throw new InvalidOperationException(string.Format("Could not deserialize '{0}'", serializedObjectStr));
        }
    }
}
