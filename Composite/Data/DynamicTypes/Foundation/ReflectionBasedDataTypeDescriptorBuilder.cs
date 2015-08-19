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
                    if (propertyInfo.Name == "PageId" && propertyInfo.DeclaringType == typeof(IPageData))
                    {
                        continue;
                    }

                    DataFieldDescriptor fieldDescriptor = BuildFieldDescriptor(propertyInfo, true);

                    typeDescriptor.Fields.Add(fieldDescriptor);
                }
            }

            ValidateAndAddKeyProperties(typeDescriptor.KeyPropertyNames, type, superInterfaces);

            string[] storeSortOrder = DynamicTypeReflectionFacade.GetSortOrder(type);
            if (storeSortOrder != null)
            {
                foreach (string name in storeSortOrder)
                {
                    typeDescriptor.StoreSortOrderFieldNames.Add(name);
                }
            }

            CheckSortOrder(typeDescriptor);

            foreach (DataScopeIdentifier dataScopeIdentifier in DynamicTypeReflectionFacade.GetDataScopes(type))
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
                    throw new InvalidOperationException(string.Format("The type '{0}' has a non existing key property specified by the attribute '{1}'", type, typeof(KeyPropertyNameAttribute)));
                }
            }

            var indexes = new List<DataTypeIndex>();
            foreach (var indexAttribute in type.GetCustomAttributesRecursively<IndexAttribute>())
            {
                foreach (var field in indexAttribute.Fields)
                {
                    if (typeDescriptor.Fields[field.Item1] == null)
                    {
                        throw new InvalidOperationException(string.Format("Index field '{0}' is not defined", field.Item1));
                    }
                }

                indexes.Add(new DataTypeIndex(indexAttribute.Fields) { Clustered = indexAttribute.Clustered });
            }

            indexes.Sort((a,b) => string.Compare(a.ToString(), b.ToString(), StringComparison.Ordinal));

            typeDescriptor.Indexes = indexes;

            return typeDescriptor;
        }

        static void ValidateAndAddKeyProperties(DataFieldNameCollection keyProperties, Type interfaceType, IList<Type> superInterfacesType)
        {
            foreach (string propertyName in DataAttributeFacade.GetKeyPropertyNames(interfaceType))
            {
                PropertyInfo property = interfaceType.GetProperty(propertyName);
                if (property == null)
                {
                    foreach (Type superInterface in superInterfacesType)
                    {
                        property = superInterface.GetProperty(propertyName);
                        if(property != null) break;
                    }
                }

                Verify.IsNotNull(property, "Missing property '{0}' on type '{1}' or one of its interfaces".FormatWith(propertyName, interfaceType));

                if (DynamicTypeReflectionFacade.IsKeyField(property))
                {
                    keyProperties.Add(propertyName, false);
                }
            }
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
                TreeOrderingProfile = DynamicTypeReflectionFacade.GetTreeOrderingProfile(propertyInfo)
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
            if (DynamicTypeReflectionFacade.TryGetFieldPosition(propertyInfo, out position))
            {
                fieldDescriptor.Position = position;
            }
            else
            {
                fieldDescriptor.Position = 1000;
            }

            fieldDescriptor.NewInstanceDefaultFieldValue = DynamicTypeReflectionFacade.NewInstanceDefaultFieldValue(propertyInfo);

            fieldDescriptor.IsReadOnly = !propertyInfo.CanWrite;

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
                throw new InvalidOperationException(string.Format("The store sort order attribute should list all the fields of the interface"));
            }
        }
    }
}
