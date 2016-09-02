using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.Core.Extensions;
using Composite.Core.Types;


namespace Composite.Data.DynamicTypes.Foundation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class ReflectionBasedDescriptorBuilder
    {
        /// <exclude />
        public static DataTypeDescriptor Build(Type type)
        {
            Verify.ArgumentNotNull(type, "type");
            Verify.ArgumentCondition(typeof(IData).IsAssignableFrom(type), "type", "{0} does not implement {1}".FormatWith(type.FullName, typeof(IData).FullName));

            Guid dataTypeId = DynamicTypeReflectionFacade.GetImmutableTypeId(type);

            bool isCodeGenerated = type.GetCustomInterfaceAttributes<CodeGeneratedAttribute>().Any();

            var typeDescriptor = new DataTypeDescriptor(dataTypeId, type.Namespace, type.Name, TypeManager.SerializeType(type), isCodeGenerated)
            {
                Title = DynamicTypeReflectionFacade.GetTitle(type),
                LabelFieldName = DynamicTypeReflectionFacade.GetLabelPropertyName(type),
                InternalUrlPrefix = DynamicTypeReflectionFacade.GetInternalUrlPrefix(type),
                DataAssociations = DynamicTypeReflectionFacade.GetDataTypeAssociationDescriptors(type)
            };
            
            List<Type> superInterfaces = type.GetInterfacesRecursively(t => typeof(IData).IsAssignableFrom(t) && t != typeof(IData));
            typeDescriptor.SetSuperInterfaces(superInterfaces);
            
            Type buildNewHandlerType = DynamicTypeReflectionFacade.GetBuildNewHandlerType(type);
            if (buildNewHandlerType != null) typeDescriptor.BuildNewHandlerTypeName = TypeManager.SerializeType(buildNewHandlerType);


            foreach (PropertyInfo propertyInfo in type.GetProperties())
            {
                DataFieldDescriptor fieldDescriptor = BuildFieldDescriptor(propertyInfo, false);

                typeDescriptor.Fields.Add(fieldDescriptor);
            }

            foreach (Type superInterfaceType in superInterfaces)
            {
                foreach (PropertyInfo propertyInfo in superInterfaceType.GetProperties())
                {
                    if (propertyInfo.Name == nameof(IPageData.PageId) && propertyInfo.DeclaringType == typeof(IPageData))
                    {
                        continue;
                    }

                    DataFieldDescriptor fieldDescriptor = BuildFieldDescriptor(propertyInfo, true);

                    typeDescriptor.Fields.Add(fieldDescriptor);
                }
            }

            ValidateAndAddKeyProperties(typeDescriptor.KeyPropertyNames, typeDescriptor.VersionKeyPropertyNames, type);

            string[] storeSortOrder = DynamicTypeReflectionFacade.GetSortOrder(type);
            if (storeSortOrder != null)
            {
                foreach (string name in storeSortOrder)
                {
                    typeDescriptor.StoreSortOrderFieldNames.Add(name);
                }
            }

            CheckSortOrder(typeDescriptor);

            foreach (var dataScopeIdentifier in DynamicTypeReflectionFacade.GetDataScopes(type))
            {
                if (!typeDescriptor.DataScopes.Contains(dataScopeIdentifier))
                {
                    typeDescriptor.DataScopes.Add(dataScopeIdentifier);
                }
            }

            foreach (string keyPropertyName in type.GetKeyPropertyNames())
            {
                if (typeDescriptor.Fields[keyPropertyName] == null)
                {
                    throw new InvalidOperationException(
                        $"The type '{type}' has a non existing key property specified by the attribute '{typeof (KeyPropertyNameAttribute)}'");
                }
            }

            var indexes = new List<DataTypeIndex>();
            foreach (var indexAttribute in type.GetCustomAttributesRecursively<IndexAttribute>())
            {
                foreach (var field in indexAttribute.Fields)
                {
                    if (typeDescriptor.Fields[field.Item1] == null)
                    {
                        throw new InvalidOperationException($"Index field '{field.Item1}' is not defined");
                    }
                }

                indexes.Add(new DataTypeIndex(indexAttribute.Fields) { Clustered = indexAttribute.Clustered });
            }

            indexes.Sort((a,b) => string.Compare(a.ToString(), b.ToString(), StringComparison.Ordinal));

            typeDescriptor.Indexes = indexes;

            return typeDescriptor;
        }

        static void ValidateAndAddKeyProperties(
            DataFieldNameCollection keyProperties,
            DataFieldNameCollection versionKeyProperties, 
            Type interfaceType)
        {
            foreach (string propertyName in interfaceType.GetKeyPropertyNames())
            {
                PropertyInfo property = FindProperty(interfaceType, propertyName);

                if (DynamicTypeReflectionFacade.IsKeyField(property))
                {
                    keyProperties.Add(propertyName, false);
                }
            }

            foreach (string propertyName in interfaceType.GetVersionKeyPropertyNames())
            {
                FindProperty(interfaceType, propertyName);

                versionKeyProperties.Add(propertyName, false);
            }
        }


        internal static PropertyInfo FindProperty(Type interfaceType, string propertyName)
        {
            PropertyInfo property = interfaceType.GetProperty(propertyName);
            if (property == null)
            {
                List<Type> superInterfaces = interfaceType.GetInterfacesRecursively(t => typeof(IData).IsAssignableFrom(t) && t != typeof(IData));

                foreach (Type superInterface in superInterfaces)
                {
                    property = superInterface.GetProperty(propertyName);
                    if (property != null) break;
                }
            }

            Verify.IsNotNull(property, $"Missing property '{propertyName}' on type '{interfaceType}' or one of its interfaces");

            return property;
        }

        internal static DataFieldDescriptor BuildFieldDescriptor(PropertyInfo propertyInfo, bool inherited)
        {
            string fieldName = propertyInfo.Name;
            Type fieldType = propertyInfo.PropertyType;
            Guid fieldId = DynamicTypeReflectionFacade.GetImmutableFieldId(propertyInfo);

            StoreFieldType storeFieldType = DynamicTypeReflectionFacade.GetStoreFieldType(propertyInfo);


            var fieldDescriptor = new DataFieldDescriptor(fieldId, fieldName, storeFieldType, fieldType, inherited)
            {
                DefaultValue = DynamicTypeReflectionFacade.GetDefaultValue(propertyInfo),
                IsNullable = DynamicTypeReflectionFacade.IsNullable(propertyInfo),
                ForeignKeyReferenceTypeName = DynamicTypeReflectionFacade.ForeignKeyReferenceTypeName(propertyInfo),
                GroupByPriority = DynamicTypeReflectionFacade.GetGroupByPriority(propertyInfo),
                TreeOrderingProfile = DynamicTypeReflectionFacade.GetTreeOrderingProfile(propertyInfo),
                NewInstanceDefaultFieldValue = DynamicTypeReflectionFacade.NewInstanceDefaultFieldValue(propertyInfo),
                IsReadOnly = !propertyInfo.CanWrite
            };

            var formRenderingProfile = DynamicTypeReflectionFacade.GetFormRenderingProfile(propertyInfo);
            if (formRenderingProfile != null)
            {
                fieldDescriptor.FormRenderingProfile = formRenderingProfile;
            }

            // These auto added widget functions does not work on a empty system.
            // This code could have added widgets for data types that does not have any widgets attached to them
            //WidgetFunctionProvider widgetFunctionProvider = GetWidgetFunctionMarkup(propertyInfo.PropertyType);            
            //if (widgetFunctionProvider != null)
            //{
            //    LazyDataFieldFormRenderingProfile lazyDataFieldFormRenderingProfile = new LazyDataFieldFormRenderingProfile();
            //    lazyDataFieldFormRenderingProfile.Label = propertyInfo.Name;
            //    lazyDataFieldFormRenderingProfile.HelpText = propertyInfo.Name;
            //    lazyDataFieldFormRenderingProfile.WidgetFunctionMarkupFunc = () => widgetFunctionProvider.SerializedWidgetFunction.ToString();

            //    fieldDescriptor.FormRenderingProfile = lazyDataFieldFormRenderingProfile;
            //}

            int position;
            fieldDescriptor.Position = DynamicTypeReflectionFacade.TryGetFieldPosition(propertyInfo, out position) 
                ? position : 1000;

            return fieldDescriptor;
        }



        //private static WidgetFunctionProvider GetWidgetFunctionMarkup(Type propertyType)
        //{
        //    if (propertyType == typeof(string))
        //    {
        //        return StandardWidgetFunctions.TextBoxWidget;
        //    }
        //    if (propertyType == typeof(Guid))
        //    {
        //        return StandardWidgetFunctions.GuidTextBoxWidget;
        //    }
        //    if (propertyType == typeof(int))
        //    {
        //        return StandardWidgetFunctions.IntegerTextBoxWidget;
        //    }
        //    if (propertyType == typeof(DateTime))
        //    {
        //        return StandardWidgetFunctions.DateTimeSelectorWidget;
        //    }
        //    if (propertyType == typeof(decimal))
        //    {
        //        return StandardWidgetFunctions.DecimalTextBoxWidget;
        //    }
        //    return null;
        //}



        private static void CheckSortOrder(DataTypeDescriptor typeDescriptor)
        {
            if (typeDescriptor.StoreSortOrderFieldNames.Count == 0) return;


            if (typeDescriptor.StoreSortOrderFieldNames.Count != typeDescriptor.Fields.Count)
            {
                throw new InvalidOperationException("The store sort order attribute should list all the fields of the interface");
            }
        }
    }
}
