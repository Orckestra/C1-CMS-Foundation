using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Core.Serialization;
using Composite.Core.Types;


namespace Composite.Data
{
	internal static class DataIdSerializer
	{
        public static string Serialize(this IDataId dataId, IEnumerable<string> propertyNames)
        {
            if (dataId == null) throw new ArgumentNullException("dataId");

            StringBuilder sb = new StringBuilder();
            StringConversionServices.SerializeKeyValuePair(sb, "_dataIdType_", TypeManager.SerializeType(dataId.GetType()));
            StringConversionServices.SerializeKeyValuePair(sb, "_dataId_", SerializationFacade.Serialize(dataId, propertyNames));

            return sb.ToString();
        }

        public static IDataId Deserialize(string serializedId, string serializedVersionId)
        {
            Dictionary<string, string> dicid = StringConversionServices.ParseKeyValueCollection(serializedId);

            if ((dicid.ContainsKey("_dataIdType_") == false) ||
                (dicid.ContainsKey("_dataId_") == false))
            {
                throw new ArgumentException("The serializedId is not a serialized id", nameof(serializedId));
            }

            Dictionary<string, string> dicversion = StringConversionServices.ParseKeyValueCollection(serializedVersionId);

            if ((dicversion.ContainsKey("_dataIdType_") == false) ||
                (dicversion.ContainsKey("_dataId_") == false))
            {
                throw new ArgumentException("The serializedVersionId is not a serialized version id", nameof(serializedVersionId));
            }

	        if (dicid["_dataIdType_"] != dicversion["_dataIdType_"])
	        {
                throw new ArgumentException("Serialized id and version id have diffrent types", nameof(serializedId));
            }

	        string dataIdType = StringConversionServices.DeserializeValueString(dicid["_dataIdType_"]);
            string serializedIdString = StringConversionServices.DeserializeValueString(dicid["_dataId_"]);
            string serializedVersionIdString = StringConversionServices.DeserializeValueString(dicversion["_dataId_"]);

            Type type = TypeManager.TryGetType(dataIdType);
            if (type == null)
            {
                throw new InvalidOperationException(string.Format("The type {0} could not be found", dataIdType));
            }

            IDataId dataId = SerializationFacade.Deserialize<IDataId>(type, string.Join("", serializedIdString, serializedVersionIdString));

            return dataId;
        }
	}
}
