using System;
using System.Runtime.Serialization.Formatters.Binary;
using Composite.Core.Serialization;


namespace Composite.Data.Validation
{
    internal sealed class ClientValidationRuleSerializerHandler : ISerializerHandler
	{
        public string Serialize(object objectToSerialize)
        {            
            using (System.IO.MemoryStream ms = new System.IO.MemoryStream())
            {
                BinaryFormatter binaryFormatter = new BinaryFormatter();
                binaryFormatter.Serialize(ms, objectToSerialize);

                ms.Seek(0, System.IO.SeekOrigin.Begin);

                using (System.IO.BinaryReader br = new System.IO.BinaryReader(ms))
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
            using (System.IO.MemoryStream ms = new System.IO.MemoryStream(bytes))
            {
                BinaryFormatter binaryFormatter = new BinaryFormatter();
                
                object result = binaryFormatter.Deserialize(ms);

                return result;
            }
        }
    }
}
