using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Serialization;
using Composite.Types;


namespace Composite.Data
{
	internal static class DataIdSerializer
	{
        public static string Serialize(this IDataId dataId)
        {
            if (dataId == null) throw new ArgumentNullException("dataId");

            StringBuilder sb = new StringBuilder();
            StringConversionServices.SerializeKeyValuePair(sb, "_dataIdType_", TypeManager.SerializeType(dataId.GetType()));
            StringConversionServices.SerializeKeyValuePair(sb, "_dataId_", SerializationFacade.Serialize(dataId));

            return sb.ToString();
        }



        public static IDataId Deserialize(string serializedDataId)
        {
            Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(serializedDataId);

            if ((dic.ContainsKey("_dataIdType_") == false) ||
                (dic.ContainsKey("_dataId_") == false))
            {
                throw new ArgumentException("The serializedDataId is not a serialized data id", "serializedDataId");
            }

            string dataIdType = StringConversionServices.DeserializeValueString(dic["_dataIdType_"]);
            string serializedDataIdString = StringConversionServices.DeserializeValueString(dic["_dataId_"]);            

            Type type = TypeManager.TryGetType(dataIdType);
            if (type == null)
            {
                throw new InvalidOperationException(string.Format("The type {0} could not be found", dataIdType));
            }

            IDataId dataId = SerializationFacade.Deserialize<IDataId>(type, serializedDataIdString);

            return dataId;
        }
	}
}
