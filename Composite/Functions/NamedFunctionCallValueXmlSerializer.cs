using System;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Serialization;


namespace Composite.Functions
{
    internal sealed class NamedFunctionCallValueXmlSerializer : IValueXmlSerializer
    {
        public bool TrySerialize(Type objectToSerializeType, object objectToSerialize, IXmlSerializer xmlSerializer, out XElement serializedObject)
        {
            if (objectToSerializeType == null) throw new ArgumentNullException("objectToSerializeType");
            if (xmlSerializer == null) throw new ArgumentNullException("xmlSerializer");

            serializedObject = null;
            if (objectToSerializeType != typeof(NamedFunctionCall)) return false;

            NamedFunctionCall namedFunctionCall = objectToSerialize as NamedFunctionCall;

            serializedObject = new XElement("NamedFunctionCall");

            if (namedFunctionCall != null)
            {
                serializedObject.Add(new XElement("Name", xmlSerializer.Serialize(typeof(string), namedFunctionCall.Name)));

                if (namedFunctionCall.FunctionCall != null)
                {
                    serializedObject.Add(new XElement("Value", namedFunctionCall.FunctionCall.Serialize()));
                }
            }

            return true;
        }



        public bool TryDeserialize(XElement serializedObject, IXmlSerializer xmlSerializer, out object deserializedObject)
        {
            if (serializedObject == null) throw new ArgumentNullException("serializedObject");
            if (xmlSerializer == null) throw new ArgumentNullException("xmlSerializer");

            deserializedObject = null;

            if (serializedObject.Name.LocalName != "NamedFunctionCall") return false;

            NamedFunctionCall namedFunctionCall = new NamedFunctionCall(null, null);

            XElement nameElement = serializedObject.Element("Name");
            if (nameElement != null)
            {
                if (nameElement.Elements().Count() != 1) return false;

                namedFunctionCall.Name = (string)xmlSerializer.Deserialize(nameElement.Elements().Single());
            }

            XElement valueElement = serializedObject.Element("Value");
            if (valueElement != null)
            {
                if (valueElement.Elements().Count() != 1) return false;

                object result;
                try
                {
                    result = FunctionFacade.BuildTree(valueElement.Elements().Single());
                }
                catch (Exception)
                {
                    return false;
                }
                if ((result is BaseFunctionRuntimeTreeNode) == false) return false;

                namedFunctionCall.FunctionCall = (BaseFunctionRuntimeTreeNode)result;
            }

            deserializedObject = namedFunctionCall;
            return true;
        }
    }
}
