using System;
using System.Xml.Linq;


namespace Composite.Serialization
{
    public interface IXmlSerializer
    {
        XElement Serialize(Type objectToSerializeType, object objectToSerialize);
        object Deserialize(XElement serializedObject);
    }
}
