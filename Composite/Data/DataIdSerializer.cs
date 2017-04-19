using System;
using System.Collections.Generic;
using System.Text;
using Composite.Core.Serialization;
using Composite.Core.Types;

using static Composite.Core.Serialization.StringConversionServices;


namespace Composite.Data
{
	internal static class DataIdSerializer
	{
        public static string Serialize(this IDataId dataId, IEnumerable<string> propertyNames)
        {
            if (dataId == null) throw new ArgumentNullException(nameof(dataId));

            var sb = new StringBuilder();
            SerializeKeyValuePair(sb, "_dataIdType_", TypeManager.SerializeType(dataId.GetType()));
            SerializeKeyValuePair(sb, "_dataId_", SerializationFacade.Serialize(dataId, propertyNames));

            return sb.ToString();
        }

        public static IDataId Deserialize(string serializedId, string serializedVersionId)
        {
            Dictionary<string, string> dataIdValues = ParseKeyValueCollection(serializedId);
            
            if (!dataIdValues.ContainsKey("_dataIdType_") ||
                !dataIdValues.ContainsKey("_dataId_"))
            {
                throw new ArgumentException("The serializedId is not a serialized id", nameof(serializedId));
            }

            string dataIdType = DeserializeValueString(dataIdValues["_dataIdType_"]);
            string serializedIdString = DeserializeValueString(dataIdValues["_dataId_"]);

            string serializedVersionIdString = "";

            if (!string.IsNullOrEmpty(serializedVersionId))
            {
                Dictionary<string, string> versionValues = ParseKeyValueCollection(serializedVersionId);

                if (!versionValues.ContainsKey("_dataIdType_") ||
                    !versionValues.ContainsKey("_dataId_"))
                {
                    throw new ArgumentException("The serializedVersionId is not a serialized version id", nameof(serializedVersionId));
                }

                if (dataIdValues["_dataIdType_"] != versionValues["_dataIdType_"])
                {
                    throw new ArgumentException("Serialized id and version id have diffrent types", nameof(serializedId));
                }

                serializedVersionIdString = DeserializeValueString(versionValues["_dataId_"]);
            }

            Type type = TypeManager.TryGetType(dataIdType);
            if (type == null)
            {
                throw new InvalidOperationException($"The type {dataIdType} could not be found");
            }

            IDataId dataId = SerializationFacade.Deserialize<IDataId>(type, string.Join("", serializedIdString, serializedVersionIdString));

            return dataId;
        }
	}
}
