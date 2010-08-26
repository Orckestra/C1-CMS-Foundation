using System;
using System.Xml.Linq;


namespace Composite.Core.Serialization
{
    internal interface IValueXmlSerializer
    {
        bool TrySerialize(Type objectToSerializeType, object objectToSerialize, IXmlSerializer xmlSerializer, out XElement serializedObject);
        bool TryDeserialize(XElement serializedObject, IXmlSerializer xmlSerializer, out object deserializedObject);
    }
}
