using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Linq;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using System.Runtime.Serialization;
using Composite.Types;


namespace Composite.Serialization
{
    public sealed class SystemSerializableValueXmlSerializer : IValueXmlSerializer
    {
        public bool TrySerialize(Type objectToSerializeType, object objectToSerialize, IXmlSerializer xmlSerializer, out XElement serializedObject)
        {
            if (objectToSerializeType == null) throw new ArgumentNullException("objectToSerializeType");

            serializedObject = null;

            int attributeCount = objectToSerializeType.GetCustomAttributes(typeof(SerializableAttribute), false).Length;

            if (attributeCount > 0) 
            {
                serializedObject = new XElement("Serializable");

                if (objectToSerialize != null)
                {
                    using (MemoryStream ms = new MemoryStream())
                    {
                        BinaryFormatter binaryFormatter = new BinaryFormatter();
                        binaryFormatter.Serialize(ms, objectToSerialize);

                        ms.Seek(0, SeekOrigin.Begin);

                        using (BinaryReader br = new BinaryReader(ms))
                        {
                            byte[] bytes = br.ReadBytes((int)ms.Length);

                            string result = Convert.ToBase64String(bytes);

                            serializedObject.Add(new XAttribute("value", result));
                        }
                    }
                }
                else
                {
                    serializedObject.Add(new XAttribute("type", TypeManager.SerializeType(objectToSerializeType)));
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
            deserializedObject = null;

            if (serializedObject == null) throw new ArgumentNullException("serializedObject");
            if (serializedObject.Name.LocalName != "Serializable") return false;

            

            XAttribute typeAttribute = serializedObject.Attribute("type");
            XAttribute valueAttribute = serializedObject.Attribute("value");
            
            if ((valueAttribute == null) && (typeAttribute != null))
            {
                Type type = TypeManager.GetType(typeAttribute.Value);
                int attributeCount = type.GetCustomAttributes(typeof(SerializableAttribute), false).Length;

                if (attributeCount > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if ((valueAttribute != null) && (typeAttribute == null))
            {
                byte[] bytes = Convert.FromBase64String(valueAttribute.Value);
                using (MemoryStream ms = new MemoryStream(bytes))
                {
                    BinaryFormatter binaryFormatter = new BinaryFormatter();

                    deserializedObject = binaryFormatter.Deserialize(ms);

                    return true;
                }
            }
            else
            {
                return false;
            }
        }
    }
}
