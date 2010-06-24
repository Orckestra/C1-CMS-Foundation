using System;
using System.Linq;
using System.Xml.Linq;
using Composite.Serialization;


namespace Composite.Data.DynamicTypes
{
    public sealed class DataTypeDescriptorValueXmlSerializer : IValueXmlSerializer
	{
        public bool TrySerialize(Type objectToSerializeType, object objectToSerialize, IXmlSerializer xmlSerializer, out XElement serializedObject)
        {
            if (objectToSerializeType == null) throw new ArgumentNullException("objectToSerializeType");

            serializedObject = null;

            if (objectToSerializeType != typeof(DataTypeDescriptor)) return false;

            if (objectToSerialize == null)
            {
                serializedObject = new XElement("DataTypeDescriptor");
            }
            else
            {
                DataTypeDescriptor dataTypeDescriptor = (DataTypeDescriptor)objectToSerialize;

                serializedObject = dataTypeDescriptor.ToXml();
            }

            return true;
        }



        public bool TryDeserialize(XElement serializedObject, IXmlSerializer xmlSerializer, out object deserializedObject)
        {
            if (serializedObject == null) throw new ArgumentNullException("serializedObject");

            deserializedObject = null;

            if (serializedObject.Name.LocalName != "DataTypeDescriptor") return false;

            if (serializedObject.Elements().Count() == 0)
            {
                deserializedObject = null;
            }
            else
            {
                deserializedObject = DataTypeDescriptor.FromXml(serializedObject);
            }

            return true;
        }
    }
}
