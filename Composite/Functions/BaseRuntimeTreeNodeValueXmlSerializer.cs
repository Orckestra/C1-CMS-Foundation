using System;
using System.Linq;
using System.Xml.Linq;
using Composite.Serialization;


namespace Composite.Functions
{
    internal sealed class BaseRuntimeTreeNodeValueXmlSerializer : IValueXmlSerializer
    {
        public bool TrySerialize(Type objectToSerializeType, object objectToSerialize, IXmlSerializer xmlSerializer, out XElement serializedObject)
        {
            if (objectToSerializeType == null) throw new ArgumentNullException("objectToSerializeType");

            serializedObject = null;

            if (typeof(BaseRuntimeTreeNode).IsAssignableFrom(objectToSerializeType) == true)
            {
                serializedObject = new XElement("BaseRuntimeTreeNode");

                if (objectToSerialize != null)
                {
                    BaseRuntimeTreeNode baseRuntimeTreeNode = objectToSerialize as BaseRuntimeTreeNode;

                    serializedObject.Add(new XElement("Value", baseRuntimeTreeNode.Serialize()));
                }

                return true;
            }
            else
            {
                return false;
            }
        }



        public bool TryDeserialize(XElement serializedObject, IXmlSerializer xmlSerializer, out object deserializedObject)
        {
            if (serializedObject == null) throw new ArgumentNullException("serializedObject");

            deserializedObject = null;

            if (serializedObject.Name.LocalName != "BaseRuntimeTreeNode") return false;

            XElement valueElement = serializedObject.Element("Value");
            if (valueElement != null)
            {
                if (valueElement.Elements().Count() != 1) return false;

                deserializedObject = FunctionFacade.BuildTree(valueElement.Elements().Single());
            }

            return true;
        }
    }
}
