using System;
using System.Linq;
using Composite.Core.Serialization;
using System.Xml.Linq;


namespace Composite.Data.DynamicTypes
{
    internal sealed class DataFieldDescriptorValueXmlSerializer : IValueXmlSerializer
	{
        public bool TrySerialize(Type objectToSerializeType, object objectToSerialize, IXmlSerializer xmlSerializer, out XElement serializedObject)
        {
            if (objectToSerializeType == null) throw new ArgumentNullException("objectToSerializeType");

            serializedObject = null;

            if (objectToSerializeType != typeof(DataFieldDescriptor)) return false;

            if (objectToSerialize == null)
            {
                serializedObject = new XElement("DataFieldDescriptor");
            }
            else
            {
                DataFieldDescriptor dataFieldDescriptor = (DataFieldDescriptor)objectToSerialize;

                serializedObject = dataFieldDescriptor.ToXml();
            }

            return true;
        }



        public bool TryDeserialize(XElement serializedObject, IXmlSerializer xmlSerializer, out object deserializedObject)
        {
            if (serializedObject == null) throw new ArgumentNullException("serializedObject");

            deserializedObject = null;

            if (serializedObject.Name.LocalName != "DataFieldDescriptor") return false;

            if (!serializedObject.Elements().Any())
            {
                deserializedObject = null;
            }
            else
            {
                deserializedObject = DataFieldDescriptor.FromXml(serializedObject);
            }

            return true;
        }
    }
}
