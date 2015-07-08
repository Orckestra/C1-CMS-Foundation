using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Plugins_GeneratedDataTypesElementProvider;

namespace Composite.Plugins.Elements.ElementProviders.Common
{
    internal static class KeyFieldHelper
    {
        private static class BindingNames
        {
            public const string KeyFieldType = "KeyFieldType";
            public const string KeyFieldTypeOptions = "KeyFieldTypeOptions";
        }

        public static Dictionary<string, string> GetKeyFieldOptions()
        {
            return new Dictionary<string, string>
            {
                {GeneratedTypesHelper.KeyFieldType.Guid.ToString(), Texts.EditorCommon_KeyFieldType_Guid},
                {GeneratedTypesHelper.KeyFieldType.RandomString4.ToString(), Texts.EditorCommon_KeyFieldType_RandomString4},
                {GeneratedTypesHelper.KeyFieldType.RandomString8.ToString(), Texts.EditorCommon_KeyFieldType_RandomString8}
            };
        }

        public static GeneratedTypesHelper.KeyFieldType ParseKeyFieldType(string keyFieldTypeStr)
        {
            return (GeneratedTypesHelper.KeyFieldType) Enum.Parse(typeof (GeneratedTypesHelper.KeyFieldType), keyFieldTypeStr);
        }

        public static GeneratedTypesHelper.KeyFieldType GetKeyFieldType(DataTypeDescriptor dataTypeDescriptor)
        {
            var idField = dataTypeDescriptor.Fields.Single(f => f.Name == "Id");
            if (idField != null)
            {
                if (idField.InstanceType == typeof(Guid))
                {
                    return GeneratedTypesHelper.KeyFieldType.Guid;
                }

                if (idField.InstanceType == typeof(string) && idField.DefaultValue != null)
                {
                    if (idField.DefaultValue.Equals(DefaultValue.RandomString(4, true)))
                    {
                        return GeneratedTypesHelper.KeyFieldType.RandomString4;
                    }

                    if (idField.DefaultValue.Equals(DefaultValue.RandomString(8, false)))
                    {
                        return GeneratedTypesHelper.KeyFieldType.RandomString8;
                    }
                }
            }
            
            return GeneratedTypesHelper.KeyFieldType.Undefined;
        }
    }
}
