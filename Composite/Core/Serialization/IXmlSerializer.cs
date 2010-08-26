using System;
using System.Xml.Linq;


namespace Composite.Core.Serialization
{
    internal interface IXmlSerializer
    {
        XElement Serialize(Type objectToSerializeType, object objectToSerialize);
        object Deserialize(XElement serializedObject);
    }
}
