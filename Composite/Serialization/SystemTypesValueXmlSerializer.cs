using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Types;
using System.Xml.Linq;


namespace Composite.Serialization
{
    public sealed class SystemTypesValueXmlSerializer : IValueXmlSerializer
    {
        public bool TrySerialize(Type objectToSerializeType, object objectToSerialize, IXmlSerializer xmlSerializer, out XElement serializedObject)
        {
            if (objectToSerializeType == null) throw new ArgumentNullException("objectToSerializeType");

            if ((objectToSerializeType == typeof(Type)) ||
                (objectToSerializeType == typeof(Type).GetType()))
            {

                serializedObject = new XElement("Value");

                string serializedType = TypeManager.SerializeType(typeof(Type));
                serializedObject.Add(new XAttribute("type", serializedType));

                if (objectToSerialize != null)
                {
                    serializedObject.Add(new XAttribute("value", TypeManager.SerializeType((Type)objectToSerialize)));
                }

                return true;

            }
            else
            {
                serializedObject = null;
                return false;
            }
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

            if (type == typeof(Type))
            {
                deserializedObject = TypeManager.GetType(valueAttribute.Value);
                return true;
            }
            else
            {
                return false;
            }

            
        }
    }
}
