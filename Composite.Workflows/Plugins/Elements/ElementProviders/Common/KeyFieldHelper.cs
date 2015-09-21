using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Plugins_GeneratedDataTypesElementProvider;

namespace Composite.Plugins.Elements.ElementProviders.Common
{
    public static class KeyFieldHelper
    {
        public static Dictionary<string, string> GetKeyFieldOptions()
        {
            return new Dictionary<string, string>
            {
                {GeneratedTypesHelper.KeyFieldType.Guid.ToString(), Texts.EditorCommon_KeyFieldType_Guid},
                {GeneratedTypesHelper.KeyFieldType.RandomString4.ToString(), Texts.EditorCommon_KeyFieldType_RandomString4},
                {GeneratedTypesHelper.KeyFieldType.RandomString8.ToString(), Texts.EditorCommon_KeyFieldType_RandomString8}
            };
        }

        //public static GeneratedTypesHelper.KeyFieldType ParseKeyFieldType(string keyFieldTypeStr)
        //{
        //    return (GeneratedTypesHelper.KeyFieldType) Enum.Parse(typeof (GeneratedTypesHelper.KeyFieldType), keyFieldTypeStr);
        //}

        public static GeneratedTypesHelper.KeyFieldType GetKeyFieldType(DataTypeDescriptor dataTypeDescriptor)
        {
            var idField = dataTypeDescriptor.Fields.Single(f => f.Name == "Id");
            if (idField != null)
            {
                return GetKeyFieldType(idField);
            }

            return GeneratedTypesHelper.KeyFieldType.Undefined;
        }

        public static GeneratedTypesHelper.KeyFieldType GetKeyFieldType(DataFieldDescriptor field)
        {
            if (field.InstanceType == typeof(Guid))
            {
                return GeneratedTypesHelper.KeyFieldType.Guid;
            }

            if (field.InstanceType == typeof(string) && field.DefaultValue != null)
            {
                if (field.DefaultValue.Equals(DefaultValue.RandomString(4, true)))
                {
                    return GeneratedTypesHelper.KeyFieldType.RandomString4;
                }

                if (field.DefaultValue.Equals(DefaultValue.RandomString(8, false)))
                {
                    return GeneratedTypesHelper.KeyFieldType.RandomString8;
                }
            }
            
            return GeneratedTypesHelper.KeyFieldType.Undefined;
        }

        public static void UpdateKeyType(DataFieldDescriptor idField, GeneratedTypesHelper.KeyFieldType selectedFieldType)
        {
            switch (selectedFieldType)
            {
                case GeneratedTypesHelper.KeyFieldType.Guid:
                    idField.StoreType = StoreFieldType.Guid;
                    idField.InstanceType = typeof(Guid);
                    idField.DefaultValue = null;
                    break;
                case GeneratedTypesHelper.KeyFieldType.RandomString4:
                    idField.StoreType = StoreFieldType.String(22);
                    idField.InstanceType = typeof(string);
                    idField.DefaultValue = DefaultValue.RandomString(4, true);
                    break;
                case GeneratedTypesHelper.KeyFieldType.RandomString8:
                    idField.StoreType = StoreFieldType.String(22);
                    idField.InstanceType = typeof(string);
                    idField.DefaultValue = DefaultValue.RandomString(8, false);
                    break;
            }
        }
    }
}
