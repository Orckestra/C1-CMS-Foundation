using System;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using Composite.Serialization;


namespace Composite.Validation
{
    internal sealed class ClientValidationRuleSerializerHandler : ISerializerHandler
	{
        public string Serialize(object objectToSerialize)
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

                    return result;
                }
            }
        }



        public object Deserialize(string serializedObject)
        {
            byte[] bytes = Convert.FromBase64String(serializedObject);
            using (MemoryStream ms = new MemoryStream(bytes))
            {
                BinaryFormatter binaryFormatter = new BinaryFormatter();
                
                object result = binaryFormatter.Deserialize(ms);

                return result;
            }
        }
    }
}
