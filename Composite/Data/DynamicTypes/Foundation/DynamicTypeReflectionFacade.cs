using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.Core.Types;


namespace Composite.Data.DynamicTypes.Foundation
{
	internal static class DynamicTypeReflectionFacade
	{
        public static Guid GetImmutableTypeId(Type type)
        {
            List<ImmutableTypeIdAttribute> immutableTypeIdAttributes = type.GetCustomInterfaceAttributes<ImmutableTypeIdAttribute>().ToList();

            if (immutableTypeIdAttributes.Count == 0) throw new InvalidOperationException(string.Format("{0} is missing the {1} definition.", type, typeof(ImmutableTypeIdAttribute)));

            Guid immutableTypeId = immutableTypeIdAttributes[0].ImmutableTypeId;

            if (immutableTypeId.Equals(Guid.Empty)) throw new InvalidOperationException(string.Format("{0} has an invalid {1} definition. A unique Guid is expected.", type, typeof(ImmutableTypeIdAttribute).Name));

            return immutableTypeId;
        }



        public static int GetVersion(Type type)
        {
            List<TypeVersionAttribute> typeVersionAttributes = type.GetCustomInterfaceAttributes<TypeVersionAttribute>().ToList();

            if (typeVersionAttributes.Count == 0) return 1;

            return typeVersionAttributes[0].Version;
        }



        public static Guid GetImmutableFieldId(PropertyInfo propertyInfo)
        {
            object[] immutableFieldIdAttributes = propertyInfo.GetCustomAttributes(typeof(ImmutableFieldIdAttribute), true);

            if (immutableFieldIdAttributes.Length == 0) throw new InvalidOperationException(string.Format("The {0} property of type {1} is missing its {2} definition.", propertyInfo.Name, propertyInfo.DeclaringType.FullName, typeof(ImmutableFieldIdAttribute)));

            Guid immutableFieldId = ((ImmutableFieldIdAttribute)immutableFieldIdAttributes[0]).ImmutableFieldId;

            if (immutableFieldId.Equals(Guid.Empty)) throw new InvalidOperationException(string.Format("{0} has an invalid {1} definition. A unique Guid is expected.", propertyInfo.DeclaringType, typeof(ImmutableFieldIdAttribute).Name));

            return immutableFieldId;
        }



        public static StoreFieldType GetStoreFieldType(PropertyInfo fieldInfo)
        {
            object[] storeFieldTypeAttributes = fieldInfo.GetCustomAttributes(typeof(StoreFieldTypeAttribute), true);

            if (storeFieldTypeAttributes.Length == 0) throw new InvalidOperationException(string.Format("Missing '{0}' on field '{1}'", typeof(StoreFieldTypeAttribute), fieldInfo.Name));

            StoreFieldTypeAttribute storeAttribute = (StoreFieldTypeAttribute)storeFieldTypeAttributes[0];

            return storeAttribute.StoreFieldType;
        }



        public static bool TryGetFieldPosition(PropertyInfo fieldInfo, out int position )
        {
            object[] fieldPotitionAttributes = fieldInfo.GetCustomAttributes(typeof(FieldPositionAttribute), true);

            if (fieldPotitionAttributes.Length == 0)
            {
                position = 0;
                return false;
            }
            else
            {
                FieldPositionAttribute fieldPotitionAttribute = (FieldPositionAttribute)fieldPotitionAttributes[0];
                position = fieldPotitionAttribute.Position;
                return true;
            }
        }



        public static int GetGroupByPriority(PropertyInfo fieldInfo)
        {
            object[] groupByPriorityAttributes = fieldInfo.GetCustomAttributes(typeof(GroupByPriorityAttribute), true);

            if (groupByPriorityAttributes.Length == 1)
            {
                GroupByPriorityAttribute attribute = groupByPriorityAttributes[0] as GroupByPriorityAttribute;
                return attribute.Priority;
            }
            else
            {
                return 0;
            }
        }



        public static string GetTitle(Type type)
        {
            List<TitleAttribute> titleAttributes = type.GetCustomInterfaceAttributes<TitleAttribute>().ToList();

            if (titleAttributes.Count > 0)
            {
                return titleAttributes[0].Title;
            }

            return null;
        }



        public static string GetLabelPropertyName(Type type)
        {
            List<LabelPropertyNameAttribute> labelPropertyNameAttributes = type.GetCustomInterfaceAttributes<LabelPropertyNameAttribute>().ToList();

            if (labelPropertyNameAttributes.Count > 0)
            {
                return labelPropertyNameAttributes[0].PropertyName;
            }

            return null;
        }



