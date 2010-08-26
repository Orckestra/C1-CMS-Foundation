using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.Functions;
using Composite.Core.Types;


namespace Composite.Data.DynamicTypes.Foundation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class ReflectionBasedDescriptorBuilder
    {
        public static DataTypeDescriptor Build(Type type)
        {
            if (type == null) throw new ArgumentNullException("type");
            if (typeof(IData).IsAssignableFrom(type) == false) throw new ArgumentException(string.Format("{0} does not implement {1}", type.FullName, typeof(IData).FullName));

            Guid dataTypeId = DynamicTypeReflectionFacade.GetImmutableTypeId(type);

            bool isCodeGenerated = type.GetCustomInterfaceAttributes<CodeGeneratedAttribute>().Any();

            DataTypeDescriptor typeDescriptor = new DataTypeDescriptor(dataTypeId, type.Namespace, type.Name, TypeManager.SerializeType(type), isCodeGenerated);

            List<Type> superInterfacesTypes = type.GetInterfacesRecursively(t => typeof(IData).IsAssignableFrom(t) && t != typeof(IData));

            typeDescriptor.SetSuperInterfaces(superInterfacesTypes);
            typeDescriptor.Title = DynamicTypeReflectionFacade.GetLabelPropertyName(type);
            typeDescriptor.LabelFieldName = DynamicTypeReflectionFacade.GetLabelPropertyName(type);
            typeDescriptor.DataAssociations = DynamicTypeReflectionFacade.GetDataTypeAssociationDescriptors(type);
            typeDescriptor.Version = (int)DynamicTypeReflectionFacade.GetVersion(type);


            foreach (PropertyInfo propertyInfo in type.GetProperties())
            {
                DataFieldDescriptor fieldDescriptor = BuildFieldDescriptor(propertyInfo, false);

                typeDescriptor.Fields.Add(fieldDescriptor);

                if (DynamicTypeReflectionFacade.IsKeyField(propertyInfo) == true)
                {
                    typeDescriptor.KeyPropertyNames.Add(fieldDescriptor.Name);
                }
            }

            foreach (Type superInterfaceType in superInterfacesTypes)
            {
                foreach (PropertyInfo propertyInfo in superInterfaceType.GetProperties())
                {
                    DataFieldDescriptor fieldDescriptor = BuildFieldDescriptor(propertyInfo, true);

                    typeDescriptor.Fields.Add(fieldDescriptor);

                    if (DynamicTypeReflectionFacade.IsKeyField(propertyInfo) == true)
                    {
                        typeDescriptor.KeyPropertyNames.Add(fieldDescriptor.Name);
                    }
                }
            }

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
                if (typeDescriptor.DataScopes.Contains(dataScopeIdentifier) == false)
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

            return typeDescriptor;
        }



        internal static DataFieldDescriptor BuildFieldDescriptor(PropertyInfo propertyInfo, bool inherited)
        {
            string fieldName = propertyInfo.Name;
            Type fieldType = propertyInfo.PropertyType;
            Guid fieldId = DynamicTypeReflectionFacade.GetImmutableFieldId(propertyInfo);

            StoreFieldType storeFieldType = DynamicTypeReflectionFacade.GetStoreFieldType(propertyInfo);


            DataFieldDescriptor fieldDescriptor = new DataFieldDescriptor(fieldId, fieldName, storeFieldType, fieldType, inherited);

            fieldDescriptor.DefaultValue = DynamicTypeReflectionFacade.GetDefaultValue(propertyInfo);
            fieldDescriptor.IsNullable = DynamicTypeReflectionFacade.IsNullable(propertyInfo);
            fieldDescriptor.ForeignKeyReferenceTypeName = DynamicTypeReflectionFacade.ForeignKeyReferenceTypeName(propertyInfo);
            fieldDescriptor.GroupByPriority = DynamicTypeReflectionFacade.GetGroupByPriority(propertyInfo);

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

            return fieldDescriptor;
        }



        private static WidgetFunctionProvider GetWidgetFunctionMarkup(Type propertyType)
        {
            if (propertyType == typeof(string))
            {
                return StandardWidgetFunctions.TextBoxWidget;
            }
            else if (propertyType == typeof(Guid))
            {
                return StandardWidgetFunctions.GuidTextBoxWidget;
            }
            else if (propertyType == typeof(int))
            {
                return StandardWidgetFunctions.IntegerTextBoxWidget;
            }
            else if (propertyType == typeof(DateTime))
            {
                return StandardWidgetFunctions.DateTimeSelectorWidget;
            }
            else if (propertyType == typeof(decimal))
            {
                return StandardWidgetFunctions.DecimalTextBoxWidget;
            }
            else
            {
                return null;
            }
        }



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
