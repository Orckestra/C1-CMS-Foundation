using System;
using System.Collections.Generic;
using System.Linq;
using System.Collections;
using Composite.Data.Caching;
using Composite.Data.DynamicTypes;
using Composite.Core.Extensions;
using Composite.Core.Types;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Data;
using System.Reflection;


using TypeInfo = Composite.Core.Types.Pair<System.Type, Composite.Data.DynamicTypes.DataTypeDescriptor>;

namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.DataReference
{
	internal static class GetOptionsCommon
	{
        private static readonly Cache<string, TypeInfo> _typeLookup = new Cache<string, TypeInfo>("GetOptionsCommon. Type info lookup", 150);

        internal static IEnumerable GetOptions(string typeManagerName)
        {
            Type t = GetTypeInfo(typeManagerName).First;

            switch (t.FullName)
            {
                case "Composite.Data.Types.IPage":

#pragma warning disable 612
                    foreach (KeyValuePair<System.Guid, string> pageItem in PageStructureInfo.PageListInDocumentOrder())
#pragma warning restore 612
                    {
                        yield return new { Key = pageItem.Key, Label = pageItem.Value };
                    }
                    break;
                default:
                    foreach (KeyValuePair pageItem in GetOptionsForDefault(t, typeManagerName))
                    {
                        yield return new { Key = pageItem.Key, Label = pageItem.Value };
                    }
                    break;
            }

        }


        private static IEnumerable<KeyValuePair> GetOptionsForDefault(Type t, string typeManagerName)
        {
            DataTypeDescriptor dtd = GetTypeInfo(typeManagerName).Second;

            Verify.That(dtd.KeyPropertyNames.Count == 1, "Unable to deliver data for selector widget. The selected type '{0}' should have exactly one key property.".FormatWith(typeManagerName));

            string keyFieldName = dtd.KeyPropertyNames[0];

            var allData = DataFacade.GetData(t)
                .ToDataList()
                .Select(data => new { Data = data, Label = data.GetLabel(true) })
                .OrderBy(data => data.Label);

            PropertyInfo keyPi = t.GetPropertiesRecursively(f => f.Name == keyFieldName).FirstOrDefault();
            Verify.That(keyPi != null, "The type '{0}' has invalid meta data. The specified key property '{1}' not found.", typeManagerName, keyFieldName);

            return
                from data in allData
                select new KeyValuePair { Key = (keyPi.GetValue(data.Data, new object[] { }) ?? "").ToString(), Value = data.Label };
        }


        private static TypeInfo GetTypeInfo(string typeManagerName)
        {
            TypeInfo cachedValue = _typeLookup.Get(typeManagerName);
            if(cachedValue != null)
            {
                return cachedValue;
            }

            Type type = TypeManager.GetType(typeManagerName);
            DataTypeDescriptor typeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(type);

            var result = new TypeInfo(type, typeDescriptor);
            _typeLookup.Add(typeManagerName, result);
            return result;
        }
	}
}
