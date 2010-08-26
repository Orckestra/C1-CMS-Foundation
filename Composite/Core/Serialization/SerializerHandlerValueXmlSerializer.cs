using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Linq;
using Composite.Data;



namespace Composite.Core.Serialization
{
    class SerializerHandlerValueXmlSerializer : IValueXmlSerializer
    {
        public bool TrySerialize(Type objectToSerializeType, object objectToSerialize, IXmlSerializer xmlSerializer, out XElement serializedObject)
        {
            if (objectToSerializeType == null) throw new ArgumentNullException("objectToSerializeType");

            string serializedResult;
            bool result = SerializerHandlerFacade.TrySerialize(objectToSerialize, out serializedResult);
            if (result == false)
            {
                serializedObject = null;
                return false;
            }

            serializedObject = new XElement("SerializerHandler", new XAttribute("value", serializedResult));

            return true;
        }



        public bool TryDeserialize(XElement serializedObject, IXmlSerializer xmlSerializer, out object deserializedObject)
        {
            if (serializedObject == null) throw new ArgumentNullException("serializedObject");

            deserializedObject = null;

            if (serializedObject.Name.LocalName != "SerializerHandler") return false;

            XAttribute valueAttribute = serializedObject.Attribute("value");
            if (valueAttribute == null) return false;

            try
            {
                deserializedObject = SerializerHandlerFacade.Deserialize(valueAttribute.Value);

                return true;
            }
            catch (DataSerilizationException)
            {
                throw;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