        public static IEnumerable<DataScopeIdentifier> GetDataScopes(Type interfaceType)
        {
            List<DataScopeAttribute> attributes = interfaceType.GetCustomInterfaceAttributes<DataScopeAttribute>().ToList();

            List<DataScopeIdentifier> dataScopeIdentifiers = new List<DataScopeIdentifier>();
            foreach (DataScopeAttribute attribute in attributes)
            {
                if (dataScopeIdentifiers.Contains(attribute.Identifier) == false)
                {
                    dataScopeIdentifiers.Add(attribute.Identifier);
                }
            }

            return dataScopeIdentifiers;
        }



        public static DefaultValue GetDefaultValue(PropertyInfo propertyInfo)
        {
            List<DefaultFieldValueAttribute> defaultValueAttributes = propertyInfo.GetCustomAttributesRecursively<DefaultFieldValueAttribute>().ToList();

            if (defaultValueAttributes.Count > 1) throw new InvalidOperationException(string.Format("The field '{0}' on the interface '{1}' may only have zero or one default value attribute", propertyInfo.Name, propertyInfo.DeclaringType));

            if (defaultValueAttributes.Count == 0) return null;

            return defaultValueAttributes[0].GetDefaultValue();
        }



        public static string[] GetSortOrder(Type interfaceType)
        {
            List<StoreSortOrderAttribute> attributes = interfaceType.GetCustomInterfaceAttributes<StoreSortOrderAttribute>().ToList();

            if (attributes.Count == 0) return null;

            return attributes[0].SortOrder;
        }



        public static bool IsNullable(PropertyInfo fieldInfo)
        {
            object[] storeFieldTypeAttributes = fieldInfo.GetCustomAttributes(typeof(StoreFieldTypeAttribute), false);

            if (storeFieldTypeAttributes.Length == 0) throw new InvalidOperationException("Missing PhysicalStoreFieldTypeAttribute on field " + fieldInfo.Name);

            StoreFieldTypeAttribute storeAttribute = (StoreFieldTypeAttribute)storeFieldTypeAttributes[0];
            return storeAttribute.IsNullable;
        }



        public static bool IsKeyField(PropertyInfo fieldInfo)
        {
            List<KeyPropertyNameAttribute> typeKeys = fieldInfo.DeclaringType.GetCustomInterfaceAttributes<KeyPropertyNameAttribute>().ToList();

            int thisPropertyMatchCount = typeKeys.Where(f => f.KeyPropertyName == fieldInfo.Name).Count();

            if (thisPropertyMatchCount > 1) throw new InvalidOperationException(string.Format("{0} contains multiple {1} declarations with the property name '{2}'", fieldInfo.MemberType, typeof(KeyPropertyNameAttribute), fieldInfo.Name));

            return thisPropertyMatchCount == 1;
        }



        public static string ForeignKeyReferenceTypeName(PropertyInfo propertyInfo)
        {
            object[] attributes = propertyInfo.GetCustomAttributes(typeof(ForeignKeyAttribute), false);

            if (attributes.Length == 0) return null;

            return TypeManager.SerializeType(((ForeignKeyAttribute)attributes[0]).InterfaceType);
        }



        public static string NewInstanceDefaultFieldValue(PropertyInfo propertyInfo)
        {
            object[] attributes = propertyInfo.GetCustomAttributes(typeof(FunctionBasedNewInstanceDefaultFieldValueAttribute), false);

            if (attributes.Length == 0) return null;

            FunctionBasedNewInstanceDefaultFieldValueAttribute attribute = (FunctionBasedNewInstanceDefaultFieldValueAttribute)attributes[0];

            return attribute.FunctionDescription;
        }


        public static List<DataTypeAssociationDescriptor> GetDataTypeAssociationDescriptors(Type interfaceType)
        {
            List<DataTypeAssociationDescriptor> result = new List<DataTypeAssociationDescriptor>();

            List<DataAssociationAttribute> attributes = interfaceType.GetCustomAttributesRecursively<DataAssociationAttribute>().ToList();

            foreach (DataAssociationAttribute attribute in attributes)
            {
                DataTypeAssociationDescriptor dataTypeAssociationDescriptor = new DataTypeAssociationDescriptor(attribute.AssociatedInterfaceType, attribute.ForeignKeyPropertyName, attribute.AssociationType);
                if (result.Contains(dataTypeAssociationDescriptor) == false)
                {
                    result.Add(dataTypeAssociationDescriptor);
                }
            }

            return result;
        }
	}
}
