using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.Core.Linq;
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
            var storeFieldTypeAttribute = GetCustomAttribute<StoreFieldTypeAttribute>(fieldInfo);

            Verify.IsNotNull(storeFieldTypeAttribute, "Missing [{0}] on field '{1}.{2}'", typeof(StoreFieldTypeAttribute), fieldInfo.DeclaringType.FullName, fieldInfo.Name);

            return storeFieldTypeAttribute.StoreFieldType;
        }



        public static bool TryGetFieldPosition(PropertyInfo fieldInfo, out int position)
        {
            var fieldPositionAttribute = GetCustomAttribute<FieldPositionAttribute>(fieldInfo);

            if (fieldPositionAttribute == null)
            {
                position = 0;
                return false;
            }
            
            position = fieldPositionAttribute.Position;
            return true;
        }



        public static int GetGroupByPriority(PropertyInfo fieldInfo)
        {
            var groupByPriorityAttribute = GetCustomAttribute<GroupByPriorityAttribute>(fieldInfo);

            return groupByPriorityAttribute != null ? groupByPriorityAttribute.Priority : 0;
        }


        public static DataFieldTreeOrderingProfile GetTreeOrderingProfile(PropertyInfo fieldInfo)
        {
            var attribute = GetCustomAttribute<TreeOrderingAttribute>(fieldInfo);

            if (attribute == null)
            {
                return new DataFieldTreeOrderingProfile { OrderPriority = null };
            }

            return new DataFieldTreeOrderingProfile { OrderPriority = attribute.Priority, OrderDescending = attribute.Descending };
        }

        public static DataFieldFormRenderingProfile GetFormRenderingProfile(PropertyInfo propertyInfo)
        {
            var attr = GetCustomAttribute<FormRenderingProfileAttribute>(propertyInfo);

            return attr != null ? new DataFieldFormRenderingProfile
                {
                    Label = attr.Label, 
                    HelpText = attr.HelpText, 
                    WidgetFunctionMarkup = attr.WidgetFunctionMarkup
                } : null;
        }

        private static T GetCustomAttribute<T>(PropertyInfo propertyInfo) where T: Attribute
        {
            object[] attributes = propertyInfo.GetCustomAttributes(typeof(T), true);

            Verify.That(attributes.Length < 2, "Multiple [{0}] attributes defined on field {1}.{2}", typeof(T).Name, propertyInfo.DeclaringType.FullName, propertyInfo.Name);

            return attributes.Length > 0 ? (T)attributes[0] : null;
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

        public static string GetInternalUrlPrefix(Type type)
        {
            var internalUrlAttributes = type.GetCustomInterfaceAttributes<InternalUrlAttribute>().Evaluate();

            return internalUrlAttributes.Count > 0 ? internalUrlAttributes.First().InternalUrlPrefix : null;
        }
        


        public static IEnumerable<DataScopeIdentifier> GetDataScopes(Type interfaceType)
        {
            List<DataScopeAttribute> attributes = interfaceType.GetCustomInterfaceAttributes<DataScopeAttribute>().ToList();

            var dataScopeIdentifiers = new List<DataScopeIdentifier>();
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

            var storeAttribute = (StoreFieldTypeAttribute)storeFieldTypeAttributes[0];
            return storeAttribute.IsNullable;
        }



        public static bool IsKeyField(PropertyInfo fieldInfo)
        {
            List<KeyPropertyNameAttribute> typeKeys = fieldInfo.DeclaringType.GetCustomInterfaceAttributes<KeyPropertyNameAttribute>().ToList();

            int thisPropertyMatchCount = typeKeys.Count(f => f.KeyPropertyName == fieldInfo.Name);

            Verify.That(thisPropertyMatchCount < 2, "{0} contains multiple {1} declarations with the property name '{2}'", fieldInfo.MemberType, typeof(KeyPropertyNameAttribute), fieldInfo.Name);

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
            var attribute = GetCustomAttribute<FunctionBasedNewInstanceDefaultFieldValueAttribute>(propertyInfo);

            return attribute != null ? attribute.FunctionDescription : null;
        }


        public static List<DataTypeAssociationDescriptor> GetDataTypeAssociationDescriptors(Type interfaceType)
        {
            var result = new List<DataTypeAssociationDescriptor>();

            var attributes = interfaceType.GetCustomAttributes(typeof(DataAssociationAttribute), false).OfType<DataAssociationAttribute>().ToList();

            foreach (DataAssociationAttribute attribute in attributes)
            {
                var dataTypeAssociationDescriptor = new DataTypeAssociationDescriptor(attribute.AssociatedInterfaceType, attribute.ForeignKeyPropertyName, attribute.AssociationType);
                if (!result.Contains(dataTypeAssociationDescriptor))
                {
                    result.Add(dataTypeAssociationDescriptor);
                }
            }

            return result;
        }



        public static List<DataTypeAssociationDescriptor> GetDataTypeAssociationDescriptorsRecursively(Type interfaceType)
        {
            var result = new List<DataTypeAssociationDescriptor>();

            List<DataAssociationAttribute> attributes = interfaceType.GetCustomAttributesRecursively<DataAssociationAttribute>().ToList();

            foreach (DataAssociationAttribute attribute in attributes)
            {
                var dataTypeAssociationDescriptor = new DataTypeAssociationDescriptor(attribute.AssociatedInterfaceType, attribute.ForeignKeyPropertyName, attribute.AssociationType);
                if (!result.Contains(dataTypeAssociationDescriptor))
                {
                    result.Add(dataTypeAssociationDescriptor);
                }
            }

            return result;
        }



        /// <summary>
        /// If no BuildNewHandlerAttribute is used on the data type interface
        /// null is returned.
        /// </summary>
        /// <returns></returns>
        public static Type GetBuildNewHandlerType(Type interfaceType)
        {
            var attributes = interfaceType.GetCustomAttributesRecursively<BuildNewHandlerAttribute>().Evaluate();

            if (!attributes.Any()) return null;

            if (attributes.Count() > 1) throw new InvalidOperationException(string.Format("Only one '{0}' allowed on the interface '{1}'", typeof(BuildNewHandlerAttribute).FullName, interfaceType.FullName));

            return attributes.Single().BuildNewHandlerType;
        }
    }
}
